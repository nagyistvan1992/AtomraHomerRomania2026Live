import { getAssetPath } from './assetPath';
import { SITE_NAME, SITE_URL } from './siteConfig';

interface StructuredData {
  [key: string]: unknown;
}

interface ProductSeoData {
  name: string;
  description: string;
  images: string[];
  price: number;
  in_stock: boolean;
  rating: number;
  reviews: number;
}

export const generateStructuredData = (type: string, data: StructuredData) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return JSON.stringify(baseData);
};

export const generateProductStructuredData = (product: ProductSeoData) => {
  return generateStructuredData('Product', {
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'RON',
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    keywords:
      'lumanare ceara naturala, ceara de soia, lumanari ceara naturala, lumanare personalizata, lumanari din ceara naturala',
  });
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

export const generateOrganizationStructuredData = () => {
  return generateStructuredData('Organization', {
    name: SITE_NAME,
    description: 'Lumânări reîncărcabile din ceară naturală de soia. Curate, ecologice, personalizabile.',
    url: SITE_URL,
    logo: `${SITE_URL}/AtomraICON%20WHITE%20TRANSP.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+40-123-456-789',
      contactType: 'customer service',
      availableLanguage: ['Romanian', 'Hungarian', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RO',
    },
    sameAs: ['https://instagram.com/atomra-home-romania', 'https://tiktok.com/@atomra-home-romania'],
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
      img.alt = 'Lumânare din ceară naturală Atomra - ceară de soia pentru lumânări personalizate';
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
