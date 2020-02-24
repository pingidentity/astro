import React from "react";
import ChartTitle from "ui-library/lib/components/general/charting/ChartTitle";
import PieChart from "ui-library/lib/components/general/charting/PieChart";
import Legend, {
    alignments as legendAlignments,
    boxAlignments
} from "ui-library/lib/components/general/charting/Legend";

import RockerButton, { rockerTypes } from "ui-library/lib/components/forms/RockerButton";
import ChartWrapper from "ui-library/lib/components/general/charting/ChartWrapper";

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
            value: 0,
        }
    ];

    return (
        <ChartWrapper
            title={<ChartTitle title="Animals" />}
            legend={
                <Legend
                    alignment={legendAlignments.CENTER}
                    boxAlignment={boxAlignments.CENTER}
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
            }
            chart={
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
            }
            controls={
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
            }
        />
    );
};

export default PieChartDemo;