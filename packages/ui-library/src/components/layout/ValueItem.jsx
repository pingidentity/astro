import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
* @class ValueItem
* @desc A text value that can appear next to an icon or a control of some kind
*
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {string} [data-id=value-item]
*     The data-id of the component
* @param {string} [icon]
*     The icon or control to show left of the text value*
* @param {boolean} [inline=false]
*     When true, the value item displays inline
*/
const ValueItem = ({ children, className, "data-id": dataId, icon, inline, }) => (
    <div className={classnames("value-item", className, inline ? "value-item__inline" : null )} data-id={dataId}>
        {icon && <span className="value-item__icon">{icon}</span>}
        {children && <span className="value-item__value">{children}</span>}
    </div>
);

ValueItem.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    icon: PropTypes.node,
    inline: PropTypes.bool,
};

ValueItem.defaultProps = {
    "data-id": "value-item",
    inline: false,
};

export default ValueItem;