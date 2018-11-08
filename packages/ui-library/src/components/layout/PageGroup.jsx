import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @class PageGroup
 * @desc Layout component to add a header to the gorup
 * @param {string} [data-id="page-group"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      class name(s) to add to the top-level container/div
 * @param {string|node} title
 *     Title of section
 * @example <PageGroup data=id="page-group" />
 */

const PageGroup = ({
    "data-id": dataId,
    title,
    className,
    children,
}) => (
    <div className={classnames("page-group", className)}data-id={dataId}>
        <label className="parent">{title}</label>
        <div className="page-group-content">
            {children}
        </div>
    </div>
);

PageGroup.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    title: PropTypes.node
};

PageGroup.defaultProps = {
    "data-id": "page-group"
};

export default PageGroup;