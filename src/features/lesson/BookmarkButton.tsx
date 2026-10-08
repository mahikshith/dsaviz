'use client';

import { useProgress } from '@/features/progress/ProgressProvider';

export function BookmarkButton({ problemId }: { problemId: string }) {
  const progress = useProgress();
  const on = Boolean(progress.doc.bookmarks[problemId]);
  return (
    <button type="button" className="btn btn-small" aria-pressed={on} onClick={() => progress.bookmark(problemId, !on)}>
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M6 3.5h12v17l-6-4-6 4z"
          fill={on ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {on ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}
