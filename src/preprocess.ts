import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import { Node } from "@babel/types";
import { RequiredOptions } from "prettier";

import { printNodeWithBrackets } from "./printNodeWithBrackets.js";
import { CollectibleNode } from "./types.js";

export function preprocess(
	code: string,
	options: Pick<RequiredOptions, "filepath">
) {
	const ast = parse(code, {
		// Note: these are a best-guess attempt to match most common syntax features.
		// If users need to modify this list, we should probably add a plugin option.
		plugins: [
			"decoratorAutoAccessors",
			"decorators-legacy",
			"importAssertions",
			...(/(?:js|x)$/.test(options.filepath) ? ["jsx" as const] : []),
			"typescript",
		],
		sourceType: "module",
	});
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
