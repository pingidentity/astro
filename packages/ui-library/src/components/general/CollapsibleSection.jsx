"use strict";
var React = require("react/addons"),
    css = require("classnames"),
    _ = require("underscore");

var noop = function () {};
/**
 * @class Section
 * @desc Simple section which expand/collapse on click. In collapsed mody only
 *          title is shown. When expanded shows
 *          body content. Designed to work with arbitrary content. To indicate
 *          elements corresponding to title,
 *          title = {true} attribute should be attached (see examples)
 *
 * @param {string} activeClassName - class names to attach when section is expanded.
 * @param {string} className - class names for top level div.
 * @param {bool} toggleOnTitle - boolean.
 * @param {bool} expanded - whether or not initially expanded.
 * @param {function} onToggle - execute extra functionality on toggle.
 * @param {function} onContentClick - allow click bubbling without premature collapsing. only available for components
 *          that meet the _filterBodyNodes criteria which is filtered all children who have no title.
 * @param {string} id - it is used for a unique data-id.
 *
 * @example
 *          <Section className="section" toggleOnTitle={true}>
 *               <div className="section-title" title={true}>    <!-- this div is title, always visible -->
 *                    <span className="icon-dropdown-arrow show-section"></span>
 *                    Device Requirements
 *               </div>
 *                <div className="section-container">     <!-- this is body, will be expanded/collapsed -->
 *                    <div className="input-menu-button">
 *                        <a className="add button inline">Add</a>
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
 *                     <a className="add button inline">Add</a>
 *                 </div>
 *             </div>
 *         </Section>
 **/
var Section = React.createClass({

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

    /**
     * Call the props toggle() function .
     *
     * @returns {undefined}
     * @private
    */
    _toggle: function () {
        this.setState({
            open: !this.state.open
        }, function () {
            this.props.onToggle(this.state.open);
        }.bind(this));
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
            onToggle: noop,
            id: "collapsableSection"
        };
    },

    getInitialState: function () {
        return {
            open: this.props.expanded || false
        };
    },

    render: function () {
        var that = this;

        var styles = {};

        styles[this.props.className] = this.props.className;
        styles[this.props.activeClassName] = this.state.open;

        var title = this._filterTitleNodes(this.props.children);

        var titleNodes = title;

        //augment title nodes with onClick event
        if (this.props.toggleOnTitle) {
            titleNodes = _.map(title, function (child, idx) {
                if (child.props) {
                    return React.addons.cloneWithProps(child, {
                        onClick: that._toggle,
                        key: idx
                    });
                } else { //skip non React elements
                    return child;
                }
            });
        }

        var content = null;

        if (this.state.open) {

            content = this._filterBodyNodes(this.props.children);

            //augment body nodes to prevent click event propagation
            if (!this.props.toggleOnTitle) {
                content = _.map(content, function (child, idx) {
                    if (child.props) {
                        return React.addons.cloneWithProps(child, {
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
            /* jshint ignore:start */
            <div data-id={this.props.id} className={css(styles)}
                onClick={!this.props.toggleOnTitle ? this._toggle : noop}>
                {titleNodes}
                {content}
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = Section;