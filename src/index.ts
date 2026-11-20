import type { Parser, ParserOptions } from "prettier";

import { version } from "prettier";
import * as babel from "prettier/plugins/babel";
import * as typescript from "prettier/plugins/typescript";

const [majorVersion, minorVersion] = version.split(".").map(Number);

async function createOxcParser(name: "oxc" | "oxc-ts"): Promise<Parser> {
	const oxc = await import("@prettier/plugin-oxc");
	return withEarlierParser(name, oxc.parsers[name]);
}

// Curly provides parsers only so Prettier uses its printers.
// Each parser runs the parser it overrides, such as an import sorter's.
function withEarlierParser(name: string, parser: Parser<unknown>): Parser {
	function getEarlierParser(options: ParserOptions): Parser<unknown> {
		const curlyIndex = options.plugins.findIndex(
			(plugin) =>
				typeof plugin === "object" &&
				"parsers" in plugin &&
				plugin.parsers === parsers,
		);

		let earlierParser = parser;
		for (const plugin of options.plugins.slice(0, curlyIndex)) {
			if (
				typeof plugin === "object" &&
				"parsers" in plugin &&
				plugin.parsers?.[name]
			) {
				earlierParser = plugin.parsers[name];
			}
		}

		return earlierParser;
	}

	return {
		...parser,
		parse(text, options) {
			return getEarlierParser(options).parse(text, options);
		},
		// Prettier <3.7.0 calls preprocess synchronously.
		preprocess(text, options) {
			return getEarlierParser(options).preprocess?.(text, options) ?? text;
		},
	};
}

export const parsers: Record<string, Parser> = {
	// Babel and TypeScript parser exports support Prettier <3.7.0.
	// https://github.com/prettier/prettier/pull/18072
	...(majorVersion === 3 && minorVersion < 7
		? Object.fromEntries(
				Object.entries({ ...babel.parsers, ...typescript.parsers }).map(
					([name, parser]) => [name, withEarlierParser(name, parser)],
				),
			)
		: {}),
	// @ts-expect-error -- Prettier calls lazy parser factories, but its types only accept Parser objects
	oxc: () => createOxcParser("oxc"),
	// @ts-expect-error -- Prettier calls lazy parser factories, but its types only accept Parser objects
	"oxc-ts": () => createOxcParser("oxc-ts"),
};

export { printers } from "./printers.js";
