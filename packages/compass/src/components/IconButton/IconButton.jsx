import React from 'react';
import PropTypes from 'prop-types';
import CoreButton from '@pingux/compass-core/lib/components/Button';
import { propType as stylePropType } from '@styled-system/prop-types';
import { typeToVariant } from '@pingux/compass-core/lib/utils/PropUtils';

import useCompassTheme from '../../styles/useCompassTheme';
import { iconButtonStyle } from './IconButton.styles';
import { buttonStatuses } from '../Button/Button.constants';
import Spinner from '../Spinner';
import Icon from '../Icon';

const variants = {
    'default': {},
    'gray': {
        color: 'neutral.40',
    },
    'inverted': {
        isInverted: true,
    },
    'square': {
        isSquare: true,
    },
    'inverted-square': {
        isInverted: true,
        isSquare: true,
    },
    'simple-hover': {
        hasSimpleHover: true,
    },
};

const IconButton = ({
    type, // eslint-disable-line react/prop-types
    variant = typeToVariant('IconButton', Object.keys(variants), type, 'default'),
    ...props
}) => {
    const {
        children,
        color,
        size,
        status,
        hasSimpleHover,
        isSquare,
        isInverted,
        ...others
    } = { ...props, ...variants[variant] };
    const theme = useCompassTheme();

    // NOTE: Cannot pass 'isInverted' boolean to CoreButton -
    // a warning displays when applying it to an HTML tag.
    return (
        <CoreButton
            css={iconButtonStyle(
                size,
                {
                    theme,
                    color,
                    hasSimpleHover,
                    isInverted,
                    isSquare,
                    status,
                    ...variants[variant],
                    ...others,
                },
            )}
            {...others}
        >
            {status === buttonStatuses.LOADING
                ? (
                    <Spinner
                        size={size - 4}
                        color={isInverted ? 'white' : color || 'active'}
                        isShowing
                        isCentered
                    />
                )
                : children
            }
        </CoreButton>
    );
};

IconButton.propTypes = {
    /** Color of the icon */
    color: stylePropType,
    /** Button will not function when true. */
    isDisabled: PropTypes.bool,
    /** Apply no special colors for hovering */
    hasSimpleHover: PropTypes.bool,
    /** Invert the colors for the icon button */
    isInverted: PropTypes.bool,
    /** Width and height of the button */
    size: PropTypes.number,
    /** Status of the button for feedback purposes */
    status: PropTypes.oneOf(Object.values(buttonStatuses)),
    /** Use a predefined button type */
    variant: PropTypes.oneOf(Object.keys(variants)),
    /** Use a square shape instead of a circle */
    isSquare: PropTypes.bool,
};

IconButton.defaultProps = {
    hasSimpleHover: false,
    isInverted: false,
    size: 22,
    isSquare: false,
};

export const makeIconButton = (IconComponent, label, size = 20) => props => (
    <IconButton aria-label={label} size={size + 2} {...props}>
        <Icon component={IconComponent} size={size} />
    </IconButton>
);

export default IconButton;
