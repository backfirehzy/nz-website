import { defineField, defineType } from 'sanity';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member / 团队成员',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name / 姓名',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'role', title: 'Role / 职位', type: 'localeString' }),
    defineField({
      name: 'photo',
      title: 'Photo / 头像',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'bio', title: 'Bio / 简介', type: 'localeText' }),
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
    select: { title: 'name.en', subtitle: 'role.en', media: 'photo' },
  },
});
