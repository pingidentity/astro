var React = require("react"),
    FormLabel = require("../../../../components/forms/FormLabel"),
    LineChart = require("../../../../components/general/charting/LineChart"),
    LegendTypes = require("../../../../constants/ChartingConstants.js").LegendTypes,
    LineTypes = require("../../../../constants/ChartingConstants.js").LineTypes,
    Layouts = require("../../../../constants/ChartingConstants.js").Layouts,
    AxisTypes = require("../../../../constants/ChartingConstants.js").AxisTypes,
    AxisOrientations = require("../../../../constants/ChartingConstants.js").AxisOrientations;

import DropDownSelectorDemo from "./DropDownSelectorDemo";

/**
* @name LineChartDemo
* @memberof LineChart
* @desc A demo for LineChart
*/
class LineChartDemo extends React.Component {
    render() {
        var data = [
            { id: "Monday", s1: 4000, s2: 2400, s3: -2400 },
            { id: "Tuesday", s1: 3000, s2: 1398, s3: -2210 },
            { id: "Wednesday", s1: 2000, s2: 9800, s3: null },
            { id: "Thursday", s1: 3908, s2: 2000, s3: -2290 },
            { id: "Friday", s1: 4800, s2: 2181, s3: -2100 }
        ];

        var data2 = [
            { id: "Dog", score: 10 },
            { id: "Cat", score: 10 },
            { id: "Lizard", score: 7 },
            { id: "Fish", score: 3 }
        ];

        return (
            <div>
                <FormLabel value="Single-series line chart" />
                <LineChart
                    data={data}
                    series={[{ id: "s1", label: "s1 data" }]}
                    width={500}
                    height={300}
                    xDataKey="id"
                    yTickDensity={10}
                />

                <FormLabel value="Line chart with connected null points and animation" />
                <LineChart
                    data={data}
                    series={[{ id: "s3", connectNulls: true, animate: true, color: "#ff00ff" }]}
                    width={500}
                    height={300}
                    xDataKey="id"
                />

                <FormLabel value="Multi-series line chart with different line types" />
                <LineChart
                    data={data}
                    series={[
                        { id: "s1", label: "s1 data", color: "#3cb66e", legendType: LegendTypes.STAR },
                        { id: "s2", label: "s2 data", color: "#ff00ff", lineType: LineTypes.MONOTONE },
                        { id: "s3", dots: false }
                    ]}
                    width={500}
                    height={300}
                    xDataKey="id"
                    yTickDensity={10}
                    yMin={-3000}
                    yMax={10000}
                />

                <FormLabel value="Vertical step line chart" />
                <LineChart
                    data={data2}
                    series={[{ id: "score", label: "How awesome is this pet", lineType: LineTypes.STEP }]}
                    layout={Layouts.VERTICAL}
                    margin={{ top: 20, right: 50, bottom: 20, left: 20 }}
                    width={500}
                    height={300}
                    xAxisType={AxisTypes.NUMBER}
                    xLabel="Score"
                    yDataKey="id"
                    yAxisType={AxisTypes.STRING}
                />

                <FormLabel value="Line chart with flipped axis orientations and hidden dots" />
                <LineChart
                    data={data2}
                    series={[{ id: "score", lineType: LineTypes.STEP, dots: false }]}
                    width={500}
                    height={300}
                    xDataKey="id"
                    xOrientation={AxisOrientations.TOP}
                    yOrientation={AxisOrientations.RIGHT}
                />

                <FormLabel value="Temporary home for the drop down selector" />
                <DropDownSelectorDemo />
            </div>
        );
    }
}

module.exports = LineChartDemo;