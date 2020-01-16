import React from "react";
import ColumnChart from "../../../../components/general/charting/ColumnChart";
import ChartTitle from "ui-library/lib/components/general/charting/ChartTitle";
import ChartWrapper from "ui-library/lib/components/general/charting/ChartWrapper";
import Legend, { alignments as legendAlignments, boxAlignments } from "../../../../components/general/charting/Legend";
import RockerButton, { rockerTypes } from "ui-library/lib/components/forms/RockerButton";
import RadioGroup from "ui-library/lib/components/forms/FormRadioGroup";


const displayOptions = [
    { id: "withData", name: "Data" },
    { id: "loading", name: "Loading" },
    { id: "noData", name: "No Data" }
];


/**
* @name ColumnCardDemo
* @memberof ColumnCard
* @desc A demo for ColumnCard
*/
class ColumnCardDemo extends React.Component {
    state={
        subset: "1d",
        display: displayOptions[0].id,
    }
    render() {
        const legend = [
            { label: "Authenticators", id: "authenticators", color: "#49BF6B" },
            { label: "Test Thing", id: "test-thing", color: "#379250" },
        ];

        const columnData = [
            {
                id: "1d",
                helpText: "This is by day",
                data: [
                    {
                        id: "November 11, 2019",
                        data: [
                            {
                                id: "authenticators",
                                value: 20,
                            },
                            {
                                id: "test-thing",
                                value: 43 ,
                            }
                        ]
                    },
                    {
                        id: "November 12, 2019",
                        data: [ // Order does not matter
                            {
                                id: "test-thing",
                                value: 10,
                            },
                            {
                                id: "authenticators",
                                value: 5,
                            },
                        ]
                    },
                    {
                        id: "November 13, 2019",
                        data: [
                            {
                                id: "authenticators",
                                value: 30,
                            },
                            {
                                id: "test-thing",
                                value: 12,
                            }
                        ]
                    },
                ]
            },
            {
                id: "1w",
                helpText: "This is by week",
                data: [
                    {
                        id: "November 11, 2019",
                        data: [
                            {
                                id: "authenticators",
                                value: 50,
                            },
                            {
                                id: "test-thing",
                                value: 90 ,
                            }
                        ]
                    },
                    {
                        id: "November 18, 2019",
                        data: [ // Order does not matter
                            {
                                id: "test-thing",
                                value: 40,
                            },
                            {
                                id: "authenticators",
                                value: 80,
                            },
                        ]
                    },
                    {
                        id: "November 25, 2019",
                        data: [
                            {
                                id: "authenticators",
                                value: 95,
                            },
                            {
                                id: "test-thing",
                                value: 100,
                            }
                        ]
                    },
                ]
            }
        ];

        const controlLabels = ["1d","1w"];



        return (
            <>
                <RadioGroup
                    groupName="displayOptions"
                    items={displayOptions}
                    onValueChange={option => this.setState({ display: option }) }
                    selected={this.state.display}
                />
                <ChartWrapper
                    loadingMessage={this.state.display === "loading" ? "loading" : undefined}
                    message={this.state.display === "noData" ? "no data": undefined}
                    title={<ChartTitle title="SMS/Voice" />}
                    legend={
                        <Legend
                            alignment={legendAlignments.CENTER}
                            boxAlignment={boxAlignments.CENTER}
                            data={[
                                {
                                    color: "#49BF6B",
                                    label: "Usage",
                                    value: "0",
                                },
                                {
                                    color: "#379250",
                                    label: "Cost",
                                    value: "0",
                                },
                            ]}
                        />
                    }
                    chart={
                        <ColumnChart
                            data={
                                this.state.display === "noData"
                                    ? undefined
                                    : columnData.find(set => set.id === this.state.subset).data
                            }
                            legend={legend}
                            renderTooltip={(props, LegendItem) => (
                                <LegendItem
                                    {...props}
                                    value={`$${props.value}`}
                                />
                            )}
                        />
                    }
                    controls={
                        <RockerButton
                            labels={controlLabels}
                            noMargin
                            onValueChange={({ index }) => {
                                this.setState({ subset: controlLabels[index] });
                            }}
                            selectedIndex={controlLabels.findIndex(label => label === this.state.subset)}
                            type={rockerTypes.CHART}
                        />
                    }
                />
            </>
        );
    }
}

export default ColumnCardDemo;
