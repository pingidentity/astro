"use strict";

var React = require("react"),
    PropTypes = require("prop-types"),
    classnames = require("classnames"),
    getIconClassName = require("../../util/PropUtils").getIconClassName;

/**
 * @class Icon
 * @desc A component for displaying an icon by itself or next to next.
 *
 * @param {string} [data-id="icon"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [iconName]
 *     The name of the icon
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 *
 * @example
 * <Icon iconName="cog">
 *    Some text or other content that appears next to the icon.
 * </Icon>
 *
 */

const Icon = (props) => {
    return (
        <div className={classnames("icon", props.className)} data-id={props["data-id"]}>
            <div
                className={classnames("icon__graphic", getIconClassName(props))}
                data-id={props["data-id"] + "-graphic"}
            />
            {props.children && (
                <div className="icon__content" data-id={props["data-id"] + "-content"}>
                    {props.children}
                </div>
            )}
        </div>
    );
};

Icon.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    iconName: PropTypes.string
};

Icon.defaultProps = {
    "data-id": "icon"
};

module.exports = Icon;
