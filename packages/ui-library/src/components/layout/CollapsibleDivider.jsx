import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import CollapsibleLink from "../general/CollapsibleLink";

/**
* @class CollapsibleDivider
* @desc A specially-styled CollapsibleLink within a divider
*
* @param {string} [data-id=collapsible-divider]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {string} [title]
*     The text within the divider
* @param {boolean} [open=false]
*     Whether it's open or not
* @param {function} onToggle
*     Handler for toggling the link
*/

const CollapsibleDivider = ({ title, open, onToggle, className, "data-id": dataId }) => (
    <div className={classnames("collapsible-divider", className)} data-id={dataId}>
        <CollapsibleLink
            title={title}
            className="collapsible-divider__toggle"
            expanded={open}
            onToggle={onToggle}
        />
    </div>
);

CollapsibleDivider.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    open: PropTypes.bool,
    onToggle: PropTypes.func,
};

CollapsibleDivider.defaultProps = {
    "data-id": "collapsible-divider",
    open: false,
};

export default CollapsibleDivider;