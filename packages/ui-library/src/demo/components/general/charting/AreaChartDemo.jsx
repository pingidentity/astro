var React = require("react"),
    FormLabel = require("../../../../components/forms/FormLabel.jsx"),
    AreaChart = require("../../../../components/general/charting/AreaChart.jsx"),
    LegendTypes = require("../../../../constants/ChartingConstants.js").LegendTypes,
    LineTypes = require("../../../../constants/ChartingConstants.js").LineTypes,
    LegendTypes = require("../../../../constants/ChartingConstants.js").LegendTypes,
    LineTypes = require("../../../../constants/ChartingConstants.js").LineTypes,
    Layouts = require("../../../../constants/ChartingConstants.js").Layouts,
    AxisTypes = require("../../../../constants/ChartingConstants.js").AxisTypes,
    AxisOrientations = require("../../../../constants/ChartingConstants.js").AxisOrientations;

/**
* @name AreaChartDemo
* @memberof AreaChart
* @desc A demo for AreaChart
*/
class AreaChartDemo extends React.Component {
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
                <AreaChart
                    data={data}
                    series={[{ id: "s1", label: "s1 data" }]}
                    width={500}
                    height={300}
                    xDataKey="id"
                    yTickDensity={10}
                />

                <FormLabel value="Line chart with connected null points and animation" />
                <AreaChart
                    data={data}
                    series={[{ id: "s3", connectNulls: true, animate: true, color: "#ff00ff" }]}
                    width={500}
                    height={300}
                    xDataKey="id"
                />

                <FormLabel value="Multi-series line chart with different line types" />
                <AreaChart
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
                <AreaChart
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
                <AreaChart
                    data={data2}
                    series={[{ id: "score", lineType: LineTypes.MONOTONE, dots: false }]}
                    width={500}
                    height={300}
                    xDataKey="id"
                    xOrientation={AxisOrientations.TOP}
                    yOrientation={AxisOrientations.RIGHT}
                />
            </div>
        );
    }
}

module.exports = AreaChartDemo;