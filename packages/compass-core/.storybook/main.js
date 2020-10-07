const mainConfig = require('../../../shared/storybook/main')(__dirname);

mainConfig.stories.push('../build-doc/Utilities.story.mdx');

module.exports = mainConfig;
