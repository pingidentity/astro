var React = require("react/addons"),
    ColorPicker = require("../../../components/general/ColorPicker.jsx"),
    _ = require("underscore");

var ColorPickerDemo = React.createClass({

    getInitialState: function () {
        return {
            visible: [false, false],
            color: ["#fff", "#000"]
        };
    },

    _handleToggle: function (i) {
        var visible = _.clone(this.state.visible);
        visible[i] = !visible[i];

        this.setState({ visible: visible });
    },

    _handleChange: function (i, color) {
        var clone = _.clone(this.state.color);
        clone[i] = color.toHex();

        this.setState({ color: clone });
    },

    render: function () {
        return (
            <div>
                <ColorPicker
                    visible={this.state.visible[0]}
                    color={this.state.color[0]}
                    onChange={this._handleChange.bind(this, 0)}
                    onToggle={this._handleToggle.bind(this, 0)} />
                <ColorPicker
                    visible={this.state.visible[1]}
                    color={this.state.color[1]}
                    onChange={this._handleChange.bind(this, 1)}
                    onToggle={this._handleToggle.bind(this, 1)} />
            </div>);
    }
});

module.exports = ColorPickerDemo;
