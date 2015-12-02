var React = require("react/addons");

/** @class TabbedSections
 * @desc A component which breaks up its children by tabs
 * @param {function} onSectionChange - A callback executed when tabs are changed
 * @param {number} selectedIndex - A number starting at 0 to identify the selected tab
 * @param {string} [id] - An id for the top level html element
 * @param {string} [className] - A className for the top level html element
 * @param {boolean} [renderHidden] - Hide hidden children by applying a style instead of not rendering
 **/
var TabbedSections = React.createClass({
    propTypes: {
        onSectionChange: React.PropTypes.func.isRequired,
        selectedIndex: React.PropTypes.number.isRequired,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        renderHidden: React.PropTypes.bool
    },

    _renderAllChildren: function () {
        return React.Children.map(this.props.children, function (item, index) {
            return <div style={{ display: this.props.selectedIndex === index ? "" : "none" }}> {item} </div>;
        }.bind(this));
    },

    _renderSelectedChild: function () {
        return this.props.children[this.props.selectedIndex];
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div data-id={this.props.id} className={this.props.className}>
                <div className="tabs">
                    <ul ref="tabs">
                    {
                        this.props.children.map(function (child, index) {
                            return (<li className={this.props.selectedIndex === index ? "active" : ""}
                                        onClick={this.props.onSectionChange.bind(null, index)}
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
