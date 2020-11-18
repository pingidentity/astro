import React from "react";
import _ from "lodash";
import HeroMultiBarChart from "ui-library/lib/components/general/charting/HeroMultiBarChart";
import { CardRow, PlaceHolderCard } from "ui-library/lib/components/general/charting/Cards";
import Layout from "ui-library/lib/components/general/ColumnLayout";
import RockerButton from "ui-library/lib/components/forms/RockerButton";
import Checkbox from "ui-library/lib/components/forms/FormCheckbox";

const data = {
    "1D": [
        { id: "12a", mfaSuccess: 1200, mfaFailed: 200 },
        { id: "1a", mfaSuccess: 100, mfaFailed: 200 },
        { id: "2a", mfaSuccess: 200, mfaFailed: 200 },
        { id: "3a", mfaSuccess: 300, mfaFailed: 200 },
        { id: "4a", mfaSuccess: 400, mfaFailed: 200 },
        { id: "5a", mfaSuccess: 500, mfaFailed: 200 },
        { id: "6a", mfaSuccess: 600, mfaFailed: 200 },
        { id: "7a", mfaSuccess: 700, mfaFailed: 500 },
        { id: "8a", mfaSuccess: 800, mfaFailed: 200 },
        { id: "9a", mfaSuccess: 900, mfaFailed: 900 },
        { id: "10a", mfaSuccess: 1000, mfaFailed: 200 },
        { id: "11a", mfaSuccess: 1100, mfaFailed: 1200 },
        { id: "12p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "1p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "2p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "3p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "4p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "5p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "6p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "7p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "8p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "9p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "10p", mfaSuccess: 200, mfaFailed: 200 },
        { id: "11p", mfaSuccess: 200, mfaFailed: 200 }

    ],
    "1W": [
        { id: "Sat 06/26", mfaSuccess: 200, mfaFailed: 13 },
        { id: "Sun 06/27", mfaSuccess: 100, mfaFailed: 13 },
        { id: "Mon 06/28", mfaSuccess: 300, mfaFailed: 13 },
        { id: "Tue 06/29", mfaSuccess: 100, mfaFailed: 17 },
        { id: "Wed 06/30", mfaSuccess: 500, mfaFailed: 13 },
        { id: "Thu 07/01", mfaSuccess: 100, mfaFailed: 13 },
        { id: "Fri 07/02", mfaSuccess: 700, mfaFailed: 13 },
    ],
    "1M": [
        { id: "Mon 06/01 - Sun 06/07", mfaSuccess: 1000, mfaFailed: 1000 },
        { id: "Mon 06/08 - Sun 06/14", mfaSuccess: 2000, mfaFailed: 1000 },
        { id: "Mon 06/15 - Sun 06/21", mfaSuccess: 3000, mfaFailed: 1000 },
        { id: "Mon 06/22 - Sun 06/28", mfaSuccess: 4000, mfaFailed: 1000 },
        { id: "Mon 06/29 - Sun 07/05", mfaSuccess: 4000, mfaFailed: 1000 },
    ],
    "6M": [
        { id: "Jan", mfaSuccess: 2, mfaFailed: 1000 },
        { id: "Feb", mfaSuccess: 22000, mfaFailed: 1000 },
        { id: "Mar", mfaSuccess: 0, mfaFailed: 1000 },
        { id: "Apr", mfaSuccess: 3900, mfaFailed: 1000 },
        { id: "May", mfaSuccess: 4800, mfaFailed: 1000 },
        { id: "June", mfaSuccess: 390, mfaFailed: 1000 },
    ]
};

const labels = [
    { id: "ONE_DAY", label: "1D" },
    { id: "ONE_WEEK", label: "1W" },
    { id: "ONE_MONTH", label: "1M" },
    { id: "SIX_MONTH", label: "6M" },
];

/**
* @name HeroMuliBarChartDemo
* @memberof HeroMultiBarChart
* @desc A demo for HeroMultiBarChart
*/
class HeroMuliBarChartDemo extends React.Component {
    state = {
        range: labels[1],
        errorMessage: null,
        loading: false,
        totalValue: "24,458",
        chartData: null,
    };

    _toggleError = () => {
        this.setState({
            errorMessage: this.state.errorMessage ? null : "Example error message"
        });
    };

    _toggleLoading = () => {
        const { loading } = this.state;

        this.setState({
            loading: !loading,
            totalValue: !loading ? null : "24,458",
        });
    }

    _getLegend = () => {
        const { label } = this.state.range;

        return [
            {
                label: "MFA",
                value: this.state.chartData ? this.state.chartData["mfaSuccess"] : _.sumBy(data[label], "mfaSuccess"),
                textColor: "#fff",
            },
            {
                label: "MFA Failed",
                value: this.state.chartData ? this.state.chartData["mfaFailed"] :_.sumBy(data[label], "mfaFailed"),
                textColor: "#fff",
            },
        ];
    }

    _onGroupOver = ({payload}) => {
        const newData = payload.length > 0 ?
            payload[0].payload :
            null;
        this.setState({chartData: newData});
    }

    _onRangeChange = range => {
        this.setState({ range });
    }

    render () {
        const { loading, errorMessage, range, chartData } = this.state;

        return (
            <div>
                <Layout.Row autoWidth>
                    <Layout.Column>
                        <Checkbox
                            label="Show error message"
                            checked={!!errorMessage}
                            onChange={this._toggleError}
                        />
                    </Layout.Column>
                    <Layout.Column>
                        <Checkbox
                            label="Show loading indicators"
                            checked={loading}
                            onChange={this._toggleLoading}
                        />
                    </Layout.Column>
                </Layout.Row>
                <HeroMultiBarChart
                    loading={loading}
                    loadingMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    errorMessage={errorMessage}
                    title={`Totals ${chartData ? chartData.id : ""}`}

                    legend={this._getLegend()}
                    bgImage={"src/images/herochart-bg1.png"}
                    data={data[range.label]}
                    xAxisKey="id"
                    dataKeys={["mfaSuccess", "mfaFailed"]}
                    dataKeysStyle={{
                        mfaSuccess: { hoverColor: "#ffa500" },
                        mfaFailed: { hoverColor: "#e34234" },
                    }}
                    onGroupSelectionChange={this._onGroupOver}
                    rockerButton={(
                        <RockerButton
                            type={RockerButton.rockerTypes.CHART}
                            labels={labels}
                            onValueChange={this._onRangeChange}
                            selectedIndex={range.id}
                            noMargin
                        />
                    )}
                />
                <CardRow className="hero-chart__dashboard-cards">
                    <PlaceHolderCard
                        message="We're building more data widgets. Check back soon!"
                    />
                    <PlaceHolderCard
                        message="We're building more data widgets. Check back soon!"
                    />
                    <PlaceHolderCard
                        message="We're building more data widgets. Check back soon!"
                    />
                </CardRow>
            </div>
        );
    }
}

module.exports = HeroMuliBarChartDemo;
