/* eslint-disable max-len */
import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import RockerButton from "../../forms/RockerButton";
import HelpHint from "../../tooltips/HelpHint";
import DashboardCardTitle from "./Cards/DashboardCardTitle";
import DashboardCard from "./Cards/DashboardCard";
import StackedChart from "./StackedChart";
import classnames from "classnames";
import ChartLegend from "./ChartLegend";
import Colors from "../../general/charting/Cards/dashboardColors";

/**
 * @typedef {Object} FrequencyCard~DonutItemData
 * @param {string} [id]
 *     Identifier for this data label
 * @param {string|number} [value]
 *     value of the data
 * @param {string} [color]
 *     color of the data
 *
 *
 * @class FrequencyCard
 * @desc A card that displays a donut chart on a dashboard card.
 *
 * @param {array} [data-id="frequency-card"]
 *     The data-id attribute applied to the top-level container.
 * @param {string} [className]
 *    Custom class name(s) applied to the top-level container.
 * @param {string} [errorMessage]
 *     When provided, the error message and icon will display in place of the regular front/back content.
 * @param {boolean} [loading=false]
 *     When true the splinner animation shows in place of the stats.

 * @param {string} [frontTitle]
 *     Title of the card. Displayed at top of the front card.
 * @param {string} [frontLegendLabel]
 *     Label for legend back card.
 * @param {string} [donutLabel]
 *     The value shown on the front card in the middle of donut.
 * @param {string} [donutUnits]
 *     Used for hover-state on the front card in the middle of donut.
 * @param {string} [donutTooltip]
 *     Value for help hints.
 * @param {array} [donutData]
 *    A list of objects that needs for render donut chart.
 * @param {string} [backTitle]
 *     Title of the card. Displayed at top of the back.
 * @param {string} [backTitleHelpHint]
 *     HelpHint value for title of the back card.
 * @param {string} [backTerminateLabel]
 *     Text for terminate line.
 * @param {string} [barUnits]
 *     Used for hover-state on the back card.
 * @param {string} [backLegendLabel]
 *     Label for legend back card.
 * @param {array} [barData]
 *    A list of objects that needs for render bar chart.
 *
 * @param {function} [onFrontLegendClick]
 *     Callback triggered when clicked on front legend.
 * @param {function} [onDonutChartClick]
 *     Callback triggered when clicked on donut chart.
 * @param {function} [onBackLegendClick]
 *     Callback triggered when clicked on back legend.
 * @param {function} [onBackLegendClick]
 *     Callback triggered when clicked on bar chart.
 *
 * @param {function} [onMakeDefault]
 *     Callback triggered when the make-default checkbox is changed.  When provided a checkbox will render on the back
 *     of the card.
 * @param {bool} [defaultChecked]
 *     state of the checkbox set to false. If set to true will render with onMakeDefault already checked.
 * */

export default class FrequencyCard extends Component {
    _getColors = (data) => {
        let colors = [];
        let defaultIndex = 0;

        data.map(({ color }) => {
            if (color) {
                colors.push(color);
            } else {
                colors.push(Object.values(Colors.COLORS)[defaultIndex]);

                if (defaultIndex === Object.values(Colors.COLORS).length - 1) {
                    defaultIndex = 0;
                } else {
                    defaultIndex = defaultIndex + 1;
                }
            }
        });

        return colors;
    }

    state = {
        hoveredItem: {},
        hoverBarChart: false,
        selectedStacked: 0,
        originalDonutValue: this._sumValues(this.props.donutData),
    };

    // Return item by id, else return empty object
    _findItemById = (searchId, data) => data.find(({ id }) => id === searchId) || {};

    // Select item
    _itemSelect = (id, additionalParams={}) => {
        const o = { id, ...additionalParams };

        this.props.onValueChange(o);

        this.setState({
            hoveredItem: o
        });
    }

    // Clear presently selected item
    _itemClearSelection = () => {
        this.setState({
            hoveredItem: {},
        });
    }

