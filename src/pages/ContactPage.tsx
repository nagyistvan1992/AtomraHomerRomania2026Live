import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(
        language === 'ro' ? 'A apărut o eroare. Vă rugăm să încercați din nou.' :
        language === 'hu' ? 'Hiba történt. Kérjük, próbálja újra.' :
        'An error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Contact | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Kapcsolat | Atomra Home Romania';
    } else {
      return 'Contact | Atomra Home Romania';
    }
  };

  // Get contact info based on language
  const getContactInfo = () => {
    if (language === 'ro') {
      return {
        title: 'Contactează-ne',
        subtitle: 'Suntem aici pentru a te ajuta cu orice întrebare sau nelămurire.',
        email: 'Email',
        phone: 'Telefon',
        address: 'Adresă',
        hours: 'Program',
        form: {
          title: 'Trimite-ne un mesaj',
          name: 'Nume complet',
          email: 'Adresa de email',
          subject: 'Subiect',
          message: 'Mesajul tău',
          submit: 'Trimite mesaj',
          success: 'Mesajul tău a fost trimis cu succes! Te vom contacta în curând.',
          sending: 'Se trimite...'
        }
      };
    } else if (language === 'hu') {
      return {
        title: 'Kapcsolat',
        subtitle: 'Itt vagyunk, hogy segítsünk bármilyen kérdésben vagy problémában.',
        email: 'Email',
        phone: 'Telefon',
        address: 'Cím',
        hours: 'Nyitvatartás',
        form: {
          title: 'Küldjön üzenetet',
          name: 'Teljes név',
          email: 'Email cím',
          subject: 'Tárgy',
          message: 'Üzenet',
          submit: 'Üzenet küldése',
          success: 'Üzenetét sikeresen elküldtük! Hamarosan kapcsolatba lépünk Önnel.',
          sending: 'Küldés...'
        }
      };
    } else {
      return {
        title: 'Contact Us',
        subtitle: 'We\'re here to help with any questions or concerns.',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        hours: 'Hours',
        form: {
          title: 'Send us a message',
          name: 'Full name',
          email: 'Email address',
          subject: 'Subject',
          message: 'Your message',
          submit: 'Send message',
          success: 'Your message has been sent successfully! We\'ll get back to you soon.',
          sending: 'Sending...'
        }
      };
    }
  };

  const contactInfo = getContactInfo();

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Contactează echipa Atomra Home Romania pentru întrebări despre produse, comenzi sau colaborări. Suntem aici să te ajutăm!"
        keywords="contact, atomra, lumânări, ceară naturală, asistență clienți, întrebări"
        url="https://atomra-home-romania.com/contact"
      />
      
      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        {/* Luxury floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
          {/* Header Section */}
          <section className="py-6 sm:py-8 luxury-section-light">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-slate-900 mb-6 tracking-tight"
                >
                  {contactInfo.title}
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-px bg-slate-300 mx-auto mb-6"
                ></motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg text-slate-600 max-w-4xl mx-auto font-light leading-relaxed"
                >
                  {contactInfo.subtitle}
                </motion.p>
              </div>
            </div>
          </section>

          {/* Contact Content */}
          <section className="py-16 sm:py-20 luxury-section-dark">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="luxury-card p-8 rounded-lg h-full">
                    <h2 className="text-2xl font-light text-slate-900 mb-8">
                      {language === 'ro' ? 'Informații de Contact' : 
                       language === 'hu' ? 'Kapcsolati Információk' : 
                       'Contact Information'}
                    </h2>
                    
                    <div className="space-y-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail size={20} className="text-slate-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-light text-slate-900 mb-1">{contactInfo.email}</h3>
                          <a href="mailto:atomrahomeromania@gmail.com" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                            atomrahomeromania@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone size={20} className="text-slate-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-light text-slate-900 mb-1">{contactInfo.phone}</h3>
                          <a href="tel:+40751801025" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                            0751801025
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin size={20} className="text-slate-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-light text-slate-900 mb-1">{contactInfo.address}</h3>
                          <p className="text-slate-600">
                            Satu Mare, str.Mesteacanului, nr.1B
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock size={20} className="text-slate-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-light text-slate-900 mb-1">{contactInfo.hours}</h3>
                          <p className="text-slate-600">
                            0-24h
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Media */}
                    <div className="mt-12">
                      <h3 className="text-lg font-light text-slate-900 mb-4">
                        {language === 'ro' ? 'Urmărește-ne' : 
                         language === 'hu' ? 'Kövess minket' : 
                         'Follow Us'}
                      </h3>
                      <div className="flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=61561996989234" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors duration-200">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                        </a>
                        <a href="https://www.instagram.com/atomra_home_romania/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors duration-200">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="luxury-card p-8 rounded-lg">
                    <h2 className="text-2xl font-light text-slate-900 mb-8">
                      {contactInfo.form.title}
                    </h2>
                    
                    {submitSuccess && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-600 text-sm font-light">{contactInfo.form.success}</p>
                      </div>
                    )}
                    
                    {submitError && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm font-light">{submitError}</p>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-light text-slate-700 mb-1">
                          {contactInfo.form.name} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-light text-slate-700 mb-1">
                          {contactInfo.form.email} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-light text-slate-700 mb-1">
                          {contactInfo.form.subject} *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-light text-slate-700 mb-1">
                          {contactInfo.form.message} *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-slate-900 text-white px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>{contactInfo.form.sending}</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} strokeWidth={1.5} />
                            <span>{contactInfo.form.submit}</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ContactPage;