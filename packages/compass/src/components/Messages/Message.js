import React from 'react';
import Propvariants from 'prop-types';
import { css } from '@emotion/core';
import { propType as stylePropType } from '@styled-system/prop-types';
import { position, color as ssColor } from 'styled-system';
import { noop } from 'underscore';
import TransitionFadeCollapse from '@pingux/compass-core/lib/components/TransitionFadeCollapse/emotion';
import Box from '../Box';
import Text from '../Text';
import { CloseSVG } from '../Icons';
import { makeIconButton } from '../IconButton';
import useCompassTheme from '../../styles/useCompassTheme';


const CloseIconButton = makeIconButton(CloseSVG, 'Close');

const CloseButton = (props) => {
    const theme = useCompassTheme();
    const styleProps = {
        position: 'absolute',
        right: 'xs',
        top: 'xs',
        theme,
        ...props,
    };

    return (
        <CloseIconButton
            variant="simple-hover"
            css={css`
                ${position(styleProps)}
                ${ssColor(styleProps)}
            `}
            {...props}
        />
    );
};

export const variants = {
    'default': {
        bg: 'neutral.90',
        color: 'text.primary',
    },
    'success': {
        bg: 'success.light',
        color: 'success.dark',
    },
    'critical': {
        bg: 'critical.light',
        color: 'critical.dark',
    },
    'warning': {
        bg: 'warning.light',
        color: 'warning.dark',
    },
};

/** Component for rendering a single message.
 *  Usually, you'll want to rely on the `Messages` component to render this.
 */
const Message = ({
    variant,
    bg = variants[variant].bg,
    children,
    color = variants[variant].color,
    isHidden,
    onClose,
    ...props
}) => (
    <TransitionFadeCollapse isShowing={!isHidden} interval={200}>
        <Box pb="sm">
            <Box bg={bg} padding="md" borderRadius={4} position="relative" {...props}>
                <Text color={color} mr="lg">
                    {typeof children === 'function' ? children({ onClose }) : children}
                </Text>
                <CloseButton onClick={onClose} color={color} />
            </Box>
        </Box>
    </TransitionFadeCollapse>
);

Message.propTypes = {
    /** Background color */
    bg: stylePropType,
    /** Text color */
    color: stylePropType,
    /** Hides the message with an animated transition */
    isHidden: Propvariants.bool,
    /** Callback for clicking the message's close button */
    onClose: Propvariants.func,
    /** Prepackaged styles for the message */
    variant: Propvariants.oneOf(Object.keys(variants)),
};

Message.defaultProps = {
    isHidden: false,
    onClose: noop,
    variant: 'default',
};

export default Message;
