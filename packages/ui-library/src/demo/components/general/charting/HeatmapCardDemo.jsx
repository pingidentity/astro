import React from "react";
import HeatmapCard from "../../../../components/general/charting/HeatmapCard";
import Checkbox from "../../../../components/forms/FormCheckbox";
import Layout from "ui-library/lib/components/general/ColumnLayout";

/**
* @name Heat
* @memberof HeatMap
* @desc A demo for HeatMap
*/
class HeatMapCardDemo extends React.Component {

    days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "00"];
    demoValues = [651, 739, 594, 476];
    valueTitles = [
        "1 Week Average",
        "1 Month Average",
        "3 Month Average",
        "6 Month Average",
    ];

    _generateDemoData = () => {
        return this.days.map((day) => {
            return this.hours.map((hour) => {
                return {
                    value: Math.floor(Math.random() * 1000),
                    label: `${day.toUpperCase()} ${hour}:00${hour < 12 ? "am" : "pm"} MST`
                };
            });
        });
    }

    state = {
        data: this._generateDemoData(),
        value: this.demoValues[0],
        valueTitle: this.valueTitles[0],
    }

    _toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        });
    }

    _toggleError = () => {
        this.setState({
            errorMessage: this.state.errorMessage ? null : "Lorem ipsum dolor"
        });
    };

    _handleRangeChange = range => {
        this.setState({
            data: this._generateDemoData(),
            value: this.demoValues[range.index],
            valueTitle: this.valueTitles[range.index],
        });
    }

    render() {
        return (
            <div>
                <Layout.Row className="columns-width-auto">
                    <Layout.Column>
                        <Checkbox
                            label="Show error message"
                            checked={!!this.state.errorMessage}
                            onChange={this._toggleError}
                        />
                    </Layout.Column>
                    <Layout.Column>
                        <Checkbox
                            label="Show loading indicator"
                            checked={this.state.loading}
                            onChange={this._toggleLoading}
                        />
                    </Layout.Column>
                </Layout.Row>
                <HeatmapCard
                    data={this.state.data}
                    chartTitle="Sign-ons by day/hour"
                    errorMessage={this.state.errorMessage}
                    loading={this.state.loading}
                    value={this.state.value}
                    xAxisLabels={this.hours}
                    yAxisLabels={this.days}
                    onValueChange={this._handleRangeChange}
                    labelKey="label"
                    valueKey="value"
                    valueTitle={this.state.valueTitle}
                    valueSubtitle={<span>Sign-ons<br />per day</span>}
                    tooltipSubtitle="Average sign-ons"
                />
            </div>
        );
    }
}

module.exports = HeatMapCardDemo;