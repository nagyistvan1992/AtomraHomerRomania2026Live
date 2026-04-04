const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

export const getAssetPath = (path: string) => {
  if (!path) {
    return path;
  }

  if (ABSOLUTE_URL_PATTERN.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};

export const getAbsoluteAssetUrl = (path: string) => {
  const resolvedPath = getAssetPath(path);

  if (!resolvedPath || ABSOLUTE_URL_PATTERN.test(resolvedPath) || typeof window === 'undefined') {
    return resolvedPath;
  }

  return new URL(resolvedPath, window.location.origin).href;
};
