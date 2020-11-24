const path = require('path');
const webpack = require('webpack');

module.exports = {
	stories: ['../src/**/*.story.js?(x)'],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-links',
		// DO NOT ADD THIS BACK IN. It breaks GoJS in some cases, probably because they're
		// both trying to edit the same global/browser variable.
		// '@storybook/addon-knobs/register',
		'@storybook/addon-docs',
		{
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					include: [path.resolve(__dirname, '../src/**/*.story.js')],
				},
			},
		},
	],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.story.js?(x)$/,
			loaders: [require.resolve('@storybook/addon-storysource/loader')],
			enforce: 'pre',
		});

		return config;
	},
};