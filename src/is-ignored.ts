/**
This file is bundled from Prettier code base with this command

```
yarn esbuild src/language-js/utils/is-ignored.js --bundle --format=esm
```
*/

// @ts-nocheck

// src/utils/is-non-empty-array.js
function isNonEmptyArray(object) {
  return Array.isArray(object) && object.length > 0;
}
var is_non_empty_array_default = isNonEmptyArray;

// node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// src/utils/whitespace-utils.js
var WhitespaceUtils = class {
  #whitespaceCharacters;
  constructor(whitespaceCharacters) {
    this.#whitespaceCharacters = new Set(whitespaceCharacters);
    if (
      this.#whitespaceCharacters.size === 0 ||
      Array.prototype.some.call(
        whitespaceCharacters,
        (character) => !/^\s$/u.test(character),
      )
    ) {
      throw new TypeError(
        `Invalid characters: ${JSON.stringify(whitespaceCharacters)}`,
      );
    }
  }
  getLeadingWhitespaceCount(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    let count = 0;
    for (
      let index = 0;
      index < text.length && whitespaceCharacters.has(text.charAt(index));
      index++
    ) {
      count++;
    }
    return count;
  }
  getTrailingWhitespaceCount(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    let count = 0;
    for (
      let index = text.length - 1;
      index >= 0 && whitespaceCharacters.has(text.charAt(index));
      index--
    ) {
      count++;
    }
    return count;
  }
  getLeadingWhitespace(text) {
    const count = this.getLeadingWhitespaceCount(text);
    return text.slice(0, count);
  }
  getTrailingWhitespace(text) {
    const count = this.getTrailingWhitespaceCount(text);
    return text.slice(text.length - count);
  }
  hasLeadingWhitespace(text) {
    return this.#whitespaceCharacters.has(text.charAt(0));
  }
  hasTrailingWhitespace(text) {
    return this.#whitespaceCharacters.has(text.at(-1));
  }
  trimStart(text) {
    const count = this.getLeadingWhitespaceCount(text);
    return text.slice(count);
  }
  trimEnd(text) {
    const count = this.getTrailingWhitespaceCount(text);
    return text.slice(0, text.length - count);
  }
  trim(text) {
    return this.trimEnd(this.trimStart(text));
  }
  split(text, captureWhitespace = false) {
    const pattern = `[${escapeStringRegexp(
      [...this.#whitespaceCharacters].join(""),
    )}]+`;
    const regexp = new RegExp(
      captureWhitespace ? `(${pattern})` : pattern,
      "u",
    );
    return text.split(regexp);
  }
  hasWhitespaceCharacter(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    return Array.prototype.some.call(text, (character) =>
      whitespaceCharacters.has(character),
    );
  }
  hasNonWhitespaceCharacter(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    return Array.prototype.some.call(
      text,
      (character) => !whitespaceCharacters.has(character),
    );
  }
  isWhitespaceOnly(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    return Array.prototype.every.call(text, (character) =>
      whitespaceCharacters.has(character),
    );
  }
};
var whitespace_utils_default = WhitespaceUtils;

// src/language-js/utils/create-type-check-function.js
function createTypeCheckFunction(typesArray) {
  const types = new Set(typesArray);
  return (node) => types.has(node?.type);
}
var create_type_check_function_default = createTypeCheckFunction;

// src/language-js/utils/get-raw.js
function getRaw(node) {
  return node.extra?.raw ?? node.raw;
}
var get_raw_default = getRaw;

// src/language-js/utils/is-block-comment.js
var isBlockComment = create_type_check_function_default([
  "Block",
  "CommentBlock",
  // `meriyah`
  "MultiLine",
]);
var is_block_comment_default = isBlockComment;

// src/language-js/utils/is-line-comment.js
var isLineComment = create_type_check_function_default([
  "Line",
  "CommentLine",
  // `meriyah` has `SingleLine`, `HashbangComment`, `HTMLOpen`, and `HTMLClose`
  "SingleLine",
  "HashbangComment",
  "HTMLOpen",
  "HTMLClose",
  // `espree`, and `oxc`(with `{astType: 'ts'}`)
  "Hashbang",
  // `babel` and `flow` hashbang
  "InterpreterDirective",
]);
var is_line_comment_default = isLineComment;

