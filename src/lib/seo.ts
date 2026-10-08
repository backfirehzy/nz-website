// 站点基础 URL：生产环境用 NEXT_PUBLIC_SITE_URL（正式域名），
// Vercel 预览部署自动用 VERCEL_URL，本地开发回退 localhost。
export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

/**
 * 生成 hreflang 语言映射（绝对 URL）：英文无前缀，中文 /zh 前缀。
 * path 为不带语言前缀的路径，如 ''（首页）、'/projects'、'/projects/xxx'。
 * sitemap 不应用 metadataBase，必须返回绝对地址。
 */
export function languageAlternates(path: string): Record<string, string> {
  const enPath = path || '/';
  return {
    en: `${baseUrl}${enPath}`,
    zh: `${baseUrl}/zh${path}`,
    'x-default': `${baseUrl}${enPath}`,
  };
}
