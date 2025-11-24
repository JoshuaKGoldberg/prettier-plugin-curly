import type { AstPath } from "prettier";

import type { CollectibleNode } from "../types.js";

import { modifyNodeIfMissingBrackets } from "../modifyNodeIfMissingBrackets.js";

export function modifyPathIfMissingBrackets(path: AstPath<CollectibleNode>) {
	modifyNodeIfMissingBrackets(path.node);
}
