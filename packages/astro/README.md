# `@pingux/astro`

Astro is a lightweight, composable, and themeable React component library. Astro was created to help developers and designers create consistent, user friendly, and accessible UIs across all Ping products. Please visit https://pingidentity.design for more information and to read individual component documentation.

## Installing

To consume Astro within your own project, install it via NPM or Yarn.

NPM: 
`npm install @pingux/astro`

Yarn: 
`yarn add @pingux/astro`

## Requirements

- Node: 12+
- React: 16.8+

## Usage

All apps should be wrapped in an <AstroWrapper> for full functionality and styling.

```
Import { AstroWrapper } from ‘@pingux/astro’;
<AstroWrapper>
  <App />
</AstroWrapper>
```

## Running Storybook Locally

Astro uses [Storybook](https://storybook.js.org/) for component documentation. Once Astro has been cloned, run the following commands to start a local Storybook server:

`yarn && yarn start`

The Storybook server defaults to  `https://localhost:6006` . This port can be customized by running the command start -p 9009. For example, this will start Storybook on port 9009. More information on customizing Storybook CLI options can be found at https://storybook.js.org/docs/react/api/cli-options. 

Component prop documentation is available under the “documentation” tab per each component story. Most props can be toggled and configured for preview purposes within the prop table.

For example, to view the disabled button styling, navigate to the Button story’s props table, locate the “isDisabled” prop, and toggle to “true”. This change allows you to preview the disabled button’s styling and functionality.


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


## Roadmap

Astro is currently in a beta stage. For more information on when 1.0.0 will be released keep an eye out for our upcoming roadmap.


## Licensing

This project is licensed under the Apache license. See the [LICENSE](LICENSE) file for more information.