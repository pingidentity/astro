import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
* @class Aside
* @desc A container that lets you put secondary content next to main content.
*
* @param {string} [data-id=aside]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {element} [aside]
*     The element that is positioned next to the main content
* @param {boolean} [fullHeight]
*     When true, stretch the aside element to the full height of the main element
* @param {string} [position]
*     Can specify behavior like "right-top"
*/

const Aside = ({
    aside,
    children,
    className,
    "data-id": dataId,
    fullHeight,
    position,
}) => (
    <div
        className={classnames("aside-container", className, {
            "aside-container--full-height": fullHeight,
        })}
        data-id={dataId}
    >
        {children}
        {position
            ? (<div className={`aside-container__aside aside-container__aside--${position}`}>{aside}</div>)
            : aside
        }
    </div>
);

Aside.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    aside: PropTypes.element,
    fullHeight: PropTypes.bool,
};

Aside.defaultProps = {
    "data-id": "aside",
};

export default Aside;