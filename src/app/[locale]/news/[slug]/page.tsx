import { isLocale, type Locale } from '@/i18n/config';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { hasAsset, urlFor } from '@/sanity/image';
import { NEWS_DETAIL_QUERY, NEWS_SLUGS_QUERY } from '@/sanity/queries';
import { languageAlternates } from '@/lib/seo';
import { pick, type NewsDetail } from '@/sanity/types';
import { RichText } from '@/components/rich-text';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// 构建时预渲染已发布新闻；未配置时返回占位 slug（Cache Components 不允许空数组），
// 该页面会因查不到数据渲染 404，线上真实 slug 走 App Shell 按需生成。
export async function generateStaticParams() {
  if (!isSanityConfigured) return [{ slug: 'placeholder' }];
  const slugs = await sanityFetch<{ slug: string }[]>(NEWS_SLUGS_QUERY);
  return slugs.length > 0 ? slugs.map(({ slug }) => ({ slug })) : [{ slug: 'placeholder' }];
}

// 详情页 metadata：标题=新闻标题，OG 分享卡片=封面图，双语 hreflang 互链。
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/news/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSanityConfigured) return {};

  const post = await sanityFetch<NewsDetail | null>(NEWS_DETAIL_QUERY, { slug, locale });
  if (!post) return {};

  const coverUrl = hasAsset(post.cover)
    ? urlFor(post.cover).width(1200).height(630).url()
    : undefined;

  return {
    title: pick(post.title, locale as Locale),
    alternates: { languages: languageAlternates(`/news/${slug}`) },
    openGraph: coverUrl ? { images: [{ url: coverUrl, width: 1200, height: 630 }] } : undefined,
  };
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
      {hasAsset(post.cover) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(post.cover).width(1600).url()}
          alt={pick(post.title, locale as Locale)}
          className="w-full rounded-lg object-cover"
        />
      )}
      {post.body?.[locale as Locale] && (
        <div className="prose max-w-none">
          <RichText value={post.body[locale as Locale]!} />
        </div>
      )}
    </article>
  );
}
