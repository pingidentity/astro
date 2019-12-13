import React from "react";
import LineChart from "../../../../components/general/charting/LineChart";

/**
* @name LineChartDemo
* @memberof LineChart
* @desc A demo for LineChart
*/
class LineChartDemo extends React.Component {
    state = {
        highlightRange: [],
        data: [
            {
                name: "Day #1",
                value: 3
            }, {
                name: "Day #2",
                value: 6
            }, {
                name: "Day #3",
                value: 2
            }, {
                name: "Day #4",
                value: 4
            }, {
                name: "Day #5",
                value: 5
            }
        ],
    };

    _onHoverDataPoint = (data) => {
        const padding = 1;
        this.setState({
            highlightRange: [data - padding, data + padding],
        });
    }

    render() {
        return (
            <LineChart
                data={this.state.data}
                width={500}
                height={150}
                dataKey="name"
                dataValue="value"
                referenceLineColor="#5DA4EC"
                referenceLabelColor="#676D74"
                showHighlight={true}
                highlightColor="#5DA4EC"
                highlightRange={this.state.highlightRange}
                lineColor="#193867"
                onHoverDataPoint={this._onHoverDataPoint}
            />
        );
    }
}

module.exports = LineChartDemo;