    /**
     * Handle mouse over/out events for charts
     */
    _donutChartMouseOver = ({ id }) => {
        const o = this._findItemById(id, this.props.donutData);

        const color = this._getColors(this.props.donutData)[this.props.donutData.map((e) => e.value).indexOf(o.value)];

        this._itemSelect(id, {
            color,
            strokeWidth: 2,
            value: o.value
        });
    }

    _donutChartMouseOut = () => {
        this._itemClearSelection();
    }

    _barChartMouseOver = ({ y }) => {
        this._itemSelect(y.label);
        this.setState({ hoverBarChart: true });
    }

    _barChartMouseOut = () => {
        this._itemClearSelection();
        this.setState({ hoverBarChart: false });
    }

    /**
     * Handle mouse over/out events for legends
     */
    _frontLegendMouseOver = ({ index, label }, e) => {
        e.preventDefault();

        const color = this._getColors(this.props.donutData)[index];

        this._itemSelect(label, {
            color,
            strokeWidth: 2,
            value: this.props.donutData[index].value
        });
    };

    _backLegendMouseOver = ({ index, label }, e) => {
        e.preventDefault();

        this._itemSelect(label, this.props.barData[this.state.selectedStacked].legend[index]);
    };

    _legendMouseOut = (e) => {
        e.preventDefault();

        this._itemClearSelection();
    };

    /*
    istanbul ignore next
    */
    _handleDonutChartClick = (d, e) => {
        const data = {
            index: this.props.donutData.map(x => x.id).indexOf(d.name),
            label: d.name
        };

        this.props.onDonutChartClick(data, e);
    }

    /*
    istanbul ignore next
    */
    _handleFrontLegendClick = ({ index, label }, e) =>
        this.props.onFrontLegendClick({ index, label }, e);

    /*
    istanbul ignore next
    */
    _handleBarChartClick = ({ x, y }, e) =>
        this.props.onBarChartClick({ x, y }, e);

    /*
    istanbul ignore next
    */
    _handleBackLegendClick = ({ index, label }, e) =>
        this.props.onBackLegendClick({ index, label }, e);

    // Renders donut pieces
    _renderCells = (data) => {
        const colors = this._getColors(data);

        return data.map(({ id }, key) =>
            this.state.hoveredItem.id === id ? (
                <Cell
                    className="frequency-card__hovered"
                    data-id={`donut-pie-cell_${id}`}
                    key={id}
                    fill={colors[key]}
                    style={{
                        strokeWidth: this.state.hoveredItem ? this.state.hoveredItem.strokeWidth : 0,
                        stroke: this.state.hoveredItem ? colors[key] : null,
                    }}/>
            ) : (
                <Cell data-id={`donut-pie-cell_${id}`} key={id} fill={colors[key]}/>
            )
        );
    }


    // Shrinks large num's with dot notation (eg. 1240 -> 1.2k)
    _renderNumber = (value) => {
        if (value >= 1000000) {
            return `${Number.parseFloat((value / 1000000).toFixed(2))}m`;
        } else if (value >= 100000 ) {
            return `${Number.parseFloat((value / 1000).toFixed(0))}k`;
        } else if (value >= 10000) {
            return `${Number.parseFloat((value / 1000).toFixed(1))}k`;
        } else if (value >= 1000) {
            return `${Number.parseFloat((value / 1000).toFixed(2))}k`;
        } else {
            return value;
        }
    };

    // Add total of all .value's in an array
    // Note: if inline, tests fail
    _sumValues(data) {
        return data.reduce((counter, o) => counter + o.value, 0);
    }

    // Renders top label on donut chart
    _renderDonutLabel = (data, value) => {
        const totalValue = this._sumValues(data);

        return `${Math.ceil((1 - ((totalValue - value) / totalValue))*100)}%`;
    }

