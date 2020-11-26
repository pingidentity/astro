import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Types of Icons
 * @alias typeIcons
 */
const typeIcons = {
    success: 'pingicon-ghost-success',
    error: 'pingicon-ghost-error',
    timeout: 'pingicon-ghost-timed-out',
    stopped: 'pingicon-clear',
    disabled: 'pingicon-ghost-disabled',
    hourGlass: 'pingicon-hour-glass',
    safe: 'pingicon-safe',
};

/**
 * Icon for user feedback
 */
const IconFeedback = ({
    type,
    children,
    small,
    bold
}) => {
    const classNames = classnames('icon-feedback', `icon-feedback--${type}`, {
        'icon-feedback--small': small,
        'icon-feedback--bold': bold,
    });

    const iconClassNames = classnames('icon-feedback__icon', typeIcons[type], {
        'icon-feedback--success': type === 'success',
        'icon-feedback--error': type === 'error' || type === 'disabled' || type === 'timeout' || type === 'stopped' || type === 'hourGlass' || type === 'safe',
    });

    return (
        <div className={classNames}>
            <span className={iconClassNames}></span>
            <span className="icon-feedback__label">{children}</span>
        </div>
    );
};

IconFeedback.propTypes = {
    /**
     * Sets the Icon to bold if enabled
     */
    bold: PropTypes.bool,
    /**
     * Scales the Icon down if enabled
     */
    small: PropTypes.bool,
    /**
     * Sets the Icon
     * @param {typeIcons}
     */
    type: PropTypes.oneOf(Object.keys(typeIcons)),
};

IconFeedback.defaultProps = {
    small: false,
    bold: false,
}

export default IconFeedback;
