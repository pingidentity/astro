import React from "react";
import FormLabel from "../../../components/forms/FormLabel";
import RockerButton from "../../../components/forms/RockerButton";
import Icon from "../../../components/general/Icon";

/**
* @name RockerButtonDemo
* @memberof RockerButton
* @desc A demo for RockerButton
*/

const labels = ["Label 1", "Label 2", "Label Three", "Longer Label Four"];

const years = ["3M", "6M", "1Y"];
const days = ["1D", "1W", "1M"];

const labelsWithId = [
    { label: <Icon iconName="globe">Label One</Icon>, id: "rocker1" },
    { label: "Label 2", id: "rocker2" },
    { label: "Label Three", id: "rocker3" },
    { label: "Longer Label Four", id: "rocker4" }
];
class RockerButtonDemo extends React.Component {
    state = {
        selectedLabel: "Label One",
        selectedIndex: 0,
        selectedLabel2: "Label One",
        selectedId: "rocker1",
    };

    _handleValueChange = (labelValues) => {
        this.setState({
            selectedLabel: labelValues.label,
            selectedIndex: labelValues.index,
        });
    };

    _handleChangeWithId = ({
        id,
        label
    }) => {
        this.setState({
            selectedLabel2: label,
            selectedId: id,
        });
    }

    render() {
        return (
            <div>
                <RockerButton
                    onValueChange={this._handleValueChange}
                    labels={labels}
                    selectedIndex={this.state.selectedIndex}
                />
                <div>Selected rocker label = {this.state.selectedLabel}, index = {this.state.selectedIndex}</div>

                <br /><br />


                <FormLabel>Rocker that takes label and id object and changes the Id to the new DataID</FormLabel>
                <br />
                <RockerButton
                    onValueChange={this._handleChangeWithId}
                    labels={labelsWithId}
                    selected={this.state.selectedId}
                />
                <div>Selected rocker label = {this.state.selectedLabel2},
                id = {this.state.selectedId},
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
                    labels={years}
                />
                <div>chart rocker button</div>

                <br /><br />

                <RockerButton
                    type={RockerButton.rockerTypes.CHART_SMALL}
                    labels={days}
                />
                <div>small chart rocker button</div>
            </div>
        );
    }
}

module.exports = RockerButtonDemo;
