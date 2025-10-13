import type { BlockStatement, Statement } from "@babel/types";
import type { AstPath } from "prettier";

import type { CollectibleNode } from "./types.js";

function wrapInBlock(node: Statement): BlockStatement {
	return {
		body: [node],
		directives: [],
		type: "BlockStatement",
	};
}

const allowedBodyNodeTypes = new Set(["BlockStatement", "EmptyStatement"]);
const allowedIfAlternateNodeTypes = new Set(["BlockStatement", "IfStatement"]);

export function modifyNodeIfMissingBrackets(path: AstPath<CollectibleNode>) {
	const { node } = path;

	switch (node.type) {
		case "DoWhileStatement":
		case "ForInStatement":
		case "ForOfStatement":
		case "ForStatement":
		case "WhileStatement":
			if (!allowedBodyNodeTypes.has(node.body.type)) {
				node.body = wrapInBlock(node.body);
			}

			break;

		case "IfStatement": {
			if (!allowedBodyNodeTypes.has(node.consequent.type)) {
				node.consequent = wrapInBlock(node.consequent);
			}

			if (
				node.alternate &&
				!allowedIfAlternateNodeTypes.has(node.alternate.type)
			) {
				node.alternate = wrapInBlock(node.alternate);
			}
		}
	}
}
