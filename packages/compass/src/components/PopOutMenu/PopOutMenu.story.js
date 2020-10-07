import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withKnobs } from '@storybook/addon-knobs';
import { css } from '@emotion/core';

import { Box, Button, PopOutMenu } from '../../.';

export default {
    title: 'PopOutMenu',
    component: PopOutMenu,
    decorators: [withKnobs],
};

export const Default = () => (
    <Box bg="accent.99" padding="xx" display="block">
        <PopOutMenu title="Click Me I'm a title">
            <div>I am a child. We are both unstyled by default.</div>
        </PopOutMenu>
    </Box>
);

// with a background color behind it to demonstrate that the trigger's bg is transparent
export const SubPixels = () => (
    <Box bg="accent.99" padding="xx" display="block" ml="10.5px">
        <PopOutMenu title="Click Me I'm a title">
            <div>I am a child. We are both unstyled by default.</div>
        </PopOutMenu>
    </Box>
);

export const Placement = () => (
    <PopOutMenu placement="right" title="I pop out to the right">
        <div>Right here!</div>
    </PopOutMenu>
);

export const OpenStyles = () => {
    const Title = ({ isOpen, children }) => <div css={css`color: ${isOpen ? 'red' : 'inherit'};`}>{children}</div>;
    Title.propTypes = { isOpen: PropTypes.bool };
    return (
        <PopOutMenu title={<Title>Red When Open</Title>}>
            <div>I am a child. We are both unstyled by default.</div>
        </PopOutMenu>
    );
};

export const CloseButtonInside = () => {
    return (
        <PopOutMenu
            title={<Button>Click to open</Button>}
        >
            {popoverProps => (
                <Button onClick={popoverProps.onClose}>Click to close it</Button>
            )}
        </PopOutMenu>
    );
};

export const ExternalState = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <PopOutMenu
            title={isOpen ? 'Open' : 'Closed'}
            isOpen={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
        >
            <Button onClick={() => setIsOpen(false)}>Click me to close it</Button>
        </PopOutMenu>
    );
};

