import React from 'react';
import Checkbox, { StatelessCheckbox } from './Checkbox';

export default {
    title: 'Components/Inputs/Checkbox',
    component: StatelessCheckbox,
};

export const Default = () => (
    <>
        <Checkbox label="I'm a checkbox!" />
        <Checkbox label="I'm a checkbox!" />
    </>
);
Default.storyName = 'Inline (Default)';

export const Stacked = () => (
    <div style={{ maxWidth: 300 }}>
        <Checkbox isStacked label="I'm a checkbox!" />
        <Checkbox isStacked label="I'm a checkbox with a really long, wrapping label which kind of goes on forever, but not really because it ends right here." status="error" fieldMessage="This is an awesome error" />
        <Checkbox isStacked label="I'm a checkbox!" />
        <Checkbox isStacked label="I'm a checkbox!" />
    </div>
);

export const Markdown = () => (
    <>
        <Checkbox hasMarkdown label="I'm a checkbox! And now I have __MARKDOWN__... Isn't it *DREAMY*?" />
        <Checkbox hasMarkdown label="Here's a link to [Wikipedia](https://wikipedia.org)" />
    </>
);

export const Error = () => (
    <Checkbox label="I'm a checkbox!" status="error" fieldMessage="This is an error" />
);
