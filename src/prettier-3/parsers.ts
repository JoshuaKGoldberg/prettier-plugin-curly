// CJS/ESM 🫠
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unnecessary-condition */
import * as prettier from "prettier";
import * as babel from "prettier/parser-babel";
import * as typescript from "prettier/parser-typescript";

import { preprocess } from "./preprocess.js";

export const parsers = {
	babel: {
		// @ts-ignore
		...(babel.default ?? babel).parsers.babel,
		preprocess,
	},
	typescript: {
		// @ts-ignore
		...(typescript.default ?? typescript).parsers.typescript,
		preprocess,
	},
} satisfies Record<string, prettier.Parser>;
/* eslint-enable */
