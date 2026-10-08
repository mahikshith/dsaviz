const base = { width: 20, height: 20, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false } as const;

export const PlayIcon = () => (
  <svg {...base}>
    <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
  </svg>
);
export const PauseIcon = () => (
  <svg {...base}>
    <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
  </svg>
);
export const PrevIcon = () => (
  <svg {...base}>
    <path d="M15 5.5 8.5 12 15 18.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const NextIcon = () => (
  <svg {...base}>
    <path d="M9 5.5 15.5 12 9 18.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const RestartIcon = () => (
  <svg {...base}>
    <path d="M5 12a7 7 0 1 0 2.1-5M5 4v4h4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ExpandIcon = () => (
  <svg {...base}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const CollapseIcon = () => (
  <svg {...base}>
    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const EditIcon = () => (
  <svg {...base}>
    <path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
