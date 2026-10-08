import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { NEWS_LIST_QUERY } from '@/sanity/queries';
import { pick, type NewsListItem } from '@/sanity/types';
import { languageAlternates } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/news'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.news.title,
    alternates: { languages: languageAlternates('/news') },
  };
}

export default async function NewsPage({ params }: PageProps<'/[locale]/news'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const prefix = locale === 'zh' ? '/zh' : '';

  const posts: NewsListItem[] = isSanityConfigured
    ? await sanityFetch(NEWS_LIST_QUERY, { locale })
    : [];

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">{dict.news.title}</h1>

      {posts.length === 0 ? (
        <p className="text-neutral-400">
          {isSanityConfigured
            ? locale === 'zh'
              ? '暂无新闻。'
              : 'No news yet.'
            : 'Sanity 尚未配置（见 .env.example），显示占位状态。'}
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200">
          {posts.map((post) => (
            <li key={post._id} className="py-4">
              <Link href={`${prefix}/news/${post.slug}`} className="group block">
                <h2 className="text-lg font-medium group-hover:underline">
                  {pick(post.title, locale as Locale)}
                </h2>
                <time className="text-sm text-neutral-500">{post.publishedAt}</time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
