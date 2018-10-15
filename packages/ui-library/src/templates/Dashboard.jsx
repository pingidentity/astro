import React from "react";
import HeroChart from "../components/general/charting/HeroChart";
import { CardRow, DonutCard, PlaceHolderCard, StatCard, StatAreaCard } from "../components/general/charting/Cards";
import { HorizontalBarCard } from "../components/general/charting/Cards";
import demoChartData from "../demo/components/general/charting/demoChartData";
import _ from "underscore";

/**
 * @class Dashboard
 * @desc This is a template to demonstrate how to build the charting dashboard.
 */
class Dashboard extends React.Component {

    heroData = [
        { id: "Sat 12/8", successes: 4000, failures: 200 },
        { id: "Sun 12/9", successes: 3000, failures: 198 },
        { id: "Mon 12/10", successes: 0, failures: 0 },
        { id: "Tue 12/11", successes: 3908, failures: 200 },
        { id: "Wed 12/12", successes: 4800, failures: 281 },
        { id: "Thu 12/13", successes: 3908, failures: 200 },
        { id: "Fri 12/14", successes: 4800, failures: 281 },
    ]

    areaRangeLabels = ["60D", "3M", "1YR"]

    donutOptions = [
        { label: "Current", value: "1" },
        { label: "30 DAYS", value: "2" },
        { label: "60 DAYS", value: "3" },
        { label: "90 DAYS", value: "4" },
    ]
    donutData = [
        { id: "Enabled Users", value: 120543, color: "#E12F51" },
        { id: "Inactive Users", value: 51233, color: "#193967" },
        { id: "Disabled Users", value: 20000, color: "#4C8DCA" },
    ]

    horizontalBarData = [
        { id: "Error 401", label: "401 Unauthorized", value: 2600 },
        { id: "Error 402", label: "402 Payment Required", value: 1890 },
        { id: "Error 403", label: "403 Forbidden", value: 3000 },
        { id: "Error 404", label: "404 Not Found", value: 2000 },
        { id: "Error 408", label: "405 Request Timeout", value: 3500 },
        { id: "Error 410", label: "410 bad request", value: 2600 },
        { id: "Error 411", label: "411 xyz", value: 1890 },
        { id: "Error 412", label: "412 hello", value: 3000 },
    ]

    horizontalBarOptions = [
        { label: "This Month", value: "1" },
        { label: "This Hour", value: "2" },
        { label: "Today", value: "3" },
        { label: "This Week", value: "4" },
    ]

    _sumTotal = (data) => {
        return data.reduce((acc, { value }) => {
            return acc + value;
        }, 0);
    }

    state = {
        areaData: demoChartData.days,
        areaSubtitle: "AS OF TODAY",
        areaValue: 72,

        donutLabel: "Total Users",
        donutValue: this._sumTotal(this.donutData),
        donutSelectedValue: this.donutOptions[0],

        heroTotalValue: "24,458",

        horizontalLabel: "Api Errors",
        horizontalValue: this._sumTotal(this.horizontalBarData),
        horizontalSelectedValue: this.horizontalBarOptions[0],
    }

    _handleMakeDefault = () => {
        console.log("Make default clicked");
    }


    _heroHandleRangeChange = (range) => {
        console.log(`New hero chart time range selected: ${range.label}`);
    };


