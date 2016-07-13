var React = require("react"),
    RockerButton = require("../../../components/forms/RockerButton.jsx");

var RockerButtonDemo = React.createClass({

    getInitialState: function () {
        return {
            selectedLabel: "Label One",
            selectedIndex: 0
        };
    },

    _handleValueChange: function (labelValues) {
        this.setState({
            selectedLabel: labelValues.label,
            selectedIndex: labelValues.index
        });
    },

    render: function () {

        return (
            <div>
                <RockerButton onValueChange={this._handleValueChange}
                    labels={["Label One", "Label 2", "Label Three", "Longer Label Four"]} />

                <div>Selected rocker label = {this.state.selectedLabel}, index = {this.state.selectedIndex}</div>
            </div>
        );
    }

});

module.exports = RockerButtonDemo;
