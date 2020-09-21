const path = require('path');
const webpack = require('webpack');

const main = require('../../../shared/storybook/v6/main');

main.addons = [
	'@storybook/addon-actions',
	'@storybook/addon-links',
	'@storybook/addon-knobs/register',
	'@storybook/addon-notes/register',
	'@storybook/addon-docs',
	'@whitespace/storybook-addon-html',
];
main.webpackFinal = async (config) => {
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

	return config;
};

module.exports = main;