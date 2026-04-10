export const SITE_NAME = 'Atomra Home Romania';
export const SITE_URL = 'https://www.atomrahomeromania.ro';
export const CONTACT_EMAIL = 'atomrahomeromania@gmail.com';
export const CONTACT_PHONE = '+40751801025';
export const SOCIAL_LINKS = [
  'https://www.facebook.com/profile.php?id=61561996989234',
  'https://www.instagram.com/atomra_home_romania/',
  'https://instagram.com/atomra-home-romania',
  'https://tiktok.com/@atomra-home-romania',
];
export const BUSINESS_ADDRESS = {
  streetAddress: 'str. Mesteacanului, nr. 1B',
  addressLocality: 'Satu Mare',
  addressRegion: 'Satu Mare',
  addressCountry: 'RO',
};
export const BUSINESS_HOURS = ['Mo-Su 00:00-23:59'];

export const getSiteUrl = (path = '') => {
  if (!path) {
    return SITE_URL;
  }

  return new URL(path, `${SITE_URL}/`).href;
};
