import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button, { buttonTypes } from "../buttons/Button";
import Icon, { iconSizes } from "./Icon";

/**
 * @class Banner
 * @desc A banner design style on a page.
 *
 * @param {string} [className]
 *     CSS classes to add on the top-level HTML container.
 * @param {string} [data-id="banner"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {boolean} [fullWidth]
 *     when true creates a full width banner.
* @param {boolean} [text]
 *     Pass in a string for title.
* @param {boolean} [title]
 *     Pass in a string for text.
 * @param {string} [actionText]
 *     Pass in a string label for the button label if you want an action option. If you pass this you must
 *     also pass the callback function.
* @param {string} [actionIcon]
 *     Pass in a string button Icon.
 * @param {Banner~onClick} [onClick]
 *     Callback to be triggered when the button is clicked.
 * @param {boolean} [showClose]
 *     When true it will show close button.
 * @param {boolean} [visible]
 *     When true it will show banner (default value true).
 * @param {Banner~onClose} [onClose]
 *     Callback to be triggered when the close button is clicked.
 *
 *
 * @example
 *     Banner example:
 * <Banner
 *     data-id="example-banner"
 *     showClose={true}
 *     fullWidth={true}
 *     icon="shield"
 *     title="Consectetur adipiscing elit!"
 *     text="Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor."
 *     actionText="Unlock"
 *     actionIcon="open-lock"
 *     onClick={this._onClick}
 *     onClose={this._onToggle}
 *     visible={this.state.visible}
 * >
 */
const Banner = (props) => {
    const {
        fullWidth,
        showClose,
        className,
        icon,
        title,
        text,
        children,
        actionText,
        actionIcon,
        onClick,
        visible,
        onClose,
        "data-id": dataId,
    } = props;

    const _showAction = () => {
        return (actionText !== undefined && onClick !== undefined);
    };

    if (!visible) {
        return null;
    }

    const bannerClassName = classnames("banner", {
        "banner--fullwidth": fullWidth
    });

    const buttonClassName = classnames("banner__button", {
        "banner__button--left-sm": !showClose
    });

    return (
        <div
            data-id={dataId}
            className={classnames(bannerClassName, className)}
        >
            {
                icon &&
                <Icon
                    className="banner__icon"
                    iconName={icon}
                    iconSize={iconSizes.LG}
                />
            }
            <div className="banner__content">
                {
                    title &&
                    <div className="banner__title">
                        {title}
                    </div>
                }
                {
                    text &&
                    <div className="banner__text">
                        {text}
                    </div>
                }
                {children}
            </div>
            {
                _showAction() &&
                      <Button
                          data-id="banner-button"
                          label={actionText}
                          iconName={actionIcon}
                          onClick={onClick}
                          type={buttonTypes.PRIMARY}
                          className={buttonClassName}
                      />
            }
            {
                showClose &&
                <Icon
                    data-id="banner-close"
                    className="banner__close"
                    iconName="close"
                    iconSize={iconSizes.MD}
                    onClick={onClose}
                />
            }
        </div>
    );
};

Banner.propTypes = {
    fullWidth: PropTypes.bool,
    showClose: PropTypes.bool,
    className: PropTypes.string,
    "data-id": PropTypes.string,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    text: PropTypes.string,
    icon: PropTypes.string,
    actionIcon: PropTypes.string,
    actionText: PropTypes.string,
    visible: PropTypes.bool
};

Banner.defaultProps = {
    "data-id": "banner",
    fullWidth: false,
    showClose: false,
    visible: true
};

export default Banner;
