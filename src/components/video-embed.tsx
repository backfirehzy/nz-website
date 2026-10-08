'use client';

// 将 YouTube / Vimeo / Bilibili 分享链接转为嵌入播放器。
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (u.hostname.includes('bilibili.com')) {
      const match = u.pathname.match(/\/video\/(BV\w+)/);
      return match ? `https://player.bilibili.com/player.html?bvid=${match[1]}&autoplay=0` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const embedUrl = toEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="aspect-video w-full">
      <iframe
        src={embedUrl}
        title={title}
        className="h-full w-full rounded-lg"
        loading="lazy"
        allow="accelerometer; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
