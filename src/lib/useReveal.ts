import { useEffect, useRef, useState } from 'react';

/**
 * Adds the `is-visible` class to elements with the `reveal` class as they
 * scroll into view. Returns a ref to attach to the container being watched.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = ref.current ?? document;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    const targets = (root === document ? document : root).querySelectorAll('.reveal');
    targets.forEach((el) => observer.observe(el));
    setReady(true);

    return () => observer.disconnect();
  }, []);

  return { ref, ready };
}
