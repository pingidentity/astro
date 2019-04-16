"use strict";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import _ from "underscore";
import { callIfOutsideOfContainer } from "../../util/EventUtils.js";
import { inStateContainer, toggleTransform } from "../utils/StateContainer";
import Utils from "../../util/Utils";
import { cannonballChangeWarning } from "../../util/DeprecationUtils";

import Button from "../buttons/Button";
import PopperContainer from "./PopperContainer";
import ButtonGroup from "../layout/ButtonGroup.jsx";

/**
 * @callback DetailsTooltip~onToggle
 **/

/**
 * @class DetailsTooltip
 * @desc DetailsTooltip implements tooltip callout with trigger label. Body of tooltip is becoming callout content.
 *
 * @param {string} [data-id="details-tooltip"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render with popper.js and react-portal
 * @param {boolean} [stateless]
 *     WARNING. Default value for "stateless" will be set to false from next version.
 *     To enable the component to be externally managed.
 *     True will relinquish control to the component's owner. False or not specified will cause the component to manage
 *     state internally.
 * @param {string} [contentClassName]
 *     CSS classes to apply to content container
 * @param {string} [titleClassName]
 *     CSS classes to apply to title container.
 * @param {string} [labelClassName]
 *     CSS classes to set on the trigger label.
 * @param {DetailsTooltip.positionStyles|string} [positionClassName]
 *     CSS classes to set on the top-level HTML container. Used to manage tooltip callout positioning with the
 *     DetailsTooltip.positionStyles enum and/or any extra css styling if needed.
 *
 * @param {node} [label]
 *     A string or JSX object that serves as the trigger label.
 * @param {string} [title]
 *     Tooltip title
 *
 * @param {array} [secondaryLabels]
 *     Array of label strings and values to use as secondary button titles. Limit 2.
 * @param {array} [primaryLabels]
 *     Array of label strings and values to use as the primary button titles.
 * @param {string} [cancelLabel]
 *     A string that determines whether or not to show the cancel button
 *
 * @param {boolean} [disabled=false]
 *     If true then disable button activity and add "disabled" css style to label link.
 * @param {boolean} [hideOnClick=false]
 *     Whether to close tooltip on content area click.
 * @param {boolean} [open=false]
 *     If true, tooltip is open or else closed.
 * @param {DetailsTooltip~onToggle} [onToggle]
 *     Callback to be triggered when label is clicked.
 * @param {DetailsTooltip~onKeyDown} [onKeyDown]
 *     Callback to be triggered when escape key is clicked. Closes DetailsTooltip.
 * @param {boolean} [showClose=true]
 *     Show close control.
 *
 * @example
 *     <DetailsTooltip positionClassName="resend-tooltip bottom left" labelClassName="resend-btn"
 *          title={this.im("pingid.policies.deleterule.label")}
 *          label={this.im("pingid.policies.deleterule.title")}
 *          open={this.state.isInviteOpen} onToggle={this._handleToggle}
 *          disabled={false}>
 *           <p>what ever callout content is</p>
 *     </DetailsTooltip>
 **/

