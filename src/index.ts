import { Parser } from "prettier";
import babel from "prettier/parser-babel";
import typescript from "prettier/parser-typescript";

import { preprocess } from "./preprocess.js";

export const parsers: Record<string, Parser> = {
	babel: {
		...babel.parsers.babel,
		preprocess,
	},
	typescript: {
		...typescript.parsers.typescript,
		preprocess,
	},
};
