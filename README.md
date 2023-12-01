<h1 align="center">prettier-plugin-curly</h1>

<p align="center">Prettier plugin to enforce consistent brace style for all control statements. 🥌</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 4 👪" src="https://img.shields.io/badge/all_contributors-4_👪-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
</a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/prettier-plugin-curly" target="_blank">
		<img alt="Codecov Test Coverage" src="https://codecov.io/gh/JoshuaKGoldberg/prettier-plugin-curly/branch/main/graph/badge.svg"/>
	</a>
	<a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/main/LICENSE.md" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/JoshuaKGoldberg/prettier-plugin-curly?color=21bb42">
	</a>
	<a href="https://github.com/sponsors/JoshuaKGoldberg" target="_blank">
		<img alt="Sponsor: On GitHub" src="https://img.shields.io/badge/sponsor-on_github-21bb42.svg" />
	</a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
	<img alt="npm package version" src="https://img.shields.io/npm/v/prettier-plugin-curly?color=21bb42" />
	<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
</p>

## Usage

First install this package as a dev dependency in your package manager of choice:

```shell
npm i prettier-plugin-curly -D
```

You'll then be able to list it as a [Prettier plugin](https://prettier.io/docs/en/plugins.html) in your [Prettier config](https://prettier.io/docs/en/configuration.html):

```jsonc
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
Thanks! 💖

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/HolgerJeromin"><img src="https://avatars.githubusercontent.com/u/2410353?v=4?s=100" width="100px;" alt="Holger Jeromin"/><br /><sub><b>Holger Jeromin</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/issues?q=author%3Aholgerjeromin" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg"/><br /><sub><b>Josh Goldberg</b></sub></a><br /><a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://navinmoorthy.me/"><img src="https://avatars.githubusercontent.com/u/39694575?v=4?s=100" width="100px;" alt="Navin Moorthy"/><br /><sub><b>Navin Moorthy</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/issues?q=author%3Anavin-moorthy" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://mk1.io"><img src="https://avatars.githubusercontent.com/u/58381667?v=4?s=100" width="100px;" alt="ʀᴀʏ"/><br /><sub><b>ʀᴀʏ</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/commits?author=so1ve" title="Documentation">📖</a> <a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/commits?author=so1ve" title="Code">💻</a> <a href="https://github.com/JoshuaKGoldberg/prettier-plugin-curly/issues?q=author%3Aso1ve" title="Bug reports">🐛</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
