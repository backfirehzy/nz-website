'use client';

import type { Locale } from '@/i18n/config';
import type { ProjectType } from '@/sanity/types';
import Link from 'next/link';
import { useState } from 'react';

export interface ProjectCardData {
  _id: string;
  slug: string;
  title: string;
  coverUrl: string | null;
  projectType?: ProjectType;
  location?: string;
  year?: number;
}

const TYPE_FILTERS: { value: ProjectType | ''; label: { en: string; zh: string } }[] = [
  { value: '', label: { en: 'All', zh: '全部' } },
  { value: 'residential', label: { en: 'Residential', zh: '住宅' } },
  { value: 'commercial', label: { en: 'Commercial', zh: '商业' } },
  { value: 'public', label: { en: 'Public', zh: '公共建筑' } },
];

// 筛选在客户端进行（数据已在服务端取全），保持页面可预渲染。
export function ProjectsGrid({
  projects,
  locale,
}: {
  projects: ProjectCardData[];
  locale: Locale;
}) {
  const [activeType, setActiveType] = useState<ProjectType | ''>('');
  const prefix = locale === 'zh' ? '/zh' : '';
  const filtered = activeType
    ? projects.filter((project) => project.projectType === activeType)
    : projects;

  return (
    <>
      <nav className="flex gap-3">
        {TYPE_FILTERS.map(({ value, label }) => (
          <button
            key={value || 'all'}
            type="button"
            onClick={() => setActiveType(value)}
            className={`rounded-full border px-4 py-1 text-sm ${
              activeType === value
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-300 text-neutral-600 hover:border-neutral-500'
            }`}
          >
            {label[locale]}
          </button>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <p className="text-neutral-400">{locale === 'zh' ? '暂无案例。' : 'No projects yet.'}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project._id}
              href={`${prefix}/projects/${project.slug}`}
              className="group space-y-2"
            >
              {project.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.coverUrl}
                  alt={project.title}
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-neutral-100 text-neutral-300">
                  Placeholder
                </div>
              )}
              <h2 className="font-medium group-hover:underline">{project.title}</h2>
              <p className="text-sm text-neutral-500">
                {[project.location, project.year].filter(Boolean).join(' · ')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
