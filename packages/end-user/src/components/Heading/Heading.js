import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Heading text
 */
const Heading = ({
    children,
    className,
    level,
    'data-id': dataId
}) => {
    const classNames = classnames('heading', className, {
        'heading--4': level === 4,
    });

    let Tag = 'h1';
    if (level === 4) {
        Tag = 'h4';
    }

    return <Tag className={classNames} data-id={dataId}>{children}</Tag>;
};

Heading.propTypes = {
    /**
     * Sets the className for the header element
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the Heading element to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Size of the Heading text
     */
    level: PropTypes.oneOf([1 ,4]),
};

Heading.defaultProps = {
    'data-id': 'heading',
};

export default Heading;
