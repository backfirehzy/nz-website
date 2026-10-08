import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

import { client } from './client';

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * 图片上传未完成时，文档里的 image 字段只有 _upload 没有 asset，
 * urlFor 会静默降级成 1x1 透明像素。渲染前必须先用此守卫过滤。
 */
export function hasAsset(source: SanityImageSource | undefined): source is SanityImageSource {
  return Boolean(source && typeof source === 'object' && 'asset' in source);
}
