// CJS/ESM 🫠
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
import type { AstPath, Printer } from 'prettier';

import * as estree from "prettier/plugins/estree";

import type{ CollectibleNode } from "./types.js";

import isIgnored from './is-ignored.js'
import {modifyNodeIfMissingBrackets}from './modifyNodeIfMissingBrackets.js'

// @ts-ignore
const estreePrinter = estree.printers.estree

export const printers = {
	estree: {
		...estreePrinter,
		print(path: AstPath<CollectibleNode>, options, print, args) {
			// TODO: Remove this `isIgnored` check we drop support for Prettier<v3.7.0 
      if (!isIgnored(path)) {
        modifyNodeIfMissingBrackets(path)
      }

      // @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return estreePrinter.print(path, options, print, args);
		}
	}

} satisfies Record<string, Printer>;

/* eslint-enable */
