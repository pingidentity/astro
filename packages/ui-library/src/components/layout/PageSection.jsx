import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
* @class PageSection
* @desc Layout component for sections with titles
*
* @param {string} [data-id=page-section]
*     The data-id of the component.
* @param {string} [className]
*     Class name(s) to add to the top-level container/div.
* @param {string} description
*     Intro paragraph to the section.
* @param {string|node} title
*     Title of section.
* @param {string|node} titleAccessories
*     Label that sits on the right side of the page.
*/

const PageSection = ({
    children,
    className,
    "data-id": dataId,
    description,
    title,
    titleAccessories,
    underlined,
}) => {
    const props = {
        className:
            classnames(
                "page-section",
                className,
            ),
        "data-id": dataId };

    const titleClassName = classnames(
        "page-section-title",
        underlined ? null : "page-section-title-nounderline",
    );

    return title || titleAccessories
        ? <div {...props}>
            <div className={titleClassName}>{title}
                {
                    titleAccessories && <div className="page-section__title-accessories">{titleAccessories}</div>
                }
            </div>

            {description && <div className="page-section__description">{description}</div>}
            <div className="page-section-content">
                {children}
            </div>
        </div>
        : <div {...props}>
            {description && <div className="page-section__description">{description}</div>}
            {children}
        </div>;
};

PageSection.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    description: PropTypes.node,
    title: PropTypes.node,
    titleAccessories: PropTypes.node,
    underlined: PropTypes.bool,
};

PageSection.defaultProps = {
    "data-id": "page-section",
    underlined: true,
};

export default PageSection;
