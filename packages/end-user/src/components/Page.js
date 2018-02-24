import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children, footer }) => (
    <div className="page brand-background">
        <div className="page__content">{children}</div>
        {footer && <div className="page__footer brand-footer-color">{footer}</div>}
    </div>
);

Page.propTypes = {
    footer: PropTypes.node,
};

export default Page;
