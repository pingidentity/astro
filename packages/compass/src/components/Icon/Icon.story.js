import React from 'react';
import PlusIcon from '@mdi/svg/svg/plus.svg';
import CheckIcon from '@mdi/svg/svg/check.svg';
import { Icon } from '../../.';

export default {
    title: 'Icon',
    component: Icon,
};

export const Default = () => (
    <Icon component={PlusIcon} size={50} color="critical.bright" />
);

export const BackgroundColor = () => (
    <Icon component={CheckIcon} size={50} color="white" bg="active" />
);

export const JustPlus = () => (
    <>
        <PlusIcon size={60} />
    </>
);
