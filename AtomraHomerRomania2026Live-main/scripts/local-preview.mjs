import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const distRoot = join(projectRoot, 'dist');
const defaultHost = '127.0.0.1';
const defaultPort = 4173;

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8'
};

const getArgValue = (flag, fallback) => {
  const index = process.argv.indexOf(flag);
  if (index === -1 || index === process.argv.length - 1) {
    return fallback;
  }

  return process.argv[index + 1];
};

const host = getArgValue('--host', defaultHost);
const port = Number(getArgValue('--port', String(defaultPort)));

const sendFile = (filePath, response) => {
  const extension = extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[extension] || 'application/octet-stream';
  const fileSize = statSync(filePath).size;

  response.writeHead(200, {
    'Content-Length': fileSize,
    'Content-Type': mimeType,
    'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=31536000'
  });

  createReadStream(filePath).pipe(response);
};

const isInsideDist = (filePath) => filePath.startsWith(distRoot);

const resolveDistFile = (pathname) => {
  const normalizedPath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  return resolve(distRoot, `.${normalizedPath}`);
};

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || `${host}:${port}`}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const requestedFile = resolveDistFile(pathname);

  try {
    if (pathname.startsWith('/api/')) {
      const routeName = pathname.replace('/api/', '').split('?')[0];
      const apiFilePath = resolve(projectRoot, 'api', `${routeName}.ts`);
      
      let bodyData = '';
      request.on('data', (chunk) => { bodyData += chunk; });
      request.on('end', async () => {
        try {
          const handlerModule = await import(`file://${apiFilePath}`);
          const handler = handlerModule.default;
          
          let parsedBody = {};
          try { if (bodyData) parsedBody = JSON.parse(bodyData); } catch {}

          const mockReq = {
            ...request,
            query: Object.fromEntries(requestUrl.searchParams.entries()),
            body: parsedBody,
            headers: request.headers,
            method: request.method,
          };

          const mockRes = {
            status: (code) => {
              response.statusCode = code;
              return mockRes;
            },
            json: (data) => {
              response.setHeader('Content-Type', 'application/json; charset=utf-8');
              response.end(JSON.stringify(data));
              return mockRes;
            },
            send: (text) => {
              response.end(text);
              return mockRes;
            },
            setHeader: (k, v) => response.setHeader(k, v),
            end: (val) => response.end(val),
          };

          await handler(mockReq, mockRes);
        } catch (apiErr) {
          console.error(`API Route Error [/api/${routeName}]:`, apiErr);
          response.writeHead(500, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ error: apiErr.message }));
        }
      });
      return;
    }

    if (pathname === '/' || pathname === '/index.html') {
      sendFile(join(distRoot, 'index.html'), response);
      return;
    }

    if (isInsideDist(requestedFile) && existsSync(requestedFile) && statSync(requestedFile).isFile()) {
      sendFile(requestedFile, response);
      return;
    }

    if (!extname(pathname)) {
      sendFile(join(distRoot, 'index.html'), response);
      return;
    }

    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(`Not found: ${pathname}`);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(`Local preview server error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

server.listen(port, host, () => {
  console.log(`Local preview running at http://${host}:${port}`);
});
