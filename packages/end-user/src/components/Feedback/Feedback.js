import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import errorIcon from '../../icons/error.svg';
import alertIcon from '../../icons/alert.svg';
import successIcon from '../../icons/success.svg';

/**
 * @class Feedback
 * @desc Display text and an icon to a user
 *
 * @param {string} [type]
 *      Sets the feedback's type (error|alert|success)
 * @param {string} [data-id]
 *      Sets a data-id property on the feedback element to be used as a test hook
 *
 */
const Message = ({ children, type, 'data-id': dataId }) => {
    const classNames = classnames('feedback', {
        'feedback--error': type === 'error',
        'feedback--alert': type === 'alert',
        'feedback--success': type === 'success',
    });

    return (
        <div className={classNames} data-id={dataId}>
            {type === 'error' && <img className="feedback__icon" src={errorIcon} alt="Error" />}
            {type === 'alert' && <img className="feedback__icon" src={alertIcon} alt="Alert" />}
            {type === 'success' && <img className="feedback__icon" src={successIcon} alt="Success" />}
            <div className="feedback__message">{children}</div>
        </div>
    );
};

Message.propTypes = {
    type: PropTypes.string,
    'data-id': PropTypes.string,
};

Message.defaultProps = {
    'data-id': 'feedback',
};

export default Message;