class DetailsTooltipStateless extends React.Component {
    static displayName = "DetailsTooltipStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        contentClassName: PropTypes.string,
        titleClassName: PropTypes.string,
        labelClassname: PropTypes.string,
        positionClassname: PropTypes.string,
        label: PropTypes.node,
        title: PropTypes.string,
        disabled: PropTypes.bool,
        hideOnClick: PropTypes.bool,
        open: PropTypes.bool,
        onToggle: PropTypes.func,
        showClose: PropTypes.bool,
        children: PropTypes.node,
        onKeyDown: PropTypes.func,
        secondaryLabels: PropTypes.array,
        primaryLabels: PropTypes.array,
        cancelLabel: PropTypes.string,
        flags: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        "data-id": "details-tooltip",
        positionClassName: "top",
        titleClassName: "details-title",
        onToggle: _.noop,
        open: false,
        disabled: false,
        showClose: true,
        hideOnClick: false,
        flags: [],
    };

    /*
     * Call the props toggle() function .
     */
    _handleToggle = () => {
        this.props.onToggle();
    };

    /*
     * Secondary buttons
     */
    _getSecondaryButtonHtml = (label, value, i) => {
        var dataId = "secondary-action";

        if (i > 0) {
            dataId = dataId + "-" + i;
        }

        return (
            <Button
                data-id={dataId}
                type="cancel"
                onClick={value}
                key={label}>
                {label}
            </Button>
        );
    };

    /*
     * Primary buttons
     */
    _getPrimaryButtonHtml = (label, value, i) => {
        var dataId = "confirm-action";

        if (i > 0) {
            dataId = dataId + "-" + i;
        }

        return (
            <Button
                data-id={dataId}
                type="primary"
                onClick={value}
                key={label}>
                {label}
            </Button>
        );
    };

    /*
     * Optional button array
     */
    _getButtons = () => {
        var secondaryButtons,
            primaryButtons,
            buttons = null;

        // can have multiple secondary buttons
        if (this.props.secondaryLabels) {
            secondaryButtons = this.props.secondaryLabels.map(function (secondaryLabel, i) {
                return this._getSecondaryButtonHtml(secondaryLabel.label, secondaryLabel.value, i);
            }.bind(this));
        }

        // can have multiple primary buttons
        if (this.props.primaryLabels) {
            primaryButtons = this.props.primaryLabels.map(function (primaryLabel, i) {
                return this._getPrimaryButtonHtml(primaryLabel.label, primaryLabel.value, i);
            }.bind(this));
        }

        // only display if buttons present
        if (this.props.primaryLabels || this.props.secondaryLabels) {
            buttons = (<ButtonGroup data-id="buttons">
                {secondaryButtons}
                {primaryButtons}
                {this.props.cancelLabel && (
                    <span>
                        <br />
                        <a
                            className="cancel"
                            data-id="cancel-action"
                            onClick={this._handleToggle}>
                            {this.props.cancelLabel}
                        </a>
                    </span>
                )}
            </ButtonGroup>);
        }
        return buttons;
    };

    _usePortal = () => this.props.flags.findIndex(item => item === "use-portal") >= 0;

    /*
     * Return of content based on props.open.
     *
     * @return {React.Component} the React component to be used as tooltip content
     */
    _content = () => {
        if (!this.props.open) {
            return null;
        }

        const hide = this.props.hideOnClick ? this._handleToggle : _.noop;

        const contentClassName = classnames(
            "details-content",
            this.props.contentClassName,
            this.props.positionClassName
        );

        const positionList = (this.props.positionClassName + " " + this.props.className).split(" ");

        const getHorizontalPlacement = vertical => {
            if (_.find(positionList, v => v === "left")) {
                return vertical + "-end";
            } else if (_.find(positionList, v => v === "center")) {
                return vertical;
            } else {
                return vertical + "-start";
            }
        };

        const getPlacement = () => {
            if (_.find(positionList, v => v === "top")) {
                return getHorizontalPlacement("top");
            } else {
                return getHorizontalPlacement("bottom");
            }
        };

        const contents = (
            <div
                className="details-content-inner"
                // Stop events from bubbling up out of tooltip
                onClick={this._stopClickPropagation}
            >
                {this.props.showClose && (
                    <span className="details-close" data-id="details-close" onClick={this._handleToggle}></span>
                )}
                {this.props.title && (
                    <div className={this.props.titleClassName} data-id="details-title">{this.props.title}</div>
                )}
                <div className="details-body" data-id="details-body">
                    {this.props.children}
                    {this._getButtons()}
                </div>
            </div>
        );

        return this._usePortal() ? (
            // implement use-portal flag
            <PopperContainer
                getReference={this._getTrigger}
                className={classnames("details-tooltip-display", contentClassName, this.props.className)}
                pointerClassName="details-tooltip-display__pointer"
                data-id="details-content"
                placement={getPlacement()}
                onClick={hide}
                ref={el => this.popperContainer = el}
            >{contents}</PopperContainer>
        ) : (
            <div
                className={contentClassName}
                data-id="details-content"
                onClick={hide}
            >{contents}</div>
        );
    };

    _handleGlobalClick = (e) => {
        // handle click outside of container
        if (this.props.open) {
            callIfOutsideOfContainer(ReactDOM.findDOMNode(this.refs.container), this._handleToggle, e);
        }
    };

    _handleGlobalKeyDown = (e) => {
        // handle escape key
        if (e.keyCode === 27 && this.props.open) {
            callIfOutsideOfContainer(ReactDOM.findDOMNode(this.refs.container), this._handleToggle, e);
        }
    };

    _bindWindowsEvents = () => {
        var self = this;

        // bind once current execution stack is cleared (e.g. current window event processed).
        // to avoid possible false positive triggers if tooltip was open as result of click outside of it (e.g. some link outside)
        _.defer(function () {
            window.addEventListener("click", self._handleGlobalClick);
            window.addEventListener("keydown", self._handleGlobalKeyDown);
        });
    };

    _stopClickPropagation = e => e.stopPropagation()

    componentWillReceiveProps(nextProps) {
        if (!this.props.open && nextProps.open) {
            this._bindWindowsEvents();
        }
        else if (this.props.open && !nextProps.open) {
            window.removeEventListener("click", this._handleGlobalClick);
            window.removeEventListener("keydown", this._handleGlobalKeyDown);
        }
    }

    componentDidMount() {
        if (this.props.open) {
            this._bindWindowsEvents();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("click", this._handleGlobalClick);
        window.removeEventListener("keydown", this._handleGlobalKeyDown);
    }

    _getTrigger = () => this.trigger;

    render() {
        var containerCss = {
                show: this.props.open
            },
            targetCss = {
                disabled: this.props.disabled
            };

        var containerClassName = classnames(
            "details-tooltip",
            containerCss,
            this.props.className,
            this.props.positionClassName
        );

        return (
            <span
                className={containerClassName}
                data-id={this.props["data-id"]}
                ref="container"
            >
                {this.props.label
                    ? <a
                        data-id="action-btn"
                        className={classnames("details-target", targetCss, this.props.labelClassName)}
                        onClick={!this.props.disabled ? this._handleToggle : null}
                        ref={el => this.trigger = el}
                    >
                        {this.props.label}
                    </a>
                    : <span ref={el => this.trigger = el} />
                }
                {this._content()}
            </span>
        );
    }
}

