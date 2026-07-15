/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-designs', '@storybook/addon-mcp',
  ],

  viteFinal: async config => {
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        {
          name: 'fix-mdx-react-shim',
          enforce: 'pre',
          resolveId(source) {
            if (source.includes('mdx-react-shim.js') && source.startsWith('file://')) {
              return new URL(source).pathname;
            }
            return null;
          },
        },
      ],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
        },
      },
    };
  },

  build: {
    test: {
      disableMDXjsx: true,
    },
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  staticDirs: ['../public'],

  docs: {
    autodocs: 'tag',
  },
};

export default config;
