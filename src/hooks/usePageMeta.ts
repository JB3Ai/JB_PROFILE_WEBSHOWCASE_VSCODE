import { useEffect } from 'react';

const BASE_URL = 'https://www.jonoblackburn.com';

interface PageMeta {
  title: string;
  description: string;
  /** Path on the production domain, e.g. "/" or "/wishlist" */
  canonical: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Per-route SEO metadata for the SPA. Static index.html carries the
 * homepage defaults; this hook keeps title, description, canonical,
 * and social tags correct during client-side navigation.
 */
export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${BASE_URL}${canonical}`;

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', `${BASE_URL}${canonical}`);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
  }, [title, description, canonical]);
}
