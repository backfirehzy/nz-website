import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { hasAsset, urlFor } from '@/sanity/image';
import { SERVICES_QUERY } from '@/sanity/queries';
import { pick, type Service } from '@/sanity/types';
import { notFound } from 'next/navigation';

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const services: Service[] = isSanityConfigured
    ? await sanityFetch(SERVICES_QUERY)
    : [];

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">{dict.services.title}</h1>

      {services.length === 0 ? (
        <p className="text-neutral-400">
          {isSanityConfigured
            ? locale === 'zh'
              ? '暂无服务内容，请在 Studio 中添加。'
              : 'No services yet. Add them in Studio.'
            : 'Sanity 尚未配置（见 .env.example），显示占位状态。'}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const name = pick(service.name, locale as Locale);
            return (
              <div
                key={service._id}
                className="overflow-hidden rounded-lg border border-neutral-200"
              >
                {hasAsset(service.image) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(service.image).width(800).height(500).url()}
                    alt={name}
                    className="aspect-[8/5] w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
                <div className="p-6">
                  <h2 className="text-lg font-semibold">{name}</h2>
                  {service.description && (
                    <p className="mt-2 text-sm text-neutral-600">
                      {pick(service.description, locale as Locale)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
