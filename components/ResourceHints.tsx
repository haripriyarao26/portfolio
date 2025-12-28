'use client';

import { useEffect } from 'react';

/**
 * Component that adds resource hints and preload links for better performance
 * This runs client-side to add preconnect, dns-prefetch, and preload links
 */
export default function ResourceHints() {
  useEffect(() => {
    // Add preconnect for external image sources
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://vxisxudnyfyksbaktshp.supabase.co';
    document.head.appendChild(preconnect);

    // Add dns-prefetch
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://vxisxudnyfyksbaktshp.supabase.co';
    document.head.appendChild(dnsPrefetch);

    // Preload critical first image
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = 'https://vxisxudnyfyksbaktshp.supabase.co/storage/v1/object/public/portfolio/moodbite/image.png';
    preload.setAttribute('fetchPriority', 'high');
    document.head.appendChild(preload);

    return () => {
      // Cleanup (though these are typically fine to leave)
      document.head.removeChild(preconnect);
      document.head.removeChild(dnsPrefetch);
      document.head.removeChild(preload);
    };
  }, []);

  return null;
}
