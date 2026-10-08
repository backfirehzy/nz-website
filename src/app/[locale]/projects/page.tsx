import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { ProjectsGrid, type ProjectCardData } from '@/components/projects-grid';
import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import { urlFor } from '@/sanity/image';
import { PROJECT_LIST_QUERY } from '@/sanity/queries';
import { pick, type ProjectListItem } from '@/sanity/types';
import { notFound } from 'next/navigation';

export default async function ProjectsPage({ params }: PageProps<'/[locale]/projects'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const raw: ProjectListItem[] = isSanityConfigured
    ? await sanityFetch(PROJECT_LIST_QUERY, { type: '', locale })
    : [];

  const projects: ProjectCardData[] = raw.map((project) => ({
    _id: project._id,
    slug: project.slug,
    title: pick(project.title, locale as Locale),
    coverUrl: project.cover ? urlFor(project.cover).width(800).height(600).url() : null,
    projectType: project.projectType,
    location: project.location,
    year: project.year,
  }));

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">{dict.projects.title}</h1>
      {!isSanityConfigured && (
        <p className="text-sm text-neutral-400">
          Sanity 尚未配置（见 .env.example），当前显示空列表。
        </p>
      )}
      <ProjectsGrid projects={projects} locale={locale as Locale} />
    </section>
  );
}
