import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { notFound } from 'next/navigation';

// TODO: 团队成员数据建模待与客户确认字段后接入 Sanity（见 references/open-questions.md）
export default async function TeamPage({ params }: PageProps<'/[locale]/team'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">{dict.team.title}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex aspect-square items-center justify-center rounded-lg bg-neutral-100 text-neutral-300">
              Placeholder
            </div>
            <p className="font-medium">{locale === 'zh' ? `成员 ${i}` : `Member ${i}`}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
