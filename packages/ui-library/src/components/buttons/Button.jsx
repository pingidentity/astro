import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import HelpHint from "../tooltips/HelpHint";
import EllipsisLoader from "../general/EllipsisLoader";
import { cannonballChangeWarning } from "../../util/DeprecationUtils";
import _ from "underscore";

/**
 * @class Button
 * @desc button component
 *
 * @param {string} [type]
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



class Button extends Component {
    static propTypes = {
        alignInputs: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        disabledText: PropTypes.string,
        "data-id": PropTypes.string,
        href: PropTypes.string,
        iconName: PropTypes.string,
        inline: PropTypes.bool,
        label: PropTypes.string,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        submit: PropTypes.bool,
        target: PropTypes.string,
        noSpacing: PropTypes.bool,
        active: PropTypes.bool,
        flags: PropTypes.arrayOf(PropTypes.string),
        type: PropTypes.string,
    };

    static defaultProps = {
        alignInputs: false,
        "data-id": "button",
        disabled: false,
        loading: false,
        submit: false,
        noSpacing: false,
        active: false,
        flags: [],
    };

    _dontFocus = event => event.preventDefault();

    _fixAddMargin = () => this.props.flags.includes("add-button-margin");

    componentDidMount() {
        if (this.props.iconName === "add" && !this._fixAddMargin() && !this.props.noSpacing) {
            cannonballChangeWarning({
                message: (
                    `Add buttons will no longer automatically have their right margin stripped. ` +
                    `Instead, the 'noSpacing' prop will manually do it. ` +
                    `Switch over by adding the 'add-button-margin' flag to Add buttons.`
                ),
            });
        }
    }

    render() {
        const {
            active,
            alignInputs,
            children,
            className,
            "data-id": dataId,
            disabled,
            href,
            iconName,
            inline,
            label,
            loading,
            noSpacing,
            onClick,
            submit,
            target,
            type,
        } = this.props;

        const classes = classnames(
            "button",
            className,
            iconName,
            {
                "align-inputs": alignInputs,
                "button--add-margin-fix": iconName === "add" && this._fixAddMargin(),
                "button--no-spacing": noSpacing,
                inline: inline,
                loading: loading,
                disabled: disabled,
                "button--active": active,
                "ellipsis-loader-button": loading,
                [type]: _.indexOf(["primary", "success", "cancel", "danger"], type) !== -1
            }
        );

        const TagName = href ? "a" : "button";

        const Tags = (
            <TagName
                className = {classes}
                data-id={dataId}
                onMouseDown={this._dontFocus}
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
            this.props.disabled && this.props.disabledText
                ? <HelpHint
                    data-id="button_help-hint"
                    hintText={this.props.disabledText}
                    placement="top"
                >
                    {Tags}
                </HelpHint>
                : Tags
        );
    }
}


module.exports = Button;
