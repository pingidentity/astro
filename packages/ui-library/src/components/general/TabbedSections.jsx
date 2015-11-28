var React = require("react/addons");

/** @class TabbedSections
 * @desc A component which breaks up its children by tabs
 * @param {function} onSectionChange - A callback executed when tabs are changed
 * @param {number} active - A number starting 1 to identify the selected tab
 * @param {string} [id] - An id for the top level html element
 * @param {string} [className] - A className for the top level html element
 * @param {boolean} [renderHidden] - Hide hidden children by applying a style instead of not rendering
 **/
var TabbedSections = React.createClass({
    propTypes: {
        onSectionChange: React.PropTypes.func.isRequired,
        active: React.PropTypes.number.isRequired,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        renderHidden: React.PropTypes.bool
    },

    _renderAllChildren: function () {
        return React.Children.map(this.props.children, function (item, index) {
            return <div style={{ display: this.props.active === index ? "" : "none" }}> {item} </div>;
        }.bind(this));
    },

    _renderActiveChild: function () {
        return this.props.children[this.props.active];
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div data-id={this.props.id} className={this.props.className}>
                <div className="tabs">
                    <ul ref="tabs">
                    {
                        this.props.children.map(function (child, index) {
                            return (<li className={this.props.active === index ? "active" : ""}
                                        onClick={this.props.onSectionChange.bind(null, index)}
                                        key={index}>{child.props.title}</li>);
                        }.bind(this))
                    }
                    </ul>
                </div>
                <div ref="content">
                { this.props.renderHidden ? this._renderAllChildren() : this._renderActiveChild() }
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = TabbedSections;
