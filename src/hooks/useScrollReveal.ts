import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Primary: reveal when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Fail-safe: on heavy mobile loads, image decoding can starve
    // IntersectionObserver callbacks and leave sections invisible.
    // If the element is already near the viewport after a short grace
    // period, reveal it regardless.
    const fallback = window.setTimeout(() => {
      try {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 2) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(element);
        }
      } catch {
        setIsVisible(true);
      }
    }, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function useStaggeredReveal(_itemCount: number, baseDelay: number = 100) {
  const { ref, isVisible } = useScrollReveal();
  
  const getDelay = (index: number) => {
    if (!isVisible) return 0;
    return baseDelay * index;
  };

  return { ref, isVisible, getDelay };
}
