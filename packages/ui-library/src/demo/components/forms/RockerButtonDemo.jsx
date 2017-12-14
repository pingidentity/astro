var React = require("react"),
    RockerButton = require("../../../components/forms/RockerButton");

/**
* @name RockerButtonDemo
* @memberof RockerButton
* @desc A demo for RockerButton
*/
class RockerButtonDemo extends React.Component {
    state = {
        selectedLabel: "Label One",
        selectedIndex: 0
    };

    _handleValueChange = (labelValues) => {
        this.setState({
            selectedLabel: labelValues.label,
            selectedIndex: labelValues.index
        });
    };

    render() {
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
}

module.exports = RockerButtonDemo;
