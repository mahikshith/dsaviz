import { expect, test, type Page } from '@playwright/test';

const stepCount = (page: Page) => page.locator('[class*="count"]').first();
const narration = (page: Page) => page.locator('[class*="narration"]');
const opLabel = (page: Page) => page.locator('[class*="opLabel"]');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('step through the voucher lesson with the keyboard, answer the prediction, and see synced code', async ({ page }) => {
  await page.goto('/problems/book-voucher-pair/?mode=visualize');
  await expect(stepCount(page)).toHaveText('Step 1 of 10');

  // Keyboard shortcuts work while focus is inside the stage.
  await page.getByRole('button', { name: 'Next step' }).focus();
  for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
  await expect(stepCount(page)).toHaveText('Step 5 of 10');
  await expect(narration(page)).toContainText('4 + 15 = 19, more than 18.');

  // The checkpoint stops Next until it is answered, and takes focus.
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(stepCount(page)).toHaveText('Step 5 of 10');
  await expect(page.getByRole('heading', { name: 'The total is 19. Which end should move?' })).toBeFocused();

  await page.getByRole('button', { name: 'Move left inward' }).click();
  await expect(page.getByText('Not quite.')).toBeVisible();
  await page.getByRole('button', { name: 'Move right inward' }).click();
  await expect(page.getByText('Correct.')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(stepCount(page)).toHaveText('Step 6 of 10');

  // The reference code highlights the line for this step's anchor (move-right).
  await expect(page.locator('[class*="codeLine"][data-active]')).toHaveText(/right -= 1/);
  // Switching language keeps the step.
  await page.getByText('TypeScript', { exact: true }).click();
  await expect(stepCount(page)).toHaveText('Step 6 of 10');
  await expect(page.locator('[class*="codeLine"][data-active]')).toHaveText(/right -= 1/);

  // Previous restores the earlier frame.
  await page.getByRole('button', { name: 'Previous step' }).click();
  await expect(stepCount(page)).toHaveText('Step 5 of 10');
  await expect(narration(page)).toContainText('4 + 15 = 19, more than 18.');

  // Seek to the end shows the output.
  await page.getByLabel('Step', { exact: true }).fill('9');
  await expect(stepCount(page)).toHaveText('Step 10 of 10');
  await expect(page.getByText('Output:')).toContainText('[2, 3]');
});

test('story and formal views explain the same frame differently', async ({ page }) => {
  await page.goto('/problems/book-voucher-pair/?mode=visualize');
  await page.getByRole('button', { name: 'Next step' }).click();
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(narration(page)).toContainText('2 + 15 = 17, less than 18.');
  await page.locator('fieldset', { hasText: 'Story' }).getByText('Formal', { exact: true }).click();
  await expect(narration(page)).toContainText('prices[0] + prices[4] = 17 < 18.');
  await expect(stepCount(page)).toHaveText('Step 3 of 10');
});

test('custom input: errors name the field, unsorted input is rejected for pointers but runs with every-pair', async ({ page }) => {
  await page.goto('/problems/book-voucher-pair/?mode=visualize');
  await page.getByRole('button', { name: 'Edit input' }).click();
  const prices = page.getByRole('textbox', { name: 'Prices' });
  await expect(prices).toHaveValue('2, 4, 7, 11, 15');

  await prices.fill('2, 7, 1, 3');
  await page.getByRole('textbox', { name: 'Target' }).fill('9');
  await page.getByRole('button', { name: 'Run walkthrough' }).click();
  await expect(page.getByText(/needs prices from lowest to highest/)).toBeVisible();
  await expect(prices).toHaveAttribute('aria-invalid', 'true');

  await prices.fill('2, x');
  await page.getByRole('button', { name: 'Run walkthrough' }).click();
  await expect(page.getByText(/“x” is not a whole number/)).toBeVisible();

  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByText('Check every pair', { exact: true }).click();
  await expect(stepCount(page)).toHaveText('Step 1 of 13');
  await page.getByRole('button', { name: 'Edit input' }).click();
  await page.getByRole('textbox', { name: 'Prices' }).fill('2, 7, 1, 3');
  await page.getByRole('textbox', { name: 'Target' }).fill('9');
  await page.getByRole('button', { name: 'Run walkthrough' }).click();
  await expect(page.getByLabel('Example')).toHaveValue('custom');
  await page.getByLabel('Step', { exact: true }).press('End');
  await expect(page.getByText('Output:')).toContainText('[0, 1]');
});

test('autoplay advances on its own, pauses at the checkpoint, and does not start by itself', async ({ page }) => {
  await page.goto('/problems/book-voucher-pair/?mode=visualize');
  await page.waitForTimeout(2500);
  await expect(stepCount(page)).toHaveText('Step 1 of 10');
  await page.getByLabel('Playback speed').selectOption('fast');
  await page.getByRole('button', { name: 'Play' }).click();
  await expect(stepCount(page)).toHaveText('Step 5 of 10', { timeout: 10_000 });
  await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
  await page.waitForTimeout(1500);
  await expect(stepCount(page)).toHaveText('Step 5 of 10');
});

test('progress persists, and one problem counts once across two patterns', async ({ page }) => {
  await page.goto('/problems/busiest-three-days/?mode=practice');
  await page.getByRole('button', { name: 'Mark as practised' }).click();
  await page.getByRole('button', { name: 'Bookmark' }).click();
  await page.waitForTimeout(400);
  await page.reload();
  await expect(page.getByRole('button', { name: '✓ Marked as practised' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Bookmarked' })).toBeVisible();

  await page.goto('/patterns/');
  for (const name of ['Sliding window', 'Prefix sums']) {
    await expect(page.locator('li', { has: page.getByRole('link', { name }) })).toContainText(/problems1\/\d+$/);
  }

  await page.goto('/my-learning/');
  await expect(page.getByText('Practised').first()).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Practised (1)' })).toBeVisible();
});

test('practice filters live in the URL and survive reload', async ({ page }) => {
  await page.goto('/practice/');
  await page.getByText('Medium', { exact: true }).click();
  await expect(page).toHaveURL(/difficulty=medium/);
  await expect(page.getByRole('link', { name: 'The fewest streets to the library' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Two books for one gift voucher' })).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('radio', { name: 'Medium' })).toBeChecked();
  await expect(page.getByRole('link', { name: 'Two books for one gift voucher' })).toHaveCount(0);
});

test('company mode groups problems by company and filters to one', async ({ page }) => {
  await page.goto('/practice/?view=company');
  await expect(page.getByRole('button', { name: 'By company' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('group', { name: 'Company' }).getByRole('button', { name: /^Uber/ }).click();
  await expect(page).toHaveURL(/company=Uber/);
  await expect(page.getByRole('button', { name: /^Uber: \d+ problems/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Amazon: \d+ problems/ })).toHaveCount(0);
});

test('pattern search matches aliases', async ({ page }) => {
  await page.goto('/patterns/');
  await page.getByLabel('Search patterns').fill('moving range');
  await expect(page.getByRole('link', { name: 'Sliding window' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Two pointers' })).toHaveCount(0);
});

test('mixed review hides the pattern until revealed', async ({ page }) => {
  await page.goto('/paths/first-steps/');
  const review = page.locator('li', { has: page.getByRole('heading', { name: 'Mixed review' }) });
  await expect(review.getByText('Breadth-first search')).toHaveCount(0);
  await review.getByRole('button', { name: 'Reveal pattern' }).first().click();
  await expect(review.getByRole('link', { name: 'Breadth-first search' })).toBeVisible();
});

test('glossary terms explain themselves in place and close with Escape', async ({ page }) => {
  await page.goto('/problems/book-voucher-pair/');
  await page.getByRole('tab', { name: 'Rules' }).click();
  const term = page.getByRole('button', { name: 'nondecreasing' }).first();
  await term.click();
  await expect(page.getByRole('dialog', { name: 'Definition: Nondecreasing' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(term).toBeFocused();
});

test('BFS lesson draws the graph and the queue', async ({ page }) => {
  await page.goto('/problems/neighborhood-route/?mode=visualize');
  await page.getByLabel('Step', { exact: true }).fill('7');
  await expect(page.getByLabel('queue (front on the left)')).toContainText('C');
  await expect(opLabel(page)).toHaveText('Discover a corner');
  await page.getByLabel('Example').selectOption('unreachable');
  await expect(stepCount(page)).toHaveText('Step 1 of 12');
  await page.getByLabel('Step', { exact: true }).press('End');
  await expect(page.getByText('Output:')).toContainText('None (unreachable)');
});

test('reduced motion removes transitions without hiding information', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/problems/book-voucher-pair/?mode=visualize');
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(opLabel(page)).toHaveText('Start at both ends');
  const pointer = page.locator('g[class*="pointer"]').first();
  await expect(pointer).toBeVisible();
  expect(await pointer.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('0s');
});
