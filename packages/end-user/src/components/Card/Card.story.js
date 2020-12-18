import React from 'react';
import Card from './Card';

export default {
    title: 'Components/Layout/Card',
    component: Card,
};

export const Default = () => (
    <>
        <Card>
            I&apos;m a card!
        </Card>
    </>
);

export const Skinny = () => (
    <>
        <Card type={Card.CardTypes.SKINNY}>
            I&apos;m a (skinny) card!
        </Card>
    </>
);