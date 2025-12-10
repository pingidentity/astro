# `@pingux/astro`

Astro is a lightweight, composable, and themeable React component library. Astro was created to help developers and designers create consistent, user friendly, and accessible UIs across all Ping products. Please visit https://pingidentity.design for more information. To read individual component documentation, [our Storybook docs site](https://storybook.pingidentity.design) is a great resource.

## Installing

To consume Astro within your own project, install it via NPM or Yarn.

NPM: 
`npm install @pingux/astro`

Yarn: 
`yarn add @pingux/astro`

## Requirements

- Node: 18+
- React: 16.8+

## Usage

All apps should be wrapped in an `<AstroProvider>` for full functionality and styling.

```js
import { AstroProvider } from '@pingux/astro';

<AstroProvider>
  <App />
</AstroProvider>
```

## Running Storybook Locally

Astro uses [Storybook](https://storybook.js.org/) for component documentation. Once Astro has been cloned, run the following commands to start a local Storybook server:

`yarn start`

The Storybook server defaults to `https://localhost:6006`. This port can be customized by running the command start -p 9009. For example, this will start Storybook on port 9009. More information on customizing Storybook CLI options can be found at https://storybook.js.org/docs/react/api/cli-options. 

Component prop documentation is available under the "documentation" tab per each component story. Most props can be toggled and configured for preview purposes within the prop table.

For example, to view the disabled button styling, navigate to the Button story’s props table, locate the "isDisabled" prop, and toggle to "true". This change allows you to preview the disabled button’s styling and functionality.

## Yarn
We use a modern version of [Yarn](https://yarnpkg.com/getting-started) for package management with the [Plug'n'Play](https://yarnpkg.com/features/pnp) feature enabled. This allows for a [Zero Install](https://yarnpkg.com/features/zero-installs) approach to be used.

## Enabling TypeScript in VSCode

To run TypeScript properly, there are a couple of steps to run first:

1. Run `yarn dlx @yarnpkg/sdks vscode` and reload the window to configure vscode for TypeScript. 
2. Open a TypeScript file in VSCode and open the command palette with `cmd + shift + p`.
    
    a. Search for "TypeScript: Select TypeScript Version..."
    
    b. Choose "Use Workspace Version"

## Browser Compatibility

Astro fully supports the following browsers and versions:

| Browser     | Version     |
| ----------- | ----------- |
| Chrome      | 80+         |
| Firefox     | 76+         |
| Safari      | 12+         |
| Edge        | 44+         |


Support for IE11 is left up to developers and is not tested by the Astro team. Polyfills are necessary for full functionality.

## Changelog

Astro’s [changelog](CHANGELOG.md) notes all features and bug fixes within each release. Refactors and documentation updates are not included within the changelog.

## Contributing and Bug Reports

Astro is closed for open contributions. However, we are appreciative of bug reports and suggestions. Please use GitHub Issues to submit bug reports and suggestions.

## VS Code Linting
The Astro development team prefers to use VS Code as a code editor. To enable code highlighting and autolinting on save you will need to install the ESLint, Prettier and ZipFS plugins, plus add the 
following settings in your `settings.json` file. 

```
{
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
  "eslint.validate": [
      "javascript",
  ],
}
```

You will need to have the monorepo open at the root directory in VS Code for linting and highlighting to work.

Note: To make linting and highlighting work with Yarn 2, `yarn dlx @yarnpkg/sdks vscode` needs to be run in the root directory of the monorepo. If any changes are made to any 
ESLint packages or versions these features may stop working. Run this command again to solve the issue. Be sure to commit the changes so others don't run into the same issue. 

## Licensing

This project is licensed under the Apache 2.0 license. See the [LICENSE](LICENSE) file for more information.
