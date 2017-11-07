"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames");
/**
 * @class Indent
 * @desc A stateless component for displaying indented data
 *
 * @param {string} [data-id="indent"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [title]
 *          title for indented section
 * @param {string} [className]
 *          CSS class name for Indent
 * @param {boolean} [border]
 *          Boolean value to determine whether to display a border
 *
 * @example
 * <Indent title="all">
 *    <Link icon="stacks" title="HR Apps Base Policy" url="#" />
 *    <Indent title="any">
 *        <Link icon="gear" title="Rule.. truncates" url="#" />
 *        <Link icon="hand" title="HR Group" url="#" />
 *    </Indent>
 * </Indent>
 *
 */

var Indent = function (props) {
    var contentClass = classnames("indent-content", {
        "no-border": !props.border
    });
    return (
        <div className={classnames("indent", props.className)} data-id={props["data-id"]}>
            <div className="indent-title-container">
                {props.title && (
                    <div className="title" data-id="title">
                        {props.title}
                    </div>
                )}
            </div>
            <div className={contentClass}>
                {props.children}
            </div>
        </div>
    );
};

Indent.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,
    border: PropTypes.bool
};

Indent.defaultProps = {
    "data-id": "indent",
    border: true
};

module.exports = Indent;
