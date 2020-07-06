const path = require('path');
const webpack = require('webpack');

module.exports = {
	stories: ['../stories/**/*.story.js', '../src/components/**/*.story.js'],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-knobs/register',
		'@storybook/addon-notes/register',
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
			test: /\.scss$/,
			loaders: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../')
		});

		config.plugins.push(
			new webpack.DefinePlugin({
				END_USER_VERSION: JSON.stringify(require('../package.json').version)
			})
		);

		config.module.rules.push({
			test: /\.story.js$/,
			loaders: [require.resolve('@storybook/addon-storysource/loader')],
			enforce: 'pre',
		});

		return config;
	},
};