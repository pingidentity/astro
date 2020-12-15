import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Box, Button } from '../../.';

export default {
    title: 'Button',
    component: Button,
    decorators: [withKnobs],
};

export const Default = () => (
    <Button isInline={boolean('inline', false)}>Click me</Button>
);

export const LinkButton = () => (
    <Button isInline={boolean('inline', false)} href="#">Go There</Button>
);

export const IconLeft = () => (
    <Button isInline={boolean('inline', false)} icon="plus">Add Something</Button>
);

export const Primary = () => (
    <Button isInline={boolean('inline', false)} variant="primary" iconAfter="arrow-right">Next Please</Button>
);

export const Text = () => (
    <Button isInline={boolean('inline', false)} variant="text">Cancel</Button>
);

export const Success = () => (
    <Button isInline={boolean('inline', false)} status="success">Save</Button>
);

export const Critical = () => (
    <Button isInline={boolean('inline', false)} status="critical">Save</Button>
);

export const Loading = () => (
    <Box hGap="sm" isRow>
        <Button isInline={boolean('inline', false)} status="loading">Loading</Button>
        <Button isInline={boolean('inline', false)} status="loading" variant="primary">Loading</Button>
        <Button isInline={boolean('inline', false)} status="loading" variant="primary" iconAfter="check">Loading</Button>
    </Box>
);

export const Disabled = () => (
    <Box hGap="sm" isRow>
        <Button isInline={boolean('inline', false)} isDisabled>Disabled</Button>
        <Button isInline={boolean('inline', false)} isDisabled variant="primary" iconAfter="check">Disabled</Button>
    </Box>
);

export const Inline = () => (
    <Box hGap="sm" isRow>
        <Button isInline>Inline</Button>
        <Button variant="primary" icon="plus" isInline>Inline</Button>
    </Box>
);
