import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: string;
  canonical?: string;
  noindex?: boolean;
  preloadImages?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Atomra Home Romania | Lumânări din Ceară Naturală Reîncărcabile',
  description = 'Descoperă lumânările reîncărcabile din ceară naturală Atomra. Lumânări personalizate, ecologice și sustenabile din ceară de soia. Umple. Aprinde. Reîmprospătează.',
  keywords = 'lumanare ceara naturala, ceara de soia, lumanari ceara naturala, lumanare personalizata, lumanari din ceara naturala, lumânări reîncărcabile, lumânări sustenabile, România',
  image = 'https://atomra-home-romania.com/photoshoot-image%20(11).webp',
  url = 'https://atomra-home-romania.com',
  type = 'website',
  structuredData,
  canonical,
  noindex = false,
  preloadImages = []
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Atomra Home Romania" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      
      {/* Performance hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="//images.pexels.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//api.stripe.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
      
      {/* Critical resource preloads */}
      <link rel="preload" href="/AtomraICON%20WHITE%20TRANSP.png" as="image" type="image/png" />
      <link rel="preload" href="/81vj9gjxRBL._AC_SL1500_.jpg" as="image" type="image/jpeg" />
      
      {/* Additional image preloads */}
      {preloadImages.map((imgSrc, index) => (
        <link key={index} rel="preload" href={imgSrc} as="image" />
      ))}
      
      {/* Language and locale */}
      <meta httpEquiv="content-language" content="ro" />
      <meta name="language" content="Romanian" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Atomra Home Romania" />
      <meta property="og:locale" content="ro_RO" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@atomra_romania" />
      <meta name="twitter:creator" content="@atomra_romania" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1f2937" />
      <meta name="msapplication-TileColor" content="#1f2937" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Atomra" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || url} />
      
      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="ro" href={url} />
      <link rel="alternate" hrefLang="hu" href={url.replace('atomra-home-romania.com', 'atomra-home-romania.com/hu')} />
      <link rel="alternate" hrefLang="en" href={url.replace('atomra-home-romania.com', 'atomra-home-romania.com/en')} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {structuredData}
        </script>
      )}
      
      {/* Default Organization Structured Data */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Atomra Home Romania",
            "description": description,
            "url": url,
            "logo": "https://atomra-home-romania.com/AtomraICON%20WHITE%20TRANSP.png",
            "image": image,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "RO"
            },
            "sameAs": [
              "https://instagram.com/atomra-home-romania",
              "https://tiktok.com/@atomra-home-romania"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Lumânări Reîncărcabile",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Lumânări Perlate Reîncărcabile",
                    "description": "Lumânări ecologice reîncărcabile din ceară naturală de soia"
                  }
                }
              ]
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;