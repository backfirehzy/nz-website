import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings / 站点设置',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title / 站点名称', type: 'localeString' }),
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
