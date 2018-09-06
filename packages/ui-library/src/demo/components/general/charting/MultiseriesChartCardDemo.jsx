import React, { Component } from "react";
import _ from "underscore";
import MultiseriesChartCard, { chartTypes } from "../../../../components/general/charting/MultiseriesChartCard";
import RockerButton from "../../../../components/forms/RockerButton";
import { toRechartsDataFormat } from "../../../../util/ChartingUtils";

export default class MultiseriesChartCardDemo extends Component {
    initialOptions = [
        {
            id: "Confluence",
            name: "Confluence"
        },
        {
            id: "DataDog",
            name: "DataDog"
        },
        {
            id: "DocuSign",
            name: "DocuSign"
        },
        {
            id: "Google Calendar",
            name: "Google Calendar"
        },
        {
            id: "Google Drive",
            name: "Google Drive"
        },
    ]

    ticks = [
        "Jan '18",
        "Feb '18",
        "Mar '18",
        "Apr '18",
        "May '18",
        "June '18",
        "July '18",
        "Aug '18",
        "Sept '18",
        "Oct '18",
        "Nov '18",
        "Dec '18"
    ]

    _generateData = () => new Array(12).fill(undefined).map(() => Math.floor(Math.random() * 30))

    _generateRockerOptions = () => {
        const categories = this.initialOptions.map(({ id }) => id);
        return ["3M", "6M", "1Y"].map(label => ({
            label,
            series: this.ticks.map(tick => ({
                ...categories.reduce((acc, cat) => ({
                    ...acc,
                    [cat]: Math.floor(Math.random() * 30)
                }), {}),
                time: tick
            }))
        }));
    }

    _rockerOptions = this._generateRockerOptions()

    state = {
        options: this.initialOptions,
        selectedOptionIds: [],
        timespanIndex: 0,
        typeIndex: 0
    }

    _getRockerData = index => this._rockerOptions[index].series
    _getRockerLabels = () => this._rockerOptions.map(({ label }) => label)

    _handleSelectOption = (id, event) => console.log("onMenuSelect called with: ", id, event);

    _handleDeselectOption = (id, event) => console.log("onMenuDeselect called with: ", id, event);

    _handleToggle = open => console.log("onToggle called with", open)

    _setChartType = ({ index }) => this.setState({
        typeIndex: index
    })

    _setTimeSpan = ({ index }) => this.setState(() => ({
        timespanIndex: index
    }))

    render() {
        // Data is only declared and transformed here for the demo. Normally,
        // this would be declared elsewhere so that the data isn't created on each
        // re-render.
        const data = [
            {
                id: "confluence",
                name: "Confluence",
                data: this._generateData()
            },
            {
                id: "dataDog",
                name: "DataDog",
                data: this._generateData()
            },
            {
                id: "docuSign",
                name: "DocuSign",
                data: this._generateData()
            },
            {
                id: "googleCalendar",
                name: "Google Calendar",
                data: this._generateData()
            },
            {
                id: "googleDrive",
                name: "Google Drive",
                data: this._generateData()
            },
            {
                id: "time",
                name: "Time",
                data: [
                    "Jan '18",
                    "Feb '18",
                    "Mar '18",
                    "Apr '18",
                    "May '18",
                    "June '18",
                    "July '18",
                    "Aug '18",
                    "Sept '18",
                    "Oct '18",
                    "Nov '18",
                    "Dec '18"
                ]
            }
        ];

        // Data is put into the Recharts format here using a helper function available from
        // src/util/ChartingUtils
        const formattedData = toRechartsDataFormat(data);
        // Don't include Time in options, since this will be used for the x-axis
        const options = data.slice(0, data.length - 1).map(point => _.omit(point, "data"));

        return (
            <div>
                <RockerButton
                    labels={["Line", "Area"]}
                    onValueChange={this._setChartType}
                    selectedIndex={this.state.typeIndex}
                    stateless
                />
                <MultiseriesChartCard
                    bottomPanel={
                        <RockerButton
                            className={`rocker-button--chart-rocker`}
                            labels={this._getRockerLabels()}
                            onValueChange={this._setTimeSpan}
                            stateless
                            selectedIndex={this.state.timespanIndex}
                        />
                    }
                    data={formattedData}
                    height={200}
                    menuNote={<p>Limit of 3 applications.</p>}
                    menuRequiredText={
                        this.state.selectedOptionIds.length === 0 ? "Minimum of 1 application required." : null
                    }
                    // menuSelectedIds can be passed in here; if so, the DropDownSelector will not manage its internal
                    // selection state. IDs should be the same as the IDs used for data. If not passed in, the component
                    // will manage its own selection state.
                    onDeselectOption={this._handleDeselectOption}
                    onMenuToggle={this._handleToggle}
                    onSelectOption={this._handleSelectOption}
                    options={options}
                    // selectedDataSets can be passed in as a prop here; if it is, the selection state must be handled
                    // in a parent component. If it's not passed in, the component will handle that state internally.
                    type={this.state.typeIndex === 0 ? chartTypes.LINE : chartTypes.AREA}
                    title="Application Traffic"
                    width={500}
                    xAxisKey="time"
                    yAxisLabel="# of Requests"
                />
            </div>
        );
    }
}
