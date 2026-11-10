import * as prettier from "prettier";
import * as packageJson from "prettier-plugin-packagejson";
import * as babel from "prettier/plugins/babel";
import * as typescript from "prettier/plugins/typescript";
import { describe, expect, test, vi } from "vitest";

import * as plugin from "./index.js";

vi.mock("prettier", async (importOriginal) => ({
	...(await importOriginal<typeof prettier>()),
	version: "3.6.2",
}));

function format(code: string, options: prettier.Options) {
	return prettier.format(code, {
		...options,
		plugins: [...(options.plugins ?? []), plugin],
	});
}

describe.each([
	["babel", babel.parsers.babel],
	["babel-ts", babel.parsers["babel-ts"]],
	["typescript", typescript.parsers.typescript],
] as const)("%s parser composition on Prettier <3.7.0", (parser, original) => {
	test.each([
		[
			"preprocess",
			{ preprocess: (text: string) => text.replace("ready", "isReady") },
		],
		[
			"parse",
			{
				parse: (text: string, options: prettier.ParserOptions): unknown =>
					original.parse(text.replace("ready", "isReady"), options),
			},
		],
	])("preserves an earlier parser's %s", async (_, override) => {
		const earlierPlugin: prettier.Plugin = {
			parsers: { [parser]: { ...original, ...override } },
		};
		expect(
			await format("if (ready) run();", {
				parser,
				plugins: [earlierPlugin],
			}),
		).toBe("if (isReady) {\n  run();\n}\n");
	});
});

test("preserves package.json sorting on Prettier <3.7.0", async () => {
	expect(
		await format('{"version":"1.0.0","name":"example"}', {
			filepath: "package.json",
			plugins: [packageJson],
		}),
	).toBe('{\n  "name": "example",\n  "version": "1.0.0"\n}\n');
});
