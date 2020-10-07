import React from 'react';
import {
    HelpHint,
    Box,
} from '../../.';

export default {
    title: 'HelpHint',
    component: HelpHint,
};

export const Default = () => {
    return (
        <Box mt={100} display="block">
            <HelpHint content="Let me give you a clue">
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
        >
            A Mystery
        </HelpHint>
    );
};

export const WithBorder = () => {
    return (
        <HelpHint
            bg="neutral.95"
            color="text.primary"
            borderColor="active"
            content="Let me give you a clue"
        >
            A Mystery
        </HelpHint>
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
