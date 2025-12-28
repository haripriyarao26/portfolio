/**
 * Image caching utility
 * Helps manage image preloading and caching strategies
 */

const imageCache = new Map<string, Promise<void>>();

/**
 * Preload an image and cache it
 */
export function preloadImage(src: string): Promise<void> {
  if (imageCache.has(src)) {
    return imageCache.get(src)!;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });

  imageCache.set(src, promise);
  return promise;
}

/**
 * Preload multiple images
 */
export async function preloadImages(srcs: string[]): Promise<void> {
  await Promise.allSettled(srcs.map(preloadImage));
}

/**
 * Check if an image is already cached
 */
export function isImageCached(src: string): boolean {
  return imageCache.has(src);
}
