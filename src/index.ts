import { parsers as babelParsers } from "prettier/parser-babel";
import { parsers as typescriptParsers } from "prettier/parser-typescript";

import { preprocess } from "./preprocess.js";

export const parsers = {
	babel: {
		...babelParsers.babel,
		preprocess,
	},
	typescript: {
		...typescriptParsers.typescript,
		preprocess,
	},
};
