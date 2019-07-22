import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import successIcon from '../../icons/ghost-success.svg';
import errorIcon from '../../icons/ghost-error.svg';
import timedOutIcon from '../../icons/ghost-timed-out.svg';
import stoppedIcon from '../../icons/ghost-stopped.svg';
import disabledIcon from '../../icons/ghost-disabled.svg';

const typeIcons = {
    success: successIcon,
    error: errorIcon,
    timeout: timedOutIcon,
    stopped: stoppedIcon,
    disabled: disabledIcon,
};

const IconFeedback = ({ type, small = false, children }) => {
    const classNames = classnames('icon-feedback', `icon-feedback--${type}`, {
        'icon-feedback--small': small,
    });
    return (
        <div className={classNames}>
            <img src={typeIcons[type]} className="icon-feedback__icon" alt="" />
            <p className="icon-feedback__label">{children}</p>
        </div>
    );
};

IconFeedback.propTypes = {
    type: PropTypes.string,
    small: PropTypes.bool,
};

export default IconFeedback;
