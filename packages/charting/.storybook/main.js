const path = require('path');

module.exports = {
	stories: ['../src/components/**/*.story.js?(x)'],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-docs',
		'@storybook/addon-storysource',
	],
};