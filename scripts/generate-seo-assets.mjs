import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

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
    accessories: 'lumanari perlate si refill-uri',
  };
  const valueStatements = {
    'home-collection': 'Potrivit pentru casa, cadouri si decor premium.',
    'events-collection': 'Ideal pentru nunti, mese festive si decor de eveniment.',
    accessories: 'Accesoriu util pentru lumanari perlate, refill si utilizare usoara.',
  };

  const categoryText = categoryLabels[product.category_slug] ?? 'decor premium';
  const valueStatement = valueStatements[product.category_slug] ?? 'Disponibil pentru decor premium si utilizare eleganta.';

  return compactText(
    [
      `${compactText(product.name)} de la Atomra Home Romania.`,
      `Produs din categoria ${categoryText}.`,
      valueStatement,
      'Disponibil online cu livrare in Romania.',
    ]
      .filter(Boolean)
      .join(' ')
  );
};

const formatPrice = (price) => `${Number(price).toFixed(2)} RON`;

const googleProductCategoryMap = {
  'home-collection': 'Home & Garden > Decor > Candles',
  'events-collection': 'Home & Garden > Decor > Candles',
  accessories: 'Home & Garden > Decor > Candles > Candle Making Kits',
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

const { catalogCategories, catalogProducts } = await loadTypeScriptModule('src/data/catalog.ts');
const { SITE_NAME, SITE_URL } = await loadTypeScriptModule('src/utils/siteConfig.ts');
const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0', lastmod: today },
  { path: '/toate-produsele', changefreq: 'weekly', priority: '0.95', lastmod: today },
  { path: '/why-atomra', changefreq: 'monthly', priority: '0.82', lastmod: today },
  { path: '/lumanari-refillabile', changefreq: 'weekly', priority: '0.92', lastmod: today },
  { path: '/ceara-de-nisip', changefreq: 'weekly', priority: '0.92', lastmod: today },
  { path: '/lumanari-pentru-evenimente', changefreq: 'weekly', priority: '0.92', lastmod: today },
  { path: '/lumanari-ceara-naturala', changefreq: 'weekly', priority: '0.9', lastmod: today },
  { path: '/cadouri-lumanari-premium', changefreq: 'weekly', priority: '0.88', lastmod: today },
  { path: '/lumanari-handmade', changefreq: 'weekly', priority: '0.88', lastmod: today },
  { path: '/ghid/cum-functioneaza-lumanarile-refillabile', changefreq: 'monthly', priority: '0.78', lastmod: today },
  { path: '/comparatie/lumanari-refillabile-vs-clasice', changefreq: 'monthly', priority: '0.8', lastmod: today },
  { path: '/comparatie/ceara-de-soia-vs-ceara-de-nisip', changefreq: 'monthly', priority: '0.8', lastmod: today },
  { path: '/comparatie/decor-eveniment-cu-lumanari-refillabile', changefreq: 'monthly', priority: '0.8', lastmod: today },
  { path: '/blog', changefreq: 'weekly', priority: '0.8', lastmod: today },
  { path: '/ideas', changefreq: 'weekly', priority: '0.8', lastmod: today },
  { path: '/about', changefreq: 'monthly', priority: '0.74', lastmod: today },
  { path: '/contact', changefreq: 'monthly', priority: '0.76', lastmod: today },
  { path: '/wholesale', changefreq: 'monthly', priority: '0.72', lastmod: today },
  { path: '/instructions', changefreq: 'monthly', priority: '0.7', lastmod: today },
  { path: '/scents', changefreq: 'monthly', priority: '0.68', lastmod: today },
  { path: '/plant-based', changefreq: 'monthly', priority: '0.68', lastmod: today },
  { path: '/refillable', changefreq: 'monthly', priority: '0.68', lastmod: today },
  { path: '/how-much', changefreq: 'monthly', priority: '0.68', lastmod: today },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3', lastmod: today },
  { path: '/refund-policy', changefreq: 'yearly', priority: '0.32', lastmod: today },
  { path: '/terms', changefreq: 'yearly', priority: '0.3', lastmod: today },
];

const categorySlugMap = {
  accessories: '/accesorii',
};

const categoryRoutes = catalogCategories.map((category) => ({
  path: categorySlugMap[category.slug] ?? `/${category.slug}`,
  changefreq: 'weekly',
  priority: category.slug === 'accessories' ? '0.85' : '0.9',
  lastmod: String(category.updated_at || today).slice(0, 10),
}));

const productRoutes = catalogProducts
  .filter((product) => product.in_stock)
  .map((product) => ({
    path: `/product/${product.slug}`,
    changefreq: 'weekly',
    priority: product.category_slug === 'accessories' ? '0.76' : '0.88',
    lastmod: String(product.updated_at || product.created_at || today).slice(0, 10),
  }));

const routeMap = new Map();
for (const route of [...staticRoutes, ...categoryRoutes, ...productRoutes]) {
  routeMap.set(route.path, route);
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...routeMap.values()]
  .sort((a, b) => a.path.localeCompare(b.path))
  .map(
    (route) => `  <url>
    <loc>${escapeXml(new URL(route.path.replace(/^\//, ''), `${SITE_URL}/`).href)}</loc>
    <lastmod>${escapeXml(route.lastmod)}</lastmod>
    <changefreq>${escapeXml(route.changefreq)}</changefreq>
    <priority>${escapeXml(route.priority)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const merchantFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml('Catalogul de produse Atomra Home Romania pentru Google Merchant Center')}</description>
${catalogProducts
  .filter((product) => product.in_stock)
  .map((product) => {
    const link = toAbsoluteUrl(SITE_URL, `/product/${product.slug}`);
    const images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
    const primaryImage = toAbsoluteUrl(SITE_URL, images[0] || '/placeholder-image.jpg');
    const additionalImages = images.slice(1, 10).map((image) => toAbsoluteUrl(SITE_URL, image));
    const productType = [...new Set([product.category, ...product.tags].filter(Boolean))].join(' > ');
    const googleProductCategory =
      googleProductCategoryMap[product.category_slug] ?? 'Home & Garden > Decor > Candles';

    return `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <title>${escapeXml(compactText(product.name))}</title>
      <description>${escapeXml(toMerchantDescription(product))}</description>
      <link>${escapeXml(link)}</link>
      <g:image_link>${escapeXml(primaryImage)}</g:image_link>
${additionalImages.map((image) => `      <g:additional_image_link>${escapeXml(image)}</g:additional_image_link>`).join('\n')}
      <g:condition>new</g:condition>
      <g:availability>${product.in_stock ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${escapeXml(formatPrice(product.price))}</g:price>
      <g:brand>${escapeXml(SITE_NAME)}</g:brand>
      <g:mpn>${escapeXml(product.slug || product.id)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${escapeXml(googleProductCategory)}</g:google_product_category>
      <g:product_type>${escapeXml(productType)}</g:product_type>
      <g:custom_label_0>${escapeXml(product.category_slug)}</g:custom_label_0>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>
`;

await writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
await writeFile(path.join(publicDir, 'google-merchant-feed.xml'), merchantFeedXml, 'utf8');

console.log(`Generated sitemap.xml with ${routeMap.size} canonical routes.`);
console.log(
  `Generated google-merchant-feed.xml with ${catalogProducts.filter((product) => product.in_stock).length} products.`
);
