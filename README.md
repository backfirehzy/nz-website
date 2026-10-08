# NZ Architecture Studio Website

新西兰建筑设计公司官网（外包项目）。技术栈：**Next.js 16 (App Router) + TypeScript + Tailwind CSS + Sanity CMS + Vercel + Resend + Cloudflare Turnstile**。

需求与决策文档见 [`references/`](references/README.md)。

## 快速开始

```bash
npm install
cp .env.example .env.local   # 按注释填写 Sanity / Resend / Turnstile 配置
npm run dev
```

- 网站：<http://localhost:3000>（英文无前缀）｜ <http://localhost:3000/zh>（中文）
- CMS 后台：<http://localhost:3000/studio>（需先在 <https://www.sanity.io/manage> 创建项目并填入 `NEXT_PUBLIC_SANITY_PROJECT_ID`）

## 目录结构

```
sanity/schemas/       CMS 内容模型（project / news / siteSettings / contactSubmission）
src/app/[locale]/     双语页面（英文默认无前缀，中文 /zh 前缀，由 src/proxy.ts 重写）
src/app/studio/       内嵌 Sanity Studio
src/app/api/contact/  联系表单接口（Turnstile 校验 → Resend 邮件 → Sanity 留存）
src/components/       站点组件（导航、页脚、语言切换、表单等）
src/i18n/             语言配置与界面文案
src/sanity/           Sanity 客户端、查询、类型
references/           需求规格说明书、技术栈选型、待沟通问题
```

## 常用命令

```bash
npm run dev     # 开发
npm run build   # 生产构建
npm run start   # 生产模式启动
npm run lint    # ESLint
```

## 说明

- 未配置 Sanity 时页面以占位状态渲染，不影响开发 UI。
- 联系表单三个环节（Turnstile / Resend / Sanity）各自独立降级：未配置的环境变量会跳过并打印警告。
