"use strict";
var React = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    _ = require("underscore"),
    callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer;

/** @class DetailsTooltip
 * @desc DetailsTooltip implements tooltip callout with trigger label. Body of tooltip is becoming callout content.
 *
 * @param {string} [id="details-tooltip"] - used as data-in on top HTML element.
 * @param {string} [title] - tooltip title
 * @param {object|string} label - tooltip trigger label (can be a component)
 * @param {string} positionStyle - css styling to manage tooltip callout position ("bottom", "top", "left", "right")
 *          + any extra css styling if needed
 * @param {string} titleClassNames - css classes to apply to title container, "details-title" if not specified
 * @param {string} contentClassNames - css classes to apply to content container, "details-content" if not specified
 * @param {string} labelStyle - extra css styling for trigger label
 * @param {string} className - extra CSS classes to be applied on the top level HTML
 * @param {bool} open - if callout is open (to manage state outside of DetailsTooltip)
 * @param {function} onToggle - delegate to call when label is clicked and tooltip visibility should be triggered
 *          (used to manage state outside of DetailsTooltip in case it should be closed from outside,
 *          e.g. on some external action)
 * @param {bool} disabled - If true then disable button activity and add "disabled"
 *          css style to label link.  Default: false.
 * @param {bool} showClose - show close control, true by default
 * @param {bool} [controlled=true] - A boolean to enable the component to be externally managed.  True will relinquish
 *   control to the component"s owner.  False or not specified will cause the component to manage state internally
 *   but still execute the onToggle callback in case the owner is interested.
 * @param {bool} hideOnClick - whether to close tooltip on content area click, false by default
 * @example
 *       <Details positionStyle="resend-tooltip bottom left" labelStyle="resend-btn"
 *              title={this.im("pingid.policies.deleterule.title")}
 *              label={this.im("pingid.policies.deleterule.title")}
 *               open={this.state.isInviteOpen} onToggle={this._toggleDetails}
 *              disabled={false}>
 *           <p>what ever callout content is</p>
 *       </Details>
 **/
module.exports = React.createClass({
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
                ? <StatelessDetailsTooltip ref="tooltip" {...this.props} />
                : <StatefulDetailsTooltip ref="manager" {...this.props} />);
    }
});

var StatefulDetailsTooltip = React.createClass({
    getInitialState: function () {
        return {
            open: this.props.open
        };
    },

    toggle: function () {
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
        return (
            <StatelessDetailsTooltip ref="tooltip" {...this.props} open={this.state.open} onToggle={this.toggle}>
                {this.props.children}
            </StatelessDetailsTooltip>);
    }
});

var StatelessDetailsTooltip = React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        title: React.PropTypes.string,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object]),
        positionStyle: React.PropTypes.string,
        titleClassNames: React.PropTypes.string,
        contentClassNames: React.PropTypes.string,
        labelStyle: React.PropTypes.string,
        className: React.PropTypes.string,
        open: React.PropTypes.bool,
        onToggle: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        showClose: React.PropTypes.bool,
        hideOnClick: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            id: "details-tooltip",
            positionStyle: "top",
            titleClassNames: "details-title",
            contentClassNames: null,
            open: false,
            showClose: true,
            hideOnClick: false
        };
    },

    /**
     * Call the props toggle() function .
     *
     * @private
     */
    _toggle: function () {
        this.props.onToggle();
    },


    /**
     * Return of content based on props.open.
     *
     * @private
     * @return {React.Component} the React component to be used as tooltip content
     */
    _content: function () {

        var hide = this.props.hideOnClick ? this.props.onToggle : _.noop;

        return this.props.open ? (
            <div className={classnames("details-content", this.props.contentClassNames)} data-id="details-content"
                    onClick={hide}>
                <div className="details-content-inner">
                    {this.props.showClose && (
                        <span className="details-close" data-id="details-close" onClick={this.props.onToggle}></span>
                    )}
                    {this.props.title && (
                        <div className={this.props.titleClassNames} data-id="details-title">{this.props.title}</div>
                    )}
                    <div className="details-body" data-id="details-body">{this.props.children}</div>
                </div>
            </div>
        ) : null;
    },

    _handleGlobalClick: function (e) {
        if (this.props.open) {
            callIfOutsideOfContainer(ReactDOM.findDOMNode(this.refs.container), this._toggle, e);
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
        if (this.props.open) {
            this._bindWindowsEvents();
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

        containerCss[this.props.positionStyle] = true;

        if (this.props.labelStyle) {
            targetCss[this.props.labelStyle] = true;
        }

        if (this.props.className) {
            containerCss[this.props.className] = true;
        }

        return (
            <span className={classnames("details-tooltip", containerCss)} data-id={this.props.id} ref="container">
                {this.props.label ? (
                    <a className={classnames("details-target", targetCss)} data-id="action-btn"
                        onClick={!this.props.disabled && this._toggle}>{this.props.label}</a>) : null }
                {this._content()}
            </span>
        );
    }
});
