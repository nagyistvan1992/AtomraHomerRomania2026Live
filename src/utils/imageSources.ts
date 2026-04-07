import { getAssetPath } from './assetPath';

const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;
const IMAGE_DATA_URI_PATTERN = /^data:image\//i;
const PLACEHOLDER_IMAGE = getAssetPath('/placeholder-image.jpg');
const BROKEN_IMAGE_REPLACEMENTS: Record<string, string> = {
  '/abc3462f-4169-41e2-bec4-63572c2990a5.webp': '/20241027_114350 copy.webp',
  '/20241027_114350.webp': '/20241027_114350 copy.webp',
  '/20241027_114455.webp': '/20241027_114455 copy.webp',
  '/20241027_114631.webp': '/20241027_114631 copy.webp',
  '/Untitled (8).webp': '/Untitled (8) copy.webp',
  '/20241027_114934.webp': '/20241027_114934 copy.webp',
  '/20241027_115048.webp': '/20241027_115048 copy.webp',
  '/20241027_115201.webp': '/20241027_115201 copy.webp'
};

const getResolvedPathAlias = (value: string) => {
  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return BROKEN_IMAGE_REPLACEMENTS[normalizedPath] || normalizedPath;
};

export const normalizeImageSource = (value?: string | null) => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (trimmedValue.startsWith('data:')) {
    return IMAGE_DATA_URI_PATTERN.test(trimmedValue) ? trimmedValue : null;
  }

  if (ABSOLUTE_URL_PATTERN.test(trimmedValue) || trimmedValue.startsWith('blob:')) {
    return trimmedValue;
  }

  return getAssetPath(getResolvedPathAlias(trimmedValue));
};

export const getResolvedImageList = (images?: Array<string | null> | string | null) => {
  const inputList = Array.isArray(images) ? images : images ? [images] : [];
  const normalizedList = inputList
    .map((image) => normalizeImageSource(image))
    .filter((image): image is string => Boolean(image));

  return Array.from(new Set(normalizedList));
};

export const getPreferredImage = (images?: Array<string | null> | string | null, fallback = PLACEHOLDER_IMAGE) => {
  const normalizedImages = getResolvedImageList(images);

  if (normalizedImages.length === 0) {
    return fallback;
  }

  const nonInlineImage = normalizedImages.find((image) => !image.startsWith('data:image/'));
  return nonInlineImage || normalizedImages[0] || fallback;
};

export const getPlaceholderImage = () => PLACEHOLDER_IMAGE;
