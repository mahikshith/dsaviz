'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps } from 'react';

/**
 * A Link for long lists and grids: it prefetches the page when the pointer,
 * a touch or keyboard focus arrives, not when it scrolls into view. Clicks stay
 * instant without downloading every page the reader merely scrolls past.
 */
export function IntentLink({ onMouseEnter, onFocus, onTouchStart, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const warm = () => {
    if (typeof props.href === 'string') router.prefetch(props.href);
  };
  return (
    <Link
      {...props}
      prefetch={false}
      onMouseEnter={(e) => {
        warm();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        warm();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        warm();
        onTouchStart?.(e);
      }}
    />
  );
}
