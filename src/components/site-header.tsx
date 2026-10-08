import { localePrefix, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from 'next/link';
import { Suspense } from 'react';

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const prefix = localePrefix(locale);
  const links = [
    { href: `${prefix}/projects`, label: dict.nav.projects },
    { href: `${prefix}/news`, label: dict.nav.news },
    { href: `${prefix}/team`, label: dict.nav.team },
    { href: `${prefix}/services`, label: dict.nav.services },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={prefix || '/'} className="text-lg font-bold">
          Studio Name
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
          {/* usePathname 是运行时数据，需 Suspense 边界才能预渲染 */}
          <Suspense fallback={null}>
            <LanguageSwitcher locale={locale} />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
