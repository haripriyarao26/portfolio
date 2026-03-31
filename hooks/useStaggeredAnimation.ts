import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Staggered reveal via IntersectionObserver. Pass itemCount (e.g. projects.length)
 * so observers reattach when the list changes. Uses a generous bottom rootMargin and
 * a one-frame viewport check so cards below the fold still become visible reliably.
 */
export function useStaggeredAnimation(_delay: number = 100, itemCount?: number) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const nodes = itemRefs.current.filter((el): el is HTMLDivElement => el != null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = itemRefs.current.findIndex((item) => item === entry.target);
          if (index !== -1) {
            setVisibleItems((prev) => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 180px 0px',
      }
    );

    nodes.forEach((node) => observer.observe(node));

    const markVisibleInViewport = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          setVisibleItems((prev) => {
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        }
      });
    };

    const raf = requestAnimationFrame(markVisibleInViewport);

    return () => {
      cancelAnimationFrame(raf);
      nodes.forEach((node) => observer.unobserve(node));
    };
  }, [itemCount]);

  const getItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemRefs.current[index] = el;
  };

  const isVisible = (index: number) => visibleItems.has(index);

  return { getItemRef, isVisible };
}
