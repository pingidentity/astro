import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useFocusOutline } from '@pingux/compass-core/lib/utils/FocusUtils';
import Box from '../Box';
import withAnimation from '../../util/withAnimation';
import { focusOutlineCSS } from '../../styles/focusOutline';

const InfoBase = ({
    width = '100%',
    children,
    ...props
}) => {
    useFocusOutline();

    return (
        <Box
            css={css(focusOutlineCSS)}
            position="relative"
            height="100%"
            bg="white"
            borderLeft="separator"
            tabIndex={0}
            width={width}
            {...props}
        >
            {children}
        </Box>
    );
};

const InfoPanel = withAnimation(InfoBase);

InfoBase.propTypes = {
    width: PropTypes.string,
};

export default InfoPanel;
