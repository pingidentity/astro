const path = require('path');

const conf = require('../webpack.config');

module.exports = {
  stories: ['../stories/**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      }
    },
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    /**
     * Remove `style-loader` from the css test in the default
     * Storybook webpack config as we do not want to dynamically
     * load theme styles into the <head>
     */
    // Find the CSS rule and get its loaders
    const cssRuleLoaders = config.module.rules
      .find((rule) => rule.test.toString() === /\.css$/.toString()).use;

    // Get the index of style-loader
    const styleLoaderIndex = cssRuleLoaders
      .findIndex((loader) => loader.includes('style-loader'));

    // Remove style-loader from the array
    cssRuleLoaders.splice(styleLoaderIndex, 1);

    // Return the altered config
    return config;
  },
};
