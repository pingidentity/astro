var React = require("react"),
    FormLabel = require("../../../../components/forms/FormLabel"),
    PieChart = require("../../../../components/general/charting/PieChart");

/**
* @name PieChartDemo
* @memberof PieChart
* @desc A demo for PieChart
*/
class PieChartDemo extends React.Component {
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
                <FormLabel value="Pie chart" />
                <PieChart
                    data={data}
                    series={[
                        { id: "Monday", color: "#3cb66e" },
                        { id: "Tuesday", color: "#ff00ff" },
                        { id: "Wednesday", color: "#2996cc" },
                        { id: "Thursday", color: "#e4e5e5" },
                        { id: "Friday" },
                    ]}
                    sectorKey="id"
                    sectorDataKey="s1"
                    sectorLabel={true}
                    width={500}
                    height={300}
                />

                <FormLabel value="Donut chart" />
                <PieChart
                    donut={true}
                    data={data2}
                    series={[
                        { id: "Dog", color: "#3cb66e" },
                        { id: "Cat", color: "#ff00ff" },
                        { id: "Lizard", color: "#2996cc" },
                        { id: "Fish", color: "#e4e5e5" }
                    ]}
                    sectorKey="id"
                    sectorDataKey="score"
                />
            </div>
        );
    }
}

module.exports = PieChartDemo;