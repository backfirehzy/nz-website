import { defineField, defineType } from 'sanity';

// 正文视频嵌入块：只存第三方平台分享链接（YouTube/Vimeo/Bilibili），前端转嵌入播放器
export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video / 视频',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL / 视频链接',
      description: '粘贴 YouTube / Vimeo / Bilibili 的分享链接',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'url' },
    prepare: ({ title }) => ({ title: `视频：${title ?? '未填写链接'}` }),
  },
});
