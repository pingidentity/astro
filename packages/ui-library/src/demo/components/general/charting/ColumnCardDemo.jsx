import React from "react";
import { CardRow, DashboardCard } from "ui-library/lib/components/general/charting/Cards";
import ColumnChart, { ColumnChartTitle } from "ui-library/lib/components/general/charting/ColumnChart";
import ColumnChartWrapper from "ui-library/lib/components/general/charting/ColumnChartWrapper";
import Legend, {
    alignments as legendAlignments,
    boxAlignments
} from "ui-library/lib/components/general/charting/Legend";

/**
* @name ColumnCardDemo
* @memberof ColumnCard
* @desc A demo for ColumnCard
*/
class ColumnCardDemo extends React.Component {
    render() {
        const legend = [
            { label: "Authenticators", id: "authenticators", color: "#49BF6B" },
            { label: "Test Thing", id: "test-thing", color: "#379250" },
        ];

        /**
         * NOTE: This data structure is to support future implementation
         * of the RockerButton within the card.
         */
        const columnData = [
            {
                id: "1D",
                label: "1D",
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
                id: "1W",
                label: "1W",
                data: [
                    {
                        id: "Nov 11 - 18, 2019",
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
                        id: "Nov 19 - 26, 2019",
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
                        id: "Nov 27 - Dec 4, 2019",
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
            }
        ];

        return (
            <div>
                <CardRow>
                    <DashboardCard
                        front={
                            <div>
                                <ColumnChartTitle title="SMS/Voice" />
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
                                <ColumnChart
                                    data={columnData[0].data}
                                    legend={legend}
                                    stacked={false}
                                    renderTooltip={(props, LegendItem) => (
                                        <LegendItem
                                            {...props}
                                            value={`$${props.value}`}
                                        />
                                    )}
                                />
                            </div>
                        }
                    />
                    <DashboardCard
                        front={
                            <ColumnChartWrapper
                                legend={[
                                    {
                                        id: "authenticators",
                                        label: "Authenticators"
                                    },
                                    {
                                        id: "test-thing",
                                        label: "Test thing"
                                    }
                                ]}
                                legendAlignment={legendAlignments.CENTER}
                                legendBoxAlignment={boxAlignments.CENTER}
                                data={columnData}
                                theme={{
                                    dataColors: [
                                        {
                                            id: "authenticators",
                                            color: "#49BF6B"
                                        },
                                        {
                                            id: "test-thing",
                                            color: "#379250"
                                        }
                                    ]
                                }}
                                title="A Title"
                            />
                        }
                        size={1}
                    />
                </CardRow>
            </div>
        );
    }
}

export default ColumnCardDemo;