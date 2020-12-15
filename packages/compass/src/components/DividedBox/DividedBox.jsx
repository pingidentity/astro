import React from 'react';
import PropTypes from 'prop-types';
import { between } from '@pingux/compass-core/lib/components/Between';
import { propType as stylePropType } from '@styled-system/prop-types';
import Box from '../Box';
import Pipe from '../Pipe';
import HR from '../HR';

const DividedBox = ({
    children,
    isRow,
    divider = isRow ? <Pipe color="line.light" /> : <HR />,
    ...props
}) => (
    <Box alignItems={isRow ? 'center' : 'flex-start'} isRow={isRow} {...props}>
        {between(children, divider)}
    </Box>
);

DividedBox.propTypes = {
    divider: PropTypes.node,
    gap: stylePropType,
    isRow: PropTypes.bool,
};

DividedBox.defaultProps = {
    gap: 0,
    isRow: false,
};

export default DividedBox;
