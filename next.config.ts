import type { NextConfig } from 'next';

// Static export: every route is pre-rendered to HTML in out/, so the site can be
// hosted by any static file server. There is no application server or backend.
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // This repository keeps its own CLAUDE.md; do not let Next.js append to it.
  agentRules: false,
};

export default config;
