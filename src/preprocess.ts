import generate from "@babel/generator";
import { ParserOptions, parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import { RequiredOptions } from "prettier";

import { ensureNodeHasBrackets } from "./ensureNodeHasBrackets.js";
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
	options: Partial<RequiredOptions> & Pick<RequiredOptions, "filepath">,
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

	for (const collectedNode of collectedNodes) {
		ensureNodeHasBrackets(collectedNode);
	}

	// See https://github.com/prettier/prettier/issues/9114 for a Prettier AST format API.
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- CJS/ESM 🫠
	return (generate.default || generate)(ast, {
		comments: true,
		filename: options.filepath,
		retainFunctionParens: true,
		retainLines: true,
	}).code;
}
