import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import Legend,{
    alignments as legendAlignments,
    boxAlignments
    //eslint-disable-next-line import/no-extraneous-dependencies
} from "ui-library/lib/components/general/charting/Legend";
//eslint-disable-next-line import/no-extraneous-dependencies
import ColumnChart from "ui-library/lib/components/general/charting/ColumnChart";
//eslint-disable-next-line import/no-extraneous-dependencies
import ChartTitle from "ui-library/lib/components/general/charting/ChartTitle";
//eslint-disable-next-line import/no-extraneous-dependencies
import ChartWrapper from "ui-library/lib/components/general/charting/ChartWrapper";
//eslint-disable-next-line import/no-extraneous-dependencies
import RockerButton, { rockerTypes } from "ui-library/lib/components/forms/RockerButton";

/**
* @name ColumnCardDemo
* @memberof ColumnCard
* @desc A demo for ColumnCard
*/
class ColumnCardDemo extends React.Component {
    render() {
        const legend = [
            { label: "Usage", id: "usage", yAxisId: "users", color: "#2A713E" },
            { label: "Visitors", id: "visitors", yAxisId: "users", color: "#48C06A" },
            { label: "Cost", id: "cost", yAxisId: "users", color: "#389251" },
            { label: "Savings", id: "savings", yAxisId: "users", color: "#5DEB85" },
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
                                id: "usage",
                                value: 20,
                            },
                            {
                                id: "cost",
                                value: 0.45,
                            },
                            {
                                id: "visitors",
                                value: 15,
                            },
                            {
                                id: "savings",
                                value: 0.4,
                            }
                        ]
                    },
                    {
                        id: "November 12, 2019",
                        data: [ // Order does not matter
                            {
                                id: "cost",
                                value: 0.87,
                            },
                            {
                                id: "usage",
                                value: 10,
                            },
                            {
                                id: "visitors",
                                value: 13,
                            },
                            {
                                id: "savings",
                                value: 0.63,
                            }
                        ]
                    },
                    {
                        id: "November 13, 2019",
                        data: [
                            {
                                id: "usage",
                                value: 30,
                            },
                            {
                                id: "cost",
                                value: 0.32,
                            },
                            {
                                id: "visitors",
                                value: 0,
                            },
                            {
                                id: "savings",
                                value: 0.22,
                            }
                        ]
                    },
                ]
            }
        ];

        const controlLabels = ["1d", "1w"];

        return (
            <>
                <ChartWrapper
                    title={<ChartTitle title="Users" />}
                    legend={
                        <Legend
                            alignment={legendAlignments.CENTER}
                            boxAlignment={boxAlignments.CENTER}
                            data={[
                                {
                                    color: "#2A713E",
                                    label: "Usage",
                                    value: "0",
                                },
                                {
                                    color: "#389251",
                                    label: "Cost",
                                    value: "$0.00",
                                },
                                {
                                    color: "#48C06A",
                                    label: "Visitors",
                                    value: "0",
                                },
                                {
                                    color: "#5DEB85",
                                    label: "Savings",
                                    value: "$0.00",
                                },
                            ]}
                        />
                    }
                    chart={
                        <ColumnChart
                            data={columnData[0].data}
                            legend={legend}
                            stacked={false}
                            renderTooltip={(props, LegendItem) => (
                                <LegendItem
                                    color={props.color}
                                    label={props.y.label}
                                    value={
                                        props.y.label === "cost" ||
                                            props.y.label === "savings"
                                            ? `$${props.value}`
                                            : props.value
                                    }
                                />
                            )}
                            hideY={false}
                            hideX={false}
                            yAxisLabel="February January December September"
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
                <ChartWrapper
                    title={<ChartTitle title="Users" />}
                    legend={
                        <Legend
                            alignment={legendAlignments.CENTER}
                            boxAlignment={boxAlignments.CENTER}
                            data={[
                                {
                                    color: "#2A713E",
                                    label: "Usage",
                                    value: "0",
                                },
                                {
                                    color: "#389251",
                                    label: "Cost",
                                    value: "$0.00",
                                },
                                {
                                    color: "#48C06A",
                                    label: "Visitors",
                                    value: "0",
                                },
                                {
                                    color: "#5DEB85",
                                    label: "Savings",
                                    value: "$0.00",
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
                                    value={
                                        props.y.label === "cost" ||
                                            props.y.label === "savings"
                                            ? `$${props.value}`
                                            : props.value
                                    }
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
            </>

        );
    }
}

export default ColumnCardDemo;
