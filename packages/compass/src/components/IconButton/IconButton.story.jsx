import React from 'react';
import ArrowSVG from '@mdi/svg/svg/arrow-right.svg';
import PlusSVG from '@mdi/svg/svg/plus.svg';
import { IconButton, HelpHint } from '../../.';

export default {
    title: 'Special Buttons/Icon Button',
    component: IconButton,
};

export const Default = () => (
    <IconButton aria-label="next"><ArrowSVG /></IconButton>
);

export const Inverted = () => (
    <IconButton variant="inverted" aria-label="add"><PlusSVG /></IconButton>
);

export const Disabled = () => (
    <HelpHint content="You can't click this button.">
        <IconButton type="inverted" isDisabled aria-label="add"><PlusSVG /></IconButton>
    </HelpHint>
);

export const Gray = () => (
    <IconButton variant="gray" aria-label="next"><ArrowSVG /></IconButton>
);

export const Square = () => (
    <IconButton variant="square" aria-label="add"><PlusSVG /></IconButton>
);

export const InvertedSquare = () => (
    <IconButton variant="inverted-square" aria-label="add"><PlusSVG /></IconButton>
);

export const Loading = () => (
    <IconButton status="loading" aria-label="add"><PlusSVG /></IconButton>
);

export const InvertedLoading = () => (
    <IconButton type="inverted-square" status="loading" aria-label="add"><PlusSVG /></IconButton>
);
