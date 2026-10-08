import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project / 案例',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content / 内容', default: true },
    { name: 'details', title: 'Details / 属性' },
    { name: 'media', title: 'Media / 图片视频' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title / 标题',
      type: 'localeString',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title.en' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description / 描述',
      type: 'localeBlock',
      group: 'content',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type / 项目类型',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Residential / 住宅', value: 'residential' },
          { title: 'Commercial / 商业', value: 'commercial' },
          { title: 'Public / 公共建筑', value: 'public' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'location', title: 'Location / 地点', type: 'string', group: 'details' }),
    defineField({ name: 'year', title: 'Year / 年份', type: 'number', group: 'details' }),
    defineField({ name: 'area', title: 'Area / 面积', type: 'string', group: 'details' }),
    defineField({
      name: 'cover',
      title: 'Cover Image / 封面图',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery / 图集',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL / 视频链接',
      description: 'YouTube / Vimeo / Bilibili 分享链接，前端嵌入播放',
      type: 'url',
      group: 'media',
    }),
  ],
  preview: {
    select: { title: 'title.en', media: 'cover', subtitle: 'location' },
  },
});
