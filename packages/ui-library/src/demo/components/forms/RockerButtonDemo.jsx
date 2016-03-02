var React = require("react"),
    RockerButton = require("../../../components/forms/RockerButton.jsx");

var RockerButtonDemo = React.createClass({

    getInitialState: function () {
        return {
            selectedLabel: "Label One",
            selectedIndex: 0
        };
    },

    _changeSubview: function (selectedLabel, selectedIndex) {
        this.setState({
            selectedLabel: selectedLabel,
            selectedIndex: selectedIndex
        });
    },

    render: function () {

        return (
            <div>
                <RockerButton onChange={this._changeSubview}
                    labels={["Label One", "Label Two", "Label Three", "Label Four"]} />

                <div>Selected rocker label = {this.state.selectedLabel}, index = {this.state.selectedIndex}</div>
            </div>
        );
    }

});

module.exports = RockerButtonDemo;
