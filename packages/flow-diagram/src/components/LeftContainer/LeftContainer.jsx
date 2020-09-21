import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@pingux/compass/index.esm';

export default function LeftContainer({
    children,
    title,
}) {
    return (
        <Box width="20%" className="left-container">
            {title}
            {children}
        </Box>
    );
}

LeftContainer.propTypes = {
    title: PropTypes.node,
};
