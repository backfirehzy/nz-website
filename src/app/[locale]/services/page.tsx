import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { notFound } from 'next/navigation';

// TODO: 服务内容待与客户确认后接入 Sanity 或静态双语文案
export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const placeholders =
    locale === 'zh'
      ? ['建筑设计', '室内设计', '城市规划']
      : ['Architecture', 'Interior Design', 'Urban Planning'];

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">{dict.services.title}</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {placeholders.map((name) => (
          <div key={name} className="rounded-lg border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="mt-2 text-sm text-neutral-400">
              {locale === 'zh' ? '占位文案，待客户提供。' : 'Placeholder copy, to be provided by the client.'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