// src/language-js/utils/index.js
var isExportDeclaration = create_type_check_function_default([
  "ExportDefaultDeclaration",
  "DeclareExportDeclaration",
  "ExportNamedDeclaration",
  "ExportAllDeclaration",
  "DeclareExportAllDeclaration",
]);
var isArrayExpression = create_type_check_function_default(["ArrayExpression"]);
var isObjectExpression = create_type_check_function_default([
  "ObjectExpression",
]);
var isLiteral = create_type_check_function_default([
  "Literal",
  "BooleanLiteral",
  "BigIntLiteral",
  // Babel, flow use `BigIntLiteral` too
  "DirectiveLiteral",
  "NullLiteral",
  "NumericLiteral",
  "RegExpLiteral",
  "StringLiteral",
]);
var isSingleWordType = create_type_check_function_default([
  "Identifier",
  "ThisExpression",
  "Super",
  "PrivateName",
  "PrivateIdentifier",
]);
var isObjectType = create_type_check_function_default([
  "ObjectTypeAnnotation",
  "TSTypeLiteral",
  "TSMappedType",
]);
var isFunctionOrArrowExpression = create_type_check_function_default([
  "FunctionExpression",
  "ArrowFunctionExpression",
]);
var isJsxElement = create_type_check_function_default([
  "JSXElement",
  "JSXFragment",
]);
var isBinaryish = create_type_check_function_default([
  "BinaryExpression",
  "LogicalExpression",
  "NGPipeExpression",
]);
var isSimpleTypeAnnotation = create_type_check_function_default([
  "TSThisType",
  // literals
  "NullLiteralTypeAnnotation",
  "BooleanLiteralTypeAnnotation",
  "StringLiteralTypeAnnotation",
  "BigIntLiteralTypeAnnotation",
  "NumberLiteralTypeAnnotation",
  "TSLiteralType",
  "TSTemplateLiteralType",
]);
var skipChainExpression = (fn) => (node) => {
  if (node?.type === "ChainExpression") {
    node = node.expression;
  }
  return fn(node);
};
var isCallExpression = skipChainExpression(
  create_type_check_function_default([
    "CallExpression",
    "OptionalCallExpression",
  ]),
);
var isMemberExpression = skipChainExpression(
  create_type_check_function_default([
    "MemberExpression",
    "OptionalMemberExpression",
  ]),
);
var PRECEDENCE = new Map(
  [
    ["|>"],
    ["??"],
    ["||"],
    ["&&"],
    ["|"],
    ["^"],
    ["&"],
    ["==", "===", "!=", "!=="],
    ["<", ">", "<=", ">=", "in", "instanceof"],
    [">>", "<<", ">>>"],
    ["+", "-"],
    ["*", "/", "%"],
    ["**"],
  ].flatMap((operators, index) =>
    operators.map((operator) => [operator, index]),
  ),
);
function isPrettierIgnoreComment(comment) {
  return comment.value.trim() === "prettier-ignore" && !comment.unignore;
}
function hasNodeIgnoreComment(node) {
  return (
    node?.prettierIgnore || hasComment(node, CommentCheckFlags.PrettierIgnore)
  );
}
var CommentCheckFlags = {
  /** Check comment is a leading comment */
  Leading: 1 << 1,
  /** Check comment is a trailing comment */
  Trailing: 1 << 2,
  /** Check comment is a dangling comment */
  Dangling: 1 << 3,
  /** Check comment is a block comment */
  Block: 1 << 4,
  /** Check comment is a line comment */
  Line: 1 << 5,
  /** Check comment is a `prettier-ignore` comment */
  PrettierIgnore: 1 << 6,
  /** Check comment is the first attached comment */
  First: 1 << 7,
  /** Check comment is the last attached comment */
  Last: 1 << 8,
};
var getCommentTestFunction = (flags, fn) => {
  if (typeof flags === "function") {
    fn = flags;
    flags = 0;
  }
  if (flags || fn) {
    return (comment, index, comments) =>
      !(
        (flags & CommentCheckFlags.Leading && !comment.leading) ||
        (flags & CommentCheckFlags.Trailing && !comment.trailing) ||
        (flags & CommentCheckFlags.Dangling &&
          (comment.leading || comment.trailing)) ||
        (flags & CommentCheckFlags.Block &&
          !is_block_comment_default(comment)) ||
        (flags & CommentCheckFlags.Line && !is_line_comment_default(comment)) ||
        (flags & CommentCheckFlags.First && index !== 0) ||
        (flags & CommentCheckFlags.Last && index !== comments.length - 1) ||
        (flags & CommentCheckFlags.PrettierIgnore &&
          !isPrettierIgnoreComment(comment)) ||
        (fn && !fn(comment))
      );
  }
};
function hasComment(node, flags, fn) {
  if (!is_non_empty_array_default(node?.comments)) {
    return false;
  }
  const test = getCommentTestFunction(flags, fn);
  return test ? node.comments.some(test) : true;
}
var isBinaryCastExpression = create_type_check_function_default([
  // TS
  "TSAsExpression",
  "TSSatisfiesExpression",
  // Flow
  "AsExpression",
  "AsConstExpression",
  "SatisfiesExpression",
]);
var isUnionType = create_type_check_function_default([
  "TSUnionType",
  "UnionTypeAnnotation",
]);
var isIntersectionType = create_type_check_function_default([
  "TSIntersectionType",
  "IntersectionTypeAnnotation",
]);
var isConditionalType = create_type_check_function_default([
  "TSConditionalType",
  "ConditionalTypeAnnotation",
]);

// src/language-js/print/jsx.js
var jsxWhitespaceUtils = new whitespace_utils_default(" \n\r	");
function isMeaningfulJsxText(node) {
  return (
    node.type === "JSXText" &&
    (jsxWhitespaceUtils.hasNonWhitespaceCharacter(get_raw_default(node)) ||
      !/\n/u.test(get_raw_default(node)))
  );
}
function hasJsxIgnoreComment(path) {
  const { node, parent } = path;
  if (!isJsxElement(node) || !isJsxElement(parent)) {
    return false;
  }
  const { index, siblings } = path;
  let prevSibling;
  for (let i = index; i > 0; i--) {
    const candidate = siblings[i - 1];
    if (candidate.type === "JSXText" && !isMeaningfulJsxText(candidate)) {
      continue;
    }
    prevSibling = candidate;
    break;
  }
  return (
    prevSibling?.type === "JSXExpressionContainer" &&
    prevSibling.expression.type === "JSXEmptyExpression" &&
    hasNodeIgnoreComment(prevSibling.expression)
  );
}

// src/language-js/utils/is-ignored.js
function isIgnored(path) {
  return hasNodeIgnoreComment(path.node) || hasJsxIgnoreComment(path);
}
var is_ignored_default = isIgnored;
export { is_ignored_default as default };
