import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { propType as styleProp } from '@styled-system/prop-types';
import themeGet from '@styled-system/theme-get';
import TransitionGrow from '@pingux/compass-core/lib/components/TransitionGrow/emotion';
import useCompassTheme from '../../styles/useCompassTheme';
import { loaderCSS } from './Spinner.styles';

/** Basic loading indicator. Can be styled for colors and size. */
const Spinner = ({
    color,
    isCentered,
    isShowing,
    size,
    ...props
}) => {
    const theme = useCompassTheme();

    return (
        <div
            css={css`
                ${isCentered ? `
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                ` : ''}

                width: ${size}px;
                vertical-align: middle;
            `}
            {...props}
        >
            <TransitionGrow
                isShowing={isShowing}
                interval={200}
            >
                <div
                    css={loaderCSS(
                        themeGet(`colors.${color}`, color)({ theme }),
                        (size * 2) / 9,
                        size / 6,
                    )}
                >
                    <span />
                </div>
            </TransitionGrow>
        </div>
    );
};

Spinner.propTypes = {
    /** Color of the dots */
    color: styleProp,
    /** Centers the spinner in its container */
    isCentered: PropTypes.bool,
    /** Whether the spinner is visible */
    isShowing: PropTypes.bool,
    /** Size of the spinners */
    size: PropTypes.number,
};

Spinner.defaultProps = {
    color: 'neutral.60',
    isCentered: false,
    isShowing: false,
    size: 70,
};

export default Spinner;
