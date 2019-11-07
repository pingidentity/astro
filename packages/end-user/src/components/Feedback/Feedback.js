import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
            {type === 'error' && <span className="feedback__icon icon-error-triangle"></span>}
            {type === 'alert' && <span className="feedback__icon icon-alert"></span>}
            {type === 'success' && <span className="feedback__icon icon-success-round"></span>}
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
