# DSAMaxxing design rules

The site is a calm place to learn. A learner should know what to do next within two seconds of opening any page.

## Simplicity

1. One main action per screen. Everything else is quieter.
2. At most three blocks in the first screen. More goes behind a tab, a fold or a link.
3. Short labels. A heading needs no sentence under it unless the learner would be stuck without it.
4. Never show the same fact twice on one page.
5. If a control cannot show its full label, it does not belong there. Never truncate a thing the learner must choose.
6. Story words (story names, roles such as "the left marker") appear only inside the story player. Everywhere else a problem goes by its title.
7. No emoji or smiley symbols. Icons are the plain line icons from the nav.

## Space

8. Spacing comes from 8, 16, 24, 32, 48. Gaps between items of the same kind are always equal.
9. A page has one content width and one left edge. Columns line up.
10. No empty regions. If a side is empty, the content takes the width. If a path is short, it does not leave a hole.
11. Text never overlaps and is never cut off, at 1440, 1280, 1024 or 390 wide. tests/site-test.js checks this.

## Finding your way

12. Every page you reach from another page has a Back link that names where it returns to.
13. Every lesson has Previous and Next.
14. The logo opens the site's front page. Home is the learner's own page: where they left off, their calendar, and their next step.

## Motion

15. Follow `.claude/skills/design-motion-principles`: frequent actions get no animation, and motion explains something or it goes.
