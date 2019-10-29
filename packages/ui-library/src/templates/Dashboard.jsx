import React from "react";
import HeroChart from "../components/general/charting/HeroChart";
import { CardRow, DonutCard, PlaceHolderCard, StatCard, StatAreaCard } from "../components/general/charting/Cards";
import { HorizontalBarCard } from "../components/general/charting/Cards";
import demoChartData from "../demo/components/general/charting/demoChartData";
import _ from "underscore";
import MultiseriesChartCard, { chartTypes } from "../components/general/charting/MultiseriesChartCard";
import HeatmapCard from "../components/general/charting/HeatmapCard";
import FrequencyCard from "../components/general/charting/FrequencyCard";
import RockerButton from "../components/forms/RockerButton";
import { toRechartsDataFormat } from "../util/ChartingUtils";

Math.seed = 123;
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
};

/**
 * @class Dashboard
 * @desc This is a template to demonstrate how to build the charting dashboard.
 */
class Dashboard extends React.Component {

    days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "00"];
    demoValues = [651, 739, 594, 476];
    valueTitles = [
        "1 Week Average",
        "1 Month Average",
        "3 Month Average",
        "6 Month Average",
    ];

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
        { id: "Enabled Users", value: 120543 },
        { id: "Inactive Users", value: 51233 },
        { id: "Disabled Users", value: 20000 },
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

    MultiseriesInitialOptions = [
        {
            id: "Confluence",
            name: "Confluence"
        },
        {
            id: "DataDog",
            name: "DataDog"
        },
        {
            id: "DocuSign",
            name: "DocuSign"
        },
        {
            id: "Google Calendar",
            name: "Google Calendar"
        },
        {
            id: "Google Drive",
            name: "Google Drive"
        },
    ]

    timeSpans = [
        [
            "Jan 1",
            "Jan 8",
            "Jan 15",
            "Jan 22",
            "Feb 1",
            "Feb 8",
            "Feb 15",
            "Feb 22",
            "Mar 1",
            "Mar 8",
            "Mar 15",
            "Mar 22",
        ],
        [
            "Jan 1",
            "Jan 15",
            "Feb 1",
            "Feb 15",
            "Mar 1",
            "Mar 15",
            "Apr 1",
            "Apr 15",
            "May 1",
            "May 15",
            "Jun 1",
            "Jun 15",
        ],
        [
            "Jan '18",
            "Feb '18",
            "Mar '18",
            "Apr '18",
            "May '18",
            "June '18",
            "July '18",
            "Aug '18",
            "Sept '18",
            "Oct '18",
            "Nov '18",
            "Dec '18"
        ]
    ]

    frequencyData = [
        { id: "Within the last 24 hours", value: 1205 },
        { id: "1 day - 1 week ago", value: 512 },
        { id: "1 week - 4 weeks ago", value: 200 },
    ];

    exampleData = [
        60,
        20,
        10,
        5,
        5
    ];

    exampleData2 = [
        30,
        10,
        35,
        15,
        10
    ];

    legend = [
        { id: "At least daily" },
        { id: "At least weekly" },
        { id: "At least monthly" },
        { id: "At least quarterly" },
        { id: "Less than quarterly" },
    ];

    barData = [
        {
            id: "By Week",
            helpText: "This is by week",
            legend: this.legend,
            data: [
                {
                    id: "Feb 2018",
                    data: this.exampleData
                },
                {
                    id: "March 2018",
                    data: this.exampleData2
                },
                {
                    id: "April 2018",
                    data: this.exampleData
                },
                {
                    id: "May 2018",
                    data: this.exampleData2
                },
                {
                    id: "Jun 2018",
                    data: this.exampleData
                },
                {
                    id: "Jul 2018",
                    data: this.exampleData2
                },
                {
                    id: "Aug 2018",
                    data: this.exampleData
                },
                {
                    id: "Sept 2018",
                    data: this.exampleData2
                },
                {
                    id: "Oct 2018",
                    data: this.exampleData
                },
                {
                    id: "Nov 2018",
                    data: this.exampleData2
                },
                {
                    id: "Dec 2018",
                    data: this.exampleData
                },
                {
                    id: "Jan 2019",
                    data: this.exampleData2
                },
            ]
        },
        {
            id: "By Month",
            helpText: "This is by month",
            legend: this.legend,
            data: [
                {
                    id: "Feb 2017",
                    data: this. exampleData2
                },
                {
                    id: "March 2017",
                    data: this.exampleData2
                },
                {
                    id: "April 2017",
                    data: this.exampleData2
                },
                {
                    id: "May 2017",
                    data: this.exampleData2
                },
                {
                    id: "Jun 2017",
                    data: this.exampleData2
                },
                {
                    id: "Jul 2017",
                    data: this.exampleData2
                },
                {
                    id: "Aug 2017",
                    data: this.exampleData2
                },
                {
                    id: "Sept 2017",
                    data: this.exampleData2
                },
                {
                    id: "Oct 2017",
                    data: this.exampleData2
                },
                {
                    id: "Nov 2017",
                    data: this.exampleData2
                },
                {
                    id: "Dec 2017",
                    data: this.exampleData2
                },
                {
                    id: "Jan 2019",
                    data: this.exampleData2
                },
            ]
        },
        {
            id: "By Quarter",
            helpText: "This is by quarter",
            legend: this.legend,
            data: [
                {
                    id: "Feb 2017",
                    data: this.exampleData2
                },
                {
                    id: "March 2017",
                    data: this.exampleData2
                },
                {
                    id: "April 2017",
                    data: this.exampleData2
                },
                {
                    id: "May 2017",
                    data: this.exampleData2
                },
                {
                    id: "Jun 2017",
                    data: this.exampleData2
                },
                {
                    id: "Jul 2017",
                    data: this.exampleData2
                },
                {
                    id: "Aug 2017",
                    data: this.exampleData2
                },
                {
                    id: "Sept 2017",
                    data: this.exampleData2
                },
                {
                    id: "Oct 2017",
                    data: this.exampleData2
                },
                {
                    id: "Nov 2017",
                    data: this.exampleData2
                },
                {
                    id: "Dec 2017",
                    data: this.exampleData2
                },
                {
                    id: "Jan 2019",
                    data: this.exampleData2
                },
            ]
        }
    ];

    _sumTotal = (data) => {
        return data.reduce((acc, { value }) => {
            return acc + value;
        }, 0);
    }


    _heatmapGenerateDemoData = () => {
        return this.days.map((day) => {
            return this.hours.map((hour) => {
                console.log(day.charCodeAt(1));
                return {
                    value: parseInt(Math.seededRandom(1, 1000)),
                    label: `${day.toUpperCase()} ${hour}:00${hour < 12 ? "am" : "pm"} MST`
                };
            });
        });
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

        multiseriesOptions: this. MultiseriesInitialOptions,
        multiseriesTimeSpanIndex: 0,
        multiseriesTypeIndex: 0,

        heatmapData: this._heatmapGenerateDemoData(),
        heatmapValue: this.demoValues[0],
        heatmapValueTitle: this.valueTitles[0],

    }

    _handleMakeDefault = () => {
        console.log("Make default clicked");
    }


    _heroHandleRangeChange = (range) => {
        console.log(`New hero chart time range selected: ${range.label}`);
    };


    //area card
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

    //donutcard
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


    //Horizontalbar card
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

    //frequcney card
    _frequencyHandleMakeDefault = () => {
        console.log("Make default clicked");
    }

    //heatmap card

    _heatmapHandleRangeChange = range => {
        this.setState({
            data: this._heatmapGenerateDemoData(),
            value: this.demoValues[range.index],
            valueTitle: this.valueTitles[range.index],
        });
    }


    //multiseries card
    _multiseriesGenerateData = () => new Array(12).fill(undefined).map(() => Math.floor(Math.random() * 30))

    _multiseriesGetTimeSpan = index => this.timeSpans[index]

    _multiseriesHandleSelectOption = (id, event) => console.log("onMenuSelect called with: ", id, event);

    _multiseriesHandleDeselectOption = (id, event) => console.log("onMenuDeselect called with: ", id, event);

    _multiseriesHandleToggle = open => console.log("onToggle called with", open)

    _multiseriesSetChartType = ({ index }) => this.setState({
        typeIndex: index
    })

    _multiseriesSetTimeSpan = ({ index }) => this.setState(() => ({
        multiseriesTimeSpanIndex: index
    }))




    render = () => {
        const areaMax = _.max(this.state.areaData, item => item.value).value;
        const areaPercent = parseInt(parseInt(this.state.areaValue) * 100 / areaMax);

        const data = [
            {
                id: "confluence",
                name: "Confluence",
                data: this._multiseriesGenerateData()
            },
            {
                id: "dataDog",
                name: "DataDog",
                data: this._multiseriesGenerateData()
            },
            {
                id: "docuSign",
                name: "DocuSign",
                data: this._multiseriesGenerateData()
            },
            {
                id: "googleCalendar",
                name: "Google Calendar",
                data: this._multiseriesGenerateData()
            },
            {
                id: "googleDrive",
                name: "Google Drive",
                data: this._multiseriesGenerateData()
            },
            {
                id: "time",
                name: "Time",
                data: this._multiseriesGetTimeSpan(this.state.multiseriesTimeSpanIndex)
            }
        ];

        // Data is put into the Recharts format here using a helper function available from
        // src/util/ChartingUtils
        const multiseriesFormattedData = toRechartsDataFormat(data);
        // Don't include Time in options, since this will be used for the x-axis
        const multiseriesOptions = data.slice(0, data.length - 1).map(point => _.omit(point, "data"));

        // menuRequiredText can either be a string or a function, which is passed the current state
        // of the component.
        const renderRequiredText = ({ selectedDataSets }) =>
            selectedDataSets.length === 0 ? "Minimum of 1 application required." : null;

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
                        rockerButtonProps={{ labels: this.areaRangeLabels, flags: ["p-stateful"] }}
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
                <CardRow alignCards="center">
                    <FrequencyCard
                        errorMessage={this.state.errorMessage}

                        frontTitle="Users By Last Activity"
                        frontLegendLabel="Last activity was:"
                        donutData={this.frequencyData}
                        donutLabel="Total Users"
                        donutUnits="Users"

                        backTitle="Average distribution of user activity"
                        backTitleHelpHint="This is the back title help hint"
                        backLegendLabel="Active on average:"
                        barData={this.barData}

                        loading={this.state.frequencyLoading}
                        onMakeDefault={this.frequencyHandleMakeDefault}
                        makeDefaultLabel="Make Default View"
                        defaultChecked={false}
                        maxWidth="66%"
                    />

                </CardRow>
                <CardRow>
                    <MultiseriesChartCard
                        bottomPanel={
                            <RockerButton
                                type={RockerButton.rockerTypes.CHART}
                                labels={["3M", "6M", "1Y"]}
                                onValueChange={this._setTimeSpan}
                                flags={["p-stateful"]}
                            />
                        }
                        data={multiseriesFormattedData}
                        menuNote={<p>Limit of 3 applications.</p>}
                        menuRequiredText={renderRequiredText}
                        // menuSelectedIds can be passed in here; if so, the DropDownSelector will not manage its internal
                        // selection state. IDs should be the same as the IDs used for data. If not passed in, the component
                        // will manage its own selection state.
                        onDeselectOption={this._multiseriesHandleDeselectOption}
                        onMenuToggle={this._multiseriesHandleToggle}
                        onSelectOption={this._multiseriesHandleSelectOption}
                        options={multiseriesOptions}
                        // selectedDataSets can be passed in as a prop here; if it is, the selection state must be handled
                        // in a parent component. If it's not passed in, the component will handle that state internally.
                        type={this.state.typeIndex === 0 ? chartTypes.LINE : chartTypes.AREA}
                        title="Application Traffic"
                        xAxisKey="time"
                        yAxisLabel="# of Requests"
                    />
                </CardRow>
                <CardRow>
                    <HeatmapCard
                        data={this.state.heatmapData}
                        chartTitle="Sign-ons by day/hour"
                        errorMessage={this.state.errorMessage}
                        loading={this.state.loading}
                        value={this.state.heatmapValue}
                        xAxisLabels={this.hours}
                        yAxisLabels={this.days}
                        onValueChange={this._handleRangeChange}
                        labelKey="label"
                        valueKey="value"
                        valueTitle={this.state.heatmapValueTitle}
                        valueSubtitle={<span>Sign-ons<br />per day</span>}
                        tooltipSubtitle="Average sign-ons"
                    />
                </CardRow>
            </div>
        );
    }
}

export default Dashboard;
