import { ParserOptions, parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import { RequiredOptions } from "prettier";

import { printNodeWithBrackets } from "./printNodeWithBrackets.js";
import { CollectibleNode } from "./types.js";

const getParseOptions = (isJsx: boolean): ParserOptions => ({
	allowImportExportEverywhere: true,
	allowNewTargetOutsideFunction: true,
	allowReturnOutsideFunction: true,
	allowSuperOutsideMethod: true,
	allowUndeclaredExports: true,
	errorRecovery: true,
	plugins: [
		"doExpressions",
		"exportDefaultFrom",
		"functionBind",
		"functionSent",
		"throwExpressions",
		"partialApplication",
		"decorators",
		"decimal",
		"moduleBlocks",
		"asyncDoExpressions",
		"regexpUnicodeSets",
		"destructuringPrivate",
		"decoratorAutoAccessors",
		"importReflection",
		"explicitResourceManagement",
		"decoratorAutoAccessors",
		"typescript",
		...(isJsx ? ["jsx" as const] : []),
		["importAttributes", { deprecatedAssertSyntax: true }],
	],
	ranges: true,
	sourceType: "module",
});

export function preprocess(
	code: string,
	options: Pick<RequiredOptions, "filepath">,
) {
	const ast = parse(code, getParseOptions(/(?:js|x)$/.test(options.filepath)));
	const collectedNodes: CollectibleNode[] = [];

	function collector({ node }: NodePath<CollectibleNode>) {
		collectedNodes.push(node);
	}

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- CJS/ESM 🫠
	(traverse.default || traverse)(ast, {
		DoWhileStatement: collector,
		ForInStatement: collector,
		ForOfStatement: collector,
		ForStatement: collector,
		IfStatement: collector,
		WhileStatement: collector,
		noScope: true,
	});

	let output = "";
	let lastEnd = 0;

	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	for (const collectedNode of collectedNodes) {
		output += code.slice(lastEnd, collectedNode.start!);
		output += printNodeWithBrackets(code, collectedNode);
		lastEnd = collectedNode.end!;
	}
	/* eslint-enable @typescript-eslint/no-non-null-assertion */

	return output + code.slice(lastEnd);
}
