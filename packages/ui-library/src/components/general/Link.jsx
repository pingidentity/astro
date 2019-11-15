"use strict";

import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import Anchor, { linkTypes } from "./Anchor";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Link.iconColors
 */
const iconColors = {
    /** default */
    DEFAULT: "default",
    /** active */
    ACTIVE: "active",
};

/**
 * @class Link
 * @desc A stateless component for displaying a link
 *
 * @param {string} [className]
 *     CSS classes to be set on the inner Link container.
 * @param {string} [count]
 *          Count for Link
 * @param {string} [data-id="link"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {boolean} [disabled=false]
 *     Indicates whether component is disabled.
 * @param {string} [icon]
 *          Icon name for Link
 * @param {boolean} [iconAfter=false]
 *          When true, places icon after text.
 * @param {Link.iconColors} [iconColor]
 *          Changes the color for the icon.
 * @param {Link~onClick} [onClick]
 *     Callback to be triggered when Link selected.
 * @param {string} [target]
 *          Target for Link
 * @param {string} [title]
 *          title for Link
 * @param {string} [type]
 *          Specify what this link is being used for.
 * @param {string} [url]
 *          URL for Link
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

const Link = (props) => {
    const {
        children,
        className,
        count,
        target,
        type,
        title,
        url,
        "data-id": dataId,
    } = props;

    const isNotBlock = type !== linkTypes.BLOCK;

    if ((children || (type && isNotBlock)) && !(title || count)) {
        return <Anchor className={className} data-id={dataId} href={url} {...props} />;
    }

    const {
        disabled,
        icon,
        iconColor,
        iconAfter,
        onClick,
    } = props;

    const _handleClick = (event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    };

    const linkCss = classnames(className, {
        disabled,
        "content-link--icon-color-active": iconColor === iconColors.ACTIVE,
        "text-first": iconAfter,
    });

    const _renderTitle = () => {
        if (icon) {
            return <Icon iconName={icon}>{title}</Icon>;
        }
        else if (count) {
            return [
                <span className="count" key="count">{count}</span>,
                title
            ];
        } else {
            return title;
        }
    };

    return (
        <div data-id={dataId} className="content-link">
            <a
                href={url}
                target={target}
                className={linkCss}
                data-id="link-anchor"
                onClick={_handleClick}>
                { _renderTitle() }
            </a>
        </div>
    );
};

Link.propTypes = {
    "data-id": PropTypes.string,
    icon: PropTypes.string,
    iconAfter: PropTypes.bool,
    count: PropTypes.string,
    url: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    type: PropTypes.oneOf(Object.values(linkTypes)),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string
};

Link.defaultProps = {
    "data-id": "content-link",
    disabled: false,
    className: "",
    target: "_self",
    iconAfter: false,
};

Link.linkTypes = linkTypes;
Link.iconColors = iconColors;

module.exports = Link;
