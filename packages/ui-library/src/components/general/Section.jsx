"use strict";
var React = require("react"),
    classnames = require("classnames"),
    CollapsibleLink = require("./CollapsibleLink.jsx"),
    Utils = require("../../util/Utils"),
    _ = require("underscore");

/**
 * @callback Section~onToggle
 *
 * @param {boolean} expanded
 *     Current expanded/collapsed state.
 **/

/**
 * @class Section
 * @desc Simple section which expand/collapse on click. In collapsed mode only
 * title is shown. When expanded shows body content.
 *
 * @param {string} [data-id="section"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead. To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [controlled=true]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally. WARNING. Default value will be
 *     set to false from next version.
 *
 * @param {boolean} [expanded=false]
 *     Whether or not section is expanded and showing body content.
 *
 * @param {Section~onToggle} [onToggle]
 *     Callback to be triggered when visibility is toggled.
 *
 * @example
 *     <Section className="section" title="My Section">
 *           <div className="section-container">     <!-- this is body, will be expanded/collapsed -->
 *               <div className="input-menu-button">
 *                   <a className="add button inline">Add</a>
 *               </div>
 *           </div>
 *     </Section>
 *
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
        return this.props.controlled
            ? React.createElement(SectionStateless, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "SectionStateless" }, this.props), this.props.children)
            : React.createElement(SectionStateful, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "SectionStateful" }, this.props), this.props.children);
    }
});

var SectionStateless = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        expanded: React.PropTypes.bool,
        onToggle: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "section",
            expanded: false,
            onToggle: _.noop
        };
    },

    _handleToggle: function () {
        this.props.onToggle(this.props.expanded);
    },

    componentWillMount: function () {
        console.warn(
            "** Default value for 'controlled' in Section component will be set to 'false' from next version");
        if (this.props.id) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    },

    render: function () {

        var styles = {
            "collapsible-section": true,
            open: this.props.expanded
        };

        styles[this.props.className] = !!this.props.className;

        var dataId = this.props.id || this.props["data-id"];

        return (
            <div className={classnames(styles)} data-id={dataId}>
                <CollapsibleLink data-id={dataId + "-title"} className="collapsible-section-title"
                    arrowPosition={CollapsibleLink.arrowPositions.LEFT} title={this.props.title}
                    expanded={this.props.expanded} onToggle={this._handleToggle} />
                <div className="collapsible-section-content" data-id={dataId + "-content"}>
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
        var props = _.defaults({
            ref: "SectionStateless",
            expanded: this.state.expanded,
            onToggle: this._handleToggle
        }, this.props);

        return React.createElement(SectionStateless, props, this.props.children);
    }
});

module.exports = Section;
