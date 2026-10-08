import { isLocale, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { baseUrl } from '@/lib/seo';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { SITE_SETTINGS_QUERY } from '@/sanity/queries';
import { pick, type SiteSettings } from '@/sanity/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 全站默认 metadata：标题模板「页面名 | 站名」、SEO 描述、OG/Twitter 卡片。
// 站名和描述来自 Sanity 站点设置，客户在后台可改。
export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const settings = isSanityConfigured
    ? await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY)
    : null;
  const siteName = pick(settings?.siteTitle, locale as Locale) || 'Studio Name';
  const description = pick(settings?.seoDescription, locale as Locale) || undefined;

  return {
    metadataBase: new URL(baseUrl),
    title: { default: siteName, template: `%s | ${siteName}` },
    description,
    openGraph: {
      siteName,
      locale: locale === 'zh' ? 'zh_CN' : 'en_NZ',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);
  const settings = isSanityConfigured
    ? await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY)
    : null;
  const siteName = pick(settings?.siteTitle, locale as Locale) || 'Studio Name';
  const footerText = pick(settings?.footerText, locale as Locale);

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'}>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <SiteHeader locale={locale as Locale} dict={dict} siteName={siteName} />
        <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
        <SiteFooter dict={dict} siteName={siteName} footerText={footerText} />
      </body>
    </html>
  );
}
