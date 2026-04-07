import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/assetPath';
import { getSiteUrl } from '../utils/siteConfig';

const BlogPage = () => {
  const { language } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = useMemo(() => {
    const commonPosts = [
      { id: 1, image: getAssetPath('/photoshoot-image (11).webp'), productHref: '/product/granule-box-750g', productName: 'Granule Box 750g' },
      { id: 2, image: getAssetPath('/7_a312f04c-8c83-41b7-835e-4097a635502f_1024x1024.webp'), productHref: '/product/ceara-nisip-4-5kg-evenimente', productName: 'Ceară de nisip 4.5 kg' },
      { id: 3, image: getAssetPath('/accessories-category.webp'), productHref: '/product/pachet-essenza-150g', productName: 'Pachet Essenza 150g' }
    ];

    if (language === 'hu') {
      return {
        title: 'Blog | Atomra Home Romania',
        description: 'Inspiráció, tippek és hangulatötletek az Atomra világából.',
        heading: 'Blog',
        subtitle: 'Rövid, hasznos cikkek otthoni hangulatról és eseménydekoról.',
        readMore: 'Cikk megnyitása',
        back: 'Vissza',
        posts: [
          { ...commonPosts[0], title: 'Melegebb esti hangulat gyertyafénnyel', date: '2026. január 15.', excerpt: 'Így lesz nyugodtabb és kifinomultabb egy szoba néhány jól elhelyezett fényponttal.', body: ['Dolgozz több magassággal, hagyj levegőt a dekor körül, és a fény azonnal elegánsabbnak hat.', 'Az újratölthető rendszer abban segít, hogy könnyen tartsd fenn ugyanazt a hangulatot estéről estére.'] },
          { ...commonPosts[1], title: 'Esküvői dekor újratölthető gyertyákkal', date: '2025. december 28.', excerpt: 'Praktikus és látványos megoldások hosszú asztalokhoz és ünnepi terekhez.', body: ['A több kisebb fényforrás intimebb ritmust ad, mint néhány túl nagy kompozíció.', 'A tartók anyagát mindig a helyszínhez és a virágok világához érdemes igazítani.'] },
          { ...commonPosts[2], title: 'Lassabb esti rutin fényekkel', date: '2025. december 10.', excerpt: 'Egy egyszerű, valóban tartható self-care rutin alapjai.', body: ['Nem a bonyolultság számít, hanem az ismétlődés: tea, csend, egy gyertya.', 'Egy kis dedikált sarok sokkal könnyebbé teszi, hogy ez valóban szokássá váljon.'] }
        ]
      };
    }

    if (language === 'en') {
      return {
        title: 'Journal | Atomra Home Romania',
        description: 'Thoughtful ideas on atmosphere, styling and refillable candle rituals.',
        heading: 'Journal',
        subtitle: 'Short reads on home mood, event styling and slower routines.',
        readMore: 'Open article',
        back: 'Back',
        posts: [
          { ...commonPosts[0], title: 'Creating a warmer evening mood with candlelight', date: 'January 15, 2026', excerpt: 'A calmer, more refined room often starts with a few well-placed light sources.', body: ['Layering light at different heights adds depth and softness to a room.', 'Refillable wax makes it easier to keep that mood consistent without waste.'] },
          { ...commonPosts[1], title: 'Event styling with refillable candles', date: 'December 28, 2025', excerpt: 'Clean, practical ideas for wedding tables and elegant event decor.', body: ['Several smaller light sources usually create a more intimate rhythm than a few oversized statements.', 'Container choice matters just as much as candlelight itself when you want a cohesive setup.'] },
          { ...commonPosts[2], title: 'A slower evening ritual built around light', date: 'December 10, 2025', excerpt: 'A realistic self-care rhythm does not need to be complicated to work.', body: ['A candle, a blanket and a quiet corner can already shift the energy of the evening.', 'The value is in repetition: familiar gestures teach your mind when it is time to slow down.'] }
        ]
      };
    }

    return {
      title: 'Blog | Atomra Home Romania',
      description: 'Articole scurte despre atmosferă, decor și ritualuri mai lente cu lumânări refillabile.',
      heading: 'Blog',
      subtitle: 'Idei practice pentru acasă, evenimente și seri mai liniștite.',
      readMore: 'Deschide articolul',
      back: 'Înapoi',
      posts: [
        { ...commonPosts[0], title: 'Cum creezi o atmosferă mai caldă seara', date: '15 ianuarie 2026', excerpt: 'O cameră pare imediat mai calmă când lucrezi cu câteva puncte de lumină bine alese.', body: ['Joacă-te cu înălțimi diferite și lasă spațiu între obiecte pentru un rezultat mai elegant.', 'Sistemul refillabil te ajută să păstrezi aceeași atmosferă fără risipă și fără complicații.'] },
        { ...commonPosts[1], title: 'Decor de eveniment cu lumânări refillabile', date: '28 decembrie 2025', excerpt: 'Soluții curate și coerente pentru mese lungi, nunți și decoruri festive.', body: ['Mai multe surse mici de lumină creează un ritm mai intim decât câteva piese foarte mari.', 'Materialul și forma recipientului trebuie alese în acord cu locația și restul decorului.'] },
        { ...commonPosts[2], title: 'Un ritual de seară mai lent', date: '10 decembrie 2025', excerpt: 'Nu ai nevoie de o rutină complicată ca să închizi ziua într-un mod mai bun.', body: ['Un ceai, o pătură și o lumânare pot deveni un semnal clar că e timpul să încetinești.', 'Importantă este repetarea, nu perfecțiunea. Așa se construiește un obicei real.'] }
      ]
    };
  }, [language]);

  const post = content.posts.find((item) => item.id === selectedPost) ?? null;

  return (
    <>
      <SEOHead title={post ? `${post.title} | Atomra Home Romania` : content.title} description={post ? post.excerpt : content.description} url={post ? getSiteUrl(`/blog/${post.id}`) : getSiteUrl('/blog')} />
      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        <section className="py-8 luxury-section-light">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extralight text-slate-900 mb-4">{content.heading}</h1>
            <p className="text-lg text-slate-600 font-light max-w-3xl mx-auto">{content.subtitle}</p>
          </div>
        </section>
        <section className="py-16 luxury-section-dark">
          <div className="max-w-6xl mx-auto px-6">
            {post ? (
              <div className="max-w-4xl mx-auto luxury-card rounded-lg overflow-hidden">
                <button onClick={() => setSelectedPost(null)} type="button" className="px-6 pt-6 text-slate-700 hover:text-slate-900 font-light">{content.back}</button>
                <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover" />
                <div className="p-6 sm:p-8">
                  <div className="flex items-center text-sm text-slate-500 mb-4"><Calendar size={14} className="mr-1" />{post.date}</div>
                  <h2 className="text-3xl font-light text-slate-900 mb-4">{post.title}</h2>
                  <p className="text-lg text-slate-600 font-light mb-6">{post.excerpt}</p>
                  <div className="space-y-4 text-slate-600 font-light leading-relaxed">
                    {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  <Link to={post.productHref} className="inline-flex items-center mt-8 text-slate-900 hover:text-slate-700 font-medium">
                    {post.productName}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {content.posts.map((item, index) => (
                  <motion.article key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }} className="luxury-card rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full aspect-[4/3] object-cover" />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-slate-500 mb-3"><Calendar size={14} className="mr-1" />{item.date}</div>
                      <h2 className="text-2xl font-light text-slate-900 mb-3">{item.title}</h2>
                      <p className="text-slate-600 font-light mb-5">{item.excerpt}</p>
                      <button onClick={() => setSelectedPost(item.id)} type="button" className="inline-flex items-center text-slate-900 hover:text-slate-700 font-medium">
                        {content.readMore}
                        <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
