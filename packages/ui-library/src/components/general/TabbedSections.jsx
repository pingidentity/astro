var React = require("react/addons");

/** @class TabbedSections
 * @desc A component which breaks up its children by tabs
 * @param {function} onSectionChange - A callback executed when tabs are changed
 * @param {number} active - A number starting 1 to identify the selected tab
 * @param {string} [id] - An id for the top level html element
 * @param {string} [className] - A className for the top level html element
 **/
var TabbedSections = React.createClass({
    propTypes: {
        onSectionChange: React.PropTypes.func.isRequired,
        active: React.PropTypes.number.isRequired,
        id: React.PropTypes.string,
        className: React.PropTypes.string
    },

    _handleSectionChange: function (index) {
        this.props.onSectionChange(index);
    },

    render: function () {
        var activeIndex = this.props.active - 1;

        /* jshint ignore:start */
        return (
            <div data-id={this.props.id} className={this.props.className}>
                <div className="tabs">
                    <ul ref="tabs">
                    {
                        this.props.children.map(function (child, index) {
                            return (<li className={activeIndex === index ? "active" : ""}
                                        onClick={this.props.onSectionChange.bind(null, index + 1)}
                                        key={index}>{child.props.title}</li>);
                        }.bind(this))
                    }
                    </ul>
                </div>
                <div ref="content">{this.props.children[activeIndex]}</div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = TabbedSections;
