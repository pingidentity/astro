module.exports = _dirname => ({
	stories: ['../src/**/*.@(story|stories).@(js|jsx|mdx)'],
	addons: [
		'@storybook/addon-actions/register',
		'@storybook/addon-links',
		'@storybook/addon-a11y/register',
		'@storybook/addon-viewport/register',
		'@storybook/addon-docs',
		'@storybook/addon-storysource',
	],
	webpackFinal: async (config) => {
		const rules = config.module.rules;

		// modify storybook's file-loader rule to avoid conflicts with svgr
		const fileLoaderRule = rules.find(rule => (rule.test && rule.test.test && rule.test.test('.svg')));
		fileLoaderRule.exclude = /\@mdi|icons\//;



		rules.push({
			test: /\.story.jsx$/,
			loaders: [require.resolve('@storybook/source-loader')],
			enforce: 'pre',
		});

		rules.push({
			test: /\.svg$/,
			loaders: ['@svgr/webpack'],
		});

		return config;
	},
});
