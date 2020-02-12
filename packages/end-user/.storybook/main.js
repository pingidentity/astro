const path = require('path');

module.exports = {
	stories: ['../stories/**/*.story.js', '../src/components/**/*.story.js'],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-knobs/register',
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

		config.module.rules.push({
			test: /\.story.js$/,
			loaders: [require.resolve('@storybook/addon-storysource/loader')],
			enforce: 'pre',
		});

		config.module.rules.push({
			test: /\.svg$/,
			loader: 'file-loader',
			include: path.resolve(__dirname, '../'),
			options: {
				name: '[name].[ext]',
			},
		});

		return config;
	},
};