    // Adds commas at proper locations in long num
    _renderCommas = (value) => {
        return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    _renderTooltip = (data) => {
        const { donutTooltip } = this.props;

        if (donutTooltip && data.payload[0]) {
            return (
                <div className="frequency-tooltip">
                    <div className="frequency-tooltip__data">
                        {donutTooltip}
                    </div>
                </div>
            );
        }
    };

    // Handle rocker change
    _handleRockerChange = ({ index }) => this._selectDataSet(index);

    // Select data set for frequency graph switcher
    _selectDataSet = (i) => {
        this.setState({
            selectedStacked: i,
            hoveredItem: {},
        });
    }

    _getFront = () => {
        const {
            loading,
            frontTitle,
            frontTitleHelpHint,
            frontLegendLabel,
            donutInnerRadius,
            donutOuterRadius,
            donutLabel,
            donutUnits,
            donutTooltip,
            donutData,
        } = this.props;
        const {
            hoveredItem,
            originalDonutValue,
        } = this.state;

        return !_.isEmpty(donutData) && (
            <div>
                <DashboardCardTitle
                    className="dashboard-card__title--frequency-card"
                    title={frontTitle}
                >
                    {frontTitleHelpHint &&
                    <HelpHint
                        data-id="helphint-bottomplacement"
                        placement="bottom"
                        leftMargin
                        hintText={frontTitleHelpHint}
                    />
                    }
                </DashboardCardTitle>
                <div className="frequency-card__holder">
                    {!loading && ([
                        <div key="chartKey" className="frequency-card__wrapper">
                            <PieChart
                                height={202}
                                width={202}
                                data-id={`${this.props["data-id"]}-chart`}
                                className="frequency-card__donut-chart"
                                cursor="pointer"
                            >
                                <Pie
                                    innerRadius={donutInnerRadius}
                                    outerRadius={donutOuterRadius}
                                    startAngle={90}
                                    endAngle={-270}
                                    paddingAngle={1}
                                    data={donutData}
                                    dataKey="value"
                                    nameKey="id"
                                    onMouseEnter={this._donutChartMouseOver}
                                    onMouseLeave={this._donutChartMouseOut}
                                    onClick={this._handleDonutChartClick}
                                >
                                    {this._renderCells(donutData)}
                                </Pie>
                                <Tooltip
                                    wrapperStyle={{ zIndex: 1000 }}
                                    isAnimationActive={true}
                                    content={this._renderTooltip}
                                    active={hoveredItem.id !== undefined ? true : false}
                                    cursor={{ fill: "transparent" }}
                                />
                            </PieChart>
                            <div key="centerLabelKey" className="frequency-card__center-info">
                                <div
                                    className="frequency-card__center-number"
                                    style={{ color: hoveredItem.color }}
                                >
                                    {!hoveredItem.id ? (
                                        `${this._renderNumber(originalDonutValue)}`
                                    ) : (
                                        `${this._renderDonutLabel(donutData, hoveredItem.value)}`
                                    )}
                                </div>
                                <div className="frequency-card__front-line" />
                                <div
                                    data-id="donut-chart-center-label"
                                    className="frequency-card__center-label"
                                    style={{ color: hoveredItem.color }}
                                >
                                    {hoveredItem.id ? (
                                        `${this._renderCommas(hoveredItem.value)} ${donutUnits}`
                                    ) : (
                                        `${donutLabel}`
                                    )}
                                </div>
                            </div>
                        </div>,
                        <ChartLegend
                            key="asideKey"
                            data-id="donut-chart-legend"
                            legend={donutData}
                            colors={this._getColors(donutData)}
                            legendLabel={frontLegendLabel}
                            helpLabel={donutTooltip}
                            selectedId={hoveredItem.id}
                            onMouseOver={this._frontLegendMouseOver}
                            onMouseOut={this._legendMouseOut}
                            onClick={this._handleFrontLegendClick}
                        />
                    ])}
                </div>
            </div>
        );
    }

    _getBack = () => {
        const {
            backTitle,
            backTitleHelpHint,
            backLegendLabel,
            barData,
            barUnits,
            backTerminateLabel,
        } = this.props;
        const {
            hoveredItem,
            selectedStacked,
            hoverBarChart,
        } = this.state;

        return !_.isEmpty(barData) && (
            <div>
                <div className="frequency-card__title" style={{ zIndex: 100 }}>
                    <DashboardCardTitle
                        title={backTitle}
                    >
                        {backTitleHelpHint &&
                        <HelpHint
                            data-id="helphint-bottomplacement"
                            placement="bottom"
                            leftMargin
                            hintText={backTitleHelpHint}
                        />
                        }
                    </DashboardCardTitle>
                </div>
                {!this.props.loading && ([
                    <div key="freqCardHolder">
                        <div className="frequency-card__holder">
                            <div key="chartKey" className="frequency-card__wrapper" style={{ width: 0 }}>
                                <StackedChart
                                    data={barData[selectedStacked].data}
                                    units={barUnits}
                                    legend={barData[selectedStacked].legend}
                                    colors={this._getColors(barData[selectedStacked].legend)}
                                    terminateLabel={backTerminateLabel}
                                    selectedId={hoveredItem.id}
                                    highlightRow={!hoverBarChart}
                                    onMouseOver={this._barChartMouseOver}
                                    onMouseOut={this._barChartMouseOut}
                                    onClick={this._handleBarChartClick}
                                />
                            </div>
                            <ChartLegend
                                key="asideKey"
                                data-id="stacked-chart-legend"
                                legend={barData[selectedStacked].legend}
                                colors={this._getColors(barData[selectedStacked].legend)}
                                label={backLegendLabel}
                                selectedId={hoveredItem.id}
                                onMouseOver={this._backLegendMouseOver}
                                onMouseOut={this._legendMouseOut}
                                onClick={this._handleBackLegendClick}
                            />
                        </div>
                        <div className="frequency-card__nav-holder">
                            <RockerButton
                                type={RockerButton.rockerTypes.CHART}
                                onValueChange={this._handleRockerChange}
                                labels={barData.map(i => i.id)}
                                labelHints={barData.map(i => i.helpText)}
                            />
                        </div>
                    </div>
                ])}
            </div>
        );
    }

    render () {
        const classes = classnames("frequency-card", this.props.className);

        return (
            <DashboardCard
                {...this.props}
                data-id={this.props["data-id"]}
                className={classes}
                front={this._getFront()}
                back={this._getBack()}
            />
        );
    }

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,

        onValueChange: PropTypes.func, // Changes on hover state

        frontTitle: PropTypes.string,
        frontTitleHelpHint: PropTypes.string,
        frontLegendLabel: PropTypes.string,
        donutInnerRadius: PropTypes.number,
        donutOuterRadius: PropTypes.number,
        donutLabel: PropTypes.string,
        donutUnits: PropTypes.string,
        donutTooltip: PropTypes.string,
        donutData: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
            color: PropTypes.string,
        })),
        onFrontLegendClick: PropTypes.func, // Clicked on front legend
        onDonutChartClick: PropTypes.func, // Clicked on donut chart

        backTitle: PropTypes.string,
        backTitleHelpHint: PropTypes.string,
        backLegendLabel: PropTypes.string,
        backTerminateLabel: PropTypes.string,
        barUnits: PropTypes.string,
        onBackLegendClick: PropTypes.func, // Clicked on back legend,
        onBarChartClick: PropTypes.func, // Clicked on bar chart
        barData: PropTypes.arrayOf(
            PropTypes.shape({
                legend: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, color: PropTypes.string })),
                data: PropTypes.arrayOf(PropTypes.object)
            })
        ),
    };

    static defaultProps = {
        "data-id": "frequency-card",
        donutInnerRadius: 60,
        donutOuterRadius: 100,
        donutData: [],
        barData: [],

        // Ignore default mouse events for testing
        onValueChange: /* istanbul ignore next  */ () => {},
        onFrontLegendClick: /* istanbul ignore next  */ () => {},
        onDonutChartClick: /* istanbul ignore next  */ () => {},
        onBackLegendClick: /* istanbul ignore next  */ () => {},
        onBarChartClick: /* istanbul ignore next  */ () => {},
        onItemMouseOver: /* istanbul ignore next  */ () => {},
        onItemClick: /* istanbul ignore next  */ () => {},
    };
}
