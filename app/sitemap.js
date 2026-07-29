import { site } from '@/lib/site';

// One page, so one URL. The nav entries are in-page anchors, and listing
// anchors in a sitemap tells a crawler about five documents that do not exist.
export default function sitemap() {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
