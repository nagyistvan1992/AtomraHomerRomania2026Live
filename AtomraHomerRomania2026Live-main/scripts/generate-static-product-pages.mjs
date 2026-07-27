import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const compactText = (value) =>
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();

const toAbsoluteUrl = (siteUrl, resourcePath) => {
  if (!resourcePath) {
    return siteUrl;
  }

  if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(resourcePath)) {
    return resourcePath;
  }

  return new URL(resourcePath.replace(/^\//, ''), `${siteUrl}/`).href;
};

const toMerchantDescription = (product) => {
  const categoryLabels = {
    'home-collection': 'casa si decor elegant',
    'events-collection': 'nunti si evenimente speciale',
    accessories: 'lumanari perlate si accesorii utile',
  };

  const categoryText = categoryLabels[product.category_slug] ?? 'decor premium';
  return compactText(
    [
      `${compactText(product.name)} de la Atomra Home Romania.`,
      `Produs din categoria ${categoryText}.`,
      `Pret: ${Number(product.price).toFixed(0)} RON.`,
      product.in_stock ? 'Disponibil online cu livrare in Romania.' : 'Momentan indisponibil online.',
    ].join(' '),
  );
};

const loadTypeScriptModule = async (relativePath) => {
  const absolutePath = path.join(projectRoot, relativePath);
  const source = await readFile(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: absolutePath,
  });

  const encoded = Buffer.from(transpiled.outputText, 'utf8').toString('base64');
  return import(`data:text/javascript;base64,${encoded}`);
};

const { catalogProducts } = await loadTypeScriptModule('src/data/catalog.ts');
const { SITE_NAME, SITE_URL } = await loadTypeScriptModule('src/utils/siteConfig.ts');

const baseIndexHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');

const createProductStructuredData = (product, description, productUrl, imageUrl) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    image: (product.images || []).map((image) => toAbsoluteUrl(SITE_URL, image)),
    url: productUrl,
    sku: product.id,
    mpn: product.slug,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      price: product.price,
      priceCurrency: 'RON',
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      image: imageUrl,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    ...(product.reviews > 0 && product.rating > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviews,
          },
        }
      : {}),
  });

for (const product of catalogProducts.filter((entry) => entry.in_stock)) {
  const productPath = `/product/${product.slug}`;
  const productUrl = new URL(productPath.replace(/^\//, ''), `${SITE_URL}/`).href;
  const imageUrl = toAbsoluteUrl(SITE_URL, product.images?.[0] || '/placeholder-image.jpg');
  const description = toMerchantDescription(product);
  const title = `${compactText(product.name)} | ${SITE_NAME}`;
  const structuredData = createProductStructuredData(product, description, productUrl, imageUrl);

  let productHtml = baseIndexHtml;

  productHtml = productHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  productHtml = productHtml.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  productHtml = productHtml.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );
  productHtml = productHtml.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );
  productHtml = productHtml.replace(
    /<meta property="og:image" content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
  );
  productHtml = productHtml.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(productUrl)}" />`,
  );
  productHtml = productHtml.replace(
    /<meta property="og:type" content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="product" />`,
  );
  productHtml = productHtml.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  );
  productHtml = productHtml.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  );
  productHtml = productHtml.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
  );
  productHtml = productHtml.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(productUrl)}" />`,
  );
  productHtml = productHtml.replace(
    /<link rel="alternate" hrefLang="ro" href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hrefLang="ro" href="${escapeHtml(productUrl)}" />`,
  );
  productHtml = productHtml.replace(
    /<link rel="alternate" hrefLang="x-default" href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hrefLang="x-default" href="${escapeHtml(productUrl)}" />`,
  );
  productHtml = productHtml.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${structuredData}</script>`,
  );

  const targetDir = path.join(distDir, 'product', product.slug);
  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, 'index.html'), productHtml, 'utf8');
}

console.log(
  `Generated static product entry pages for ${catalogProducts.filter((entry) => entry.in_stock).length} products.`,
);
