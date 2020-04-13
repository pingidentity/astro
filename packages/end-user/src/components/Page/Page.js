import React from 'react';
import PropTypes from 'prop-types';

/**
 * Page container
 */
const Page = ({ children, footer, 'data-id': dataId }) => (
    <div className="page brand-background" data-id={dataId}>
        <div className="page__content">{children}</div>
        {footer && <div className="page__footer brand-footer-color">{footer}</div>}
    </div>
);

Page.propTypes = {
    /**
     * Sets a data-id property on the Page to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Footer content
     */
    footer: PropTypes.node,
};

Page.defaultProps = {
    'data-id': 'page',
};

export default Page;
