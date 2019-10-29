import React from "react";
import FormLabel from "../../../components/forms/FormLabel";
import RockerButton from "../../../components/forms/RockerButton";

/**
* @name RockerButtonDemo
* @memberof RockerButton
* @desc A demo for RockerButton
*/

const labels = ["Label One", "Label 2", "Label Three", "Longer Label Four"];

const years = ["3M", "6M", "1Y"];
const days = ["1D", "1W", "1M"];

const labelsWithId = [
    { label: "Label One", id: "rocker1" },
    { label: "Label 2", id: "rocker2" },
    { label: "Label Three", id: "rocker3" },
    { label: "Longer Label Four", id: "rocker4" }
];
class RockerButtonDemo extends React.Component {
    state = {
        selectedLabel: "Label One",
        selectedIndex: 0,
        selectedLabel2: "Label One",
        selectedIndex2: "rocker1",
    };

    _handleValueChange = (labelValues) => {
        this.setState({
            selectedLabel: labelValues.label,
            selectedIndex: labelValues.index,
        });
    };

    _handleChangeWithId = (labelValues) => {
        this.setState({
            selectedLabel2: labelValues.label,
            selectedIndex2: labelValues.index,

        });
    }

    render() {
        return (
            <div>
                <RockerButton
                    onValueChange={this._handleValueChange}
                    labels={labels}
                />
                <div>Selected rocker label = {this.state.selectedLabel}, index = {this.state.selectedIndex}</div>

                <br /><br />


                <FormLabel>Rocker that takes label and id object and changes the Id to the new DataID</FormLabel>
                <br />
                <RockerButton
                    onValueChange={this._handleChangeWithId}
                    labels={labelsWithId}
                />
                <div>Selected rocker label = {this.state.selectedLabel2},
                id = {this.state.selectedIndex2},
                </div>

                <br /><br />

                <RockerButton
                    disabled={true}
                    labels={labels}
                />
                <div>Disabled rocker button.</div>

                <br /><br />

                <RockerButton
                    type={RockerButton.rockerTypes.CHART}
                    onValueChange={this._handleValueChange}
                    labels={years}
                />
                <div>chart rocker button</div>

                <br /><br />

                <RockerButton
                    type={RockerButton.rockerTypes.CHART_SMALL}
                    onValueChange={this._handleValueChange}
                    labels={days}
                />
                <div>small chart rocker button</div>
            </div>
        );
    }
}

module.exports = RockerButtonDemo;
