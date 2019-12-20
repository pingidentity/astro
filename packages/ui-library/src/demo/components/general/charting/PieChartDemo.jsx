import React from "react";
import PieChart, { PieChartTitle } from "ui-library/lib/components/general/charting/PieChart";
import { CardRow, DashboardCard } from "ui-library/lib/components/general/charting/Cards";
import FlexRow, { alignments, flexDirectionOptions, spacingOptions } from "ui-library/lib/components/layout/FlexRow";
import Legend from "../../../../components/general/charting/Legend";
import RockerButton, { rockerTypes } from "ui-library/lib/components/forms/RockerButton";

/**
* @name PieChartDemo
* @memberof PieChart
* @desc A demo for PieChart
*/
class PieChartDemo extends React.Component {
    render() {
        const data = [
            {
                id: "dog",
                label: "Dog",
                color: "#0EA4D1",
                series: [
                    {
                        label: "Beagles",
                        value: 5
                    }, {
                        label: "Yorkies",
                        value: 10,
                    }
                ]
            },
            {
                id: "fish",
                label: "Fish",
                color: "#0DC8FF",
                series: [
                    {
                        label: "Goldfish",
                        value: 3
                    }, {
                        label: "Bass",
                        value: 7,
                    }
                ]
            },
            {
                id: "bears",
                label: "Bears",
                color: "#96E7FF",
                value: 13,
            }
        ];

        return (
            <CardRow>
                <DashboardCard
                    front={
                        <FlexRow
                            alignment={alignments.CENTER}
                            flexDirection={flexDirectionOptions.COLUMN}
                            spacing={spacingOptions.SM}
                        >
                            <PieChartTitle
                                title="Dogs"
                            />
                            <Legend
                                data={[
                                    {
                                        label: "Dog",
                                        color: "#0EA4D1",
                                        value: 15
                                    },
                                    {
                                        label: "Fish",
                                        color: "#0DC8FF",
                                        value: 4
                                    },
                                    {
                                        label: "Bears",
                                        color: "#96E7FF",
                                        value: 13,
                                    }
                                ]}
                            />
                            <PieChart
                                showTooltips={true}
                                data={data}
                                renderTooltip={(props, Tooltip) => (
                                    <Tooltip
                                        {...props}
                                        value={`${props.value}`}
                                    />
                                )}
                            />
                            <RockerButton
                                labels={[
                                    { label: "Local", id: "local" },
                                    { label: "Regional", id: "regional" },
                                    { label: "National", id: "national" }
                                ]}
                                noMargin
                                onValueChange={(labelValues) => console.log("Rocker values", labelValues)}
                                type={rockerTypes.CHART}
                            />
                        </FlexRow>
                    }
                    size={1}
                />
                <DashboardCard size={2} />
            </CardRow>
        );
    }
}

export default PieChartDemo;