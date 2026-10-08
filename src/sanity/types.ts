import type { Locale } from '@/i18n/config';
import type { PortableTextBlock } from '@portabletext/react';
import type { SanityImageSource } from '@sanity/image-url';

export type LocalizedString = { en?: string; zh?: string };
export type LocalizedBlocks = { en?: PortableTextBlock[]; zh?: PortableTextBlock[] };

export type ProjectType = 'residential' | 'commercial' | 'public';

export interface ProjectListItem {
  _id: string;
  title: LocalizedString;
  slug: string;
  cover?: SanityImageSource;
  projectType?: ProjectType;
  location?: string;
  year?: number;
}

export interface ProjectDetail extends ProjectListItem {
  description?: LocalizedBlocks;
  gallery?: SanityImageSource[];
  videoUrl?: string;
  area?: string;
}

export interface NewsListItem {
  _id: string;
  title: LocalizedString;
  slug: string;
  cover?: SanityImageSource;
  publishedAt: string;
}

export interface NewsDetail extends NewsListItem {
  body?: LocalizedBlocks;
}

export interface SiteSettings {
  siteTitle?: LocalizedString;
  footerText?: LocalizedString;
  contactEmail?: string;
}

export interface TeamMember {
  _id: string;
  name?: LocalizedString;
  role?: LocalizedString;
  photo?: SanityImageSource;
  bio?: LocalizedString;
}

export interface Service {
  _id: string;
  name?: LocalizedString;
  description?: LocalizedString;
  image?: SanityImageSource;
}

export function pick(value: LocalizedString | undefined, locale: Locale): string {
  return value?.[locale] ?? value?.en ?? '';
}
