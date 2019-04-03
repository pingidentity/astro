/* eslint-disable max-len */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell } from "recharts";
import RockerButton from "../../forms/RockerButton";
import HelpHint from "../../tooltips/HelpHint";
import DashboardCard from "./Cards/DashboardCard";
import StackedChart from "./StackedChart";
import classnames from "classnames";
import ChartLegend from "./ChartLegend";

/**
 * @typedef {Object} FrequencyCard~data
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
 * @param {string} [className]
 *    Custom class name(s) applied to the top-level container
 * @param {array} [data-id="frequency-card"]
 *     The data-id attribute applied to the top-level container
 * @param {string} [label]
 *     Label for the card
 * @param {string} [keyLabel]
 *     Label for the key
 * @param {string} [units]
 *     Used for hover-state label
 * @param {string} [title]
 *     Title of the card. Displayed at top of front and back
 * @param {number} [value]
 *     The valuee shown on the front and back of the card
 * @param {string} [errorMessage]
 *     When provided, the error message and icon will display in place of the regular front/back content.
 * @param {boolean} [loading=false]
 *     When true the splinner animation shows in place of the stats
 * @param {function} [onMouseOver]
 *     Callback triggered when a chart data-point is hovered over
 * @param {function} [onMouseOut]
 *     Callback triggered when the mouse is hovered out of the chart
 * @param {object} [options]
 *     Provides the list of objects for the drop down
 * @param {object} [selectedOption]
 *     Highlightes selected option
 * @param {object} [onSelect]
 *     Selects from the list of options
 * @param {function} [onMakeDefault]
 *     Callback triggered when the make-default checkbox is changed.  When provided a checkbox will render on the back
 *     of the card.
 * @param {object} [Array.DonutCard~data]
 *     A list of objects that provides the data for the chart
 * @param {bool} [defaultChecked]
 *     state of the checkbox set to false. If set to true will render with onMakeDefault already checked.
 * */

