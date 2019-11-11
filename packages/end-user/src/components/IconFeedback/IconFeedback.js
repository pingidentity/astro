import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const typeIcons = {
    success: 'icon-ghost-success',
    error: 'icon-ghost-error',
    timeout: 'icon-ghost-timed-out',
    stopped: 'icon-clear',
    disabled: 'icon-ghost-disabled',
    hourGlass: 'icon-hour-glass',
    safe: 'icon-safe',
};

const IconFeedback = ({ type, children, small, bold }) => {
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
            <p className="icon-feedback__label">{children}</p>
        </div>
    );
};

IconFeedback.propTypes = {
    type: PropTypes.string,
    small: PropTypes.bool,
    bold: PropTypes.bool,
};

IconFeedback.defaultProps = {
    small: false,
    bold: false,
}

export default IconFeedback;
