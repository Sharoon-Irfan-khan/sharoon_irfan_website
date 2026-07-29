import { nav, site } from '@/lib/site';

export default function sitemap() {
  const now = new Date();
  return nav.map((item) => ({
    url: `${site.url}${item.href === '/' ? '' : item.href}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: item.href === '/' ? 1 : 0.8,
  }));
}
