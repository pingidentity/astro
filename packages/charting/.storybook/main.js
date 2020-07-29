const path = require('path');
const webpack = require('webpack');

module.exports = {
	stories: ['../src/components/**/*.story.js?(x)'],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-knobs/register',
		'@storybook/addon-docs',
		{
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					include: [path.resolve(__dirname, '../src/components/**/*.story.js')],
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