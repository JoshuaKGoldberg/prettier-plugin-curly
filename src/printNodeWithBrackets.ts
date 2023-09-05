import { CollectibleNode } from "./types.js";

export function printNodeWithBrackets(code: string, node: CollectibleNode) {
	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	switch (node.type) {
		case "DoWhileStatement":
			return [
				"do { ",
				code.slice(node.body.start!, node.body.end!),
				" } while (",
				code.slice(node.test.start!, node.test.end!),
				")",
			].join("");

		case "ForStatement":
			return [
				"for (",
				node.init && code.slice(node.init.start!, node.init.end!),
				"; ",
				node.test && code.slice(node.test.start!, node.test.end!),
				"; ",
				node.update && code.slice(node.update.start!, node.update.end!),
				") { ",
				code.slice(node.body.start!, node.body.end!),
				" }",
			]
				.filter(Boolean)
				.join("");

		case "ForInStatement":
			return [
				"for (",
				code.slice(node.left.start!, node.left.end!),
				" in ",
				code.slice(node.right.start!, node.right.end!),
				") { ",
				code.slice(node.body.start!, node.body.end!),
				" }",
			].join("");

		case "ForOfStatement":
			return [
				"for (",
				code.slice(node.left.start!, node.left.end!),
				" of ",
				code.slice(node.right.start!, node.right.end!),
				") { ",
				code.slice(node.body.start!, node.body.end!),
				" }",
			].join("");

		case "IfStatement":
			return [
				code.slice(node.start!, node.test.end!),
				") { ",
				code.slice(node.consequent.start!, node.consequent.end!),
				" }",
				node.alternate && [
					" else ",
					node.alternate.type !== "IfStatement" &&
						(node.alternate.type === "BlockStatement"
							? code.slice(node.alternate.start!, node.alternate.end!)
							: [
									"{ ",
									code.slice(node.alternate.start!, node.alternate.end!),
									" }",
							  ]),
				],
			]
				.flat(Infinity)
				.filter(Boolean)
				.join("");

		case "WhileStatement":
			return [
				code.slice(node.start!, node.test.end!),
				") { ",
				code.slice(node.body.start!, node.end!),
				" }",
			].join("");
	}
	/* eslint-enable @typescript-eslint/no-non-null-assertion */
}
