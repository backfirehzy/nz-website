import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings / 站点设置',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title / 站点名称', type: 'localeString' }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description / SEO 描述',
      description: '显示在 Google 搜索结果里的网站简介，建议 100 字以内',
      type: 'localeText',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text / 页脚文字',
      type: 'localeText',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email / 联系邮箱',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings / 站点设置' }) },
});
