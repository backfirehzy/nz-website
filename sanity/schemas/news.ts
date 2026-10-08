import { defineField, defineType } from 'sanity';

// 单语言发布策略：某语言标题/正文留空时，该语言的站点不显示此篇（前端按字段过滤）。
export const news = defineType({
  name: 'news',
  title: 'News / 新闻',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / 标题',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', title: 'Body / 正文', type: 'localeBlock' }),
    defineField({
      name: 'cover',
      title: 'Cover Image / 封面图',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At / 发布日期',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Published At, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title.en', media: 'cover', subtitle: 'publishedAt' },
  },
});
