import React from 'react';
import { css } from '@emotion/core';
import { space } from 'styled-system';
import { propType as styledPropType } from '@styled-system/prop-types';
import useCompassTheme from '../../styles/useCompassTheme';
import { hrStyles } from './HR.styles';

/** A horizontal rule */
const HR = ({
    color,
    gap,
    ...props
}) => {
    const theme = useCompassTheme();

    return (
        <div
            css={css`
                ${space({ py: gap, ...props, theme })}
                width: 100%;
            `}
            {...props}
        >
            <hr css={hrStyles({ color, ...props, theme })} />
        </div>
    );
};

HR.propTypes = {
    /** The color of the line */
    color: styledPropType,
    /** The space above and below the line */
    gap: styledPropType,
};

HR.defaultProps = {
    color: 'line.light',
    gap: 0,
};

export default HR;
