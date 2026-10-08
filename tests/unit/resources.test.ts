import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { GROUPS, NAV } from '@/features/resources/content';

const sectionIds = GROUPS.flatMap((g) => g.sections.map((s) => s.id));
// Every href in the content, wherever it is nested.
const hrefs = [...JSON.stringify(GROUPS).matchAll(/"href":"([^"]+)"/g)].map((m) => m[1]!);

describe('resources page content', () => {
  it('gives every side panel item a section with a unique, anchor-safe id', () => {
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    for (const item of NAV.flatMap((g) => g.items)) {
      expect(sectionIds).toContain(item.id);
      expect(item.id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it('links only to patterns that exist', () => {
    const patterns = hrefs.filter((h) => h.startsWith('/patterns/') && h !== '/patterns/');
    expect(patterns.length).toBeGreaterThan(0);
    for (const h of patterns) {
      const id = h.match(/^\/patterns\/([a-z0-9-]+)\/$/)?.[1];
      expect(id, h).toBeTruthy();
      expect(fs.existsSync(path.join(process.cwd(), 'content', 'patterns', id!, 'pattern.json')), h).toBe(true);
    }
  });

  it('uses https for external links and trailing slashes for internal ones', () => {
    for (const h of hrefs) {
      if (h.startsWith('/')) expect(h, h).toMatch(/\/$/);
      else expect(h, h).toMatch(/^https:\/\//);
    }
  });
});
