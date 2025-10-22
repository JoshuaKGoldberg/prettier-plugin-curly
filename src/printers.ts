// CJS/ESM 🫠
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { AstPath, Printer } from "prettier";

import * as estree from "prettier/plugins/estree";

import type { CollectibleNode } from "./types.js";

import { modifyNodeIfMissingBrackets } from "./modifyNodeIfMissingBrackets.js";

// @ts-expect-error -- estree does not provide types for this plugin
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const estreePrinter: Printer = estree.printers.estree;

export const printers = {
	estree: {
		...estreePrinter,
		print(path: AstPath<CollectibleNode>, options, print, args) {
			modifyNodeIfMissingBrackets(path);

			return estreePrinter.print(path, options, print, args);
		},
	},
} satisfies Record<string, Printer>;

/* eslint-enable */
