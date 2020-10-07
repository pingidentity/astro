const path = require('path');

module.exports = dirname => ({
	stories: ['../src/**/*.story.@(js|jsx|mdx)'],
	addons: [
		'@storybook/addon-actions/register',
		'@storybook/addon-links',
		'@storybook/addon-knobs/register',
		'@storybook/addon-a11y/register',
		'@storybook/addon-viewport/register',
		'@storybook/addon-docs',
		{
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					include: [path.resolve(dirname, '../src/components/**/*.story.jsx')],
				},
			},
		},
	],
	webpackFinal: async (config) => {
		const rules = config.module.rules;

		// modify storybook's file-loader rule to avoid conflicts with svgr
		const fileLoaderRule = rules.find(rule => (rule.test && rule.test.test && rule.test.test('.svg')));
		fileLoaderRule.exclude = /\@mdi|icons\//;

		// modify storybook's javascript rule to transpile core src
		const scriptLoaderRule = rules.find(rule => (rule.test && rule.test.test && rule.test.test('.jsx')));
		scriptLoaderRule.include.push(path.resolve(dirname, '../../compass-core/src'));

		rules.push({
			test: /\.story.jsx$/,
			loaders: [require.resolve('@storybook/source-loader')],
			enforce: 'pre',
		});

		rules.push({
			test: /\.scss$/,
			loaders: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(dirname, '../')
		});

		rules.push({
			test: /\.svg$/,
			loaders: ['@svgr/webpack'],
		});

		return config;
	},
});