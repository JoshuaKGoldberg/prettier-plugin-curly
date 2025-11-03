<h1 align="center">prettier-plugin-curly</h1>

<p align="center">
	Prettier plugin to enforce consistent brace style for all control statements.
	🥌
</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 9" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-9-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/prettier-plugin-curly" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/prettier-plugin-curly?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<a href="http://npmjs.com/package/prettier-plugin-curly" target="_blank"><img alt="📦 npm version" src="https://img.shields.io/npm/v/prettier-plugin-curly?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

First install this package as a dev dependency in your package manager of choice:

```shell
npm i prettier-plugin-curly -D
```

You'll then be able to list it as a [Prettier plugin](https://prettier.io/docs/en/plugins.html) in your [Prettier config](https://prettier.io/docs/en/configuration.html):

```json
{
	"plugins": ["prettier-plugin-curly"]
}
```

As a result, Prettier will add `{}` curly brackets to control flow statements such as `for`, `if`, and `while`:

```diff
- if (abc) def;
+ if (abc) {
+   def;
+ }
```

### But Why?

Prettier generally does not modify the structure of code: which includes [not enforcing curly brackets](https://github.com/prettier/prettier/issues/7659) to match [ESLint's `curly` rule](https://eslint.org/docs/latest/rules/curly).
However, enforcing `curly` generally does not modify code runtime behavior, and is often desirable for code consistency and to avoid accidental bugs.
This plugin enforces the equivalent of [`curly`'s `all` option](https://eslint.org/docs/latest/rules/curly#all) at the Prettier level.

> See [The Blurry Line Between Formatting and Style](https://blog.joshuakgoldberg.com/the-blurry-line-between-formatting-and-style) for more details.

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 🥌
