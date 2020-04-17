import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Types of Button styling
 * @alias Button.ButtonTypes
 */
const ButtonTypes = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
    DANGER: 'danger',
};

/**
 * A button component
 */
const Button = ({
    className,
    'data-id': dataId,
    disabled,
    inline,
    label,
    onClick,
    children,
    iconName,
    type,
    style,
    render,
}) => {
    const classNames = classnames('button file-input--button', className, iconName, {
        'button--disabled': disabled,
        'button--inline': inline,
        'button--primary': type === ButtonTypes.PRIMARY,
        'button--tertiary': type === ButtonTypes.TERTIARY,
        'button--danger': type === ButtonTypes.DANGER,
        'brand-primary-bg': type === ButtonTypes.PRIMARY,
    });
    return (
        <div>
            { !render ? (
                <button
                    className={classNames}
                    data-id={dataId}
                    disabled={disabled}
                    onClick={onClick}
                    style={style}
                    type="button"
                >
                    {label}{children}
                </button>
            ) : (
                render({ children })
            )}
        </div>
    );
};

Button.propTypes = {
    /**
     * CSS class(es) applied to the Button element
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the Button to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * When true, the Button is disabled
     */
    disabled: PropTypes.bool,
    /**
     * When true, the Button is displayed inline (not full width)
     */
    inline: PropTypes.bool,
    /**
     * The text or markup to appear within Button
     */
    label: PropTypes.string,
    /**
     * The callback triggered when the Button is clicked
     */
    onClick: PropTypes.func,
    /**
     * Custom Button renderer
     */
    render: PropTypes.func,
    /**
     * Custom CSS inline styles to be applied to the Button
     */
    style: PropTypes.shape({}),
    /**
     * Determines the styling of the Button
     */
    type: PropTypes.oneOf(Object.values(ButtonTypes)),
};

Button.defaultProps = {
    'data-id': 'button',
    disabled: false,
    inline: false,
    onClick: () => { },
};

Button.ButtonTypes = ButtonTypes;

export default Button;
