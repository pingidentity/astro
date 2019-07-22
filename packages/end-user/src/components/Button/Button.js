import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @enum {string}
 * @alias Button.ButtonTypes
 * @desc Enum for the different types of Button styling
 */
const ButtonTypes = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
};

/**
* @callback Button~onClick
*
* @param {object}
*    The ReactJS synthetic event object.
*/

/**
 * @class Button
 * @desc A button component
 *
 * @param {string} [className]
 *      CSS class(es) applied to the button element.
 * @param {string} [data-id='button']
 *      The data-id attribute value applied to the button element.
 * @param {boolean} [disabled=false]
 *      When true, the button is disabled.
 * @param {boolean} [inline=false]
 *      When true, the button is displayed inline (not full width).
 * @param {string} label
 *      The text or markup to appear within button.
 * @param {Button~onClick} onClick
 *      The callback triggered when the button is clicked.
 * @param {Button.ButtonTypes} [type]
 *      Determines the styling of the button.
 *
 */
const Button = ({
    className,
    'data-id': dataId,
    disabled,
    inline,
    label,
    onClick,
    children,
    type,
    style,
    render,
}) => {
    const classNames = classnames('button file-input--button', className, {
        'button--disabled': disabled,
        'button--inline': inline,
        'button--primary': type === ButtonTypes.PRIMARY,
        'button--tertiary': type === ButtonTypes.TERTIARY,
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
                >
                    {label}{children}
                </button>
            ) : (
                render({ children })
            )}
        </div>
    );
};

Button.defaultProps = {
    'data-id': 'button',
    disabled: false,
    inline: false,
    onClick: () => {},
};

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    'data-id': PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
    render: PropTypes.func,
    style: PropTypes.shape({}),
    type: PropTypes.oneOf(Object.values(ButtonTypes)),
};

Button.ButtonTypes = ButtonTypes;

export default Button;
