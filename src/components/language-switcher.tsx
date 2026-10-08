'use client';

import type { Locale } from '@/i18n/config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 语言切换保持在当前页面：/projects ↔ /zh/projects
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  const target =
    locale === 'en'
      ? `/zh${pathname === '/' ? '' : pathname}`
      : pathname.replace(/^\/zh(?=\/|$)/, '') || '/';

  return (
    <Link href={target} className="rounded border border-neutral-300 px-2 py-1 text-xs hover:border-neutral-500">
      {locale === 'en' ? '中文' : 'EN'}
    </Link>
  );
}
