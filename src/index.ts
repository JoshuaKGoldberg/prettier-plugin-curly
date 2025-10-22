import * as babel from "prettier/parser-babel";
import * as typescript from "prettier/parser-typescript";

/**
 * @deprecated These are only exposed for Prettier@<3.7.0.
 * @see https://github.com/prettier/prettier/pull/18072
 */
export const parsers = {
	...babel.parsers,
	...typescript.parsers,
};

export { printers } from "./printers.js";
