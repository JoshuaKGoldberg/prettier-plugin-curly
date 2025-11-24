import { isPrettier4 } from "../isPrettier4.js";
import { ParseAstOptions } from "./parseAst.js";
import { parseAst } from "./parseAst.js";
import { reprintAst } from "./reprintAst.js";
import { traverseAndModifyAst } from "./traverseAndModifyAst.js";

export function preprocess(code: string, options: ParseAstOptions): string {
	if (isPrettier4(options)) {
		return code;
	}

	// First, we parse the AST using Babel's standard AST parsers.
	const ast = parseAst(code, options);

	// We then traverse it, collecting nodes that have block properties added.
	const modifiedNodes = traverseAndModifyAst(ast);

	// We then print the AST back with Babel, modifying collected nodes' ranges.
	return reprintAst(code, Array.from(modifiedNodes));
}
