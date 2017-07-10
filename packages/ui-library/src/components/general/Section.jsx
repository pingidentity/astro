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
 * @param {boolean} [disableExpand]
 *     Optional attribute to indicate that section is unopenable.
 * @param {object} [accessories]
 *     A container where text, buttons, etc may be passed in to render on the right side of the collapsed section
 * @param {boolean} [stateless]
 *     WARNING. Default value for "stateless" will be set to false from next version.
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally. WARNING. Default value will be
 *     set to false from next version.
 * @param {string|object} [title]
 *     The text to display in the the collapsed view and along the top in the expanded view (adjacent to the arrow)
 * @param {string|object} [titleValue]
 *     The text to display just to the right of the title (separated by a colon)
 * @param {boolean} [controlled=true]
 *     DEPRECATED. Use "stateless" instead.
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
 *                   <button className="add inline">Add</button>
 *               </div>
 *           </div>
 *     </Section>
 *
 **/

var Section = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool, //TODO: remove in new version
        stateless: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: true //TODO: change to stateless with false default in new version
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless", "true", "false"));
        }
    },

    render: function () {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return stateless
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
        onToggle: React.PropTypes.func,
        accessories: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
        ]),
        title: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
        ]),
        titleValue: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
        ]),
        disableExpand: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "section",
            expanded: false,
            onToggle: _.noop,
            disableExpand: false
        };
    },

    _handleToggle: function () {
        if (this.props.disableExpand) {
            return;
        }
        this.props.onToggle(this.props.expanded);
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                console.warn(Utils.deprecateMessage("id", "data-id"));
            }
        }
    },

    render: function () {
        var styles = {
                "collapsible-section": true,
                open: this.props.expanded,
                "disable-expand": this.props.disableExpand
            },
            dataId = this.props.id || this.props["data-id"],
            title = this.props.title;

        styles[this.props.className] = !!this.props.className;

        if (this.props.titleValue) {
            styles["has-title-value"] = true;
        }

        return (
            <div className={classnames(styles)} data-id={dataId}>
                <CollapsibleLink
                    data-id={dataId + "-title"}
                    className="collapsible-section-title"
                    arrowPosition={CollapsibleLink.arrowPositions.LEFT}
                    title={title}
                    expanded={this.props.expanded}
                    onToggle={this._handleToggle}
                />
                {this.props.titleValue && (
                    <span className="collapsible-section-title-value" data-id={dataId + "-title-value"}>
                        {this.props.titleValue}
                    </span>
                )}
                {this.props.accessories && (
                    <div
                        data-id={dataId + "-collapsible-section-accessories"}
                        className="collapsible-section-accessories">
                        {this.props.accessories}
                    </div>
                )}
                <div className="collapsible-section-content" data-id={dataId + "-content"}>
                    <div className="collapsible-section-content-inner">
                        {this.props.children}
                    </div>
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
