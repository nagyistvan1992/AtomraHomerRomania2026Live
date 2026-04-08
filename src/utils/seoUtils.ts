import { getAssetPath } from './assetPath';
import {
  BUSINESS_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from './siteConfig';

interface StructuredData {
  [key: string]: unknown;
}

interface ProductSeoData {
  id?: string;
  slug?: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  in_stock: boolean;
  rating: number;
  reviews: number;
  url?: string;
  category?: string;
  currency?: string;
  tags?: string[];
}

const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

const toAbsoluteUrl = (path: string) => {
  if (!path) {
    return path;
  }

  const resolvedPath = getAssetPath(path);

  if (ABSOLUTE_URL_PATTERN.test(resolvedPath)) {
    return resolvedPath;
  }

  return new URL(resolvedPath.replace(/^\//, ''), `${SITE_URL}/`).href;
};

export const generateStructuredData = (type: string, data: StructuredData) => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  });
};

export const generateProductStructuredData = (product: ProductSeoData) => {
  const productUrl = product.url || getAssetPath(`/product/${product.slug ?? product.id ?? ''}`);
  const absoluteProductUrl = ABSOLUTE_URL_PATTERN.test(productUrl)
    ? productUrl
    : new URL(productUrl.replace(/^\//, ''), `${SITE_URL}/`).href;
  const images = product.images.map(toAbsoluteUrl).filter(Boolean);
  const keywords = [
    'lumanare ceara naturala',
    'ceara de soia',
    'lumanari ceara naturala',
    'lumanare personalizata',
    'lumanari din ceara naturala',
    ...(product.tags ?? []),
    product.category ?? '',
    product.name,
  ]
    .filter(Boolean)
    .join(', ');

  const structuredProduct: StructuredData = {
    name: product.name,
    description: product.description,
    image: images,
    url: absoluteProductUrl,
    sku: product.id || product.slug || product.name,
    mpn: product.slug || product.id || product.name,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: absoluteProductUrl,
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: product.price,
        priceCurrency: product.currency || 'RON',
      },
      price: product.price,
      priceCurrency: product.currency || 'RON',
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    keywords,
  };

  if (product.reviews > 0 && product.rating > 0) {
    structuredProduct.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    };
  }

  return generateStructuredData('Product', structuredProduct);
};

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  });
};

export const generateFAQStructuredData = (items: Array<{ question: string; answer: string }>) => {
  return generateStructuredData('FAQPage', {
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });
};

export const generateOrganizationStructuredData = () => {
  return generateStructuredData('Organization', {
    name: SITE_NAME,
    description: 'Lumânări reîncărcabile din ceară naturală pentru casă, cadouri și evenimente.',
    url: SITE_URL,
    logo: `${SITE_URL}/AtomraICON%20WHITE%20TRANSP.png`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      contactType: 'customer service',
      availableLanguage: ['Romanian', 'Hungarian', 'English'],
      areaServed: 'RO',
    },
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_ADDRESS,
    },
    sameAs: SOCIAL_LINKS,
  });
};

export const generateWebsiteStructuredData = () => {
  return generateStructuredData('WebSite', {
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['ro-RO', 'hu-HU', 'en'],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  });
};

export const generateOnlineStoreStructuredData = () => {
  return generateStructuredData('OnlineStore', {
    name: SITE_NAME,
    description: 'Magazin online de lumânări refillabile și decor premium din ceară naturală.',
    url: SITE_URL,
    image: `${SITE_URL}/photoshoot-image%20(11).webp`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    currenciesAccepted: 'RON',
    paymentAccepted: 'Cash, Card',
    areaServed: 'RO',
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_ADDRESS,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      contactType: 'customer service',
      availableLanguage: ['Romanian', 'Hungarian', 'English'],
      areaServed: 'RO',
    },
    sameAs: SOCIAL_LINKS,
  });
};

export const generateContactPageStructuredData = (url: string) => {
  return generateStructuredData('ContactPage', {
    name: `Contact ${SITE_NAME}`,
    url,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      address: {
        '@type': 'PostalAddress',
        ...BUSINESS_ADDRESS,
      },
      sameAs: SOCIAL_LINKS,
    },
  });
};

export const preloadCriticalResources = () => {
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans:wght@300;400;500;600&display=swap';
  fontLink.as = 'style';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  const heroImage = new Image();
  heroImage.src = getAssetPath('/81vj9gjxRBL._AC_SL1500_.jpg');

  const logoImage = new Image();
  logoImage.src = getAssetPath('/AtomraICON WHITE TRANSP.png');
};

export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (index > 2) {
      img.loading = 'lazy';
    }

    if (!img.alt || img.alt === '') {
      img.alt = 'Lumânare din ceară naturală Atomra';
    } else if (!img.alt.includes('ceară naturală') && !img.alt.includes('ceara naturala')) {
      img.alt = `${img.alt} - Lumânare din ceară naturală`;
    }
  });
};

export const addCriticalCSS = () => {
  const criticalCSS = `
    body {
      margin: 0;
      font-family: "Noto Sans", Inter, system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: #1e293b;
    }
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6));
    }
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      backdrop-filter: blur(20px);
      background: rgba(255,255,255,0.9);
    }
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #e2e8f0;
      border-top: 3px solid #1e293b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};
