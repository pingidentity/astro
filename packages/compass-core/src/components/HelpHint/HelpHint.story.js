import React from 'react';

import CoreHelpHint from './HelpHint';
import HelpHint from './emotion/HelpHint';
import Box from '../Box/emotion';

export default {
    title: 'HelpHint',
    component: CoreHelpHint,
    subcomponents: { 'Emotion HelpHint': HelpHint },

};

export const Default = () => {
    return (
        <Box mt={100} display="block">
            <HelpHint
                content="Let me give you a clue"
                animationDelay={200}
            >
                A Mystery
            </HelpHint>
        </Box>
    );
};

export const Bottom = () => {
    return (
        <HelpHint
            content="Let me give you a clue"
            placement="bottom"
            animationDelay={200}
        >
            A Mystery
        </HelpHint>
    );
};

export const Right = () => {
    return (
        <HelpHint
            content="Let me give you a clue"
            placement="right"
            animationDelay={200}
        >
            A Mystery
        </HelpHint>
    );
};

export const Left = () => {
    return (
        <Box ml={400} display="block">
            <HelpHint
                content="Let me give you a clue"
                placement="left"
                animationDelay={200}
            >
                A Mystery
            </HelpHint>
        </Box>
    );
};

export const CustomColors = () => {
    return (
        <HelpHint
            bg="#00f"
            color="#ff0"
            content="Let me give you a clue"
            animationDelay={200}
        >
            A Mystery
        </HelpHint>
    );
};

export const WithBorder = () => {
    return (
        <HelpHint
            bg="#eee"
            color="#000"
            borderColor="#000"
            content="Let me give you a clue"
            animationDelay={200}
        >
            A Mystery
        </HelpHint>
    );
};

export const WithoutWrapper = () => {
    return (
        <Box mt={100} display="block">
            <HelpHint
                content="Let me give you a clue"
                animationDelay={200}
                hasNoWrapper
            >
                <button>A Mystery</button>
            </HelpHint>
        </Box>
    );
};

export const ForcedToShow = () => {
    return (
        <HelpHint
            content="Let me give you a clue"
            placement="bottom"
            animationDelay={200}
            isShowing
        >
            A Mystery
        </HelpHint>
    );
};
