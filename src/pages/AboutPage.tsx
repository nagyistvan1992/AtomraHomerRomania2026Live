import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Users, Heart, Globe, Award } from 'lucide-react';

const AboutPage = () => {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Despre Noi | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Rólunk | Atomra Home Romania';
    } else {
      return 'About Us | Atomra Home Romania';
    }
  };

  // Get content based on language
  const getContent = () => {
    if (language === 'ro') {
      return {
        title: 'Despre Noi',
        subtitle: 'Povestea din spatele Atomra Home România',
        story: {
          title: 'Povestea Noastră',
          paragraphs: [
            'Atomra Home România a început ca un vis de a transforma experiența tradițională a lumânărilor într-una mai sustenabilă, personalizabilă și plăcută. Fondată în 2023, compania noastră s-a născut din pasiunea pentru design interior și angajamentul față de produse ecologice.',
            'Totul a început când fondatorul nostru a observat câtă risipă generează lumânările convenționale - recipiente aruncate, ceară neutilizată, și materiale nereciclabile. Inspirat de această provocare, a dezvoltat conceptul de lumânări perlate reîncărcabile, care permite reutilizarea recipientelor și personalizarea completă a experienței.',
            'După luni de cercetare și dezvoltare, am perfecționat formula noastră de ceară de nisip 100% naturală și am lansat primele noastre produse. De atunci, am crescut constant, aducând bucurie și lumină în casele din întreaga Românie.'
          ]
        },
        mission: {
          title: 'Misiunea Noastră',
          description: 'Misiunea Atomra este să transformăm modul în care oamenii experimentează lumânările, oferind o alternativă sustenabilă, personalizabilă și de înaltă calitate la lumânările tradiționale. Ne străduim să reducem deșeurile, să promovăm reutilizarea și să creăm produse care aduc bucurie și frumusețe în viața de zi cu zi.'
        },
        values: {
          title: 'Valorile Noastre',
          items: [
            {
              title: 'Sustenabilitate',
              description: 'Ne angajăm să creăm produse ecologice care minimizează impactul asupra mediului.',
              icon: <Globe size={32} strokeWidth={1.5} className="text-green-600" />
            },
            {
              title: 'Calitate',
              description: 'Nu facem compromisuri când vine vorba de calitatea produselor noastre, folosind doar cele mai bune ingrediente naturale.',
              icon: <Award size={32} strokeWidth={1.5} className="text-amber-600" />
            },
            {
              title: 'Inovație',
              description: 'Căutăm constant modalități de a îmbunătăți produsele noastre și de a aduce noi idei în industria lumânărilor.',
              icon: <Heart size={32} strokeWidth={1.5} className="text-red-600" />
            },
            {
              title: 'Comunitate',
              description: 'Credem în construirea unei comunități de iubitori de lumânări care împărtășesc valorile noastre de sustenabilitate și frumusețe.',
              icon: <Users size={32} strokeWidth={1.5} className="text-blue-600" />
            }
          ]
        },
        team: {
          title: 'Echipa Noastră',
          description: 'Suntem o echipă mică dar dedicată de pasionați care lucrează împreună pentru a aduce lumânările Atomra în casele din întreaga Românie. De la cercetare și dezvoltare la producție și servicii pentru clienți, fiecare membru al echipei noastre este dedicat excelenței și satisfacției clienților.'
        },
        future: {
          title: 'Viitorul Atomra',
          description: 'Privim cu entuziasm spre viitor, cu planuri de a extinde gama noastră de produse, de a inova în continuare în domeniul lumânărilor sustenabile și de a ajunge la mai mulți clienți din România și din întreaga Europă. Suntem dedicați misiunii noastre de a face lumea un loc mai luminos, un recipient de lumânare reîncărcabil la un moment dat.'
        }
      };
    } else if (language === 'hu') {
      return {
        title: 'Rólunk',
        subtitle: 'Az Atomra Home Románia története',
        story: {
          title: 'Történetünk',
          paragraphs: [
            'Az Atomra Home Románia egy álomként kezdődött, hogy a hagyományos gyertyaélményt fenntarthatóbbá, testreszabhatóbbá és élvezetesebbé tegyük. 2023-ban alapítva, vállalatunk a belsőépítészet iránti szenvedélyből és a környezetbarát termékek iránti elkötelezettségből született.',
            'Minden akkor kezdődött, amikor alapítónk észrevette, mennyi hulladékot termelnek a hagyományos gyertyák - eldobott tartályok, fel nem használt viasz és nem újrahasznosítható anyagok. Ettől a kihívástól inspirálva fejlesztette ki az újratölthető gyöngyviasz gyertyák koncepcióját, amely lehetővé teszi a tartályok újrafelhasználását és az élmény teljes testreszabását.',
            'Hónapokig tartó kutatás és fejlesztés után tökéletesítettük 100% természetes homokviasz formulánkat és elindítottuk első termékeinket. Azóta folyamatosan növekedtünk, örömöt és fényt hozva otthonokba egész Romániában.'
          ]
        },
        mission: {
          title: 'Küldetésünk',
          description: 'Az Atomra küldetése, hogy átalakítsuk az emberek gyertyaélményét, fenntartható, testreszabható és kiváló minőségű alternatívát kínálva a hagyományos gyertyákhoz képest. Törekszünk a hulladék csökkentésére, az újrafelhasználás népszerűsítésére és olyan termékek létrehozására, amelyek örömet és szépséget hoznak a mindennapi életbe.'
        },
        values: {
          title: 'Értékeink',
          items: [
            {
              title: 'Fenntarthatóság',
              description: 'Elkötelezettek vagyunk olyan környezetbarát termékek létrehozása mellett, amelyek minimalizálják a környezeti hatást.',
              icon: <Globe size={32} strokeWidth={1.5} className="text-green-600" />
            },
            {
              title: 'Minőség',
              description: 'Nem kötünk kompromisszumot termékeink minőségét illetően, csak a legjobb természetes összetevőket használjuk.',
              icon: <Award size={32} strokeWidth={1.5} className="text-amber-600" />
            },
            {
              title: 'Innováció',
              description: 'Folyamatosan keressük a módokat termékeink fejlesztésére és új ötletek bevezetésére a gyertyaiparba.',
              icon: <Heart size={32} strokeWidth={1.5} className="text-red-600" />
            },
            {
              title: 'Közösség',
              description: 'Hiszünk egy olyan gyertyakedvelő közösség építésében, amely osztozik fenntarthatósági és szépség értékeinkben.',
              icon: <Users size={32} strokeWidth={1.5} className="text-blue-600" />
            }
          ]
        },
        team: {
          title: 'Csapatunk',
          description: 'Kis, de elkötelezett csapat vagyunk, akik együtt dolgoznak azért, hogy az Atomra gyertyákat eljuttassák egész Románia otthonaiba. A kutatástól és fejlesztéstől kezdve a gyártáson át az ügyfélszolgálatig, csapatunk minden tagja elkötelezett a kiválóság és az ügyfelek elégedettsége iránt.'
        },
        future: {
          title: 'Az Atomra Jövője',
          description: 'Lelkesen tekintünk a jövőbe, terveink között szerepel termékválasztékunk bővítése, további innováció a fenntartható gyertyák területén, és több ügyfél elérése Romániában és egész Európában. Elkötelezettek vagyunk küldetésünk mellett, hogy a világot fényesebbé tegyük, egy újratölthető gyertyatartót egyszerre.'
        }
      };
    } else {
      return {
        title: 'About Us',
        subtitle: 'The story behind Atomra Home Romania',
        story: {
          title: 'Our Story',
          paragraphs: [
            'Atomra Home Romania began as a dream to transform the traditional candle experience into one that is more sustainable, customizable, and enjoyable. Founded in 2023, our company was born out of a passion for interior design and a commitment to eco-friendly products.',
            'It all started when our founder noticed how much waste conventional candles generate - discarded containers, unused wax, and non-recyclable materials. Inspired by this challenge, he developed the concept of refillable pearl candles, which allows for container reuse and complete customization of the experience.',
            'After months of research and development, we perfected our 100% natural sand wax formula and launched our first products. Since then, we have been steadily growing, bringing joy and light to homes across Romania.'
          ]
        },
        mission: {
          title: 'Our Mission',
          description: 'Atomra\'s mission is to transform the way people experience candles, providing a sustainable, customizable, and high-quality alternative to traditional candles. We strive to reduce waste, promote reuse, and create products that bring joy and beauty to everyday life.'
        },
        values: {
          title: 'Our Values',
          items: [
            {
              title: 'Sustainability',
              description: 'We are committed to creating eco-friendly products that minimize environmental impact.',
              icon: <Globe size={32} strokeWidth={1.5} className="text-green-600" />
            },
            {
              title: 'Quality',
              description: 'We make no compromises when it comes to the quality of our products, using only the finest natural ingredients.',
              icon: <Award size={32} strokeWidth={1.5} className="text-amber-600" />
            },
            {
              title: 'Innovation',
              description: 'We constantly seek ways to improve our products and bring new ideas to the candle industry.',
              icon: <Heart size={32} strokeWidth={1.5} className="text-red-600" />
            },
            {
              title: 'Community',
              description: 'We believe in building a community of candle lovers who share our values of sustainability and beauty.',
              icon: <Users size={32} strokeWidth={1.5} className="text-blue-600" />
            }
          ]
        },
        team: {
          title: 'Our Team',
          description: 'We are a small but dedicated team of passionate individuals working together to bring Atomra candles to homes across Romania. From research and development to production and customer service, every member of our team is dedicated to excellence and customer satisfaction.'
        },
        future: {
          title: 'The Future of Atomra',
          description: 'We look forward to the future with enthusiasm, with plans to expand our product range, innovate further in the field of sustainable candles, and reach more customers in Romania and across Europe. We are dedicated to our mission of making the world a brighter place, one refillable candle container at a time.'
        }
      };
    }
  };

  const content = getContent();

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Descoperă povestea Atomra Home Romania, misiunea noastră și valorile care ne ghidează în crearea lumânărilor din ceară naturală sustenabile și personalizabile."
        keywords="despre noi, atomra, povestea noastră, misiune, valori, echipă, lumânări sustenabile"
        url="https://atomra-home-romania.com/about"
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
                  {content.title}
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
                  {content.subtitle}
                </motion.p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 sm:py-20 luxury-section-dark">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              {/* Our Story */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.story.title}</h2>
                
                <div className="space-y-4 max-w-4xl mx-auto">
                  {content.story.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-slate-600 font-light leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
              
              {/* Our Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.mission.title}</h2>
                
                <p className="text-slate-600 font-light leading-relaxed text-center max-w-4xl mx-auto">
                  {content.mission.description}
                </p>
              </motion.div>
              
              {/* Our Values */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-8 text-center">{content.values.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {content.values.items.map((value, index) => (
                    <div key={index} className="luxury-card p-6 rounded-lg text-center">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        {value.icon}
                      </div>
                      <h3 className="text-lg font-light text-slate-900 mb-2">{value.title}</h3>
                      <p className="text-slate-600 font-light">{value.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Our Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.team.title}</h2>
                
                <p className="text-slate-600 font-light leading-relaxed text-center max-w-4xl mx-auto">
                  {content.team.description}
                </p>
                
                {/* Team Photos Placeholder */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="text-center">
                      <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-4 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Users size={32} strokeWidth={1.5} />
                        </div>
                      </div>
                      <h3 className="text-lg font-light text-slate-900 mb-1">
                        {language === 'ro' ? 'Membru Echipă' : 
                         language === 'hu' ? 'Csapattag' : 
                         'Team Member'} {item}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {language === 'ro' ? 'Poziție' : 
                         language === 'hu' ? 'Pozíció' : 
                         'Position'} {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* The Future */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.future.title}</h2>
                
                <p className="text-slate-600 font-light leading-relaxed text-center max-w-4xl mx-auto">
                  {content.future.description}
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;