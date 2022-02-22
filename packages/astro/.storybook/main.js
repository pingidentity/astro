module.exports = {
  stories: [
    "../@(src|stories)/**/*.@(story|stories).@(js|jsx|mdx)"
  ],
  addons: [
    "@storybook/addon-a11y",
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-storysource',
  ],
}
