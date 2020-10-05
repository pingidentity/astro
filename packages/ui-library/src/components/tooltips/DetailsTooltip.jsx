"use strict";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import FocusTrap from "focus-trap-react/dist/focus-trap-react";
import _ from "underscore";
import { callIfOutsideOfContainer } from "../../util/EventUtils.js";
import StateContainer, { toggleTransform } from "../utils/StateContainer";
import Utils from "../../util/Utils";
import Anchor from "../general/Anchor";
import Button from "../buttons/Button";
import PopperContainer from "./PopperContainer";
import ButtonGroup from "../layout/ButtonGroup";
import { deprecatedProp, deprecatedStatelessProp } from "../../util/DeprecationUtils";
import { getClickableA11yProps } from "../../util/PropUtils";

/**
 * @enum {string}
 * @alias DetailsTooltip.tooltipPlacements
 */
const tooltipPlacements = {
    /** top */
    TOP: "top",
    /** bottom */
    BOTTOM: "bottom",
    /** top left */
    TOP_LEFT: "top left",
    /** top right */
    TOP_RIGHT: "top right",
    /** bottom left */
    BOTTOM_LEFT: "bottom left",
    /** bottom right */
    BOTTOM_RIGHT: "bottom right",
};

/**
 * @enum {string}
 * @alias DetailsTooltip.popupTypes
 */
const popupTypes = {
    /** basic */
    BASIC: "basic",
    /** dialog */
    DIALOG: "dialog",
    /** alert */
    ALERT: "alert",
    /** selection-list */
    SELECTION_LIST: "selection-list",
};

/**
 * @enum {string}
 * @alias DetailsTooltip.detailsWidths
 */
const detailsWidths = {
    /** medium */
    MD: "medium",
    /** large */
    LG: "large",
};

/**
 * @callback DetailsTooltip~onToggle
 */

/**
 * @class DetailsTooltip
 * @desc DetailsTooltip implements tooltip callout with trigger label. Body of tooltip is becoming callout content.
 *
 * @param {string} [data-id="details-tooltip"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
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
 * @param {DetailsTooltip.tooltipPlacements} [placement]
 *     How the tooltip is placed off of its trigger.
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
 *     When not provided, the component will manage this value.
 * @param {DetailsTooltip~onToggle} [onToggle]
 *     Callback to be triggered when label is clicked.
 * @param {DetailsTooltip~onKeyDown} [onKeyDown]
 *     Callback to be triggered when escape key is clicked. Closes DetailsTooltip.
 * @param {boolean} [showClose=true]
 *     Show close control.
 * @param {DetailsTooltip.popupTypes} [type="basic"]
 *     Determines basic appearance
* @param {DetailsTooltip.detailsWidths} [width]
 *      If supplied, with add different width sizes for the tooltip.
 *
 * @example
 *     <DetailsTooltip position={DetailsTooltip.tooltipPositions.BOTTOM_LEFT} labelClassName="resend-btn"
 *          title={this.im("pingid.policies.deleterule.label")}
 *          label={this.im("pingid.policies.deleterule.title")}
 *          open={this.state.isInviteOpen} onToggle={this._handleToggle}
 *          disabled={false}>
 *           <p>what ever callout content is</p>
 *     </DetailsTooltip>
 */

const DetailsTitle = ({ children }) => (
    <div className="title">{children}</div>
);

const getDetailsWidth = width => {
    switch (width) {
        case detailsWidths.LG:
            return "details-tooltip-display--large";
        case detailsWidths.MD:
        default:
            return "details-tooltip-display";
    }
};

