import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class Page
 * @desc Page container
 *
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {node} [footer]
 *      Footer content
 * @param {string} [data-id]
 *      Sets a data-id property on the tooltip element to be used as a test hook
 *
 */

const Page = ({ children, footer, 'data-id': dataId }) => (
    <div className="page brand-background" data-id={dataId}>
        <div className="page__content">{children}</div>
        {footer && <div className="page__footer brand-footer-color">{footer}</div>}
    </div>
);

Page.propTypes = {
    footer: PropTypes.node,
    'data-id': PropTypes.string,
};

Page.defaultProps = {
    'data-id': 'page',
};

export default Page;
