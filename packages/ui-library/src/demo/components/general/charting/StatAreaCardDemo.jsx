import React from "react";
import { StatAreaCard, CardRow, DashboardCard } from "../../../../components/general/charting/Cards";
import Checkbox from "../../../../components/forms/FormCheckbox";
import Link from "../../../../components/general/Link";
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
        isNoData: false,
        subtitle: _.last(demoChartData.days).id,
        yvalue: _.last(demoChartData.days).value,
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

    _toggleIsNoData = () => {
        this.setState({
            isNoData: !this.state.isNoData
        });
    }

    _handleRangeChange = range => {
        let rangeData;
        let subtitle;

        if (range.label === "60D") {
            rangeData = demoChartData.days;
            subtitle = "AS OF TODAY";
        } else if (range.label === "12W") {
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

    _handleOnMouseOver = (yvalue, subtitle) => {
        this.setState({ yvalue, subtitle });
    };

    _handleOnMouseOut = () => {
        this.setState({
            subtitle: _.last(this.state.data).id,
            yvalue: _.last(this.state.data).value
        });
    };

    _handleMakeDefault = () => {
        console.log("Make default clicked");
    }

    render () {
        const max = _.max(this.state.data, item => item.value).value;
        const percent = parseInt(parseInt(this.state.yvalue) * 100/ max);
        const rangeLabels = ["60D", "12W", "1Y"];

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
                    <Layout.Column>
                        <Checkbox
                            label="Show no data placeholder"
                            checked={this.state.isNoData}
                            onChange={this._toggleIsNoData}
                        />
                    </Layout.Column>
                </Layout.Row>
                <CardRow>
                    <StatAreaCard
                        size={2}
                        loading={this.state.loading}
                        errorMessage={this.state.errorMessage}
                        subtitle={this.state.subtitle}
                        title="MFA Users"
                        value={`${percent}%`}
                        terminateLabel="NO DATA YET"
                        data={this.state.data}
                        onMouseOver={this._handleOnMouseOver}
                        onMouseOut={this._handleOnMouseOut}
                        onMakeDefault={this._handleMakeDefault}
                        onValueChange={this._handleRangeChange}
                        rockerButtonProps={{ labels: rangeLabels }}
                        selected={rangeLabels[0]}
                        defaultChecked={false}
                        isNoData={this.state.isNoData}
                        noDataSubtitle={"NOT DATA AVAIBLE"}
                        noDataMessage={[
                            <div key="no-data-message">MFA Adoption data will display once you add users.</div>,
                            <Link key="no-data-link" title="Add/Import Users" url="#" />
                        ]}
                        listData={demoChartData.listData}
                    />
                    <DashboardCard size={1} />
                </CardRow>
            </div>
        );
    }
}

export default StatAreaCardDemo;
