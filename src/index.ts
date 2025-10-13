/*
After we drop support for Prettier<v3.7.0
We can remove all exports except the parser
*/
import * as babel from "prettier/parser-babel";
import * as typescript from "prettier/parser-typescript";

export const parsers = {
	...babel.parsers,
  ...typescript.parsers
}
export {printers} from './printers.js'