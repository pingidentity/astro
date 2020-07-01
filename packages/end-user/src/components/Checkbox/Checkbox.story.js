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
Default.story = {
    name: 'Inline (Default)'
};

export const Stacked = () => (
    <div style={{ maxWidth: 300 }}>
        <Checkbox isStacked label="I'm a checkbox!" />
        <Checkbox isStacked label="I'm a checkbox with a really long, wrapping label which kind of goes on forever, but not really because it ends right here." />
        <Checkbox isStacked label="I'm a checkbox!" />
        <Checkbox isStacked label="I'm a checkbox!" />
    </div>
);
