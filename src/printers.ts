import type { AstPath, Printer } from "prettier";

import * as estree from "prettier/plugins/estree";

import type { CollectibleNode } from "./types.js";

import { modifyNodeIfMissingBrackets } from "./modifyNodeIfMissingBrackets.js";

// @ts-expect-error -- estree does not provide public exports
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const estreePrinter: Printer = estree.printers.estree;

function withCurly(printer: Printer): Printer {
	return {
		...printer,
		print(path: AstPath<CollectibleNode>, options, print, args) {
			modifyNodeIfMissingBrackets(path);

			return printer.print(path, options, print, args);
		},
	};
}

export const printers: Record<string, Printer> = {
	estree: withCurly(estreePrinter),
	// @ts-expect-error -- Prettier supports printer initializers without public types
	"estree-oxc": async () => {
		const oxc = await import("@prettier/plugin-oxc");
		return withCurly(oxc.printers["estree-oxc"]);
	},
};
