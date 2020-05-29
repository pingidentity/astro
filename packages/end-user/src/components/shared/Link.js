import React from 'react';
import PropTypes from 'prop-types';
// import Icon from './Icon';
import Anchor, { linkTypes } from './Anchor';
import classnames from 'classnames';


/**
 * @class Link
 * @desc A stateless component for displaying a link
 *
 * @param {string} [data-id="link"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [title]
 *          title for Link
 * @param {string} [url]
 *          URL for Link
 * @param {string} [target]
 *          Target for Link
 * @param {string} [type]
 *          Specify what this link is being used for.
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
        "text-first": iconAfter,
    });

    const _renderTitle = () => {
        // if (icon) {
        //     return <Icon iconName={icon}>{title}</Icon>;
        // }
        if (count) {
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
                {_renderTitle()}
            </a>
        </div>
    );
};

Link.propTypes = {
    "data-id": PropTypes.string,
    icon: PropTypes.string,
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
    target: "_self"
};

Link.linkTypes = linkTypes;

module.exports = Link;
