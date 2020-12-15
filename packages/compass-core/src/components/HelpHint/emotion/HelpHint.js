import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';
import { missingDependencyMessage } from '../../../utils/DependencyUtils';
import CoreHelpHint from '../HelpHint';
import HelpHintArrow from './HelpHintArrow';
import { arrowPlacementStyle, helpHintStyle } from './HelpHint.styles';

missingDependencyMessage(css, '@emotion/core', 'Emotion');

const HelpHint = ({
    animationDelay,
    bg,
    borderColor,
    children,
    color,
    content,
    helpHintProps: helpHintPropsProp,
    theme,
    ...other
}) => {
    const helpHintProps = {
        ...helpHintPropsProp,
        bg,
        color,
        padding: 10,
        borderRadius: 4,
        ...(borderColor ? {
            borderColor,
            borderWidth: 1,
            borderStyle: 'solid',
        } : {}),
        theme,
    };

    return (
        <CoreHelpHint
            animation
            animationDelay={animationDelay}
            helpHintProps={({ isShowing }) => ({
                css: css`
                    opacity: ${isShowing ? 1 : 0};
                    transition: opacity ${animationDelay}ms;
                `,
            })}
            content={(
                <>
                    <div css={helpHintStyle(helpHintProps)}>
                        {content}
                    </div>
                    <div data-popper-arrow="" css={arrowPlacementStyle}>
                        <HelpHintArrow
                            borderColor={themeGet(`colors.${borderColor}`, borderColor)({ theme })}
                            color={themeGet(`colors.${bg}`, bg)({ theme })}
                            size={15}
                        />
                    </div>
                </>
            )}
            offset={[0, 0]}
            {...other}
        >
            {children}
        </CoreHelpHint>
    );
};

HelpHint.propTypes = {
    /** Number of milliseconds to keep the help hint in the DOM for */
    animationDelay: PropTypes.number,
    /** Background color */
    bg: PropTypes.string,
    /** Color of border */
    borderColor: PropTypes.string,
    /** Color of text */
    color: PropTypes.string,
    /** Content that goes in the help hint */
    content: PropTypes.node,
    /** When true, the reference is not wrapped in a span.
     *  You must provide a single child that can receive a ref
     */
    hasNoWrapper: PropTypes.bool,
    /** Props passed to the help hint component. */
    helpHintProps: PropTypes.object,
    /** Placement for the help hint can be any popper.js value
     *  https://popper.js.org/docs/v2/constructors/#options
     */
    placement: PropTypes.string,
    theme: PropTypes.object,
};

HelpHint.defaultProps = {
    animationDelay: 0,
    bg: '#000',
    color: '#fff',
    placement: 'auto',
};

export default HelpHint;
