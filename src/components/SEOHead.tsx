import React, { useEffect } from 'react';
import { getAbsoluteAssetUrl, getAssetPath } from '../utils/assetPath';
import { SITE_NAME, SITE_URL } from '../utils/siteConfig';

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

const DEFAULT_TITLE = 'Atomra Home Romania | LumÃ¢nÄƒri din CearÄƒ NaturalÄƒ ReÃ®ncÄƒrcabile';
const DEFAULT_DESCRIPTION = 'DescoperÄƒ lumÃ¢nÄƒrile reÃ®ncÄƒrcabile din cearÄƒ naturalÄƒ Atomra. LumÃ¢nÄƒri personalizate, ecologice È™i sustenabile din cearÄƒ de soia. Umple. Aprinde. ReÃ®mprospÄƒteazÄƒ.';
const DEFAULT_KEYWORDS = 'lumanare ceara naturala, ceara de soia, lumanari ceara naturala, lumanare personalizata, lumanari din ceara naturala, lumÃ¢nÄƒri reÃ®ncÄƒrcabile, lumÃ¢nÄƒri sustenabile, RomÃ¢nia';
const HEAD_MARKER = 'data-atomra-seo';

const buildDefaultStructuredData = (description: string, url: string, image: string) => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description,
  url,
  logo: `${SITE_URL}/AtomraICON%20WHITE%20TRANSP.png`,
  image,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'RO'
  },
  sameAs: [
    'https://instagram.com/atomra-home-romania',
    'https://tiktok.com/@atomra-home-romania'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'LumÃ¢nÄƒri ReÃ®ncÄƒrcabile',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'LumÃ¢nÄƒri Perlate ReÃ®ncÄƒrcabile',
          description: 'LumÃ¢nÄƒri ecologice reÃ®ncÄƒrcabile din cearÄƒ naturalÄƒ de soia'
        }
      }
    ]
  }
});

const SEOHead: React.FC<SEOHeadProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = `${SITE_URL}/photoshoot-image%20(11).webp`,
  url = SITE_URL,
  type = 'website',
  structuredData,
  canonical,
  noindex = false,
  preloadImages = []
}) => {
  const resolvedImage = getAbsoluteAssetUrl(image);
  const resolvedCanonical = canonical || url;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const createdNodes: HTMLElement[] = [];

    const createManagedElement = <T extends HTMLElement>(tagName: string) => {
      const element = document.createElement(tagName) as T;
      element.setAttribute(HEAD_MARKER, 'true');
      document.head.appendChild(element);
      createdNodes.push(element);
      return element;
    };

    const addMeta = (attribute: 'name' | 'property' | 'http-equiv', key: string, content: string) => {
      const meta = createManagedElement<HTMLMetaElement>('meta');
      meta.setAttribute(attribute, key);
      meta.content = content;
    };

    const addLink = (rel: string, href: string, extraAttributes?: Record<string, string>) => {
      const link = createManagedElement<HTMLLinkElement>('link');
      link.rel = rel;
      link.href = href;

      if (extraAttributes) {
        Object.entries(extraAttributes).forEach(([key, value]) => {
          link.setAttribute(key, value);
        });
      }
    };

    addMeta('name', 'description', description);
    addMeta('name', 'keywords', keywords);
    addMeta('name', 'author', SITE_NAME);
    addMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    addMeta('name', 'viewport', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    addMeta('http-equiv', 'x-dns-prefetch-control', 'on');
    addMeta('http-equiv', 'content-language', 'ro');
    addMeta('name', 'language', 'Romanian');
    addMeta('name', 'theme-color', '#1f2937');
    addMeta('name', 'msapplication-TileColor', '#1f2937');
    addMeta('name', 'apple-mobile-web-app-capable', 'yes');
    addMeta('name', 'apple-mobile-web-app-status-bar-style', 'default');
    addMeta('name', 'apple-mobile-web-app-title', 'Atomra');

    addMeta('property', 'og:title', title);
    addMeta('property', 'og:description', description);
    addMeta('property', 'og:image', resolvedImage);
    addMeta('property', 'og:image:width', '1200');
    addMeta('property', 'og:image:height', '630');
    addMeta('property', 'og:image:alt', title);
    addMeta('property', 'og:url', url);
    addMeta('property', 'og:type', type);
    addMeta('property', 'og:site_name', SITE_NAME);
    addMeta('property', 'og:locale', 'ro_RO');

    addMeta('name', 'twitter:card', 'summary_large_image');
    addMeta('name', 'twitter:title', title);
    addMeta('name', 'twitter:description', description);
    addMeta('name', 'twitter:image', resolvedImage);
    addMeta('name', 'twitter:image:alt', title);
    addMeta('name', 'twitter:site', '@atomra_romania');
    addMeta('name', 'twitter:creator', '@atomra_romania');

    addLink('dns-prefetch', '//api.stripe.com');
    addLink('canonical', resolvedCanonical);
    addLink('alternate', url, { hreflang: 'ro' });
    addLink('alternate', url, { hreflang: 'x-default' });

    preloadImages.forEach((imgSrc) => {
      addLink('preload', getAssetPath(imgSrc), { as: 'image' });
    });

    const script = createManagedElement<HTMLScriptElement>('script');
    script.type = 'application/ld+json';
    script.text = structuredData || buildDefaultStructuredData(description, url, resolvedImage);

    return () => {
      createdNodes.forEach((node) => node.remove());
      document.title = previousTitle;
    };
  }, [canonical, description, keywords, noindex, preloadImages, resolvedCanonical, resolvedImage, structuredData, title, type, url]);

  return null;
};

export default SEOHead;
