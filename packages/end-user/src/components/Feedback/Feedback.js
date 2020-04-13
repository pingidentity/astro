import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Display text and an icon to a user
 */
const Message = ({ children, type, 'data-id': dataId }) => {
    const classNames = classnames('feedback', {
        'feedback--error': type === 'error',
        'feedback--alert': type === 'alert',
        'feedback--success': type === 'success',
    });

    return (
        <div className={classNames} data-id={dataId}>
            {type === 'error' && <span className="feedback__icon pingicon-error-triangle"></span>}
            {type === 'alert' && <span className="feedback__icon pingicon-alert"></span>}
            {type === 'success' && <span className="feedback__icon pingicon-success-round"></span>}
            <div className="feedback__message">{children}</div>
        </div>
    );
};

Message.propTypes = {
    /**
     * Sets a data-id property on the Message to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Sets the feedback's type (error|alert|success)
     */
    type: PropTypes.string,
};

Message.defaultProps = {
    'data-id': 'feedback',
};

export default Message;
