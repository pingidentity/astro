import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { ProductIcon, products } from '../../.';

export default {
    title: 'ProductIcon',
    component: ProductIcon,
    decorators: [withKnobs],
};

export const ProductIcons = () => {
    return Object.keys(products).map((product) => {
        return (
            <ProductIcon product={product} />
        );
    });
};

export const WithBackground = () => {
    return Object.keys(products).map((product) => {
        return (
            <ProductIcon product={product} hasBackground />
        );
    });
};

export const PingFederate = () => (
    <ProductIcon product="pingfederate" />
);

export const PingCentral = () => (
    <ProductIcon product="pingcentral" />
);
