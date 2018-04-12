import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Stack = ({ children, size }) => {
    const classNames = classnames('stack', {
        'stack--small': size === 'small',
        'stack--xsmall': size === 'xsmall',
    });

    return <div className={classNames}>{children}</div>;
};

Stack.propTypes = {
    size: PropTypes.string,
};

export default Stack;
