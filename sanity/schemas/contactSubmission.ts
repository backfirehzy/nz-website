import { defineField, defineType } from 'sanity';

// 联系表单提交记录：由服务端 Route Handler 写入，供客户在后台查阅历史询盘。
export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Contact Submission / 询盘记录',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'name', title: 'Name / 姓名', type: 'string' }),
    defineField({ name: 'email', title: 'Email / 邮箱', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone / 电话', type: 'string' }),
    defineField({ name: 'message', title: 'Message / 留言', type: 'text' }),
    defineField({ name: 'attachment', title: 'Attachment / 附件', type: 'file' }),
    defineField({ name: 'locale', title: 'Locale / 语言', type: 'string' }),
    defineField({ name: 'submittedAt', title: 'Submitted At / 提交时间', type: 'datetime' }),
  ],
  orderings: [
    {
      title: 'Submitted At, New',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'submittedAt' },
  },
});
