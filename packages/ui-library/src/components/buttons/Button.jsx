import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import HelpHint from "../tooltips/HelpHint";
import EllipsisLoader from "../general/EllipsisLoader";
import { withFocusOutline } from "../../util/KeyboardUtils";
import _ from "underscore";

/**
 * @enum {string}
 * @alias Button.buttonTypes
 */
const buttonTypes = {
    /** primary */
    PRIMARY: "primary",
    /** secondary */
    SECONDARY: "secondary",
    /** standard */
    STANDARD: "standard",
    /** success */
    SUCCESS: "success",
    /** cancel */
    CANCEL: "cancel",
    /** danger */
    DANGER: "danger",
    /** link */
    LINK: "link",
    /** button--icon-button */
    ICON: "button--icon-button",
};

/**
 * @class Button
 * @desc button component
 *
 * @param {Button.buttonTypes} [type]
 *      CSS class applied to html.
 * @param {boolean} active
 *     Active style of the button for when it's being used as a toggle.
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [data-id="button"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {boolean} [disabled=false]
 *     Button will not function when true.
 * @param {string} [disabledText]
 *     Text for the help hint will be rendered when the same button has a the prop disabled set to true.
 * @param {string} [href]
 *     Pass in a string to give the button an href.
 * @param {string} [iconName]
 *     The name and CSS of the icon.
 * @param {boolean} [inline]
 *      When true, turns button into inline pill button.
 * @param {string} [label]
 *     Html name of the button
 * @param {boolean} loading
 *     While true, loading animation will be shown.
 * @param {function} [onClick]
 *     Click handler.
 *  @param {boolean} [noSpacing]
 *     Don't include the right margin.
 * @param {function} [onMouseDown]
 *     Mousedown handler..
 * @param {string} [target]
 *     Pass a string to give the button a target.
 * @param {string} text
 *     Text to display in the button when not loading.
 * @example
 *  <Button
 *      label="Button"
 *      type="Danger">
 *  </Button>
 *
 */

const iconAliases = {
    "add": "plus",
    "remove": "minus",
    "prev": "left",
    "next": "right",
};

const iconAlias = iconName => iconAliases[iconName] || iconName;

function BaseButton ({
    active,
    children,
    className,
    "data-id": dataId,
    disabled,
    disabledText,
    href,
    iconName,
    inline,
    label,
    text,
    loading,
    noSpacing,
    onClick,
    onMouseDown,
    submit,
    target,
    type,
}) {
    const hasLabel = label || text || children;
    const classes = classnames(
        "button",
        className,
        {
            "button--icon": iconName && hasLabel,
            "button--circle": iconName && !hasLabel,
            "button--no-spacing": noSpacing,
            inline,
            loading: loading,
            disabled: disabled,
            "button--active": active,
            "ellipsis-loader-button": loading,
            [type]: Object.values(buttonTypes).includes(type)
        }
    );

    const TagName = href ? "a" : "button";

    const Tags = (
        <TagName
            className = {classes}
            data-id={dataId}
            onClick={onClick}
            onMouseDown={onMouseDown}
            disabled={disabled}
            type={submit ? "submit" : "button"}
            href={href}
            target={target}
        >
            {iconName && <span className={`icon-${iconAlias(iconName)} button__icon`} />}
            {(label || text || children) &&
                <span className="button__text">
                    {label}
                    {text}
                    {children}
                </span>
            }
            <EllipsisLoader loading={loading}/>
        </TagName>
    );

    return (
        disabled && disabledText
            ? <HelpHint
                data-id="button_help-hint"
                hintText={disabledText}
                placement="top"
            >
                {Tags}
            </HelpHint>
            : Tags
    );
}

const Button = withFocusOutline(BaseButton);

Button.displayName = "Button";

Button.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    "data-id": PropTypes.string,
    disabled: PropTypes.bool,
    disabledText: PropTypes.string,
    href: PropTypes.string,
    iconName: PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.node,
    loading: PropTypes.bool,
    noSpacing: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    submit: PropTypes.bool,
    target: PropTypes.string,
    type: PropTypes.oneOf(Object.values(buttonTypes)),
};

Button.defaultProps = {
    active: false,
    "data-id": "button",
    disabled: false,
    loading: false,
    noSpacing: false,
    onClick: _.noop,
    onMouseDown: _.noop,
    submit: false,
};

Button.buttonTypes = buttonTypes;

export default Button;
