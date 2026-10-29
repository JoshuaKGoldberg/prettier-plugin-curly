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
	...babel.parsers,
	...typescript.parsers,
	// @ts-expect-error -- Prettier supports parser initializers without public types
	oxc: () => createOxcParser("oxc"),
	// @ts-expect-error -- Prettier supports parser initializers without public types
	"oxc-ts": () => createOxcParser("oxc-ts"),
};

export { printers } from "./printers.js";
