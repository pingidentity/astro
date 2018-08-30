import React from "react";
import { StatAreaCard, CardRow, DashboardCard } from "../../../../components/general/charting/Cards";
import Checkbox from "../../../../components/forms/FormCheckbox";
import Layout from "ui-library/lib/components/general/ColumnLayout";

import demoChartData from "./demoChartData";
import _ from "underscore";

/**
* @name StatCardemo
* @memberof StatCard
* @desc A demo for StatAreaCard
*/
class StatAreaCardDemo extends React.Component {

    state = {
        data: demoChartData.days,
        loading: false,
        subtitle: "AS OF TODAY",
        value: 72,
    };

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

    _handleRangeChange = (range) => {
        let rangeData;
        let subtitle;

        if (range.label === "60D") {
            rangeData = demoChartData.days;
            subtitle = "AS OF TODAY";
        } else if (range.label === "3M") {
            rangeData = demoChartData.weeks.slice(0, 12);
            subtitle = "AS OF THIS WEEK";
        } else {
            rangeData = demoChartData.months;
            subtitle = "AS OF THIS MONTH";
        }
        this.setState({
            data: rangeData,
            subtitle: subtitle,
        });
    };

    _handleOnMouseOver = (value) => {
        this.setState(
            () => ({ value })
        );
    };

    _handleMakeDefault = () => {
        console.log("Make default clicked");
    }

    render () {
        const max = _.max(this.state.data, item => item.value).value;
        const percent = parseInt(parseInt(this.state.value) * 100/ max);
        const rangeLabels = ["60D", "3M", "1YR"];

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
                <CardRow>
                    <StatAreaCard
                        data={this.state.data}
                        errorMessage={this.state.errorMessage}
                        listData={demoChartData.listData}
                        loading={this.state.loading}
                        onMouseOver={this._handleOnMouseOver}
                        onMakeDefault={this._handleMakeDefault}
                        onValueChange={this._handleRangeChange}
                        rockerButtonProps={{ labels: rangeLabels }}
                        selected={rangeLabels[0]}
                        subtitle={this.state.subtitle}
                        title="MFA Users"
                        value={`${percent}%`}
                        yAxisKey="value"
                    />
                    <DashboardCard size={2} />
                </CardRow>
            </div>
        );
    }
}

export default StatAreaCardDemo;
