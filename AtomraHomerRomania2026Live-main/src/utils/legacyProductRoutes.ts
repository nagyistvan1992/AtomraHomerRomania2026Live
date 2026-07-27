const legacyProductSlugMap: Record<string, string> = {
  'ceara-de-nisip-4-5-kg-60-fitile-lumanare-perlata-idei-decor-eveniment': 'ceara-nisip-4-5kg-evenimente',
  'ceara-de-nisip-4-5kg-60fitile-cadou-lumanare-perlata-idei-decor-eveniment': 'ceara-nisip-4-5kg-evenimente',
  'lumanare-perlata-pachet-essenza-150g-3fitile-pahar-decorativ-lumanare': 'pachet-essenza-150g',
  'pachet-essenza-150g-3fitile-pahar-decorativ-lumanare': 'pachet-essenza-150g',
  'lumanare-perlata-pachet-splendore-250g-5fitile-pahar-decorativ-lumanare': 'pachet-splendore-250g',
  'pachet-splendore-250g-5fitile-pahar-decorativ-lumanare': 'pachet-splendore-250g',
  'ceara-de-nisip-granule-box-750g-10-fitile-lumanare-perlata-cadou-decor': 'granule-box-750g',
  'ceara-de-nisip-granule-box-750g-10-fitile-lumanare-perlata-decor': 'granule-box-750g',
};

export const resolveLegacyProductSlug = (legacySlug?: string) => {
  if (!legacySlug) {
    return null;
  }

  const normalized = legacySlug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');

  return legacyProductSlugMap[normalized] || normalized;
};
