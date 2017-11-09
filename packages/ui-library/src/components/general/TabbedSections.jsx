"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
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
 * @param {string} [className]
 *          CSS classes to set on the top-level HTML container.
 * @param {number} selectedIndex
 *              A number starting at 0 to identify the selected tab
 * @param {boolean} [renderHidden=false]
 *              Hide hidden children by applying a style instead of not rendering
 * @param {TabbedSections~onValueChange} onValueChange
 *              Callback to be triggered when a new tab selected.
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
class TabbedSections extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        selectedIndex: PropTypes.number.isRequired,
        renderHidden: PropTypes.bool,
        onValueChange: PropTypes.func.isRequired,
        children: PropTypes.node
    };

    static defaultProps = {
        "data-id": "tabbed-sections",
        renderHidden: false
    };

    /**
     * Returns all children
     * @method TabbedSections#_renderAllChildren
     * @private
     * @return {Object[]} The React child components
     */
    _renderAllChildren = () => {
        return React.Children.map(this.props.children, function (item, index) {
            return <div style={{ display: this.props.selectedIndex === index ? "" : "none" }}> {item} </div>;
        }.bind(this));
    };

    /**
     * Returns selected child
     * @method TabbedSections#_renderSelectedChild
     * @private
     * @return {Object[]} [description]
     */
    _renderSelectedChild = () => {
        return React.Children.count(this.props.children) === 1
            ? this.props.children : this.props.children[this.props.selectedIndex];
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                throw(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.onSectionChange) {
                throw(Utils.deprecatePropError("onSectionChange", "onValueChange"));
            }
        }
    }

    render() {
        /* jshint ignore:start */
        return (
            <div data-id={this.props["data-id"]} className={this.props.className}>
                <div className="tabs">
                    <ul ref="tabs">
                    {
                        React.Children.map(this.props.children, function (child, index) {
                            return (<TabbedSectionChild className={this.props.selectedIndex === index ? "active" : ""}
                                        data-id={this.props["data-id"] + "-" + index}
                                        onClick={this.props.onValueChange}
                                        key={index}
                                        index={index}
                                        content={child.props.title} />);
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
}

var TabbedSectionChild = function (props) {
    var _handleClick = function (event) {
        props.onClick(props.index, event);
    };

    return (
        <li className={props.className}
                data-id={props["data-id"]}
                onClick={_handleClick}
                key={props.key}>
            {props.content}
        </li>
    );
};

TabbedSectionChild.propTypes = {
    "data-id": PropTypes.string,
    key: PropTypes.string,
    className: PropTypes.string,
    index: PropTypes.string,
    onClick: PropTypes.func,
    content: PropTypes.node
};

module.exports = TabbedSections;
