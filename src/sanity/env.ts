export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = '2025-01-01';

/** 未配置真实 Sanity 项目时（脚手架阶段），前端读取应优雅降级为空数据。 */
export const isSanityConfigured = projectId !== 'placeholder';
