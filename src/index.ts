import { Parser } from "prettier";
import babel from "prettier/parser-babel";
import typescript from "prettier/parser-typescript";

import { preprocess } from "./preprocess.js";

export const parsers = {
	babel: {
		...babel.parsers.babel,
		preprocess,
	},
	typescript: {
		...typescript.parsers.typescript,
		preprocess,
	},
} satisfies Record<string, Parser>;