    _areaHandleRangeChange = (range) => {
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
            areaData: rangeData,
            areaSubtitle: subtitle,
        });
    };

    _areaHandleOnMouseOver = (value) => {
        this.setState({
            areaValue: value
        });
    };


    _donutOnMouseOver = (e, { id }) => {
        const matchingData = this.donutData.find(data => {
            return id === data.id;
        });
        this.setState({
            donutLabel: matchingData.id,
            donutValue: matchingData.value,
        });
    }

    _donutOnMouseOut = () => {
        this.setState({
            donutLabel: "Total Users",
            donutValue: this._donutSumTotal()
        });
    }
    _donutOnSelect = (option) => {
        this.setState({
            donutSelectedValue: option
        });
    }

    _horizontalOnHover = (e, { id }) => {
        const matchingData = this.horizontalBarData.find(data => {
            return id === data.id;
        });
        this.setState({
            horizontalLabel: matchingData.label,
            horizontalValue: matchingData.value,
        });
    }

    _horizontalOnMouseOut = () => {
        this.setState({
            horizontalLabel: "Api Errors",
            horizontalValue: this._horizontalSumTotal()
        });
    }

    _horizontalOnSelect = (option) => {
        this.setState({
            horizontalSelectedValue: option
        });
    }

    render = () => {
        const areaMax = _.max(this.state.areaData, item => item.value).value;
        const areaPercent = parseInt(parseInt(this.state.areaValue) * 100 / areaMax);

        return (
            <div>
                <HeroChart
                    loading={false}
                    loadingMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    errorMessage={null}

                    bgImage={"src/images/herochart-bg1.png"}
                    data={this.heroData}
                    onValueChange={this._heroHandleRangeChange}
                    selected="1W"

                    bottomSeriesKey="failures"
                    topSeriesKey="successes"
                    xAxisKey="id"

                    greeting="Good morning, Eric."
                    title="User Logins"
                    subtitle="so far today"
                    tooltipTopLabel="Logins"
                    tooltipBottomLabel="Failures"
                    value={this.state.heroTotalValue}
                />
                <CardRow className="hero-chart__dashboard-cards">
                    <StatCard
                        accent="indigo"
                        data={demoChartData.listData}
                        description="February 2016"
                        errorMessage={null}
                        iconName="lockout"
                        loading={false}
                        title="Failed Attempts"
                        value="1,056"
                    />
                    <StatCard
                        accent="magenta"
                        data={demoChartData.listData}
                        description="February 2016"
                        errorMessage={null}
                        loading={false}
                        title="Active Users"
                        value="261"
                    />
                    <StatCard
                        accent="blue"
                        data={demoChartData.listData}
                        description="February 2016"
                        errorMessage={null}
                        iconName="nodes"
                        loading={false}
                        title="Password Resets"
                        value="53"
                    />
                </CardRow>
                <CardRow>
                    <StatCard
                        accent="blue"
                        data={demoChartData.listData}
                        description="February 2016"
                        errorMessage={null}
                        iconName="users"
                        loading={false}
                        title="Identities"
                        value="1,056"
                    />
                    <DonutCard
                        title={"User States"}
                        loading={false}
                        errorMessage={null}
                        data={this.donutData}
                        sectorKey="id"
                        sectorDataKey="value"
                        onMouseOver={this._donutOnMouseOver}
                        onMouseOut={this._donutOnMouseOut}
                        label={this.state.donutLabel}
                        value={this.state.donutValue}
                        onMakeDefault={this._onMakeDefault}
                        makeDefaultLabel={"Make Default View"}
                        options={this.donutOptions}
                        selectOption={this.state.donutSelectedValue}
                        onSelect={this._donutOnSelect}
                    />
                    <StatAreaCard
                        data={this.state.areaData}
                        errorMessage={null}
                        listData={demoChartData.listData}
                        loading={false}
                        onMouseOver={this._areaHandleOnMouseOver}
                        onMakeDefault={this._handleMakeDefault}
                        onValueChange={this._areaHandleRangeChange}
                        rockerButtonProps={{ labels: this.areaRangeLabels }}
                        selected={this.areaRangeLabels[0]}
                        subtitle={this.state.areaSubtitle}
                        title="MFA Users"
                        value={`${areaPercent}%`}
                        yAxisKey="value"
                    />
                </CardRow>
                <CardRow>
                    <HorizontalBarCard
                        data={this.horizontalBarData}
                        title={"Api Error Rate"}
                        loading={false}
                        errorMessage={null}
                        onMouseOver={this._horizontalOnHover}
                        onMouseOut={this._horiztonalOnMouseOut}
                        options={this.horizontalBarOptions}
                        value={this.state.horizontalValue}
                        label={this.state.horizontalLabel}
                        selectOption={this.state.horizontalSelectedValue}
                        onSelect={this._horizontalOnSelect}
                    />
                    <PlaceHolderCard
                        message="We're building more data widgets. Check back soon!"
                    />
                </CardRow>
                <PlaceHolderCard
                    message="We're building more data widgets. Check back soon!"
                />
            </div>
        );
    }
}

export default Dashboard;
