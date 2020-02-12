import React from 'react';
import { compose, withState, withHandlers, mapProps } from 'recompose';

import Card from '../Card';
import StepLink from '../StepLink';

import TwoSided from './TwoSided';

export default {
    title: 'Components/Layout/TwoSided',
    component: TwoSided,
};

const enhance = compose(
    withState('flipped', 'setFlipped', false),
    withHandlers({
        onFlip: props => () => {
            props.setFlipped(!props.flipped);
        },
    }),
    mapProps(props => ({
        ...props,
        children: props.renderSides(props.onFlip),
    })),
);

const TwoSidedDemo = enhance(TwoSided);

export const Default = () => (
    <TwoSidedDemo
        renderSides={onFlip => ([
            <Card key="front">
                This is the front!
                <StepLink onClick={onFlip}>View Details</StepLink>
            </Card>,
            <Card key="back">
                This is the back!
                <StepLink type="back" onClick={onFlip}>Back</StepLink>
            </Card>,
        ])}
    />
);
