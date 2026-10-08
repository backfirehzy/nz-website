import { isLocale, type Locale } from '@/i18n/config';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { hasAsset, urlFor } from '@/sanity/image';
import { PROJECT_DETAIL_QUERY, PROJECT_SLUGS_QUERY } from '@/sanity/queries';
import { languageAlternates } from '@/lib/seo';
import { pick, type ProjectDetail } from '@/sanity/types';
import { RichText } from '@/components/rich-text';
import { VideoEmbed } from '@/components/video-embed';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// 构建时预渲染已发布案例；未配置时返回占位 slug（Cache Components 不允许空数组），
// 该页面会因查不到数据渲染 404，线上真实 slug 走 App Shell 按需生成。
export async function generateStaticParams() {
  if (!isSanityConfigured) return [{ slug: 'placeholder' }];
  const slugs = await sanityFetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY);
  return slugs.length > 0 ? slugs.map(({ slug }) => ({ slug })) : [{ slug: 'placeholder' }];
}

// 详情页 metadata：标题=案例标题，OG 分享卡片=封面图，双语 hreflang 互链。
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projects/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSanityConfigured) return {};

  const project = await sanityFetch<ProjectDetail | null>(PROJECT_DETAIL_QUERY, { slug });
  if (!project) return {};

  const coverUrl = hasAsset(project.cover)
    ? urlFor(project.cover).width(1200).height(630).url()
    : undefined;

  return {
    title: pick(project.title, locale as Locale),
    alternates: { languages: languageAlternates(`/projects/${slug}`) },
    openGraph: coverUrl ? { images: [{ url: coverUrl, width: 1200, height: 630 }] } : undefined,
  };
}

// params/数据读取放在 Suspense 边界内：导航时先返回骨架屏，内容流式补齐（Instant navigation）。
export default function ProjectDetailPage({ params }: PageProps<'/[locale]/projects/[slug]'>) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-neutral-100" />}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}

async function ProjectDetailContent({
  params,
}: {
  params: PageProps<'/[locale]/projects/[slug]'>['params'];
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSanityConfigured) notFound();

  const project = await sanityFetch<ProjectDetail | null>(PROJECT_DETAIL_QUERY, { slug });
  if (!project) notFound();

  const title = pick(project.title, locale as Locale);
  const details: [string, string | number | undefined][] = [
    [locale === 'zh' ? '地点' : 'Location', project.location],
    [locale === 'zh' ? '年份' : 'Year', project.year],
    [locale === 'zh' ? '面积' : 'Area', project.area],
  ];

  return (
    <article className="space-y-8">
      <h1 className="text-3xl font-bold">{title}</h1>

      <dl className="flex flex-wrap gap-6 text-sm text-neutral-600">
        {details
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label}>
              <dt className="text-neutral-400">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
      </dl>

      {project.description?.[locale as Locale] && (
        <div className="prose max-w-none">
          <RichText value={project.description[locale as Locale]!} />
        </div>
      )}

      {project.gallery && project.gallery.filter(hasAsset).length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {project.gallery.filter(hasAsset).map((image, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={urlFor(image).width(1200).url()}
              alt={`${title} ${index + 1}`}
              className="w-full rounded-lg object-cover"
              loading="lazy"
            />
          ))}
        </div>
      )}

      {project.videoUrl && <VideoEmbed url={project.videoUrl} title={title} />}
    </article>
  );
}
