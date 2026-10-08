import { isLocale, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { SITE_SETTINGS_QUERY } from '@/sanity/queries';
import { pick, type SiteSettings } from '@/sanity/types';
import { notFound } from 'next/navigation';

import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
