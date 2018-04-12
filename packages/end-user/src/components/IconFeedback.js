import React from 'react';
import classnames from 'classnames';

import successIcon from '../icons/ghost-success.svg';
import errorIcon from '../icons/ghost-error.svg';
import timedOutIcon from '../icons/ghost-timed-out.svg';
import stoppedIcon from '../icons/ghost-stopped.svg';
import disabledIcon from '../icons/ghost-disabled.svg';

const typeIcons = {
    success: successIcon,
    error: errorIcon,
    timeout: timedOutIcon,
    stopped: stoppedIcon,
    disabled: disabledIcon,
}

const IconFeedback = ({type, children}) => {
    const classNames = classnames("icon-feedback", `icon-feedback--${type}`);
    return (
        <div className={classNames}>
            <img src={typeIcons[type]} className="icon-feedback__icon"/>
            <p className="icon-feedback__label">{children}</p>
        </div>
    );
};

export default IconFeedback;
