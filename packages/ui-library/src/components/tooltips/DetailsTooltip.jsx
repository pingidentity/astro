"use strict";
var React = require("react");
var css = require("classnames");


/** @class DetailsTooltip
 * @desc DetailsTooltip implements tooltip callout with trigger label. Body of tooltip is becoming callout content.
 *
 * @param {string} title - tooltip title ( required )
 * @param {string} label - tooltip trigger label
 * @param {string} positionStyle - css styling to manage tooltip callout position ('bottom', 'top', 'left', 'right')
 *          + any extra css styling if needed
 * @param {string} titleClassNames - css classes to apply to title container, 'details-title' if not specified
 * @param {string} contentClassNames - css classes to apply to content container, 'details-content' if not specified
 * @param {string} labelStyle - extra css styling for trigger label
 * @param {string} className - extra CSS classes to be applied on the top level HTML
 * @param {bool} open - if callout is open (to manage state outside of DetailsTooltip)
 * @param {function} onToggle - delegate to call when label is clicked and tooltip visibility should be triggered
 *          (used to manage state outside of DetailsTooltip in case it should be closed from outside,
 *          e.g. on some external action)
 * @param {bool} disabled - If true then disable button activity and add "disabled"
 *          css style to label link.  Default: false.
 * @param {bool} showClose - show close control, true by default
 * @param {bool} hideOnClick - whether to close tooltip on content area click, false by default
 * @example
 *       <Details positionStyle="resend-tooltip bottom left" labelStyle="resend-btn"
 *              title={this.im('pingid.policies.deleterule.title')}
 *              label={this.im('pingid.policies.deleterule.title')}
 *               open={this.state.isInviteOpen} onToggle={this._toggleDetails}
 *              disabled={false}>
 *           <p>what ever callout content is</p>
 *       </Details>
 **/

var DetailsTooltip = React.createClass({

    propTypes: {
        title: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
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
            positionStyle: "top",
            titleClassNames: "details-title",
            contentClassNames: "details-content",
            open: false,
            showClose: true,
            hideOnClick: false
        };
    },

    /**
     * Call the props toggle() function .
     *
     * @returns {undefined}
     * @private
    */
    _toggle: function () {
        this.props.onToggle();
    },


    /**
     * Return of content based on props.open.
     *
     * @returns {undefined}
     * @private
    */
    _content: function () {

        var hide = this.props.hideOnClick ? this.props.onToggle : function () {
        };

        return this.props.open ? (
            /* jshint ignore:start */
            <div className={this.props.contentClassNames} data-id="details-content" onClick={hide}>
                    {this.props.showClose && <a className="details-close" data-id="details-close"
                    onClick={this.props.onToggle}></a>}
                <div className={this.props.titleClassNames} data-id="details-title">{this.props.title}</div>
                  {this.props.children}
            </div>
            /* jshint ignore:end */
        ) : null;
    },

    render: function () {

        var containerCss = css({
            show: this.props.open,
            "details-tooltip": true
        });

        containerCss = containerCss + " " + this.props.positionStyle;

        var targetCss = "details-target";

        if (this.props.labelStyle) {
            targetCss = targetCss + " " + this.props.labelStyle;
        }

        if (this.props.className) {
            containerCss = containerCss + " " + this.props.className;
        }

        if (this.props.disabled) {
            targetCss += " disabled";
        }

        return (
            /* jshint ignore:start */
            <span className={containerCss}>
                {this.props.label ? <a className={targetCss} data-id="action-btn"
                    onClick={!this.props.disabled && this._toggle}>{this.props.label}</a> : null}
                {this._content()}
            </span>
            /* jshint ignore:end */
        );
    }
});

module.exports = DetailsTooltip;
