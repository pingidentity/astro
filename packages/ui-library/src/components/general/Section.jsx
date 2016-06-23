"use strict";
var React = require("react"),
    classnames = require("classnames"),
    CollapsibleLink = require("./CollapsibleLink.jsx"),
    _ = require("underscore");

/**
 * @callback Section~callback
 * @param {bool} expanded - current expanded/collapsed state
 **/


/**
 * @class Section
 * @desc Simple section which expand/collapse on click. In collapsed mode only
 * title is shown. When expanded shows body content.
 *
 * @param {string} [id="section"] - used as data-id on top HTML element.
 * @param {string} [className] - class names for top level HTML element.
 * @param {bool} [controlled=true] - A boolean to enable the component to be externally managed.
 *     True will relinquish control to the components owner.  False or not specified will cause the component to manage
 *     state internally.
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
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: true
        };
    },

    render: function () {
        return (
            this.props.controlled
                ? <SectionStateless ref="SectionStateless" {...this.props} />
                : <SectionStateful ref="SectionStateful" {...this.props} />
        );
    }
});

var SectionStateless = React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        expanded: React.PropTypes.bool,
        onToggle: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            id: "section",
            expanded: false,
            onToggle: _.noop
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
            <div className={classnames(styles)} data-id={this.props.id}>
                <CollapsibleLink data-id={this.props.id + "-title"} className="collapsible-section-title"
                    arrowPosition={CollapsibleLink.arrowPositions.LEFT} title={this.props.title}
                    expanded={this.props.expanded} onToggle={this._onToggle} />
                <div className="collapsible-section-content" data-id={this.props.id + "-content"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var SectionStateful = React.createClass({

    _handleToggle: function () {
        this.setState({
            expanded: !this.state.expanded
        });
    },

    getInitialState: function () {
        return {
            expanded: this.props.expanded || false
        };
    },

    render: function () {
        return (
            <SectionStateless ref="SectionStateless" {...this.props}
                expanded={this.state.expanded}
                onToggle={this._handleToggle}
            />
        );
    }
});

module.exports = Section;
