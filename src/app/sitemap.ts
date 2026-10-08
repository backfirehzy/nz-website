import type { MetadataRoute } from 'next';

import { languageAlternates, baseUrl } from '@/lib/seo';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { NEWS_SLUGS_QUERY, PROJECT_SLUGS_QUERY } from '@/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['', '/projects', '/news', '/team', '/services', '/contact'];

  const entries: MetadataRoute.Sitemap = staticPaths.flatMap((path) => [
    {
      url: `${baseUrl}${path || '/'}`,
      alternates: { languages: languageAlternates(path) },
    },
    { url: `${baseUrl}/zh${path}` },
  ]);

  if (isSanityConfigured) {
    const [projects, newsList] = await Promise.all([
      sanityFetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY),
      sanityFetch<{ slug: string }[]>(NEWS_SLUGS_QUERY),
    ]);
    for (const { slug } of projects) {
      entries.push(
        {
          url: `${baseUrl}/projects/${slug}`,
          alternates: { languages: languageAlternates(`/projects/${slug}`) },
        },
        { url: `${baseUrl}/zh/projects/${slug}` },
      );
    }
    for (const { slug } of newsList) {
      entries.push(
        {
          url: `${baseUrl}/news/${slug}`,
          alternates: { languages: languageAlternates(`/news/${slug}`) },
        },
        { url: `${baseUrl}/zh/news/${slug}` },
      );
    }
  }

  return entries;
}
