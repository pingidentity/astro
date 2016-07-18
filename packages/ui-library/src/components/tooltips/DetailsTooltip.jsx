"use strict";
var React = require("re-react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    _ = require("underscore"),
    callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer,
    Utils = require("../../util/Utils");

/**
 * @callback DetailsTooltip~onToggle
 **/

/**
 * @class DetailsTooltip
 * @desc DetailsTooltip implements tooltip callout with trigger label. Body of tooltip is becoming callout content.
 *
 * @param {string} [data-id="details-tooltip"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [controlled=true]
 *     WARNING. Default value will be set to false from next version. To enable the component to be externally managed.
 *     True will relinquish control to the component's owner. False or not specified will cause the component to manage
 *     state internally.
 * @param {string} [contentClassName]
 *     CSS classes to apply to content container
 * @param {string} [contentClassNames]
 *     DEPRECATED. Use "contentClassName" instead.
 * @param {string} [titleClassName]
 *     CSS classes to apply to title container.
 * @param {string} [titleClassNames]
 *     DEPRECATED. Use "titleClassName" instead.
 * @param {string} [labelClassName]
 *     CSS classes to set on the trigger label.
 * @param {string} [labelStyle]
 *     DEPRECATED. Use "labelClassName" instead.
 * @param {DetailsTooltip.positionStyles|string} [positionClassName]
 *     CSS classes to set on the top-level HTML container. Used to manage tooltip callout positioning with the
 *     DetailsTooltip.positionStyles enum and/or any extra css styling if needed.
 * @param {DetailsTooltip.positionStyles|string} [positionStyle]
 *     DEPRECATED. Use "positionClassName" instead.
 *
 * @param {object|string} [label]
 *     A string or JSX object that serves as the trigger label.
 * @param {string} [title]
 *     Tooltip title
 *
 * @param {boolean} [disabled=false]
 *     If true then disable button activity and add "disabled" css style to label link.
 * @param {boolean} [hideOnClick=false]
 *     Whether to close tooltip on content area click.
 * @param {boolean} [open=false]
 *     If true, tooltip is open or else closed.
 * @param {DetailsTooltip~onToggle} [onToggle]
 *     Callback to be triggered when label is clicked.
 * @param {boolean} [showClose=true]
 *     Show close control.
 *
 * @example
 *     <DetailsTooltip positionStyle="resend-tooltip bottom left" labelStyle="resend-btn"
 *          title={this.im("pingid.policies.deleterule.label")}
 *          label={this.im("pingid.policies.deleterule.title")}
 *          open={this.state.isInviteOpen} onToggle={this._handleToggle}
 *          disabled={false}>
 *           <p>what ever callout content is</p>
 *     </DetailsTooltip>
 **/

var DetailsTooltip = React.createClass({
    getDefaultProps: function () {
        return {
            controlled: true
        };
    },

    close: function () {
        if (!this.props.controlled) {
            this.refs.manager.close();
        }
    },

    render: function () {
        return (
            this.props.controlled
                ? React.createElement(DetailsTooltipStateless, //eslint-disable-line
                    _.defaults({ ref: "tooltip" }, this.props), this.props.children)
                : React.createElement(DetailsTooltipStateful, //eslint-disable-line
                    _.defaults({ ref: "manager" }, this.props), this.props.children)
        );
    }
});

var DetailsTooltipStateless = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string.affectsRendering,
        contentClassName: React.PropTypes.string.affectsRendering,
        contentClassNames: React.PropTypes.string.affectsRendering,
        titleClassName: React.PropTypes.string.affectsRendering,
        titleClassNames: React.PropTypes.string.affectsRendering,
        labelClassname: React.PropTypes.string.affectsRendering,
        labelStyle: React.PropTypes.string.affectsRendering,
        positionClassname: React.PropTypes.string.affectsRendering,
        positionStyle: React.PropTypes.string.affectsRendering,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object]).affectsRendering,
        title: React.PropTypes.string.affectsRendering,
        disabled: React.PropTypes.bool.affectsRendering,
        hideOnClick: React.PropTypes.bool.affectsRendering,
        open: React.PropTypes.bool.affectsRendering,
        onToggle: React.PropTypes.func,
        showClose: React.PropTypes.bool.affectsRendering,
        children: React.PropTypes.node.affectsRendering
    },

    getDefaultProps: function () {
        return {
            "data-id": "details-tooltip",
            positionClassName: "top",
            titleClassName: "details-title",
            open: false,
            disabled: false,
            showClose: true,
            hideOnClick: false
        };
    },

    /*
     * Call the props toggle() function .
     */
    _handleToggle: function () {
        this.props.onToggle();
    },


    /*
     * Return of content based on props.open.
     *
     * @return {React.Component} the React component to be used as tooltip content
     */
    _content: function () {

        var hide = this.props.hideOnClick ? this.props.onToggle : _.noop;
        var contentClassName =
            classnames("details-content", (this.props.contentClassNames || this.props.contentClassName)) ;
        var titleClassName = this.props.titleClassNames || this.props.titleClassName;

        return this.props.open ? (
            <div className={contentClassName} data-id="details-content"
                    onClick={hide}>
                <div className="details-content-inner">
                    {this.props.showClose && (
                        <span className="details-close" data-id="details-close" onClick={this.props.onToggle}></span>
                    )}
                    {this.props.title && (
                        <div className={titleClassName} data-id="details-title">{this.props.title}</div>
                    )}
                    <div className="details-body" data-id="details-body">{this.props.children}</div>
                </div>
            </div>
        ) : null;
    },

    _handleGlobalClick: function (e) {
        if (this.props.open) {
            callIfOutsideOfContainer(ReactDOM.findDOMNode(this.refs.container), this._handleToggle, e);
        }
    },

    _bindWindowsEvents: function () {
        var self = this;

        //bind once current execution stack is cleared (e.g. current window event processed).
        //to avoid possible false positive triggers if tooltip was open as result of click outside of it (e.g. some link outside)
        _.defer(function () {
            window.addEventListener("click", self._handleGlobalClick);
        });
    },

    componentWillReceiveProps: function (nextProps) {
        if (!this.props.open && nextProps.open) {
            this._bindWindowsEvents();
        }
        else if (this.props.open && !nextProps.open) {
            window.removeEventListener("click", this._handleGlobalClick);
        }
    },

    componentWillMount: function () {
        console.warn(
            "** Default value for 'controlled' in `DetailsTooltip` component will be set to 'false' from next version");

        if (this.props.open) {
            this._bindWindowsEvents();
        }

        if (this.props.id) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
        if (this.props.contentClassNames) {
            console.warn(Utils.deprecateMessage("contentClassNames", "contentClassName"));
        }
        if (this.props.titleClassNames) {
            console.warn(Utils.deprecateMessage("titleClassNames", "titleClassName"));
        }
        if (this.props.labelStyle) {
            console.warn(Utils.deprecateMessage("labelStyle", "labelClassName"));
        }
        if (this.props.positionStyle) {
            console.warn(Utils.deprecateMessage("positionStyle", "positionClassName"));
        }
    },

    componentWillUnmount: function () {
        window.removeEventListener("click", this._handleGlobalClick);
    },

    render: function () {

        var containerCss = {
                show: this.props.open
            },
            targetCss = {
                disabled: this.props.disabled
            };

        var positionClassName = this.props.positionStyle || this.props.positionClassName;
        containerCss[positionClassName] = true;

        var labelClassName = this.props.labelStyle || this.props.labelClassName;
        if (labelClassName) {
            targetCss[labelClassName] = true;
        }

        if (this.props.className) {
            containerCss[this.props.className] = true;
        }

        var containerClassName = classnames("details-tooltip", containerCss);
        var dataId = this.props.id || this.props["data-id"];

        return (
            <span className={containerClassName} data-id={dataId} ref="container">
                {this.props.label ? (
                    <a className={classnames("details-target", targetCss)} data-id="action-btn"
                        onClick={!this.props.disabled && this._handleToggle}>{this.props.label}</a>) : null }
                {this._content()}
            </span>
        );
    }
});

var DetailsTooltipStateful = React.createClass({
    getInitialState: function () {
        return {
            open: this.props.open
        };
    },

    _handleToggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    close: function () {
        this.setState({
            open: false
        });
    },

    render: function () {
        var props = _.defaults(
            { ref: "tooltip", open: this.state.open, onToggle: this._handleToggle }, this.props);
        return React.createElement(DetailsTooltipStateless, props, this.props.children);
    }
});

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