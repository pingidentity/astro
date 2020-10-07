import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import path from 'path';

const getScreenshotOptions = () => ({
    encoding: 'base64', // encoding: 'base64' is a property required by puppeteer
    fullPage: false, // Do not take the full page screenshot. Default is 'true' in Storyshots.,
});

initStoryshots({
    framework: 'react',
    suite: 'Image storyshots',
    test: imageSnapshot({ storybookUrl: `file://${path.resolve(__dirname, '../../build-demo')}`, getScreenshotOptions }),
});
