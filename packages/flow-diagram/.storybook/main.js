const path = require('path');
const fs = require('fs');

function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currDir, "package.json"))) {
      return currDir;
    }
    const { dir, root } = path.parse(currDir);
    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`
      );
    }
    currDir = dir;
  }
}

module.exports = {
	stories: ['../src/**/*.story.js?(x)'],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-links',
		// DO NOT ADD THIS BACK IN. It breaks GoJS in some cases, probably because they're
		// both trying to edit the same global/browser variable.
		// '@storybook/addon-knobs/register',
        {
            name: '@storybook/addon-docs',
            options: {
                sourceLoaderOptions: {
                    injectStoryParameters: false,
                },
            },
        },
		{
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					include: [path.resolve(__dirname, '../src/**/*.story.js')],
				},
			},
		},
	],
  // Re-routing webpack to use Emotion 11 since Storybook is still on Emotion 10 which
  // causes conflicts. Relevant ticket: UIP-4732.
	webpackFinal: async (config) => {
    config.resolve.alias = {
      '@emotion/core': getPackageDir('@emotion/react'),
      '@emotion/styled': getPackageDir('@emotion/styled'),
      'emotion-theming': getPackageDir('@emotion/react'),
    };
    return config;
  },
};