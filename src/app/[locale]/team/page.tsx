import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { hasAsset, urlFor } from '@/sanity/image';
import { TEAM_QUERY } from '@/sanity/queries';
import { pick, type TeamMember } from '@/sanity/types';
import { notFound } from 'next/navigation';

export default async function TeamPage({ params }: PageProps<'/[locale]/team'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const members: TeamMember[] = isSanityConfigured
    ? await sanityFetch(TEAM_QUERY)
    : [];

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">{dict.team.title}</h1>

      {members.length === 0 ? (
        <p className="text-neutral-400">
          {isSanityConfigured
            ? locale === 'zh'
              ? '暂无团队成员，请在 Studio 中添加。'
              : 'No team members yet. Add them in Studio.'
            : 'Sanity 尚未配置（见 .env.example），显示占位状态。'}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => {
            const name = pick(member.name, locale as Locale);
            return (
              <div key={member._id} className="space-y-2">
                {hasAsset(member.photo) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(member.photo).width(600).height(600).url()}
                    alt={name}
                    className="aspect-square w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center rounded-lg bg-neutral-100 text-neutral-300">
                    Placeholder
                  </div>
                )}
                <p className="font-medium">{name}</p>
                {member.role && (
                  <p className="text-sm text-neutral-500">{pick(member.role, locale as Locale)}</p>
                )}
                {member.bio && (
                  <p className="text-sm text-neutral-600">{pick(member.bio, locale as Locale)}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