class DetailsTooltipStateful extends React.Component {
    static displayName = "DetailsTooltipStateful";

    state = {
        open: this.props.open
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    close = () => {
        this.setState({
            open: false
        });
    };

    render() {
        var props = _.defaults(
            { ref: "tooltip", open: this.state.open, onToggle: this._handleToggle }, this.props);
        return React.createElement(DetailsTooltipStateless, props, this.props.children);
    }
}

const PStatefulDetailsTooltip = inStateContainer([
    {
        name: "open",
        initial: false,
        callbacks: [{
            name: "onToggle",
            transform: toggleTransform,
        }],
    }
])(DetailsTooltipStateless);

class DetailsTooltip extends React.Component {
    static displayName = "DetailsTooltip";

    static propTypes = {
        stateless: PropTypes.bool,
        flags: PropTypes.arrayOf(PropTypes.oneOf([ "p-stateful", "use-portal" ])),
    };

    static defaultProps = {
        stateless: true,
        flags: [],
    };

    componentDidMount() {
        if (!this.props.flags.includes("p-stateful")) {
            cannonballChangeWarning({
                message: `The 'open' prop will no longer serve as an initial state. ` +
                `If it is present, it will control the current value of the component. ` +
                `Set the 'p-stateful' flag to switch to this behavior now.`,
            });
        }

        // TODO: figure out why Jest test was unable to detect the specific error, create tests for throws
        /* istanbul ignore if  */
        if (!Utils.isProduction()) {
            /* istanbul ignore if  */
            if (this.props.id) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            /* istanbul ignore if  */
            if (this.props.controlled !== undefined) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("controlled", "stateless", "true", "false"));
            }
            /* istanbul ignore if  */
            if (this.props.contentClassNames) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("contentClassNames", "contentClassName"));
            }
            /* istanbul ignore if  */
            if (this.props.titleClassNames) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("titleClassNames", "titleClassName"));
            }
            /* istanbul ignore if  */
            if (this.props.labelStyle) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("labelStyle", "labelClassName"));
            }
            /* istanbul ignore if  */
            if (this.props.positionStyle) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("positionStyle", "positionClassName"));
            }
            if (this.props.secondaryLabels && this.props.secondaryLabels.length > 2) {
                console.warn(
                    "DetailsTooltip expecting two or less secondary button labels.",
                    this.props.secondaryLabels.length
                );
            }
        }
    }

    // Remove this once V4 is released. Calling component methods is a bad look.
    // Only here for backward compatibility.
    close = () => {
        if (!this.props.stateless) {
            this.refs.manager.close();
        }
    };

    render() {
        if (this.props.flags.includes("p-stateful")) {
            return <PStatefulDetailsTooltip {...this.props} />;
        }

        return (
            this.props.stateless
                ? React.createElement(DetailsTooltipStateless, //eslint-disable-line
                    _.defaults({ ref: "tooltip" }, this.props), this.props.children)
                : React.createElement(DetailsTooltipStateful, //eslint-disable-line
                    _.defaults({ ref: "manager" }, this.props), this.props.children)
        );
    }
}

/**
 * @enum {string}
 * @desc Enum for the different styles for DetailsTooltip position.
 **/
DetailsTooltip.positionStyles = {
    /** Add className {DetailsTooltip.positionStyles.LEFT} for positioning the tooltip to the left of the label. */
    LEFT: "left",
    /** Add className {DetailsTooltip.positionStyles.RIGHT} for positioning the tooltip to the right of the label. */
    RIGHT: "right",
    /** Add className {DetailsTooltip.positionStyles.TOP} for positioning the tooltip to the top of the label. */
    TOP: "top",
    /** Add className {DetailsTooltip.positionStyles.BOTTOM} for positioning the tooltip to the bottom of the label. */
    BOTTOM: "bottom"
};

export default DetailsTooltip;
