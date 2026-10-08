# 技术栈选型

> 状态：✅ **已拍板：方案 A**（2026-10-08）。
> 决策依据：客户员工自助编辑（需要可视化 CMS）、免费/低成本托管、交付后少维护。

## 方案 A：Next.js + Sanity + Vercel（推荐）

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | Next.js (App Router) + TypeScript | 生态最大；ISR（增量静态再生成）让 CMS 改完内容秒级生效；`[locale]` 路由段天然支持双语前缀 URL |
| CMS | Sanity（Studio 嵌入 `/studio` 路由，同仓部署） | 免费额度慷慨（3 用户、10k 文档）；文档级中英文 i18n 成熟；自带图片 CDN 与裁剪；可视化编辑体验好 |
| 托管 | Vercel Hobby（免费） | 与 Next.js 原生集成；全球 CDN（悉尼节点离新西兰近）；自动 HTTPS；Git 推送自动部署 |
| 表单 | Route Handler + Resend 发邮件（免费 100 封/天）+ 写入 Sanity `contactSubmission` 文档留存 + Cloudflare Turnstile 防垃圾 | 客户直接在 Sanity 后台查历史询盘，无需额外数据库 |
| 样式 | Tailwind CSS | 开发快，设计稿还原度高 |

成本：月成本 ≈ NZ$0，仅域名约 NZ$20–30/年。

## 方案 B：Astro + Sanity + Cloudflare Pages

| 层 | 选型 | 与方案 A 的差异 |
|---|---|---|
| 框架 | Astro（静态输出） | 产出近乎纯静态 HTML，运行时依赖最少、最不易过时，长期维护负担最低；内置 i18n 路由 |
| 托管 | Cloudflare Pages（免费） | Cloudflare 在新西兰有节点，本地访问更快；无 Vercel 商用条款问题 |
| 表单 | Cloudflare Pages Functions + Resend + 写入 Sanity | 与方案 A 等效 |
| CMS | 同样 Sanity，但 Studio 需单独部署 | 比方案 A 多一个部署单元 |

## 取舍结论

- 方案 A：单一仓库、单一部署，改内容即时生效，React 生态资料最多。
- 方案 B：长期维护负担更低、新西兰本地访问更快。
- 两者 CMS、表单、成本结构完全相同，可后期再定，不影响需求沟通。

## 不推荐的方案及原因

| 方案 | 不推荐原因 |
|---|---|
| WordPress | 需自维护服务器、安全补丁、插件升级，与"交付后少维护"直接冲突 |
| Contentful | 免费档 locale 数量受限，中英双语易触顶 |
| Payload / Strapi（自托管） | 需要数据库和常驻服务器，免费托管不便，运维负担重 |

## 风险与注意事项

1. **Vercel Hobby 商用条款**：Hobby 计划条款上不允许商业用途，客户官网属商业场景。对策：改用 Cloudflare Pages（无此限制），或升级 Vercel Pro（US$20/月）。需向客户透明。
2. **Sanity 免费档限 3 个编辑用户**：客户编辑人员超过 3 人需升级或共享账号，提前告知。
3. **Resend 免费档 100 封/天**：对展示型官网的联系表单绰绰有余。
4. 中文 SEO 在新西兰意义有限，SEO 以英文为主；中文内容服务华人客户阅读。

## 最终拍板

**方案 A：Next.js + Sanity + Vercel**（2026-10-08 确认）。

- 完整组合：Next.js (App Router) + TypeScript + Tailwind CSS + Sanity（Studio 嵌入 `/studio`）+ Vercel + Resend + Cloudflare Turnstile。
- 已知悉 Vercel Hobby 商用条款风险（见上文风险 1），若客户介意可平移至 Cloudflare Pages，不影响其他选型。
- 方案 B（Astro）存档备查，不再采用。
