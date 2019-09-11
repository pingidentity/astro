import React from 'react';
import PropTypes from 'prop-types';

const Container = ({
    'data-id': dataId,
    children,
    maxWidth,
}) => {
    return (
        <div className="container" data-id={dataId}>
            <div className="container--inner" style={{ maxWidth, margin: '0 auto' }}>
                {children}
            </div>
        </div>
    );
};

Container.propTypes = {
    'data-id': PropTypes.string,
    maxWidth: PropTypes.string,
};

Container.defaultProps = {
    maxWidth: '960px',
};

export default Container;
