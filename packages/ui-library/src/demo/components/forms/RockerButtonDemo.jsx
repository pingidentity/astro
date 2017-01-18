var React = require("react"),
    RockerButton = require("../../../components/forms/RockerButton.jsx");

/**
* @name RockerButtonDemo
* @memberof RockerButton
* @desc A demo for RockerButton
*/
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

                <div>
                    <RockerButton onValueChange={this._handleValueChange}
                                  labels={["Label One", "Label 2", "Label Three", "Longer Label Four"]} />

                    <div className="input-row">
                        Selected rocker label = {this.state.selectedLabel}, index = {this.state.selectedIndex}
                    </div>
                </div>
                
                <div>
                    <RockerButton disabled={true}
                                  labels={["Label One", "Label 2", "Label Three", "Longer Label Four"]} />

                    <div>Disabled rocker button.</div>
                </div>
                
            </div>
            
            
        );
    }

});

module.exports = RockerButtonDemo;
