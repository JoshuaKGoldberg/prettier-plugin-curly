import { describe, expect, test } from "vitest";

import { preprocess } from "./preprocess.js";

describe("preprocess", () => {
	test.each([
		[`do a; while (b);`, `do { a; } while (b)`],
		[`do { a; } while (b);`, `do { a; } while (b);`],
		[`for (; ; ) d;`, `for (; ; ) { d; }`],
		[`for (; ; ) { d; }`, `for (; ; ) { d; }`],
		[`for (a; b; c) d;`, `for (a; b; c) { d; }`],
		[`for (a; b; c) { d; }`, `for (a; b; c) { d; }`],
		[`for (const a in b) c;`, `for (const a in b) { c; }`],
		[`for (const a in b) { c; }`, `for (const a in b) { c; }`],
		[`for (const a of b) c;`, `for (const a of b) { c; }`],
		[`for (const a of b) { c; }`, `for (const a of b) { c; }`],
		[`if (a) b;`, `if (a) { b; }`],
		[`if (a) { b; }`, `if (a) { b; }`],
		[`if (a) b; else c;`, `if (a) { b; } else { c; }`],
		[`if (a) {} else b;`, `if (a) {} else { b; }`],
		[`if (a) b; else { c; }`, `if (a) { b; } else { c; }`],
		[`if (a) b; else if (b) c;`, `if (a) { b; } else if (b) { c; }`],
		["let a; let a;", "let a; let a;"],
		["foo; import a from 'bar'", "foo; import a from 'bar'"],
		["return;", "return;"],
		["new.target;", "new.target;"],
		["await 1;", "await 1;"],
		["super;", "super;"],
		["export { foo };", "export { foo };"],
		[`while (a) b;`, `while (a) { b; }`],
		[`while (a) { b; }`, `while (a) { b; }`],
		["while (a) <b>c;", "while (a) { <b>c; }"],
		["while (a) <b />;", "while (a) { <b />; }", "test.js"],
		["while (a) <b />;", "while (a) { <b />; }", "test.tsx"],
	])("%s becomes %s", (input, expected, filepath = "test.ts") => {
		expect(preprocess(input, { filepath })).toBe(expected);
	});
});
