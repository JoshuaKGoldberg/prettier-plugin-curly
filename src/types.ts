import type * as babel from "@babel/types";

export type CollectibleNode =
	| babel.DoWhileStatement
	| babel.ForInStatement
	| babel.ForOfStatement
	| babel.ForStatement
	| babel.IfStatement
	| babel.WhileStatement;
