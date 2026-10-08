import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service / 服务',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name / 服务名称',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description / 服务简介',
      type: 'localeText',
    }),
    defineField({
      name: 'image',
      title: 'Image / 配图',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Order / 排序权重',
      description: '数字越小越靠前',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Order / 排序权重',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name.en', media: 'image' },
  },
});
