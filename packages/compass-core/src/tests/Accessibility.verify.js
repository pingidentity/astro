import initStoryshots from '@storybook/addon-storyshots';
import { axeTest } from '@storybook/addon-storyshots-puppeteer';
import path from 'path';

initStoryshots({
    framework: 'react',
    suite: 'A11y checks',
    test: axeTest({ storybookUrl: `file://${path.resolve(__dirname, '../../build-demo')}` }),
});
