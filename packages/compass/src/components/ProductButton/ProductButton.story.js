import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import {
    ProductButton,
    ProductIcon,
} from '../../.';

export default {
    title: 'ProductButton',
    component: ProductButton,
    subcomponents: { ProductIcon },
    decorators: [withKnobs],
};

export const PingFederate = () => (
    <ProductButton href="#" product="pingfederate" />
);

export const PingCentral = () => (
    <ProductButton product="pingcentral" />
);

export const WithBackground = () => (
    <ProductButton product="pingcentral" hasBackground />
);
