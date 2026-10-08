// Studio 路由独立于 [locale] 分支，需要自己的根布局（含 html/body）。
// Studio 是后台管理工具，允许阻塞式按需渲染（不适用预渲染）。
export const instant = false;

export const metadata = {
  title: 'Studio – NZ Architecture',
};

// Cache Components 下根参数必须显式枚举；{ tool: [] } 对应 /studio 根路径，
// 其余 Studio 子路径按需渲染。
export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
