import React from "react";
import { FrequencyCard, CardRow, DashboardCard } from "../../../../components/general/charting/Cards";
import Checkbox from "../../../../components/forms/FormCheckbox";
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

    render() {
        const donutData = [
            { id: "Within the last 24 hours", value: 1205, color: "#E12F51" },
            { id: "1 day - 1 week ago", value: 512, color: "#193967" },
            { id: "1 week - 4 weeks ago", value: 200, color: "#4C8DCA" },
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
            { id: "At least daily", color: "#193967" },
            { id: "At least weekly", color: "#4C8DCA" },
            { id: "At least monthly", color: "#E12F50" },
            { id: "At least quarterly", color: "#6ACCE0" },
            { id: "Less than quarterly", color: "#EF6A04" },
        ];

        const barData = [
            {
                id: "By Week",
                helpText: "This is by week",
                legend: legend,
                data: [
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
                <CardRow>
                    <FrequencyCard
                        errorMessage={this.state.errorMessage}

                        frontTitle="Users By Last Activity"
                        frontLegendLabel="Last activity was:"
                        donutData={donutData}
                        donutLabel="Total Users"
                        donutUnits="Users"

                        backTitle="Average distribution of user activity"
                        backTitleHelpHint="This is the back title help hint"
                        backLegendLabel="Active on average:"
                        barData={barData}

                        loading={this.state.loading}
                        onMakeDefault={this._handleMakeDefault}
                        makeDefaultLabel="Make Default View"
                        defaultChecked={false}

                        size={2}
                    />
                    <DashboardCard size={1} />
                </CardRow>
            </div>
        );
    }
}