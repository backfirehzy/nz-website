import { hasAsset, urlFor } from '@/sanity/image';
import { VideoEmbed } from '@/components/video-embed';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react';

interface BodyImageValue {
  asset?: unknown;
  alt?: string;
  caption?: string;
}

interface VideoEmbedValue {
  url?: string;
}

// 正文富文本的自定义渲染：图片块走 Sanity CDN，视频块转第三方嵌入播放器
const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: BodyImageValue }) => {
      if (!hasAsset(value)) return null;
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt ?? ''}
            loading="lazy"
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-neutral-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    videoEmbed: ({ value }: { value: VideoEmbedValue }) => {
      if (!value.url) return null;
      return <VideoEmbed url={value.url} title="Video" />;
    },
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
