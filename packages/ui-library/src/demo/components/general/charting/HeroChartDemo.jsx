import React from "react";
import Checkbox from "ui-library/lib/components/forms/FormCheckbox";
import HeroChart from "ui-library/lib/components/general/charting/HeroChart";
import Layout from "ui-library/lib/components/general/ColumnLayout";

const labels = ["24H", "7D"];

const data = {
    "24H": [
        { id: "12a", successes: 1200, failures: 200 },
        { id: "1a", successes: 100, failures: 200 },
        { id: "2a", successes: 200, failures: 200 },
        { id: "3a", successes: 300, failures: 200 },
        { id: "4a", successes: 400, failures: 200 },
        { id: "5a", successes: 500, failures: 200 },
        { id: "6a", successes: 600, failures: 200 },
        { id: "7a", successes: 700, failures: 500 },
        { id: "8a", successes: 800, failures: 200 },
        { id: "9a", successes: 900, failures: 900 },
        { id: "10a", successes: 1000, failures: 200 },
        { id: "11a", successes: 1100, failures: 1200 },
        { id: "12p", successes: 200, failures: 200 },
        { id: "1p", successes: 200, failures: 200 },
        { id: "2p", successes: 200, failures: 200 },
        { id: "3p", successes: 200, failures: 200 },
        { id: "4p", successes: 200, failures: 200 },
        { id: "5p", successes: 200, failures: 200 },
        { id: "6p", successes: 200, failures: 200 },
        { id: "7p", successes: 200, failures: 200 },
        { id: "8p", successes: 200, failures: 200 },
        { id: "9p", successes: 200, failures: 200 },
        { id: "10p", successes: 200, failures: 200 },
        { id: "11p", successes: 200, failures: 200 }

    ],
    "7D": [
        { id: "Sat 12/8", successes: 2, failures: 200 },
        { id: "Sun 12/9", successes: 3000, failures: 198 },
        { id: "Mon 12/10", successes: 0, failures: 0 },
        { id: "Tue 12/11", successes: 3908, failures: 200 },
        { id: "Wed 12/12", successes: 4800, failures: 281 },
        { id: "Thu 12/13", successes: 3908, failures: 200 },
        { id: "Fri 12/14", successes: 4800, failures: 281 },
    ]
};

/**
* @name HeroChartDemo
* @memberof HeroChart
* @desc A demo for HeroChart
*/
class HeroChartDemo extends React.Component {

    state = {
        range: "7D",
        errormessage: null,
        loading: false,
        astro: false,
        totalValue: "24,458",
    };

    _handleRangeChange = (range) => {
        console.log(`new time range selected: ${range.label}`);
    };

    _toggleError = () => {
        this.setState({
            errorMessage: this.state.errorMessage ? null : "Example error message"
        });
    };

    _toggleLoading = () => {
        const loading = !this.state.loading;
        this.setState({
            loading: loading,
            totalValue: loading ? null : "24,458",
        });
    }

    _getData = () => {
        return data[this.state.range];
    }

    _onRangeChange = range => {
        this.setState({ range: range.label });
    }

    render () {

        return (
            <div>
                <Layout.Row autoWidth>
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
                    <Layout.Column>
                        <Checkbox
                            label="Show Astro Theme"
                            checked={this.state.astro}
                            onChange={() => this.setState((state) => ({ astro: !state.astro }))}
                        />
                    </Layout.Column>
                </Layout.Row>
                <HeroChart
                    loading={this.state.loading}
                    loadingMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    errorMessage={this.state.errorMessage}
                    bgImage={!this.state.astro && "src/images/herochart-bg1.png"}
                    isAstro={this.state.astro}
                    data={this._getData()}
                    onValueChange={this._handleRangeChange}
                    selected="1W"

                    bottomSeriesKey="failures"
                    topSeriesKey="successes"
                    xAxisKey="id"

                    greeting="Good morning, Eric."
                    title="User Logins"
                    subtitle="so far today"
                    tooltipTopLabel="Logins"
                    tooltipBottomLabel="Failures"
                    value={this.state.totalValue}
                    rockerButtonProps={{
                        labels,
                        onValueChange: this._onRangeChange
                    }}
                />
            </div>
        );
    }

}

module.exports = HeroChartDemo;
