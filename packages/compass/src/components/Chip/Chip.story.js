import React from 'react';
import { Chip, ChipCloseButton } from '../../.';

export default {
    title: 'Chip',
    component: Chip,
};

export const Default = () => (
    <Chip>Look Here</Chip>
);

export const Removeable = () => (
    <Chip color="#fff" afterContent={<ChipCloseButton mx={2} />}>
        Remove Me
    </Chip>
);

export const Warning = () => (
    <Chip variant="warning">
        Not Setup
    </Chip>
);

export const Error = () => (
    <Chip variant="critical">
        Not Setup
    </Chip>
);

export const New = () => (
    <Chip variant="success">
        New
    </Chip>
);

export const Label = () => (
    <Chip variant="label">
        Authentication Authority
    </Chip>
);
