var React = require("react/addons"),
    ColorPicker = require("../../../components/general/ColorPicker.jsx"),
    _ = require("underscore");

var ColorPickerDemo = React.createClass({

    getInitialState: function () {
        return {
            expanded: [false, false],
            color: ["#fff", "#000"]
        };
    },

    _handleToggle: function (i) {
        var expanded = _.clone(this.state.expanded);
        expanded[i] = !expanded[i];

        this.setState({ expanded: expanded });
    },

    _handleChange: function (i, color) {
        var clone = _.clone(this.state.color);
        clone[i] = color.toHex();

        this.setState({ color: clone });
    },

    render: function () {
        return (
            <div>
                <div>
                    <ColorPicker
                        unmanaged={true}
                        labelText="Externally Managed"
                        expanded={this.state.expanded[0]}
                        color={this.state.color[0]}
                        onChange={this._handleChange.bind(this, 0)}
                        onToggle={this._handleToggle.bind(this, 0)} />
                </div>
                <div>
                    <ColorPicker
                        labelText="Internally Managed"
                        color={this.state.color[1]}
                        onChange={this._handleChange.bind(this, 1)} />
                </div>
            </div>);
    }
});

module.exports = ColorPickerDemo;
