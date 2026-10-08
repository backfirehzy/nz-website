import { NextRequest, NextResponse } from 'next/server';

// Next.js 16 中 Middleware 更名为 Proxy，功能相同。
// 英文为默认语言：URL 不带前缀（/projects），内部重写到 /en/projects；
// 中文使用 /zh 前缀（/zh/projects）。
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/en', request.url));
  }

  return NextResponse.rewrite(new URL(`/en${pathname}`, request.url));
}

export const config = {
  matcher: [
    // 跳过：中文前缀、Studio、API、Next 内部资源、静态文件
    '/((?!zh|studio|api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