export default class FrequencyCard extends Component {
    state = {
        hoveredItem: {},
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
    _donutChartMouseOver = (hoveredItem) => {
        const o = this._findItemById(hoveredItem.id, this.props.donutData);

        this._itemSelect(hoveredItem.id, {
            color: hoveredItem.color,
            strokeWidth: 2,
            value: o.value
        });
    }

    _donutChartMouseOut = () => {
        this._itemClearSelection();
    }

    _barChartMouseOver = ({ y }) => {
        this._itemSelect(y.label);
    }

    _barChartMouseOut = () => {
        this._itemClearSelection();
    }

    /**
     * Handle mouse over/out events for legends
     */
    _frontLegendMouseOver = ({ index, label }, e) => {
        e.preventDefault();

        this._itemSelect(label, this.props.donutData[index]);
    };

    _backLegendMouseOver = ({ index, label }, e) => {
        e.preventDefault();

        this._itemSelect(label, this.props.barData[this.state.selectedStacked].legend[index]);
    };

    _legendMouseOut = (e) => {
        e.preventDefault();

        this._itemClearSelection();
    };

    /**
     * Handle click events
     */
    _handleDonutChartClick = /* istanbul ignore next  */ (d, e) => {
        const data = {
            index: this.props.donutData.map(x => x.id).indexOf(d.name),
            label: d.name
        };

        this.props.onDonutChartClick(data, e);
    }

    _handleFrontLegendClick = /* istanbul ignore next  */ ({ index, label }, e) =>
        this.props.onFrontLegendClick({ index, label }, e);

    _handleBarChartClick = /* istanbul ignore next  */ ({ x, y }, e) =>
        this.props.onBarChartClick({ x, y }, e);

    _handleBackLegendClick = /* istanbul ignore next  */ ({ index, label }, e) =>
        this.props.onBackLegendClick({ index, label }, e);

    // Renders donut pieces
    _renderCells = (data) =>
        data.map(({ id, color }) =>
            this.state.hoveredItem.id === id ? (
                <Cell className="frequency-card__hovered" data-id="donut-pie-cell" key={id} fill={color} style={{ strokeWidth: this.state.hoveredItem ? this.state.hoveredItem.strokeWidth : 0 }}/>
            ) : (
                <Cell data-id="donut-pie-cell" key={id} fill={color}/>
            )
        );

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
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    render () {
        const classes = classnames(
            "frequency-card",
            this.props.className,
        );

        const {
            frontLegendLabel,
            donutUnits,
            donutInnerRadius,
            donutOuterRadius,
            donutData,
            donutLabel,

            backLegendLabel,
            barData,
        } = this.props;

        const {
            hoveredItem,
            originalDonutValue,
            selectedStacked,
        } = this.state;

        return (
            <DashboardCard {...this.props} data-id={this.props["data-id"]} className={classes}
                front={(
                    <div>
                        <div className="frequency-card__title">
                            {this.props.frontTitle}

                            {this.props.frontTitleHelpHint &&
                                <HelpHint
                                    data-id="helphint-bottomplacement"
                                    placement="bottom"
                                    leftMargin
                                    hintText={this.props.frontTitleHelpHint}
                                />
                            }
                        </div>
                        <div className="frequency-card__holder">
                            {!this.props.loading && ([
                                <div key="chartKey" className="frequency-card__wrapper">
                                    <PieChart
                                        height={202}
                                        width={202}
                                        data-id={`${this.props["data-id"]}-chart`}
                                        className="frequency-card__donut-chart"
                                    >
                                        <Pie
                                            innerRadius={donutInnerRadius}
                                            outerRadius={donutOuterRadius}
                                            paddingAngle={1}
                                            data={donutData}
                                            dataKey="value"
                                            nameKey="id"
                                            onMouseOver={this._donutChartMouseOver}
                                            onMouseOut={this._donutChartMouseOut}
                                            onClick={this._handleDonutChartClick}
                                        >
                                            {this._renderCells(donutData)}
                                        </Pie>
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
                                            className="frequency-card__center-label"
                                            style={{ color: hoveredItem.color }}
                                        >
                                            {hoveredItem.id ? (
                                                `${this._renderCommas(donutData.reduce((a, o) => a + o.value, 0))} ${donutUnits}`
                                            ) : (
                                                `${donutLabel}`
                                            )}
                                        </div>
                                    </div>
                                </div>,
                                <ChartLegend
                                    key="asideKey"
                                    data-id="donut-chart-legend"
                                    data={donutData}
                                    label={frontLegendLabel}
                                    selectedId={hoveredItem.id}
                                    onMouseOver={this._frontLegendMouseOver}
                                    onMouseOut={this._legendMouseOut}
                                    onClick={this._handleFrontLegendClick}
                                />
                            ])}
                        </div>
                    </div>
                )}
                back={(
                    <div>
                        <div className="frequency-card__title">
                            {this.props.backTitle}

                            {this.props.backTitleHelpHint &&
                                <HelpHint
                                    data-id="helphint-bottomplacement"
                                    placement="bottom"
                                    leftMargin
                                    hintText={this.props.backTitleHelpHint}
                                />
                            }
                        </div>
                        {!this.props.loading && ([
                            <div key="freqCardHolder">
                                <div className="frequency-card__holder">
                                    <div key="chartKey" className="frequency-card__wrapper" style={{ width: 0 }}>
                                        <StackedChart
                                            data={barData[selectedStacked].data}
                                            legend={barData[selectedStacked].legend}
                                            selectedId={hoveredItem.id}
                                            onMouseOver={this._barChartMouseOver}
                                            onMouseOut={this._barChartMouseOut}
                                            onClick={this._handleBarChartClick}
                                        />
                                    </div>
                                    <ChartLegend
                                        key="asideKey"
                                        data-id="stacked-chart-legend"
                                        data={barData[selectedStacked].legend}
                                        label={backLegendLabel}
                                        selectedId={hoveredItem.id}
                                        onMouseOver={this._backLegendMouseOver}
                                        onMouseOut={this._legendMouseOut}
                                        onClick={this._handleBackLegendClick}
                                    />
                                </div>
                                <div className="frequency-card__nav-holder">
                                    <RockerButton
                                        className="rocker-button--chart-rocker"
                                        stateless={false}
                                        onValueChange={this._handleRockerChange}
                                        labels={barData.map(i => i.id)}
                                        labelHints={barData.map(i => i.helpText)}
                                    />
                                </div>
                            </div>
                        ])}
                    </div>
                )}
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
        donutUnits: PropTypes.string,
        onFrontLegendClick: PropTypes.func, // Clicked on front legend
        onDonutChartClick: PropTypes.func, // Clicked on donut chart

        backTitle: PropTypes.string,
        backTitleHelpHint: PropTypes.string,
        backLegendLabel: PropTypes.string,
        onBackLegendClick: PropTypes.func, // Clicked on back legend,
        onBarChartClick: PropTypes.func, // Clicked on bar chart

        donutInnerRadius: PropTypes.number,
        donutOuterRadius: PropTypes.number,

        donutData: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
            color: PropTypes.string,
        })).isRequired,

        barData: PropTypes.arrayOf(
            PropTypes.shape({
                legend: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, color: PropTypes.string })),
                data: PropTypes.arrayOf(PropTypes.object)
            })
        ).isRequired,
    };

    static defaultProps = {
        "data-id": "frequency-card",
        donutInnerRadius: 60,
        donutOuterRadius: 100,

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