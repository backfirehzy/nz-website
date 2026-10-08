import { isLocale, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { notFound } from 'next/navigation';

import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'}>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <SiteHeader locale={locale as Locale} dict={dict} />
        <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
        <SiteFooter locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}
