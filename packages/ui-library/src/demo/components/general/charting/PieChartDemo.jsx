import React from "react";
import PieChart, { PieChartTitle } from "ui-library/lib/components/general/charting/PieChart";
import PieChartWrapper from "ui-library/lib/components/general/charting/PieChartWrapper";
import { CardRow, DashboardCard } from "ui-library/lib/components/general/charting/Cards";
import FlexRow, { alignments, flexDirectionOptions, spacingOptions } from "ui-library/lib/components/layout/FlexRow";
import Legend from "../../../../components/general/charting/Legend";
import RockerButton, { rockerTypes } from "ui-library/lib/components/forms/RockerButton";

/**
* @name PieChartDemo
* @memberof PieChart
* @desc A demo for PieChart
*/
const PieChartDemo = () => {
    const data = [
        {
            // This is passed in via the "theme" prop
            // when using the PieChartWrapper component.
            color: "#0EA4D1",
            id: "dogs",
            label: "Dogs",
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
            color: "#0DC8FF",
            id: "fish",
            label: "Fish",
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
            color: "#96E7FF",
            id: "bears",
            label: "Bears",
            value: 13,
        }
    ];

    const wrapperData = [
        {
            id: "1D",
            label: "1D",
            data: data
        },
        {
            id: "1W",
            label: "1W",
            data: data
        },
        {
            id: "1M",
            label: "1M",
            data: data
        },
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
            <DashboardCard
                front={
                    <PieChartWrapper
                        legend={[
                            {
                                id: "dogs",
                                label: "Dogs",
                            },
                            {
                                id: "fish",
                                label: "Fish",
                            },
                            {
                                id: "bears",
                                label: "Bears",
                            }
                        ]}
                        data={wrapperData}
                        renderTooltip={(props, Tooltip) => (
                            <Tooltip
                                {...props}
                                value={`${props.value}`}
                            />
                        )}
                        theme={{
                            dataColors: [
                                {
                                    id: "dogs",
                                    color: "#0EA4D1",
                                },
                                {
                                    id: "fish",
                                    color: "#0DC8FF",
                                },
                                {
                                    id: "bears",
                                    color: "#96E7FF",
                                }
                            ]
                        }}
                        title="A Title"
                    />
                }
            />
            <DashboardCard size={1} />
        </CardRow>
    );
};

export default PieChartDemo;