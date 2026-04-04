import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAssetPath } from '../utils/assetPath';

const IdeasPage = () => {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Ideile Noastre | Lumânări din Ceară Naturală | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Ötleteink | Természetes Viaszgyertyák | Atomra Home Romania';
    } else {
      return 'Our Ideas | Natural Wax Candles | Atomra Home Romania';
    }
  };

  // Gallery images with optimized metadata
  const galleryImages = [
    {
      src: getAssetPath('/1_Chameleon-Sand-Candles_photo-by-Curated-St-1024x935.webp'),
      alt: "Aranjament elegant cu lumânări din ceară naturală pentru masă festivă",
      title: "Decor Minimalist",
      description: "Simplitate și eleganță pentru mese festive cu lumânări din ceară naturală",
      metadata: {
        keywords: "lumanare ceara naturala, decor minimalist, lumanari pentru evenimente, ceara de soia, aranjament elegant"
      },
      link: "/product/granule-box-750g"
    },
    {
      src: getAssetPath('/7_a312f04c-8c83-41b7-835e-4097a635502f_1024x1024.webp'),
      alt: "Lumânare personalizată în recipient de sticlă colorată pe suport din lemn natural",
      title: "Accente Naturale",
      description: "Combinația perfectă între lemn și sticlă colorată pentru lumânări personalizate",
      metadata: {
        keywords: "lumanare personalizata, ceara naturala, recipient sticla, decor natural, lumanari din ceara naturala"
      },
      link: "/product/pachet-splendore-250g"
    },
    {
      src: getAssetPath('/Screenshot 2024-06-15 154827.webp'),
      alt: "Masă elegantă decorată cu multiple lumânări din ceară de soia pentru cină festivă",
      title: "Aranjamente pentru Cină",
      description: "Creează o atmosferă intimă pentru cine speciale cu lumânări din ceară naturală",
      metadata: {
        keywords: "lumanari ceara naturala, decor masa, cina festiva, ceara de soia, aranjament lumanari"
      },
      link: "/product/ceara-nisip-4-5kg-evenimente"
    },
    {
      src: getAssetPath('/CandleSand-6 copy.webp'),
      alt: "Lumânare personalizată pe măsuță de cafea lângă carte pentru moment de relaxare",
      title: "Colțuri de Relaxare",
      description: "Transformă spațiile de lectură în oaze de liniște cu lumânări din ceară naturală",
      metadata: {
        keywords: "lumanare personalizata, ceara naturala, relaxare, lumanari din ceara naturala, decor interior"
      },
      link: "/product/pachet-essenza-150g"
    },
    {
      src: getAssetPath('/il_fullxfull.5794329172_3eft.webp'),
      alt: "Lumânare din ceară naturală în recipient decorativ de sticlă pentru decor interior",
      title: "Recipiente Unice",
      description: "Alege vase deosebite pentru un impact vizual maxim al lumânărilor din ceară naturală",
      metadata: {
        keywords: "lumanare ceara naturala, recipient decorativ, ceara de soia, lumanare personalizata, decor interior"
      },
      link: "/product/granule-box-750g"
    }
  ];

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Descoperă idei creative pentru utilizarea lumânărilor din ceară naturală Atomra. Inspirație pentru decorațiuni, evenimente și ambianță cu lumânări personalizate din ceară de soia."
        keywords="lumanare ceara naturala, ceara de soia, lumanari ceara naturala, lumanare personalizata, lumanari din ceara naturala, idei decorațiuni, aranjamente lumânări, decor evenimente"
        url="https://atomra-home-romania.com/ideas"
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
                  {language === 'ro' ? 'Ideile Noastre' : 
                   language === 'hu' ? 'Ötleteink' : 
                   'Our Ideas'}
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
                  {language === 'ro' ? 'Descoperă idei creative și inspirație pentru utilizarea lumânărilor din ceară naturală Atomra în casa ta și la evenimente speciale.' : 
                   language === 'hu' ? 'Fedezz fel kreatív ötleteket és inspirációt az Atomra természetes viaszgyertyák használatához otthonodban és különleges eseményeken.' : 
                   'Discover creative ideas and inspiration for using Atomra natural wax candles in your home and at special events.'}
                </motion.p>
              </div>
            </div>
          </section>

          {/* Featured Idea Section */}
          <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="order-2 lg:order-1">
                  <h2 className="text-3xl font-light text-slate-900 mb-4">Creează Aranjamente Spectaculoase cu Granule Box</h2>
                  <p className="text-slate-600 font-light mb-6">
                    Granulele de ceară naturală Atomra îți oferă libertatea de a crea aranjamente unice și personalizate pentru orice ocazie. Cu <strong>Granule Box 750g</strong>, poți umple recipiente de diferite forme și dimensiuni pentru a obține efecte vizuale impresionante.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-lg mb-6 border-l-4 border-slate-900">
                    <p className="text-slate-700 font-light">
                      "Lumânările din ceară naturală Atomra au transformat complet atmosfera din casa noastră. Sistemul de granule este incredibil de versatil și ușor de utilizat." - Maria C., client Atomra
                    </p>
                  </div>
                  <Link 
                    to="/product/granule-box-750g" 
                    className="inline-flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded"
                  >
                    <span>Descoperă Granule Box</span>
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </Link>
                </div>
                <div className="order-1 lg:order-2">
                  <img 
                    src={getAssetPath('/photoshoot-image (11).webp')} 
                    alt="Granule Box - Ceară naturală pentru lumânări personalizate" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-16 sm:py-20 luxury-section-dark">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-6 text-center">
                  {language === 'ro' ? 'Inspirație pentru Decor cu Lumânări din Ceară Naturală' : 
                   language === 'hu' ? 'Dekorációs Inspiráció Természetes Viaszgyertyákkal' : 
                   'Natural Wax Candle Decor Inspiration'}
                </h2>
                <p className="text-slate-600 font-light text-center max-w-3xl mx-auto">
                  {language === 'ro' ? 'Lumânările din ceară naturală Atomra pot transforma orice spațiu într-un ambient elegant și primitor. Iată câteva idei pentru a te inspira în crearea propriilor aranjamente cu lumânări personalizate.' : 
                   language === 'hu' ? 'Az Atomra természetes viaszgyertyák bármilyen teret elegáns és barátságos környezetté alakíthatnak. Íme néhány ötlet az inspirációhoz a saját személyre szabott gyertyás elrendezéseid létrehozásához.' : 
                   'Atomra natural wax candles can transform any space into an elegant and welcoming ambiance. Here are some ideas to inspire you in creating your own arrangements with customized candles.'}
                </p>
              </motion.div>

              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    className="group"
                  >
                    <Link to={image.link} className="block">
                      <div className="luxury-card overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500">
                        <div className="relative aspect-square overflow-hidden">
                          <img 
                            src={image.src} 
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-6 text-white">
                              <h3 className="text-lg font-medium mb-1">{image.title}</h3>
                              <p className="text-sm font-light text-white/90 mb-3">{image.description}</p>
                              <span className="inline-flex items-center text-white/90 text-sm font-medium">
                                Vezi produsul
                                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Ideas Content Section */}
          <section className="py-16 sm:py-20 luxury-section-light">
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="luxury-card p-8 sm:p-12 rounded-lg"
              >
                <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-6 text-center">
                  {language === 'ro' ? 'Idei Creative pentru Lumânările Tale din Ceară Naturală' : 
                   language === 'hu' ? 'Kreatív Ötletek Természetes Viaszgyertyáidhoz' : 
                   'Creative Ideas for Your Natural Wax Candles'}
                </h2>

                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3">
                      <img 
                        src={getAssetPath('/CandleSand-6 copy.webp')} 
                        alt="Lumânări pentru acasă" 
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-light text-slate-900 mb-3">
                        {language === 'ro' ? 'Pentru Acasă' : 
                         language === 'hu' ? 'Otthonra' : 
                         'For Home'}
                      </h3>
                      <p className="text-slate-600 font-light mb-4">
                        {language === 'ro' ? 'Transformă-ți casa într-un sanctuar de relaxare cu ajutorul lumânărilor din ceară naturală Atomra. Plasează-le strategic în living pentru a crea o atmosferă caldă și primitoare, în dormitor pentru momente de liniște înainte de somn, sau în baie pentru o experiență spa autentică. Lumânările noastre din ceară de soia ard curat și uniform, oferind o experiență senzorială completă.' : 
                         language === 'hu' ? 'Változtasd otthonodat relaxációs menedékké Atomra természetes viaszgyertyák segítségével. Helyezd el őket stratégiailag a nappaliban, hogy meleg és barátságos hangulatot teremts, a hálószobában az alvás előtti nyugodt pillanatokhoz, vagy a fürdőszobában az autentikus spa élményhez. Szójaviasz gyertyáink tisztán és egyenletesen égnek, teljes érzékszervi élményt nyújtva.' : 
                         'Transform your home into a sanctuary of relaxation with Atomra natural wax candles. Place them strategically in the living room to create a warm and welcoming atmosphere, in the bedroom for moments of tranquility before sleep, or in the bathroom for an authentic spa experience. Our soy wax candles burn clean and evenly, providing a complete sensory experience.'}
                      </p>
                      <Link to="/product/granule-box-750g" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        Descoperă Granule Box
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-2/3 order-2 md:order-1">
                      <h3 className="text-xl font-light text-slate-900 mb-3">
                        {language === 'ro' ? 'Pentru Evenimente' : 
                         language === 'hu' ? 'Eseményekre' : 
                         'For Events'}
                      </h3>
                      <p className="text-slate-600 font-light mb-4">
                        {language === 'ro' ? 'Lumânările din ceară naturală Atomra sunt perfecte pentru a crea o atmosferă magică la nunți, aniversări sau cine festive. Folosește recipiente de înălțimi diferite pentru un aspect dinamic, combină lumânările personalizate cu elemente naturale precum flori sau crengi, sau creează aranjamente centrale impresionante pentru mesele invitaților. Ceara noastră de soia oferă o ardere de lungă durată, ideală pentru evenimente speciale.' : 
                         language === 'hu' ? 'Az Atomra természetes viaszgyertyák tökéletesek a varázslatos hangulat megteremtéséhez esküvőkön, évfordulókon vagy ünnepi vacsorákon. Használj különböző magasságú tartályokat a dinamikus megjelenésért, kombináld a személyre szabott gyertyákat természetes elemekkel, mint virágok vagy ágak, vagy hozz létre lenyűgöző központi elrendezéseket a vendégek asztalain. Szójaviaszunk hosszan tartó égést biztosít, amely ideális különleges eseményekhez.' : 
                         'Atomra natural wax candles are perfect for creating a magical atmosphere at weddings, anniversaries, or festive dinners. Use containers of different heights for a dynamic look, combine customized candles with natural elements such as flowers or branches, or create impressive centerpieces for guest tables. Our soy wax provides long-lasting burning, ideal for special events.'}
                      </p>
                      <Link to="/product/ceara-nisip-4-5kg-evenimente" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        Descoperă Ceara pentru Evenimente
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                    <div className="md:w-1/3 order-1 md:order-2">
                      <img 
                        src={getAssetPath('/7_a312f04c-8c83-41b7-835e-4097a635502f_1024x1024.webp')} 
                        alt="Lumânări pentru evenimente" 
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3">
                      <img 
                        src={getAssetPath('/Screenshot 2024-06-15 154827.webp')} 
                        alt="Lumânări personalizate" 
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-light text-slate-900 mb-3">
                        {language === 'ro' ? 'Personalizare' : 
                         language === 'hu' ? 'Testreszabás' : 
                         'Customization'}
                      </h3>
                      <p className="text-slate-600 font-light mb-4">
                        {language === 'ro' ? 'Sistemul nostru unic de granule de ceară îți permite să creezi lumânări personalizate complet adaptate preferințelor tale. Experimentează cu recipiente de diferite forme și mărimi, combină granule de culori diferite pentru efecte vizuale deosebite, sau adaugă elemente decorative precum flori uscate sau condimente pentru un aspect unic. Lumânările din ceară naturală Atomra sunt perfecte pentru a-ți exprima creativitatea și stilul personal.' : 
                         language === 'hu' ? 'Egyedi viaszgyöngy rendszerünk lehetővé teszi teljesen személyre szabott, preferenciáidhoz igazított gyertyák létrehozását. Kísérletezz különböző alakú és méretű tartályokkal, kombináld a különböző színű gyöngyöket különleges vizuális hatásokért, vagy adj hozzá dekoratív elemeket, mint szárított virágok vagy fűszerek az egyedi megjelenésért. Az Atomra természetes viaszgyertyák tökéletesek kreativitásod és személyes stílusod kifejezésére.' : 
                         'Our unique wax pearl system allows you to create customized candles completely tailored to your preferences. Experiment with containers of different shapes and sizes, combine pearls of different colors for special visual effects, or add decorative elements such as dried flowers or spices for a unique look. Atomra natural wax candles are perfect for expressing your creativity and personal style.'}
                      </p>
                      <Link to="/product/pachet-splendore-250g" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        Descoperă Pachetul Splendore
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-4 text-center">Produsul Nostru Recomandat</h3>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img 
                      src={getAssetPath('/photoshoot-image (11).webp')} 
                      alt="Granule Box 750g" 
                      className="w-40 h-40 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-2">Granule Box 750g</h4>
                      <p className="text-slate-600 mb-4">Ceară naturală pentru lumânări personalizate, suficientă pentru multiple aranjamente. Perfectă pentru decoruri de casă și evenimente speciale.</p>
                      <p className="text-slate-900 font-medium mb-4">98 Lei</p>
                      <Link 
                        to="/product/granule-box-750g" 
                        className="inline-flex items-center space-x-2 bg-slate-900 text-white px-6 py-2 font-medium text-sm uppercase hover:bg-slate-800 transition-colors duration-300 rounded"
                      >
                        <span>Cumpără acum</span>
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-6 text-center">Idei Creative cu Lumânări din Ceară Naturală</h2>
              
              <div className="prose prose-slate max-w-none">
                <p>
                  Lumânările din <strong>ceară naturală</strong> Atomra oferă o multitudine de posibilități pentru decorarea casei și a evenimentelor speciale. Spre deosebire de lumânările convenționale, <strong>lumânările noastre personalizate</strong> din <strong>ceară de soia</strong> sunt versatile, sustenabile și complet adaptabile stilului tău personal.
                </p>
                
                <h3>Decorațiuni pentru Casa Ta cu Lumânări din Ceară Naturală</h3>
                
                <p>
                  Transformă-ți locuința într-un spațiu primitor și relaxant cu ajutorul <strong>lumânărilor din ceară naturală</strong>:
                </p>
                
                <ul>
                  <li>Creează un aranjament central pentru masa din sufragerie folosind <strong>lumânări personalizate</strong> de înălțimi diferite</li>
                  <li>Plasează <strong>lumânări din ceară de soia</strong> în dormitor pentru o atmosferă romantică și relaxantă</li>
                  <li>Folosește <strong>lumânări din ceară naturală</strong> în baie pentru a crea o experiență spa autentică</li>
                  <li>Aranjează <strong>lumânări personalizate</strong> pe pervazul ferestrei pentru un aspect cald și primitor</li>
                  <li>Combină <strong>lumânări din ceară naturală</strong> cu plante și elemente naturale pentru un decor organic</li>
                </ul>
                
                <h3>Idei pentru Evenimente Speciale</h3>
                
                <p>
                  <strong>Lumânările din ceară naturală</strong> Atomra sunt perfecte pentru a crea atmosfera potrivită la orice eveniment special:
                </p>
                
                <ul>
                  <li>Nunți elegante cu aranjamente de <strong>lumânări personalizate</strong> pentru mese și altar</li>
                  <li>Aniversări memorabile cu <strong>lumânări din ceară de soia</strong> personalizate pentru sărbătorit</li>
                  <li>Cine festive cu <strong>lumânări din ceară naturală</strong> ca element central al decorului</li>
                  <li>Evenimente corporative sofisticate cu <strong>lumânări personalizate</strong> în culorile companiei</li>
                  <li>Ceremonii speciale iluminate de <strong>lumânări din ceară naturală</strong> pentru o atmosferă magică</li>
                </ul>
                
                <h3>Personalizare și Creativitate</h3>
                
                <p>
                  Sistemul nostru unic de granule de ceară îți permite să-ți exprimi creativitatea și să creezi <strong>lumânări personalizate</strong> unice:
                </p>
                
                <ul>
                  <li>Experimentează cu recipiente neconvenționale pentru <strong>lumânările din ceară naturală</strong></li>
                  <li>Combină diferite culori de granule pentru efecte vizuale deosebite</li>
                  <li>Adaugă elemente decorative precum flori uscate, condimente sau scoarță de citrice</li>
                  <li>Creează <strong>lumânări din ceară de soia</strong> tematice pentru sărbători și ocazii speciale</li>
                  <li>Personalizează <strong>lumânări din ceară naturală</strong> ca daruri unice și apreciate</li>
                </ul>
                
                <p>
                  Descoperă bucuria de a crea și de a te bucura de <strong>lumânări personalizate</strong> din <strong>ceară naturală</strong> Atomra. Posibilitățile sunt nelimitate, iar rezultatele sunt întotdeauna impresionante și eco-friendly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default IdeasPage;
