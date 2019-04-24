import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import HelpHint from "../tooltips/HelpHint";
import EllipsisLoader from "../general/EllipsisLoader";
import { cannonballChangeWarning } from "../../util/DeprecationUtils";
import { flagsPropType } from "../../util/FlagUtils";

/**
 * @class Button
 * @desc button component
 *
 * @param {("primary" | "secondary" | "standard" | "success" | "cancel" | "danger")} [type]
 *      CSS class applied to html.
 * @param {string} [alignInputs]
 *     When true, aligns a  button with text fields in the same row
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [data-id="button"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [iconName]
 *     The name and CSS of the icon.
 * @param {function} [onClick]
 *     Click handler.
 * @param {string} [label]
 *     Html name of the button.
 * @param {boolean} [disabled=false]
 *     Button will not function when true.
 * @param {string} [disabledText]
 *     Text for the help hint will be rendered when the same button has a the prop disabled set to true.
 * @param {boolean} [inline]
 * @param {boolean} loading
 *     While true, loading animation will be shown.
 *  @param {boolean} [noSpacing]
 *     Don't include the right margin
 * @param {boolean} active
 *     Active style of the button for when it's being used as a toggle.
 * @param {array} [flags]
 *     Set the flag for "add-button-margin" to override the special add button margin styling.
 * @example
 *  <Button
 *      label="Button"
 *      type="Danger">
 *  </Button>
 *
 */

const buttonTypes = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    STANDARD: "standard",
    SUCCESS: "success",
    CANCEL: "cancel",
    DANGER: "danger"
};

const buttonTypeList = Object.values(buttonTypes);

const dontFocus = event => event.preventDefault();

const checkFixAddMargin = flags => flags.includes("add-button-margin");

function Button ({
    active,
    alignInputs,
    children,
    className,
    "data-id": dataId,
    disabled,
    disabledText,
    flags,
    href,
    iconName,
    inline,
    label,
    loading,
    noSpacing,
    onClick,
    submit,
    target,
    type
}) {
    const fixAddMargin = checkFixAddMargin(flags);

    if (iconName === "add" && !fixAddMargin && !noSpacing) {
        cannonballChangeWarning({
            message: (
                `Add buttons will no longer automatically have their right margin stripped. ` +
                    `Instead, the 'noSpacing' prop will manually do it. ` +
                    `Switch over by adding the 'add-button-margin' flag to Add buttons.`
            ),
        });
    }

    const classes = classnames(
        "button",
        className,
        iconName,
        {
            "align-inputs": alignInputs,
            "button--add-margin-fix": iconName === "add" && fixAddMargin,
            "button--no-spacing": noSpacing,
            inline,
            loading: loading,
            disabled: disabled,
            "button--active": active,
            "ellipsis-loader-button": loading,
            [type]: buttonTypeList.includes(type)
        }
    );

    const TagName = href ? "a" : "button";

    const Tags = (
        <TagName
            className = {classes}
            data-id={dataId}
            onMouseDown={dontFocus}
            onClick={onClick}
            disabled={disabled}
            type={submit ? "submit" : "button"}
            href={href}
            target={target}
        >
            {label}
            {children}
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

Button.propTypes = {
    active: PropTypes.bool,
    alignInputs: PropTypes.bool,
    className: PropTypes.string,
    "data-id": PropTypes.string,
    disabled: PropTypes.bool,
    disabledText: PropTypes.string,
    flags: flagsPropType,
    href: PropTypes.string,
    iconName: PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.node,
    loading: PropTypes.bool,
    noSpacing: PropTypes.bool,
    onClick: PropTypes.func,
    submit: PropTypes.bool,
    target: PropTypes.string,
    type: PropTypes.oneOf(buttonTypeList),
};

Button.defaultProps = {
    active: false,
    alignInputs: false,
    "data-id": "button",
    disabled: false,
    flags: [],
    loading: false,
    noSpacing: false,
    onClick: () => {},
    submit: false,
};

Button.buttonTypes = buttonTypes;

export default Button;
