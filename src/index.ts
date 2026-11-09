import type { Parser } from "prettier";

import * as babel from "prettier/plugins/babel";
import * as typescript from "prettier/plugins/typescript";

async function createOxcParser(name: "oxc" | "oxc-ts"): Promise<Parser> {
	const oxc = await import("@prettier/plugin-oxc");
	return {
		...oxc.parsers[name],
		async preprocess(text, options) {
			for (const plugin of [...options.plugins].reverse()) {
				if (
					typeof plugin === "string" ||
					!("parsers" in plugin) ||
					plugin.parsers === parsers
				) {
					continue;
				}

				const previousParser = plugin.parsers?.[name];
				if (previousParser) {
					return (await previousParser.preprocess?.(text, options)) ?? text;
				}
			}

			return text;
		},
	};
}

export const parsers: Record<string, Parser> = {
	// Babel and TypeScript parser exports support Prettier <3.7.0.
	// https://github.com/prettier/prettier/pull/18072
	...babel.parsers,
	...typescript.parsers,
	// @ts-expect-error -- Prettier calls lazy parser factories, but its types only accept Parser objects
	oxc: () => createOxcParser("oxc"),
	// @ts-expect-error -- Prettier calls lazy parser factories, but its types only accept Parser objects
	"oxc-ts": () => createOxcParser("oxc-ts"),
};

export { printers } from "./printers.js";
