import * as prettier from "prettier";
import { describe, expect, test } from "vitest";

import * as plugin from "./index.js";

function format(code: string, options: prettier.Options) {
	return prettier.format(code, {
		...options,
		plugins: [plugin],
	});
}

describe("Tests", () => {
	test.each([
		[`do a; while (b);`],
		[`do { a; } while (b);`],
		[
			`
do
/* a */
b; while (c)
`,
		],
		[
			`
do /* a */
b; while (c)
`,
		],
		[
			`
do
//a
b; while (c)
`,
		],
		[
			`
do //a
b; while (c)
`,
		],
		[`for (; ; ) ;`],
		[`for (; ; ) d;`],
		[`for (; ; ) { d; }`],
		[`for (a; b; c) d;`],
		[`for (a; b; c) { d; }`],
		[`for (const a in b) c;`],
		[`for (const a in b) { c; }`],
		[`for (const a of b) c;`],
		[`for (const a of b) { c; }`],
		[`if (a) b;`],
		[`if (a) { b; }`],
		[`if (a) b; else c;`],
		[`if (a) {} else b;`],
		[`if (a) b; else { c; }`],
		[`if (a) b; else if (b) c;`],
		["if (a) if (b) c;"],
		["if (a) { if (b) c; }"],
		["if (a) if (b) if (c) d;"],
		["if (a) if (b) {} else if (c) d;"],
		[
			`
if(a) //b
c
`,
		],
		[
			`
if(a)
//b
c
`,
		],
		[
			`
if (!'+-×*/÷'.includes(ch))
  continue;
`,
		],
		[`let a; let a;`],
		[`foo; import a from 'bar'`],
		[`return;`],
		[`new.target;`],
		[`await 1;`],
		[`export { foo };`],
		[`while (a) ;`],
		[`while (a) b;`],
		[`while (a) { b; }`],
		[`while (a) <b>c;`],
		[`while (a) <b />;`, "test.js"],
		[`while (a) <b />;`, "test.jsx"],
		[
			`
while (a) // b
<c> d;
`,
		],

		// Babel has different behaviors around newlines which we should avoid.
		// This test ensures irrelevant nodes don't get reformatted unnecessarily.
		// https://github.com/JoshuaKGoldberg/prettier-plugin-curly/pull/309/files#r1527185682
		[
			`
if (a) b;
_ = {
	a: [
		"b",
	],
	c: "d"
};
`,
		],
		[
			`
const p = 'test';


//pre comment
//this is another pre comment
if (a) b;
//post comment

someOtherCode();
`,
		],
		[
			`
// pre comment
if (a)
	// inner comment
	b;
// post comment
`,
		],

		// #625
		[
			`
// prettier-ignore
function ignored() {
    if(foo  .bar)
        return
}
`,
		],
	])("%j", async (input, filepath = "test.ts") => {
		const output = await format(input, { filepath });
		const snapshot = `
${createLine(" Input ")}
${input.trimEnd()}

${createLine(" Output ")}
${output.trimEnd()}
`;
		expect(snapshot).toMatchSnapshot();
	});
});

const createLine = (text = "") => {
	const space = 80 - text.length;
	const before = Math.floor(space / 2);
	const after = space - before;

	return "-".repeat(before) + text + "-".repeat(after);
};
