/*
var React = require("react"),
    ColorPicker = require("../../../components/general/ColorPicker.jsx"),
    _ = require("underscore");

var ColorPickerDemo = React.createClass({

    getInitialState: function () {
        return {
            expanded: true,
            colors: ["#fff", "#000"]
        };
    },

    _handleToggle: function () {
        this.setState({ expanded: !this.state.expanded });
    },

    _handleChange: function (i, color) {
        var colors = _.clone(this.state.colors);
        colors[i] = color;

        this.setState({ colors: colors });
    },

    render: function () {
        return (
            <div>
                <div>
                    <ColorPicker
                        controlled={true}
                        labelText="Externally Managed"
                        expanded={this.state.expanded}
                        color={this.state.colors[0]}
                        onChange={this._handleChange.bind(null, 0)}
                        onToggle={this._handleToggle} />
                </div>
                <div>
                    <ColorPicker labelText="Internally Managed"
                        onChange={this._handleChange.bind(null, 1)}
                        color={this.state.colors[1]} />
                </div>
            </div>);
    }
});

module.exports = ColorPickerDemo;
*/
