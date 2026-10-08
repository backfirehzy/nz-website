import { defineType } from 'sanity';

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
    { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
    { name: 'zh', title: '中文', type: 'array', of: [{ type: 'block' }] },
  ],
});
