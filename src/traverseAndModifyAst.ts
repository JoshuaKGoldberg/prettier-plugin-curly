// CJS/ESM 🫠
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

import traverse, { Node, NodePath } from "@babel/traverse";

import { modifyNodeIfMissingBrackets } from "./modifyNodeIfMissingBrackets.js";
import { CollectibleNode } from "./types.js";

export function traverseAndModifyAst(ast: Node) {
	const modifiedNodes = new Set<CollectibleNode>();
	const seenNodes = new Set<Node>();

	function collector({ node }: NodePath<CollectibleNode>) {
		if (
			modifyNodeIfMissingBrackets(node) &&
			nodeNotAlreadySeen(node, seenNodes)
		) {
			// Remove comments from the original node to avoid duplication
			delete node.leadingComments;
			delete node.trailingComments;

			modifiedNodes.add(node);
		}
	}

	// @ts-ignore
	(traverse.default ?? traverse)(ast, {
		DoWhileStatement: collector,
		ForInStatement: collector,
		ForOfStatement: collector,
		ForStatement: collector,
		IfStatement: collector,
		noScope: true,
		WhileStatement: collector,
	});

	return modifiedNodes;
}

function nodeNotAlreadySeen(node: Node, seenNodes: Set<Node>) {
	if (seenNodes.has(node)) {
		return false;
	}

	// All child nodes are marked as seen and removed from collections,
	// so that we don't accidentally print overlapping fixes for them later.
	// @ts-ignore
	(traverse.default ?? traverse)(node, {
		// @ts-ignore
		enter(path) {
			seenNodes.add(path.node);
		},
		noScope: true,
	});

	seenNodes.add(node);

	return true;
}

/* eslint-enable */
