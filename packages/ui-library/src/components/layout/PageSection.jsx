import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
* @class PageSection
* @desc Layout component for sections with titles
*
* @param {string} [data-id=page-section]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {string} description
*     Intro paragraph to the section
* @param {string} title
*     Title of section
*/
const PageSection = ({
    children,
    className,
    "data-id": dataId,
    description,
    title,
}) => (
    <div className={classnames("page-section", className)} data-id={dataId}>
        <div className="page-section-title">{title}</div>
        {description && <p>{description}</p>}
        <div className="page-section-content">
            {children}
        </div>
    </div>
);

PageSection.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
};

PageSection.defaultProps = {
    "data-id": "page-section"
};

export default PageSection;
