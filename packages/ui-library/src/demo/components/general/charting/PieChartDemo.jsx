import React from "react";
import PieChart from "../../../../components/general/charting/PieChart";

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
        );
    }
}

export default PieChartDemo;