import React from 'react';
import PropTypes from 'prop-types';
import CoreButton from '@pingux/compass-core/lib/components/Button';
import PlusSVG from '@mdi/svg/svg/plus.svg';
import CheckSVG from '@mdi/svg/svg/check-bold.svg';
import ArrowRightSVG from '@mdi/svg/svg/arrow-right.svg';
import AlertSVG from '@mdi/svg/svg/alert.svg';
import { typeToVariant } from '@pingux/compass-core/lib/utils/PropUtils';

import { makeIcon } from '../Icon';
import { textProps } from '../../styles/text';
import ButtonLoader from './ButtonLoader';

import useCompassTheme from '../../styles/useCompassTheme';
import { buttonStyle, statusIconStyle, buttonIconStyle } from './Button.styles';
import { buttonStatuses, buttonVariants } from './Button.constants';

const {
    PRIMARY,
} = buttonVariants;

const {
    CRITICAL,
    LOADING,
    SUCCESS,
} = buttonStatuses;

const buttonIcons = {
    'alert': makeIcon(AlertSVG, 'Alert'),
    'arrow-right': makeIcon(ArrowRightSVG, 'Right Arrow'),
    'plus': makeIcon(PlusSVG, 'Plus'),
    'check': makeIcon(CheckSVG, 'Check'),
};

const renderButtonIcon = (key, buttonProps) => {
    const ButtonIcon = buttonIcons[key];
    const { isInline } = buttonProps;

    return (
        <ButtonIcon
            css={buttonIconStyle(buttonProps)}
            bg={!isInline ? 'white' : undefined}
            mx={isInline ? -5 : undefined}
        />
    );
};

const renderStatusIcon = (key, buttonProps) => {
    const {
        theme: { colors },
        variant,
        status,
    } = buttonProps;
    const isPrimary = variant === PRIMARY;
    const isCritical = status === CRITICAL;

    if (key === 'loader') {
        return (
            <ButtonLoader color={isPrimary ? colors.white : colors.active} />
        );
    }

    const ButtonIcon = buttonIcons[key];
    return (
        <ButtonIcon
            css={statusIconStyle(buttonProps)}
            bg={isCritical ? undefined : 'white'}
        />
    );
};

const Button = ({
    children,
    icon,
    iconAfter,
    isInline,
    status,
    type, // eslint-disable-line react/prop-types
    variant = typeToVariant('Button', Object.values(buttonVariants), type, 'default'),
    ...props
}) => {
    const theme = useCompassTheme();
    const themeProps = {
        theme,
        isInline,
        status,
        variant,
        ...props,
    };

    return (
        <CoreButton
            css={buttonStyle({
                ...textProps({ weight: 1, size: isInline ? 'sm' : 'md' }),
                ...themeProps,
            })}
            {...props}
        >
            {icon && renderButtonIcon(icon, themeProps)}
            {status === SUCCESS && renderStatusIcon('check', themeProps)}
            {status === CRITICAL && renderStatusIcon('alert', themeProps)}
            {status === LOADING && renderStatusIcon('loader', themeProps)}
            <span>{children}</span>
            {iconAfter && renderButtonIcon(iconAfter, themeProps)}
        </CoreButton>
    );
};

Button.propTypes = {
    /** Icon that appears on the left of the label */
    icon: PropTypes.oneOf(Object.keys(buttonIcons)),
    /** Icon that appears on the right of the label */
    iconAfter: PropTypes.oneOf(Object.keys(buttonIcons)),
    /** Button will not function when true. */
    isDisabled: PropTypes.bool,
    /** Triggers the pill button style */
    isInline: PropTypes.bool,
    /** Status of the button for feedback purposes */
    status: PropTypes.oneOf(Object.values(buttonStatuses)),
    /** Basic appearance of the button */
    variant: PropTypes.oneOf(Object.values(buttonVariants)),
};

Button.defaultProps = {
    isDisabled: false,
    isInline: false,
    status: 'normal',
};

export default Button;
