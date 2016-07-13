"use strict";

var React = require("re-react"),
    Utils = require("../../util/Utils");

/**
 * @callback TabbedSections~onValueChange
 * @param {number} index
 *          Selected tab index
 */

/**
 * @class TabbedSections
 * @desc A component which breaks up its children by tabs.
 *
 * @param {string} [data-id="tabbed-sections"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [id]
 *          DEPRECATED. Use "data-id" instead.
 * @param {string} [className]
 *          CSS classes to set on the top-level HTML container.
 * @param {number} selectedIndex
 *              A number starting at 0 to identify the selected tab
 * @param {boolean} [renderHidden=false]
 *              Hide hidden children by applying a style instead of not rendering
 * @param {TabbedSections~onValueChange} onValueChange
 *              Callback to be triggered when a new tab selected.
 * @param {TabbedSections~onSectionChange} onSectionChange
 *              DEPRECATED. Use onValueChange instead.
 *
 * @example
 *
 *       <TabbedSections data-id="my-data-id" selectedIndex={this.state.selectedIndex}
 *                        onValueChange={this._handleSectionChange} >
 *           <div title="Section 1">
 *               <span>This is the content of section 1</span>
 *           </div>
 *           <div title="Section 2">
 *               <div>This is the content of section 2.0</div>
 *               <div>This is the content of section 2.1</div>
 *               <div>This is the content of section 2.2</div>
 *           </div>
 *       </TabbedSections>
 */
var TabbedSections = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string.affectsRendering,
        id: React.PropTypes.string.affectsRendering,
        className: React.PropTypes.string.affectsRendering,
        selectedIndex: React.PropTypes.number.isRequired.affectsRendering,
        renderHidden: React.PropTypes.bool.affectsRendering,
        onSectionChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func // add isRequired once the onSectionChange is removed
    },

    getDefaultProps: function () {
        return {
            "data-id": "tabbed-sections",
            renderHidden: false
        };
    },

    /**
     * Returns all children
     * @method TabbedSections#_renderAllChildren
     * @private
     * @return {Object[]} The React child components
     */
    _renderAllChildren: function () {
        return React.Children.map(this.props.children, function (item, index) {
            return <div style={{ display: this.props.selectedIndex === index ? "" : "none" }}> {item} </div>;
        }.bind(this));
    },

    /**
     * Returns selected child
     * @method TabbedSections#_renderSelectedChild
     * @private
     * @return {Object[]} [description]
     */
    _renderSelectedChild: function () {
        return React.Children.count(this.props.children) === 1
            ? this.props.children : this.props.children[this.props.selectedIndex];
    },

    componentWillMount: function () {
        if (this.props.id) {
            Utils.deprecateWarn("id", "data-id");
        }
        if (this.props.onSectionChange) {
            Utils.deprecateWarn("onSectionChange", "onValueChange");
        }
    },
    
    render: function () {
        var id = this.props.id || this.props["data-id"];
        var callback = this.props.onSectionChange || this.props.onValueChange;
        
        /* jshint ignore:start */
        return (
            <div data-id={id} className={this.props.className}>
                <div className="tabs">
                    <ul ref="tabs">
                    {
                        React.Children.map(this.props.children, function (child, index) {
                            return (<li className={this.props.selectedIndex === index ? "active" : ""}
                                        onClick={callback.bind(null, index)}
                                        key={index}>{child.props.title}</li>);
                        }.bind(this))
                    }
                    </ul>
                </div>
                <div ref="content">
                { this.props.renderHidden ? this._renderAllChildren() : this._renderSelectedChild() }
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = TabbedSections;
