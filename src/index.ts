import { AstPath } from './../../prettier/src/index.d';
// CJS/ESM 🫠
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import {type Printer} from "prettier";
import * as estree from "prettier/plugins/estree";

import {modifyNodeIfMissingBrackets}from './isNodeMissingBrackets'


// @ts-ignore
const estreePrinter = estree.printers.estree

export const printers = {
	estree: {
		...estreePrinter,
		print(path: AstPath<>, options, print, args) {
			modifyNodeIfMissingBrackets(path)

			const doc = estreePrinter.print(path, options, print, args);


			return doc;
		}
	}

} satisfies Record<string, Printer>;

/* eslint-enable */
