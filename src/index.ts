import { Parser } from "prettier";
import * as babel from "prettier/parser-babel";
import * as typescript from "prettier/parser-typescript";

import { preprocess } from "./preprocess.js";

export const parsers = {
	babel: {
		// @ts-ignore
		...(babel.default || babel).parsers.babel,
		preprocess,
	},
	typescript: {
		// @ts-ignore
		...(typescript.default || typescript).parsers.typescript,
		preprocess,
	},
} satisfies Record<string, Parser>;
