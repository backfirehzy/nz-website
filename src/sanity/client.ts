import { cacheLife, cacheTag } from 'next/cache';
import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

/**
 * Cache Components 下的数据读取：'use cache' 让结果可预渲染，
 * revalidate 60s 近似 ISR；后续可接 Sanity webhook 按 'sanity' tag 主动失效。
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  'use cache';
  cacheTag('sanity');
  cacheLife({ revalidate: 60 });

  return client.fetch<T>(query, params);
}
