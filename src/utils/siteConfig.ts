export const SITE_NAME = 'Atomra Home Romania';
export const SITE_URL = 'https://atomrahomeromania.ro';
export const CONTACT_EMAIL = 'atomrahomeromania@gmail.com';

export const getSiteUrl = (path = '') => {
  if (!path) {
    return SITE_URL;
  }

  return new URL(path, `${SITE_URL}/`).href;
};
