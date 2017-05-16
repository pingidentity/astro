"use strict";

var React = require("react"),
    classnames = require("classnames");

/**
 * @class Link
 * @desc A stateless component for displaying a link
 *
 * @param {string} [data-id="link"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [title]
 *          title for Link
 * @param {string} [url]
 *          CSS class name for Link
 * @param {string} [icon]
 *          Icon name for Link
 * @param {string} [count]
 *          Count for Link
 * @param {boolean} [disabled=false]
 *     Indicates whether component is disabled.
 * @param {string} [className]
 *     CSS classes to be set on the inner Link container.
 * @param {Link~onClick} [onClick]
 *     Callback to be triggered when Link selected.
 *
 * @example
 * <Link
 *      title={this.state.title}
 *      icon={this.state.icon}
 *      count={this.state.count}
 *      url={this.state.url}
 *      disabled={this.state.disabled}
 *      onClick={this.state.onClick}
 * />
 *
 */

var Link = function (props) {
    var _handleClick = function (event) {
        if (props.disabled) {
            return;
        }
        if (props.onClick) {
            props.onClick(event);
        }
    };
    var icon = "icon-" + props.icon,
        linkCss = classnames(props.className, {
            disabled: props.disabled
        });
    return (
        <div data-id={props["data-id"]} className="content-link">
            <a href={props.url}
               className={linkCss}
               onClick={_handleClick}
            >
                {props.icon && (
                    <span className={icon} />
                )}
                {props.count && (
                    <span className="count">{props.count}</span>
                )}
                {props.title}
            </a>
        </div>
    );
};

Link.propTypes = {
    "data-id": React.PropTypes.string,
    icon: React.PropTypes.string,
    count: React.PropTypes.string,
    url: React.PropTypes.string,
    title: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
};

Link.defaultProps = {
    "data-id": "content-link",
    disabled: false,
    className: ""
};

module.exports = Link;
