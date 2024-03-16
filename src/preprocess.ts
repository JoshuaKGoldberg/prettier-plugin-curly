import { ParseAstOptions, parseAst } from "./parseAst.js";
import { reprintAst } from "./reprintAst.js";
import { traverseAndModifyAst } from "./traverseAndModifyAst.js";

export function preprocess(code: string, options: ParseAstOptions): string {
	// First, we parse the AST using Babel's standard AST parsers.
	const ast = parseAst(code, options);

	// We then traverse it, collecting nodes that have block properties added.
	const collectedNodes = traverseAndModifyAst(ast);

	// We then print the AST back with Babel, modifying collected nodes' ranges.
	return reprintAst(code, Array.from(collectedNodes));
}
