"use strict";

var React = require("react"),
    PropTypes = require("prop-types"),
    classnames = require("classnames");

/**
 * @class Page Header
 * @desc A component for displaying a header.
 *
 * @param {string} [data-id="header"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [title]
 *     The title of the header.
 * @param {string} [subtitle]
 *     The subtitle of the header.
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {bool} [underlined]
 *     Adds underline below header if set to true.
 * @param {node} [accessories]
 *  A right-aligned container where buttons, toggles, or anything else may be passed in to render on the right side
 *  of the header.
 * @param {string} [image]
 *     URL for an image that, when provided, appears to the left of the page title
 * @param {string} [icon]
 *     HTTP path to an icon. When specified, the icon displays to the left of the title and subtitle.
 *
 * @example
 * <Header title="Header title" />
 *
 */

const PageHeader = ({
    ["data-id"]: dataId,
    accessories,
    className,
    image,
    subtitle,
    title,
    underlined,
    icon
}) => {

    const pageHeaderClass = classnames("page-header", className, { "page-header--underlined": underlined });

    const renderImage = () => {
        return image && <div className="page-header__image"><img src={image} /></div>;
    };

    const renderAccessories = () => {
        return accessories && <div className="page-header__accessories">{accessories}</div>;
    };

    const renderSubtitle = () => {
        return subtitle && <div className="page-header__subtitle">{subtitle}</div>;
    };

    const renderIcon = () => {
        return icon && <span className={"item-icon " + icon}/>;
    };

    return (
        <div className={pageHeaderClass} data-id={dataId}>
            {renderImage()}
            {renderIcon()}
            <div className="page-header__text">
                <div className="page-header__title">
                    {title}
                </div>
                {renderSubtitle()}
            </div>
            {renderAccessories()}
        </div>
    );
};

PageHeader.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    underlined: PropTypes.bool,
    accessories: PropTypes.node,
    image: PropTypes.string,
    icon: PropTypes.string,
};

PageHeader.defaultProps = {
    "data-id": "page-header-title",
    underlined: false
};

module.exports = PageHeader;
