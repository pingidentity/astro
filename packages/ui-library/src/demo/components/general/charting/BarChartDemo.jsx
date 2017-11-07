var React = require("react"),
    FormLabel = require("../../../../components/forms/FormLabel.jsx"),
    BarChart = require("../../../../components/general/charting/BarChart.jsx"),
    LegendTypes = require("../../../../constants/ChartingConstants.js").LegendTypes,
    Layouts = require("../../../../constants/ChartingConstants.js").Layouts,
    AxisTypes = require("../../../../constants/ChartingConstants.js").AxisTypes;

/**
* @name BarChartDemo
* @memberof BarChart
* @desc A demo for BarChart
*/
class BarChartDemo extends React.Component {
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
                <FormLabel value="Single-series bar chart" />
                <BarChart
                    data={data}
                    series={[{ id: "s1", label: "s1 data", color: "#b2b2ff" }]}
                    width={500}
                    height={300}
                    xDataKey="id"
                    yTickDensity={10}
                />

                <FormLabel value="Bar chart with animation" />
                <BarChart
                    data={data2}
                    series={[{ id: "score", label: "How awesome is this pet", color: "#3cb66e" }]}
                    width={500}
                    height={300}
                    xDataKey="id"
                />

                <FormLabel value="Multi-series bar chart" />
                <BarChart
                    data={data}
                    series={[
                        { id: "s1", label: "s1 data", color: "#3cb66e", legendType: LegendTypes.STAR },
                        { id: "s2", label: "s2 data", color: "#ff00ff" },
                        { id: "s3", dots: false }
                    ]}
                    width={500}
                    height={300}
                    xDataKey="id"
                    yTickDensity={10}
                    yMin={-3000}
                    yMax={10000}
                />

                <FormLabel value="Vertical bar chart" />
                <BarChart
                    data={data2}
                    series={[{ id: "score", label: "How awesome is this pet" }]}
                    layout={Layouts.VERTICAL}
                    margin={{ top: 20, right: 50, bottom: 20, left: 20 }}
                    width={500}
                    height={300}
                    xAxisType={AxisTypes.NUMBER}
                    xLabel="Score"
                    yDataKey="id"
                    yAxisType={AxisTypes.STRING}
                />
            </div>
        );
    }
}

module.exports = BarChartDemo;