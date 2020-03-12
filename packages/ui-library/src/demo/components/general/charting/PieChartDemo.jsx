import React, { useState } from "react";
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

    const [location, setLocation] = useState("regional");
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
                    value: 3
                }, {
                    label: "Yorkies",
                    value: 5,
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
                    value: 80
                }, {
                    label: "Bass",
                    value: 2,
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

    const getCount = (d) => (id) => {
        const part = d.find(el => el.id === id);
        return part.series
            ? part.series.reduce((acc, curr) => acc + curr.value, 0)
            : part.value;
    };

    const countData = getCount(data);

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
                            value: countData("dogs")
                        },
                        {
                            label: "Fish",
                            color: "#0DC8FF",
                            value: countData("fish")
                        },
                        {
                            label: "Bears",
                            color: "#96E7FF",
                            value: countData("bears")
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
                    onValueChange={({ id }) => setLocation(id)}
                    selectedIndex={location}
                    type={rockerTypes.CHART}
                />
            }
        />
    );
};

export default PieChartDemo;
