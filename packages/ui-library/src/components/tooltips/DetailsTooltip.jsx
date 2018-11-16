"use strict";
var PropTypes = require("prop-types");
var React = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    _ = require("underscore"),
    callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer,
    Utils = require("../../util/Utils");

import Button from "../buttons/Button";
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

class DetailsTooltip extends React.Component {
    static displayName = "DetailsTooltip";

    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: true //TODO: change to stateless with false default in new version
    };

    close = () => {
        if (!this.props.stateless) {
            this.refs.manager.close();
        }
    };

    componentWillMount() {
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

    render() {
        return (
            this.props.stateless
                ? React.createElement(DetailsTooltipStateless, //eslint-disable-line
                    _.defaults({ ref: "tooltip" }, this.props), this.props.children)
                : React.createElement(DetailsTooltipStateful, //eslint-disable-line
                    _.defaults({ ref: "manager" }, this.props), this.props.children)
        );
    }
}

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
        cancelLabel: PropTypes.string
    };

    static defaultProps = {
        "data-id": "details-tooltip",
        positionClassName: "top",
        titleClassName: "details-title",
        onToggle: _.noop,
        open: false,
        disabled: false,
        showClose: true,
        hideOnClick: false
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

        if (i > 1) {
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

        if (i > 1) {
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
            buttons = (<div className="button-group" data-id="buttons">
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
            </div>);
        }
        return buttons;
    };

    /*
     * Return of content based on props.open.
     *
     * @return {React.Component} the React component to be used as tooltip content
     */
    _content = () => {

        var hide = this.props.hideOnClick ? this._handleToggle : _.noop;
        var contentClassName =
            classnames("details-content", this.props.contentClassName) ;

        return this.props.open ? (
            <div className={contentClassName} data-id="details-content"
                    onClick={hide}>
                <div className="details-content-inner">
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
            </div>
        ) : null;
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
            <span className={containerClassName} data-id={this.props["data-id"]} ref="container">
                {this.props.label && (
                    <a
                        data-id="action-btn"
                        className={classnames("details-target", targetCss, this.props.labelClassName)}
                        onClick={!this.props.disabled ? this._handleToggle : null}>
                        {this.props.label}
                    </a>
                )}
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

module.exports = DetailsTooltip;
