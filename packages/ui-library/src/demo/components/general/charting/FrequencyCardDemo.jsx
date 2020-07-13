import React from "react";
import Checkbox from "ui-library/lib/components/forms/FormCheckbox";
import { FrequencyCard, CardRow } from "ui-library/lib/components/general/charting/Cards";
import Layout from "ui-library/lib/components/general/ColumnLayout";

/**
* @name FrequencyCardDemo
* @memberof FrequencyCard
* @desc A demo for FrequencyCard
*/

export default class FrequencyCardDemo extends React.Component {
    state = {
        loading: false,
    }

    _handleMakeDefault = () => {
        console.log("Make default clicked");
    }

    _toggleLoading = () => {
        this.setState((prevState) => ({
            loading: !prevState.loading
        }));
    }

    _toggleError = () => {
        this.setState({
            errorMessage: this.state.errorMessage ? null : "Lorem ipsum dolor"
        });
    };

    _onFrequencyChartClick = () => {
        window.open("https://pingidentity.com", "_blank");
    }

    _onDonutChartClick = () => {
        window.open("https://pingidentity.com", "_blank");
    }

    _onFrontLegendClick = () => {
        window.open("https://pingidentity.com", "_blank");
    }

    render() {
        const donutData = [
            { id: "Within the last 24 hours", value: 1205 },
            { id: "1 day - 1 week ago", value: 512 },
            { id: "1 week - 4 weeks ago", value: 200 },
            { id: "4 weeks - 12 weeks ago", value: 200 },
            { id: "Over 12 weeks ago", value: 200 },
            { id: "Inactive users", value: 200, color: "#888888" },
        ];


        const exampleData = [
            60,
            20,
            10,
            5,
            5
        ];

        const exampleData2 = [
            30,
            10,
            35,
            15,
            10
        ];

        const legend = [
            { id: "At least daily" },
            { id: "At least weekly" },
            { id: "At least monthly" },
            { id: "At least quarterly" },
            { id: "Less than quarterly" },
        ];

        const barData = [
            {
                id: "By Week",
                helpText: "This is by week",
                legend: legend,
                data: [
                    {
                        id: "",
                        data: []
                    },
                    {
                        id: "",
                        data: []
                    },
                    {
                        id: "",
                        data: []
                    },
                    {
                        id: "Feb 2018",
                        data: exampleData
                    },
                    {
                        id: "March 2018",
                        data: exampleData2
                    },
                    {
                        id: "April 2018",
                        data: exampleData
                    },
                    {
                        id: "May 2018",
                        data: exampleData2
                    },
                    {
                        id: "Jun 2018",
                        data: exampleData
                    },
                    {
                        id: "Jul 2018",
                        data: exampleData2
                    },
                    {
                        id: "Aug 2018",
                        data: exampleData
                    },
                    {
                        id: "Sept 2018",
                        data: exampleData2
                    },
                    {
                        id: "Oct 2018",
                        data: exampleData
                    },
                    {
                        id: "Nov 2018",
                        data: exampleData2
                    },
                    {
                        id: "Dec 2018",
                        data: exampleData
                    },
                    {
                        id: "Jan 2019",
                        data: exampleData2
                    },
                ]
            },
            {
                id: "By Month",
                helpText: "This is by month",
                legend: legend,
                data: [
                    {
                        id: "Feb 2017",
                        data: exampleData2
                    },
                    {
                        id: "March 2017",
                        data: exampleData2
                    },
                    {
                        id: "April 2017",
                        data: exampleData2
                    },
                    {
                        id: "May 2017",
                        data: exampleData2
                    },
                    {
                        id: "Jun 2017",
                        data: exampleData2
                    },
                    {
                        id: "Jul 2017",
                        data: exampleData2
                    },
                    {
                        id: "Aug 2017",
                        data: exampleData2
                    },
                    {
                        id: "Sept 2017",
                        data: exampleData2
                    },
                    {
                        id: "Oct 2017",
                        data: exampleData2
                    },
                    {
                        id: "Nov 2017",
                        data: exampleData2
                    },
                    {
                        id: "Dec 2017",
                        data: exampleData2
                    },
                    {
                        id: "Jan 2019",
                        data: exampleData2
                    },
                ]
            },
            {
                id: "By Quarter",
                helpText: "This is by quarter",
                legend: legend,
                data: [
                    {
                        id: "Feb 2017",
                        data: exampleData2
                    },
                    {
                        id: "March 2017",
                        data: exampleData2
                    },
                    {
                        id: "April 2017",
                        data: exampleData2
                    },
                    {
                        id: "May 2017",
                        data: exampleData2
                    },
                    {
                        id: "Jun 2017",
                        data: exampleData2
                    },
                    {
                        id: "Jul 2017",
                        data: exampleData2
                    },
                    {
                        id: "Aug 2017",
                        data: exampleData2
                    },
                    {
                        id: "Sept 2017",
                        data: exampleData2
                    },
                    {
                        id: "Oct 2017",
                        data: exampleData2
                    },
                    {
                        id: "Nov 2017",
                        data: exampleData2
                    },
                    {
                        id: "Dec 2017",
                        data: exampleData2
                    },
                    {
                        id: "Jan 2019",
                        data: exampleData2
                    },
                ]
            }
        ];

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
                </Layout.Row>
                <CardRow>
                    <FrequencyCard
                        errorMessage={this.state.errorMessage}
                        loading={this.state.loading}

                        frontTitle="Users By Last Activity"
                        frontLegendLabel="Last activity was:"
                        donutLabel="Total Users"
                        donutUnits="Users"
                        donutTooltip="Click to view report"
                        donutData={donutData}

                        backTitle="Average distribution of user activity"
                        backTitleHelpHint="This is the back title help hint"
                        backTerminateLabel="No Previous Data Available"
                        barUnits="Users"
                        backLegendLabel="Active on average:"
                        barData={barData}

                        onBarChartClick={this._onFrequencyChartClick}
                        onDonutChartClick={this._onDonutChartClick}
                        onFrontLegendClick={this._onFrontLegendClick}
                    />
                    <FrequencyCard
                        frontTitle="Frequency Card without back data"
                        frontLegendLabel="Last activity was:"
                        donutLabel="Total Users"
                        donutUnits="Users"
                        donutData={donutData}

                        onDonutChartClick={this._onDonutChartClick}
                        onFrontLegendClick={this._onFrontLegendClick}
                    />
                </CardRow>
            </div>
        );
    }
}
