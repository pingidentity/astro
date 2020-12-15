import React, { useState, useCallback } from 'react';

import { Spinner, Button, Box } from '../../.';

export default {
    title: 'Spinner',
    component: Spinner,

};


export const Default = () => {
    return (
        <Spinner isShowing />
    );
};

export const Centered = () => {
    return (
        <Spinner isCentered isShowing />
    );
};

export const OnAndOff = () => {
    const [isShowing, setShowing] = useState(true);
    const toggleShowing = useCallback(() => setShowing(!isShowing), [isShowing, setShowing]);

    return (
        <Box gap="lg">
            <Spinner isShowing={isShowing} />
            <Box isRow>
                <Button onClick={toggleShowing}>Show / Hide</Button>
            </Box>
        </Box>
    );
};
