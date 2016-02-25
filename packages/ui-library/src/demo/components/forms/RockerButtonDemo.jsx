var React = require("react"),
    RockerButton = require("../../../components/forms/RockerButton.jsx");

var RockerButtonDemo = React.createClass({

    getInitialState: function () {
        return {
            selectedLabel: "None."
        };
    },

    _changeSubview: function (selectedLabel) {
        this.setState({
            selectedLabel: selectedLabel
        });
    },

    render: function () {
        
        return (
            <div>
                <RockerButton onChange={this._changeSubview}
                    labels={["Label One", "Label Two", "Label Three", "Label Four"]} />
                
                <div>Selected rocker index = {this.state.selectedLabel}</div>
            </div>
        );
    }

});

module.exports = RockerButtonDemo;
