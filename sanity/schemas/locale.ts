import { defineType } from 'sanity';

// 正文里的图片块：因为嵌在各语言的正文数组内，alt/图注跟随该语言，用普通字符串即可
export const bodyImage = {
  type: 'image',
  title: 'Image / 图片',
  options: { hotspot: true },
  fields: [
    {
      name: 'alt',
      title: 'Alt / 替代文字',
      type: 'string',
      description: '简述图片内容，用于 SEO 与无障碍阅读',
    },
    {
      name: 'caption',
      title: 'Caption / 图注',
      type: 'string',
    },
  ],
} as const;

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: 'string' },
    { name: 'zh', title: '中文', type: 'string' },
  ],
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: 'text', rows: 3 },
    { name: 'zh', title: '中文', type: 'text', rows: 3 },
  ],
});

export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'block' }, bodyImage, { type: 'videoEmbed' }],
    },
    {
      name: 'zh',
      title: '中文',
      type: 'array',
      of: [{ type: 'block' }, bodyImage, { type: 'videoEmbed' }],
    },
  ],
});
