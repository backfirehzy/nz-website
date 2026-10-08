import { isLocale, type Locale } from '@/i18n/config';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { NEWS_DETAIL_QUERY, NEWS_SLUGS_QUERY } from '@/sanity/queries';
import { pick, type NewsDetail } from '@/sanity/types';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// 构建时预渲染已发布新闻；未配置时返回占位 slug（Cache Components 不允许空数组），
// 该页面会因查不到数据渲染 404，线上真实 slug 走 App Shell 按需生成。
export async function generateStaticParams() {
  if (!isSanityConfigured) return [{ slug: 'placeholder' }];
  const slugs = await sanityFetch<{ slug: string }[]>(NEWS_SLUGS_QUERY);
  return slugs.length > 0 ? slugs.map(({ slug }) => ({ slug })) : [{ slug: 'placeholder' }];
}

// params/数据读取放在 Suspense 边界内：导航时先返回骨架屏，内容流式补齐（Instant navigation）。
export default function NewsDetailPage({ params }: PageProps<'/[locale]/news/[slug]'>) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-neutral-100" />}>
      <NewsDetailContent params={params} />
    </Suspense>
  );
}

async function NewsDetailContent({
  params,
}: {
  params: PageProps<'/[locale]/news/[slug]'>['params'];
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSanityConfigured) notFound();

  const post = await sanityFetch<NewsDetail | null>(NEWS_DETAIL_QUERY, { slug, locale });
  if (!post) notFound();

  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold">{pick(post.title, locale as Locale)}</h1>
      <time className="text-sm text-neutral-500">{post.publishedAt}</time>
      {post.body?.[locale as Locale] && (
        <div className="prose max-w-none">
          <PortableText value={post.body[locale as Locale]!} />
        </div>
      )}
    </article>
  );
}
