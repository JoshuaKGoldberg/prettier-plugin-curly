import { BlockStatement, Statement } from "@babel/types";

import { CollectibleNode } from "./types.js";

function wrapInBlock(node: Statement): BlockStatement {
	return {
		body: [node],
		directives: [],
		type: "BlockStatement",
	};
}

const allowedBodyNodeTypes = new Set(["BlockStatement", "EmptyStatement"]);
const allowedIfAlternateNodeTypes = new Set(["BlockStatement", "IfStatement"]);

export function modifyNodeIfMissingBrackets(node: CollectibleNode) {
	switch (node.type) {
		case "DoWhileStatement":
		case "ForInStatement":
		case "ForOfStatement":
		case "ForStatement":
		case "WhileStatement":
			if (!allowedBodyNodeTypes.has(node.body.type)) {
				node.body = wrapInBlock(node.body);
				return true;
			}

			break;

		case "IfStatement": {
			let modified: true | undefined;

			if (!allowedBodyNodeTypes.has(node.consequent.type)) {
				node.consequent = wrapInBlock(node.consequent);
				modified = true;
			}

			if (
				node.alternate &&
				!allowedIfAlternateNodeTypes.has(node.alternate.type)
			) {
				node.alternate = wrapInBlock(node.alternate);
				modified = true;
			}

			return modified;
		}
	}

	return false;
}
