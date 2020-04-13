import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Display a stack of elements
 */
const Stack = ({
    children,
    size,
    'data-id': dataId,
    centered
}) => {
    const classNames = classnames('stack', {
        'stack--small': size === 'small',
        'stack--xsmall': size === 'xsmall',
        'stack--large': size === 'large',
    });

    return <div className={classNames} data-id={dataId} style={{ textAlign: centered ? 'center' : null }}>{children}</div>;
};

Stack.propTypes = {
    /**
     * Centers the stack if enabled
     */
    centered: PropTypes.bool,
    /**
     * Sets a data-id property on the Stack lement to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Size of the stack container (xsmall|small|large)
     */
    size: PropTypes.string,
};

Stack.defaultProps = {
    'data-id': 'stack',
};

export default Stack;
