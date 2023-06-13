import { parse, ParserOptions } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import { Node } from "@babel/types";
import { RequiredOptions } from "prettier";

import { printNodeWithBrackets } from "./printNodeWithBrackets.js";
import { CollectibleNode } from "./types.js";

const getParseOptions = (isJsx: boolean): ParserOptions => ({
	sourceType: "module",
	allowImportExportEverywhere: true,
	allowReturnOutsideFunction: true,
	allowNewTargetOutsideFunction: true,
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
});

export function preprocess(
	code: string,
	options: Pick<RequiredOptions, "filepath">
) {
	const ast = parse(code, getParseOptions(/(?:js|x)$/.test(options.filepath)));
	const collectedNodes: CollectibleNode[] = [];

	function createCollector<PropertyKey extends string>(property: PropertyKey) {
		return ({
			node,
		}: NodePath<CollectibleNode & Record<PropertyKey, Node>>) => {
			if (node[property].type !== "BlockStatement") {
				collectedNodes.push(node);
			}
		};
	}

	traverse(ast, {
		noScope: true,
		DoWhileStatement: createCollector("body"),
		ForInStatement: createCollector("body"),
		ForOfStatement: createCollector("body"),
		ForStatement: createCollector("body"),
		IfStatement: createCollector("consequent"),
		WhileStatement: createCollector("body"),
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
