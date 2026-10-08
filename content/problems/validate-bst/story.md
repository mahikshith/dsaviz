## Situation

An orchard has a strict rule: for every tree, all trees on its left side are shorter and all trees on its right side are taller. The orchard **5 / 1 4 / _ _ 3 6** must be inspected.

## Goal

Answer True if the whole orchard follows the rule, and False otherwise.

## Rules

- The rule applies to every ancestor, not just the parent.
- Equal heights are not allowed.

## Worked example

**2 / 1 3** follows the rule. In **5 / 1 4 / _ _ 3 6**, 4 sits to the right of 5 but is shorter: **False**.
