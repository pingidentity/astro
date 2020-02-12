import React from 'react';
import Columns, { Column, widths } from './Columns';

export default {
    title: 'Components/WIP/Columns',
    component: Columns,
};

export const Default = () => (
    <Columns>
        <Column width={widths.FOUR}>
            I&apos;m a column!
        </Column>
        <Column width={widths.FOUR}>
            I&apos;m a column!
        </Column>
        <Column width={widths.FOUR}>
            I&apos;m a column!
        </Column>
    </Columns>
);
