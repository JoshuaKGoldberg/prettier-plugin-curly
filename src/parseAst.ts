import { ParserOptions, parse } from "@babel/parser";
import { RequiredOptions } from "prettier";

export type ParseAstOptions = Partial<RequiredOptions> &
	Pick<RequiredOptions, "filepath">;

export function parseAst(code: string, options: ParseAstOptions) {
	return parse(code, getParseOptions(/(?:js|x)$/.test(options.filepath)));
}

function getParseOptions(isJsx: boolean): ParserOptions {
	return {
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
	};
}
