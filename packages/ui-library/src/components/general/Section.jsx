"use strict";
var React = require("react"),
    css = require("classnames");

/**
 * @callback Section~callback
 * @param {bool} expanded - current expanded/collapsed state
 **/


/**
 * @class Section
 * @desc Simple section which expand/collapse on click. In collapsed mode only
 * title is shown. When expanded shows body content.
 *
 * @param {string} [id="section"] - used as data-in on top HTML element.
 * @param {string} [className] - class names for top level HTML element.
 *
 * @param {bool} [expanded=false] - whether or not section is expanded and showing body content.
 * @param {Section~callback} [onToggle] - callback to be executed when visibility toggled.*
 * @example
 *          <Section className="section" title="My Section">
 *                <div className="section-container">     <!-- this is body, will be expanded/collapsed -->
 *                    <div className="input-menu-button">
 *                        <a className="add button inline">Add</a>
 *                    </div>
 *                </div>
 *         </Section>
 **/
var Section = React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        expanded: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            id: "section",
            expanded: false
        };
    },

    _onToggle: function () {
        this.props.onToggle(this.props.expanded);
    },

    render: function () {

        var styles = {
            "collapsible-section": true,
            open: this.props.expanded
        };

        styles[this.props.className] = !!this.props.className;

        return (
            <div className={css(styles)} data-id={this.props.id}>
                <div data-id={this.props.id + "-title"} className="collapsible-section-title" onClick={this._onToggle}>
                    {this.props.title}
                </div>
                <div className="collapsible-section-content" data-id={this.props.id + "-content"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Section;
