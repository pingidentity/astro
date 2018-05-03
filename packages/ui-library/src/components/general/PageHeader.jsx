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
 * @param {object} [accessories]
 *  A right-aligned container where buttons, toggles, or anything else may be passed in to render on the right side
 *  of the header.
 *
 * @example
 * <Header title="Header title" />
 *
 */

const PageHeader = ({ ["data-id"]: dataId,
                  title,
                  className,
                  underlined,
                  accessories,
                  subtitle }) => {

    const pageHeaderClass = classnames("page-header", className, { "page-header--underlined": underlined });

    const maybeRenderAccessories = () => {
        return accessories && <div className="page-header__accessories">{accessories}</div>;
    };

    const maybeRenderSubtitle = () => {
        return subtitle && <div className="page-header__subtitle">{subtitle}</div>;
    };

    return (
        <div className={pageHeaderClass} data-id={dataId}>
            <div className="page-header__title">
                { title }
            </div>
            {maybeRenderAccessories()}
            {maybeRenderSubtitle()}
        </div>
    );
};

PageHeader.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    underlined: PropTypes.bool,
    accessories: PropTypes.object
};

PageHeader.defaultProps = {
    "data-id": "page-header-title",
    underlined: false
};

module.exports = PageHeader;
