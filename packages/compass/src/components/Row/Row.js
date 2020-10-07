import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'reflexbox';
import { css } from '@emotion/core';
import { useFocusOutline } from '@pingux/compass-core/lib/utils/FocusUtils';
import { focusOutlineCSS } from '../../styles/focusOutline';

const rowStyle = ({ isSelected }) => theme => css`
    align-items: center;
    ${isSelected ? `box-shadow: ${theme.shadows.row};` : ''}
    justify-content: space-between;
    flex: 1 1 0px;
    cursor: pointer;
    min-height: 81px;
    &:hover {
        background: white;
    }
    ${focusOutlineCSS}
`;

const Row = React.forwardRef((props, ref) => {
    const {
        isSelected = false,
        children,
        ...passedProps
    } = props;

    useFocusOutline();

    return (
        <Flex
            {...passedProps}
            px="sm"
            py="md"
            sx={{ borderBottom: 'separator', bg: isSelected && 'white' }}
            css={rowStyle(props)}
            ref={ref}
        >
            {children}
        </Flex>
    );
});

Row.propTypes = {
    isSelected: PropTypes.bool,
};

export default Row;

