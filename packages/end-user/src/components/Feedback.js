import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import errorIcon from '../icons/error.svg';
import alertIcon from '../icons/alert.svg';
import successIcon from '../icons/success.svg';

const Message = ({ children, type }) => {
    const classNames = classnames('feedback', {
        'feedback--error': type === 'error',
        'feedback--alert': type === 'alert',
        'feedback--success': type === 'success',
    });

    return (
        <div className={classNames}>
            {type === 'error' && <img className="feedback__icon" src={errorIcon} alt="Error" />}
            {type === 'alert' && <img className="feedback__icon" src={alertIcon} alt="Alert" />}
            {type === 'success' && <img className="feedback__icon" src={successIcon} alt="Success" />}
            <div className="feedback__message">{children}</div>
        </div>
    );
};

Message.propTypes = {
    type: PropTypes.string,
};

export default Message;
