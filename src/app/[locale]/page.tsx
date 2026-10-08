import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const prefix = locale === 'zh' ? '/zh' : '';

  return (
    <section className="space-y-8">
      {/* 占位内容：等待客户设计稿，见 references/requirements-spec.md「设计稿约定」 */}
      <div className="flex h-72 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400">
        Hero 占位图 / Placeholder
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {(['projects', 'news', 'services'] as const).map((key) => (
          <Link
            key={key}
            href={`${prefix}/${key}`}
            className="rounded-lg border border-neutral-200 p-6 transition hover:border-neutral-400"
          >
            <h2 className="text-xl font-semibold">{dict.nav[key]}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
