import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Aside.widths
 */
export const widths = {
    /** AUTO */
    AUTO: "AUTO",
    /** SM */
    SM: "SM",
    /** MD */
    MD: "MD",
    /** LG */
    LG: "LG"
};

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
* @param {Aside.widths} [width=AUTO]
*     Can hard-code the width to "SM" "MD" or "LG"
*/

const Aside = ({
    aside,
    children,
    className,
    "data-id": dataId,
    fullHeight,
    position,
    width,
}) => (
    <div
        className={classnames("aside-container", className, {
            "aside-container--full-height": fullHeight,
            "aside-container--sm": width === widths.SM,
            "aside-container--md": width === widths.MD,
            "aside-container--lg": width === widths.LG,
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
    position: PropTypes.oneOf(["right", "top-right"]),
    width: PropTypes.oneOf(Object.values(widths)),
};

Aside.defaultProps = {
    "data-id": "aside",
    width: "AUTO",
};

Aside.widths = widths;

export default Aside;