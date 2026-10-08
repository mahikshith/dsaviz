## Situation

A packing robot builds shipping crates with compartments inside compartments. Each compartment has its own shape of lid: **round**, **square** or **curly**. The robot writes a log with one symbol each time it opens a compartment and one each time it puts a lid on.

Today's log reads **{ [ ( ) ] ( ) }**.

## Goal

Decide whether the crate was packed correctly: answer True or False.

## Rules

- Each shape has one pair of symbols: round `()`, square `[]`, curly `{}`.
- A compartment opened inside another must be closed first. The next lid must always fit the compartment opened **most recently** that is still open.
- A lid can only close an open compartment. A lid with nothing open is an error.
- When the log ends, every compartment must be closed.
- The log contains only these six symbols.

## Worked example

In `{[()]()}` the curly compartment holds a square one, which holds a round one. The round lid closes the round compartment, the square lid closes the square one, a second round compartment opens and closes, and finally the curly lid closes the outer compartment. Everything matches and nothing is left open: **True**.

In `([)]` a square lid arrives while the round compartment is still the most recent open one: **False**.
