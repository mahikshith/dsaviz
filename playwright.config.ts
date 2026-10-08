import { defineConfig, devices } from '@playwright/test';

/**
 * Browser tests run against the production static export (npm run build first).
 * They use an installed Chrome by default so no browser download is needed;
 * set PW_CHANNEL=msedge, or PW_CHANNEL=bundled after `npx playwright install chromium`.
 */
const channel = process.env.PW_CHANNEL ?? 'chrome';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    ...(channel === 'bundled' ? {} : { channel }),
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'phone', use: { ...devices['Pixel 7'] }, testMatch: /responsive\.spec\.ts/ },
  ],
  webServer: {
    command: 'node scripts/serve-out.mjs',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
});
