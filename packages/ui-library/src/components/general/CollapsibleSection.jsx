"use strict";
var React = require("react"),
    css = require("classnames"),
    _ = require("underscore");

var noop = function () {
};


/**
 * @callback CollapsibleSection~callback
 * @param {bool} expanded - current expanded/collapsed state
**/

/**
 * @deprecated The component is deprecated and subject to be removed in future library versions. See Section control as
 * replacement.
 *
 * @class CollapsibleSection
 * @desc <b>DEPRECATED</b> (see deprecate note below). Simple section which expand/collapse on click. In collapsed mode only
 * title is shown. When expanded shows
 * body content. Designed to work with arbitrary content. To indicate
 * elements corresponding to title,
 * title = {true} attribute should be attached. All unwrapped TEXT nodes automatically treated as part of title.
 * (see examples)
 **
 *
 * @param {string} [activeClassName="active"] - class names to attach when section is expanded.
 * @param {string} [className] - class names for top level div.
 * @param {bool} [toggleOnTitle=false] - flag indicating if section should be toggled via click on title nodes
 *                                       (not including TEXT nodes) vs. entire wrap element surrounding all title nodes.
 *                                       Usually useful when desired active section title width is shorter then overall
 *                                       page width.
 *
 * @param {bool} [expanded=false] - whether or not section is expanded and showing body content.
 * @param {CollapsibleSection~callback} [onToggle] - callback to be executed when visibility toggled.
 * @param {function} [onContentClick] - allow click bubbling without premature collapsing. only available for components
 *          that meet the _filterBodyNodes criteria which is filtered all children who have no title.
 * @param {string} [id="collapsableSection"] - it is used for a unique data-id.
 * @param {bool} [controlled=false] - A boolean to enable the component to be externally managed.  True will relinquish
 *   control to the components owner.  False or not specified will cause the component to manage state internally
 *   but still execute the onToggle callback in case the owner is interested.
 **
 * @example
 *          <Section className="section" toggleOnTitle={true}>
 *               <div className="section-title" title={true}>    <!-- this div is title, always visible -->
 *                    <span className="icon-dropdown-arrow show-section"></span>
 *                    Device Requirements
 *               </div>
 *                <div className="section-container">     <!-- this is body, will be expanded/collapsed -->
 *                    <div className="input-menu-button">
 *                        <button className="add inline">Add</button>
 *                    </div>
 *                </div>
 *         </Section>
 *
 *         <Section className="condition-title grippable">
 *             <span className="icon-dropdown-arrow show-condition" title={true}></span> <!-- multiple title elements-->
 *             Minimum OS
 *             <span className="value" title={true}>iOS 7.1, Android 4.4</span>
 *
 *             <div className="condition">              <!-- body -->
 *                 <div className="input-menu-button">
 *                     <button className="add inline">Add</button>
 *                 </div>
 *             </div>
 *         </Section>
 **/


module.exports = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    componentWillMount: function () {
        console.warn("** This component is deprecated and will be removed in the next release. " +
            "See the \"Section\" or \"Collapsible Link\" components for a replacement.");
    },

    render: function () {
        return (
            this.props.controlled ? <Stateless {...this.props} /> : <Stateful {...this.props} />);
    }
});


var Stateful = React.createClass({

    getInitialState: function () {
        return {
            expanded: this.props.expanded || false
        };
    },

    _onToggle: function (expanded) {

        var self = this;

        this.setState({
            expanded: !expanded
        }, function () {
            if (self.props.onToggle) {
                self.props.onToggle(this.state.expanded);
            }
        });
    },

    render: function () {
        return <Stateless {...this.props} expanded={this.state.expanded} onToggle={this._onToggle}/>;
    }
});

var Stateless = React.createClass({

    displayName: "CollapsableSection",

    propTypes: {
        activeClassName: React.PropTypes.string,
        className: React.PropTypes.string,
        toggleOnTitle: React.PropTypes.bool,
        expanded: React.PropTypes.bool,
        onToggle: React.PropTypes.func,
        onContentClick: React.PropTypes.func,
        id: React.PropTypes.string
    },

    _toggle: function () {
        this.props.onToggle(this.props.expanded);
    },

    /**
     * Filter the title nodes.
     *
     * @param {Object} children parameter
     * @private
     * @returns {Object[]} array objects
     */
    _filterTitleNodes: function (children) {
        var result = [];

        React.Children.forEach(children, function (child) {
            if (child && (!child.props || child.props.title)) {
                result.push(child);
            }
        });

        return result;
    },

    /**
     * Filter the body nodes.
     *
     * @param {Object} children parameter
     * @private
     * @returns {Object[]} array objects
     */
    _filterBodyNodes: function (children) {
        var result = [];

        React.Children.forEach(children, function (child) {
            if (child && child.props && !child.props.title) {
                result.push(child);
            }
        });

        return result;
    },

    getDefaultProps: function () {
        return {
            activeClassName: "active",
            className: "",
            toggleOnTitle: false,
            id: "collapsableSection"
        };
    },

    render: function () {
        var that = this;

        var styles = {};

        styles[this.props.className] = this.props.className;
        styles[this.props.activeClassName] = this.props.expanded;

        var title = this._filterTitleNodes(this.props.children);

        var titleNodes = title;

        //augment title nodes with onClick event
        if (this.props.toggleOnTitle) {
            titleNodes = _.map(title, function (child, idx) {
                if (child.props) {
                    return React.cloneElement(child, {
                        onClick: that._toggle,
                        key: idx
                    });
                } else { //skip non React elements
                    return child;
                }
            });
        }

        var content = null;

        if (this.props.expanded) {

            content = this._filterBodyNodes(this.props.children);

            //augment body nodes to prevent click event propagation
            if (!this.props.toggleOnTitle) {
                content = _.map(content, function (child, idx) {
                    if (child.props) {
                        return React.cloneElement(child, {
                            key: idx,
                            onClick: function (e) {
                                if (that.props.onContentClick) {
                                    that.props.onContentClick(e);
                                }

                                e.stopPropagation();
                            }
                        });
                    } else { //skip non React elements
                        return child;
                    }
                });
            }
        }

        return (
            <div data-id={this.props.id} className={css(styles)}
                 onClick={!this.props.toggleOnTitle ? this._toggle : noop}>
                {titleNodes}
                {content}
            </div>
        );
    }
});