import React from 'react';
import Page from './Page';

export default {
    title: 'Components/Layout/Page',
    component: Page,
};

export const Default = () => (
    <Page footer={(<p>Some content...</p>)}>
        <p>I&apos;m in a page!</p>
    </Page>
);
