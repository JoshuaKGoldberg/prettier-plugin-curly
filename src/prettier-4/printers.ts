import type { AstPath, Printer } from "prettier";

import * as estree from "prettier/plugins/estree";

import type { CollectibleNode } from "../types.js";

import { isPrettier4 } from "../isPrettier4.js";
import { modifyPathIfMissingBrackets } from "./modifyPathIfMissingBrackets.js";

// @ts-expect-error -- estree does not provide public exports
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const estreePrinter: Printer = estree.printers.estree;

export const printers = {
	estree: {
		...estreePrinter,
		print(path: AstPath<CollectibleNode>, options, print, args) {
			if (!isPrettier4(options)) {
				return estreePrinter.print(path, options, print, args);
			}

			modifyPathIfMissingBrackets(path);

			return estreePrinter.print(path, options, print, args);
		},
	},
} satisfies Record<string, Printer>;
