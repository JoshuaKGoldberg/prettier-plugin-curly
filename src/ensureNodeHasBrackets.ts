import { BlockStatement, Statement } from "@babel/types";

import { CollectibleNode } from "./types.js";

function wrapInBlock(node: Statement): BlockStatement {
	return {
		body: [node],
		directives: [],
		type: "BlockStatement",
	};
}

export function ensureNodeHasBrackets(node: CollectibleNode) {
	switch (node.type) {
		case "DoWhileStatement":
		case "ForStatement":
		case "ForInStatement":
		case "ForOfStatement":
		case "WhileStatement":
			if (node.body.type !== "BlockStatement") {
				node.body = wrapInBlock(node.body);
			}

			return;

		case "IfStatement":
			if (node.consequent.type !== "BlockStatement") {
				node.consequent = wrapInBlock(node.consequent);
			}

			if (
				node.alternate &&
				!["BlockStatement", "IfStatement"].includes(node.alternate.type)
			) {
				node.alternate = wrapInBlock(node.alternate);
			}
	}
}
