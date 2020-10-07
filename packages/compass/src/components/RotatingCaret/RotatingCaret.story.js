import React, { useState, useCallback } from 'react';

import {
    Button,
    RotatingCaret,
} from '../../.';

export default {
    title: 'RotatingCaret',
    component: RotatingCaret,

};

export const Default = () => {
    const [isRotated, setIsRotated] = useState(false);
    const handleToggle = useCallback(() => setIsRotated(!isRotated), [isRotated, setIsRotated]);

    return (
        <Button onClick={handleToggle}>
            <RotatingCaret isRotated={isRotated} />
        </Button>
    );
};
