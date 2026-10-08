import { expect, test } from '@playwright/test';

const PAGES = [
  '/',
  '/patterns/',
  '/patterns/breadth-first-search/',
  '/practice/',
  '/my-learning/',
  '/paths/first-steps/',
  '/problems/book-voucher-pair/',
  '/problems/book-voucher-pair/?mode=visualize',
  '/problems/neighborhood-route/?mode=visualize',
  '/problems/parcel-compartments/?mode=practice',
  '/git/',
  '/ml/',
  '/resources/',
];

for (const width of [320, 768]) {
  test.describe(`${width}px wide`, () => {
    test.use({ viewport: { width, height: 800 } });
    for (const path of PAGES) {
      test(`${path} has no page-wide horizontal scroll`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        const [scroll, client] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
        expect(scroll).toBeLessThanOrEqual(client);
      });
    }
  });
}

test.describe('phone layout', () => {
  test.use({ viewport: { width: 390, height: 844 } });
  test('the lesson stacks story, then the walkthrough', async ({ page }) => {
    await page.goto('/problems/book-voucher-pair/');
    const story = await page.getByRole('tablist', { name: 'About this problem' }).boundingBox();
    const stage = await page.getByRole('region', { name: 'Walkthrough' }).boundingBox();
    expect(story!.y).toBeLessThan(stage!.y);
  });
});
