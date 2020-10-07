import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import { RowTitle } from '../../.';

export default {
    title: 'RowTitle',
    component: RowTitle,
    decorators: [withKnobs],
};

export const Default = () => (
    <RowTitle
        title="Title of the Row"
        subtitle="Subtitle of the Row"
    />
);

export const Selected = () => (
    <RowTitle
        title="Title of the Row"
        subtitle="Subtitle of the Row"
        isSelected
    />
);
