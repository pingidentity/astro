import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { color, position, typography } from 'styled-system';
import { textProps } from '../../styles/text';

import useCompassTheme from '../../styles/useCompassTheme';

const floatLabelStyle = ({ isHidden, ...props }) => css`
    position: absolute;
    transition: 50ms top;
    ${isHidden ? 'visibility: hidden;' : ''}
    ${color(props)}
    ${position(props)}
    ${typography(props)}
`;

/** Provides the label itself for displaying a float label, to be added to an input */
const FloatLabel = ({ children, isHidden, ...props }) => {
    const theme = useCompassTheme();

    /* eslint-disable jsx-a11y/label-has-for */
    return (
        <label
            css={floatLabelStyle({
                ...textProps({ size: 'xs', color: 'text.secondary', weight: 1 }),
                isHidden,
                top: isHidden ? 10 : 4,
                left: 'md',
                theme,
                ...props,
            })}
            {...props}
        >
            {children}
        </label>
    );
    /* eslint-enable jsx-a11y/label-has-for */
};

FloatLabel.propTypes = {
    /** Whether the label is hidden */
    isHidden: PropTypes.bool,
};

export default FloatLabel;
