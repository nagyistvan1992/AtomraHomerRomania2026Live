export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const gmailUsername = (
    process.env.GMAIL_USERNAME ||
    process.env.GMAIL_USER ||
    process.env.SMTP_USER ||
    process.env.EMAIL_USER ||
    ''
  ).trim();

  const gmailAppPassword = (
    process.env.GMAIL_APP_PASSWORD ||
    process.env.GMAIL_PASS ||
    process.env.GMAIL_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.EMAIL_PASS ||
    ''
  ).trim().replace(/\s+/g, '');

  if (!gmailUsername || !gmailAppPassword) {
    return res.status(200).json({
      configured: false,
      message: 'GMAIL_USERNAME or GMAIL_APP_PASSWORD environment variables not found in Vercel environment.',
      envKeysFound: Object.keys(process.env).filter(k => 
        k.toLowerCase().includes('gmail') || 
        k.toLowerCase().includes('mail') || 
        k.toLowerCase().includes('smtp') ||
        k.toLowerCase().includes('pass') ||
        k.toLowerCase().includes('user')
      ),
    });
  }

  let nodemailer: any = null;
  try {
    nodemailer = require('nodemailer');
  } catch (err: any) {
    return res.status(500).json({
      configured: true,
      success: false,
      error: 'Nodemailer require failed: ' + err.message,
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUsername,
        pass: gmailAppPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await new Promise((resolve, reject) => {
      transporter.verify((error: any, success: any) => {
        if (error) reject(error);
        else resolve(success);
      });
    });

    return res.status(200).json({
      configured: true,
      smtpSuccess: true,
      username: gmailUsername,
      message: 'Gmail SMTP authenticated successfully!',
    });
  } catch (verifyErr: any) {
    return res.status(200).json({
      configured: true,
      smtpSuccess: false,
      username: gmailUsername,
      error: verifyErr.message || String(verifyErr),
      code: verifyErr.code,
      response: verifyErr.response,
    });
  }
}
