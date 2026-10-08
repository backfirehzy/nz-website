import type { Locale } from './config';

const dictionaries = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      news: 'News',
      team: 'Team',
      services: 'Services',
      contact: 'Contact',
    },
    contact: {
      title: 'Contact Us',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      attachment: 'Attachment',
      submit: 'Send',
      success: 'Thanks! We will get back to you soon.',
      error: 'Something went wrong. Please try again later.',
    },
    projects: { title: 'Projects', all: 'All' },
    news: { title: 'News' },
    team: { title: 'Team' },
    services: { title: 'Services' },
    footer: { rights: 'All rights reserved.' },
  },
  zh: {
    nav: {
      home: '首页',
      projects: '案例',
      news: '新闻',
      team: '团队',
      services: '服务',
      contact: '联系',
    },
    contact: {
      title: '联系我们',
      name: '姓名',
      email: '邮箱',
      phone: '电话',
      message: '留言',
      attachment: '附件',
      submit: '发送',
      success: '已收到您的信息，我们会尽快回复。',
      error: '提交失败，请稍后重试。',
    },
    projects: { title: '案例', all: '全部' },
    news: { title: '新闻' },
    team: { title: '团队' },
    services: { title: '服务' },
    footer: { rights: '版权所有。' },
  },
} as const;

type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

export type Dictionary = Widen<(typeof dictionaries)['en']>;

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