class DetailsTooltipStateless extends React.Component {
    static displayName = "DetailsTooltipStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        contentClassName: PropTypes.string,
        titleClassName: PropTypes.string,
        labelClassname: PropTypes.string,
        positionClassName: deprecatedProp({ message: "Use the 'placement' prop to place the DetailsTooltip " +
            "and set 'type' to alert for that special styling." }),
        placement: PropTypes.oneOf(Object.values(tooltipPlacements)),
        label: PropTypes.node,
        title: PropTypes.string,
        type: PropTypes.oneOf(Object.values(popupTypes)),
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
        width: PropTypes.oneOf(Object.values(detailsWidths)),
    };

    static defaultProps = {
        "data-id": "details-tooltip",
        titleClassName: "details-title",
        onToggle: _.noop,
        open: false,
        disabled: false,
        showClose: true,
        hideOnClick: false,
        type: popupTypes.BASIC,
        placement: tooltipPlacements.BOTTOM,
        width: detailsWidths.MD
    };

    static popupTypes = popupTypes;

    state = {
        isUsingKeyboard: false,
    };

    constructor(props) {
        super(props);
        this.popperContent = React.createRef();
    }

    /*
     * Call the props toggle() function.
     */
    _handleToggle = () => {
        this.setState({ isUsingKeyboard: false });
        this.props.onToggle();
    };


    /*
     * Call the props toggle() function.
     */
    _handleKeyboardToggle = () => {
        this.setState({ isUsingKeyboard: true });
        if (this.props.open && this.popperContent.current) {
            this.popperContent.current.focus();
        }
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
                {...getClickableA11yProps(value)}
                onClick={value}
                key={label}
            >
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
                {...getClickableA11yProps(value)}
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
            secondaryButtons = this.props.secondaryLabels.map((secondaryLabel, i) => {
                return this._getSecondaryButtonHtml(secondaryLabel.label, secondaryLabel.value, i);
            });
        }

        // can have multiple primary buttons
        if (this.props.primaryLabels) {
            primaryButtons = this.props.primaryLabels.map((primaryLabel, i) => {
                return this._getPrimaryButtonHtml(primaryLabel.label, primaryLabel.value, i);
            });
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
                            {...getClickableA11yProps(this._handleKeyboardToggle)}
                            onClick={this._handleToggle}
                        >
                            {this.props.cancelLabel}
                        </a>
                    </span>
                )}
            </ButtonGroup>);
        }
        return buttons;
    };

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
            {
                alert: this.props.type === popupTypes.ALERT,
            },
        );

        const getPlacement = () => {
            return this.props.placement.replace(/left/, "end").replace(/right/, "start").replace(/\s/, "-");
        };

        const contents = (
            <div
                className="details-content-inner"
                // Stop events from bubbling up out of tooltip
                ref={this.popperContent}
            >
                {this.props.showClose && (
                    <span
                        className={this.props.title ? "details-close" : "details-close-black"}
                        data-id="details-close"
                        {...getClickableA11yProps(this._handleKeyboardToggle)}
                        onClick={this._handleToggle}
                    />
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

        return (
            <PopperContainer
                getReference={this._getTrigger}
                className={classnames(
                    "details-tooltip-display",
                    contentClassName,
                    this.props.className,
                    getDetailsWidth(this.props.width),
                    {
                        "input-selection-list-tooltip": this.props.type === popupTypes.SELECTION_LIST,
                        "details-tooltip--no-header": !this.props.title
                    }
                )}
                pointerClassName="details-tooltip-display__pointer"
                data-id="details-content"
                data-parent={this.props["data-id"]}
                placement={getPlacement()}
                onClick={hide}
                ref={el => this.popperContainer = el}
            >
                <FocusTrap active={this.state.isUsingKeyboard}>
                    {contents}
                </FocusTrap>
            </PopperContainer>
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
            {
                alert: this.props.type === popupTypes.ALERT,
            },
        );

        return (
            <span
                className={containerClassName}
                data-id={this.props["data-id"]}
                ref="container"
            >
                {this.props.label
                    ? <Anchor
                        data-id="action-btn"
                        className={classnames("details-target", targetCss, this.props.labelClassName)}
                        onClick={!this.props.disabled ? this._handleToggle : null}
                        {...getClickableA11yProps(!this.props.disabled ? this._handleKeyboardToggle : null)}
                        ref={el => this.trigger = el}
                    >
                        {this.props.label}
                    </Anchor>
                    : <span ref={el => this.trigger = el} />
                }
                {this._content()}
            </span>
        );
    }
}

const stateDefs = [
    {
        name: "open",
        initial: false,
        callbacks: [{
            name: "onToggle",
            transform: toggleTransform,
        }],
    }
];

class DetailsTooltip extends React.Component {
    static displayName = "DetailsTooltip";

    static propTypes = {
        stateless: deprecatedStatelessProp,
    };

    static tooltipPlacements = tooltipPlacements;
    static DetailsTooltipStateless = DetailsTooltipStateless;

    componentDidMount() {
        // TODO: figure out why Jest test was unable to detect the specific error, create tests for throws
        /* istanbul ignore if  */
        if (!Utils.isProduction()) {
            if (this.props.secondaryLabels && this.props.secondaryLabels.length > 2) {
                console.warn(
                    "DetailsTooltip expecting two or less secondary button labels.",
                    this.props.secondaryLabels.length
                );
            }
        }
    }

    close = () => {
        this.stateContainer.setState(state => (state.open ? { open: false } : {}));
    };

    render() {
        const { initialState, ...props } = this.props;

        return (
            <StateContainer
                stateDefs={stateDefs}
                initialState={initialState}
                passedProps={props}
                ref={el => this.stateContainer = el}
            >
                {containerProps => <DetailsTooltipStateless {...containerProps} />}
            </StateContainer>
        );
    }
}

/**
 * @enum {string}
 * @desc Enum for the different styles for DetailsTooltip position.
 */
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

DetailsTooltip.detailsWidths = detailsWidths;
DetailsTooltip.DetailsTitle = DetailsTitle;

export default DetailsTooltip;
