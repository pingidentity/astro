import React from "react";
import Legend,{
    alignments as legendAlignments,
    boxAlignments
} from "ui-library/lib/components/general/charting/Legend";
import ColumnChart from "ui-library/lib/components/general/charting/ColumnChart";
import ChartTitle from "ui-library/lib/components/general/charting/ChartTitle";
import ChartWrapper from "ui-library/lib/components/general/charting/ChartWrapper";
import RockerButton, { rockerTypes } from "ui-library/lib/components/forms/RockerButton";

/**
* @name ColumnCardDemo
* @memberof ColumnCard
* @desc A demo for ColumnCard
*/
class ColumnCardDemo extends React.Component {
    render() {
        const legend = [
            { label: "Mobile", id: "mobile", color: "#49BF6B" },
            { label: "Test Thing", id: "desktop", color: "#379250" },
        ];

        /**
         * NOTE: This data structure is to support future implementation
         * of the RockerButton within the card.
         */
        const columnData = [
            {
                id: "1D",
                helpText: "This is by day",
                data: [
                    {
                        id: "November 11, 2019",
                        data: [
                            {
                                id: "mobile",
                                value: 20,
                            },
                            {
                                id: "desktop",
                                value: 43 ,
                            }
                        ]
                    },
                    {
                        id: "November 12, 2019",
                        data: [ // Order does not matter
                            {
                                id: "desktop",
                                value: 10,
                            },
                            {
                                id: "mobile",
                                value: 5,
                            },
                        ]
                    },
                    {
                        id: "November 13, 2019",
                        data: [
                            {
                                id: "mobile",
                                value: 30,
                            },
                            {
                                id: "desktop",
                                value: 12,
                            }
                        ]
                    },
                ]
            }
        ];

        const controlLabels = ["1d", "1w"];

        return (
            <ChartWrapper
                title={<ChartTitle title="Users" />}
                legend={
                    <Legend
                        alignment={legendAlignments.CENTER}
                        boxAlignment={boxAlignments.CENTER}
                        data={[
                            {
                                color: "#49BF6B",
                                label: "Desktop",
                                value: "42",
                            },
                            {
                                color: "#379250",
                                label: "Mobile",
                                value: "55",
                            },
                        ]}
                    />
                }
                chart={
                    <ColumnChart
                        data={columnData[0].data}
                        legend={legend}
                        renderTooltip={(props, LegendItem) => (
                            <LegendItem
                                color={props.color}
                                label={props.y.label}
                                value={`$${props.value}`}
                            />
                        )}
                    />
                }
                controls={
                    <RockerButton
                        labels={controlLabels}
                        noMargin
                        selectedIndex={0}
                        type={rockerTypes.CHART}
                    />
                }
            />
        );
    }
}

export default ColumnCardDemo;
