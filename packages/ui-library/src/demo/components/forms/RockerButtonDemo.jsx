var React = require("react"),
    RockerButton = require("../../../components/forms/RockerButton.jsx");

/**
* @name RockerButtonDemo
* @memberof RockerButton
* @desc A demo for RockerButton
*/
var RockerButtonDemo = React.createClass({

    _handleValueChange: function (labelValues) {
        this.setState({
            selectedLabel: labelValues.label,
            selectedIndex: labelValues.index
        });
    },

    getInitialState: function () {
        return {
            selectedLabel: "Label One",
            selectedIndex: 0
        };
    },

    render: function () {
        var labels = ["Label One", "Label 2", "Label Three", "Longer Label Four"];
        return (
            <div>
                <RockerButton
                    stateless={false}
                    onValueChange={this._handleValueChange}
                    labels={labels}
                />
                <div>Selected rocker label = {this.state.selectedLabel}, index = {this.state.selectedIndex}</div>

                <br /><br />

                <RockerButton
                    stateless={false}
                    disabled={true}
                    labels={labels}
                />
                <div>Disabled rocker button.</div>
            </div>
        );
    }
});

module.exports = RockerButtonDemo;
