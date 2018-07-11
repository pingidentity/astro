import React from "react";
import HeroChart from "ui-library/lib/components/general/charting/HeroChart";
import Checkbox from "ui-library/lib/components/forms/FormCheckbox";
import Layout from "ui-library/lib/components/general/ColumnLayout";
import { StatCard, CardRow } from "ui-library/lib/components/general/charting/Cards";



/**
* @name HeroChartDemo
* @memberof HeroChart
* @desc A demo for HeroChart
*/
class HeroChartDemo extends React.Component {

    state = {
        errormessage: null,
        loading: false,
        totalValue: "24,458",
    };

    _handleRangeChange = (range) => {
        console.log(`new time range selected: ${range.label}`);
    };

    _toggleError = () => {
        this.setState({
            errorMessage: this.state.errorMessage ? null : "Error message text is optional"
        });
    };

    _toggleLoading = () => {
        const loading = !this.state.loading;
        this.setState({
            loading: loading,
            totalValue: loading ? null : "24,458",
        });
    }

    render () {
        const data = [
            { id: "Sat 12/8", successes: 4000, failures: 200 },
            { id: "Sun 12/9", successes: 3000, failures: 198 },
            { id: "Mon 12/10", successes: 0, failures: 0 },
            { id: "Tue 12/11", successes: 3908, failures: 200 },
            { id: "Wed 12/12", successes: 4800, failures: 281 },
            { id: "Thu 12/13", successes: 3908, failures: 200 },
            { id: "Fri 12/14", successes: 4800, failures: 281 },
        ];

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
                            label="Show loading indicators"
                            checked={this.state.loading}
                            onChange={this._toggleLoading}
                        />
                    </Layout.Column>
                </Layout.Row>
                <HeroChart
                    loading={this.state.loading}
                    loadingMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    errorMessage={this.state.errorMessage}

                    bgImage={"src/images/herochart-bg1.png"}
                    data={data}
                    onValueChange={this._handleRangeChange}
                    selected="1W"

                    bottomSeriesKey="failures"
                    topSeriesKey="successes"
                    xAxisKey="id"

                    greetingText="Good morning, Eric."
                    titleText="User Logins"
                    subtitleText="so far today"
                    tooltipTopLabel="Logins"
                    tooltipBottomLabel="Failures"
                    totalValue={this.state.totalValue}
                />
                <div className="hero-chart__stat-cards">
                    <CardRow>
                        <StatCard title="Failed Attempts" description="February 2016" loading={this.state.loading}
                            value="1,056"
                            data={[
                                { label: "Last 30 days", value: "29" },
                                { label: "Last 60 days", value: "124" },
                                { label: "Last 90 days", value: "167" },
                                { label: "Last 120 days", value: "195" },
                                { label: "Last 150 days", value: "201" },
                            ]}
                            iconName="lockout"
                        />
                        <StatCard title="Peaks per Day" description="February 2016" loading={this.state.loading}
                            accent={1}
                            value="261"
                            data={[
                                { label: "Last 30 days", value: "29" },
                                { label: "Last 60 days", value: "124" },
                                { label: "Last 90 days", value: "167" },
                                { label: "Last 120 days", value: "195" },
                                { label: "Last 150 days", value: "201" },
                            ]}
                        />
                        <StatCard title="Password Resets" description="February 2016" loading={this.state.loading}
                            faccent="blue"
                            value="53"
                            data={[
                                { label: "Last 30 days", value: "29" },
                                { label: "Last 60 days", value: "124" },
                                { label: "Last 90 days", value: "167" },
                                { label: "Last 120 days", value: "195" },
                                { label: "Last 150 days", value: "201" },
                            ]}
                            iconName="nodes"
                        />
                    </CardRow>
                </div>
            </div>
        );
    }

}

module.exports = HeroChartDemo;
