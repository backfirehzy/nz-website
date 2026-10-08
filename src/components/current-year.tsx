'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// Cache Components 下预渲染不允许 new Date()：服务端快照返回 null，
// 水合后由客户端快照填充真实年份，无水合不一致。
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );

  return <>{year}</>;
}
