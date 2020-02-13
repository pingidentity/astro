import React, { Component } from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";
import ChartTitle from "./ChartTitle";
import ChartWrapper from "./ChartWrapper";
import PieChart, { CenterLabel, CenterValue } from "./PieChart";
import DashboardCard from "./Cards/DashboardCard";
import DashboardCardTitle from "./Cards/DashboardCardTitle";
import FormDropDownList from "../../forms/FormDropDownList";
import classnames from "classnames";
import Colors from "../charting/Cards/dashboardColors";
/**
 * @typedef {Object} DonutCard~data
 * @param {string} [id]
 *     Identifier for this data label
 * @param {string|number} [value]
 *     value of the data
 * @param {string} [color]
 *     color of the data
 *
 *
 * @class DonutCard
 * @desc A card that displays a donut chart on a dashboard card.
 *
 * @param {string} [className]
 *    Custom class name(s) applied to the top-level container.
 * @param {array} [data-id="donut-card"]
 *     The data-id attribute applied to the top-level container.
 * @param {string} [label]
 *     label for the card.
 * @param {string} [title]
 *     Title of the card. Displayed at top of front and back.
 * @param {number} [value]
 *     The value shown on the front and back of the card.
 * @param {string} [errorMessage]
 *    When provided, the error message and icon will display in place of the regular front/back content.
 * @param {boolean} [loading=false]
 *    When true the spinner animation shows in place of the stats.
 * @param {function} [onMouseOver]
 *     Callback triggered when a chart data-point is hovered over.
 * @param {function} [onMouseOut]
 *     Callback triggered when the mouse is hovered out of the chart.
 * @param {object} [options]
 *     Provides the list of objects for the drop down.
 * @param {object} [selectedOption]
 *     Highlights selected option.
 * @param {object} [onSelect]
 *     Selects from the list of options.
 * @param {function} [onMakeDefault]
 *     Callback triggered when the make-default checkbox is changed.  When provided a checkbox will render on the back
 *     of the card.
 * @param {object} [Array.DonutCard~data]
 *     A list of objects that provides the data for the chart.
 *  @param {bool} [defaultChecked]
 *     state of the checkbox set to false. If set to true will render with onMakeDefault already checked.
 * */

class DonutCard extends Component {
    state = {
        statColor: null,
    }

    _getColors = data => {
        return data.reduce(([colorsAcc, colorIndex], dataPoint) => {
            const {
                color = Colors.COLORS[Colors.KEYS[colorIndex]]
            } = dataPoint;
            return [
                [
                    ...colorsAcc,
                    {
                        ...dataPoint,
                        color
                    }
                ],
                dataPoint.color === undefined ? colorIndex + 1 : colorIndex
            ];
        }, [[], 0])[0];
    }

    _mouseOver = colors => (value, index, e) => {
        this.props.onMouseOver(e, value);

        const color = colors.find(({ id }) => id === value.id).color;

        this.setState({
            statColor: color,
        });
    };

    _mouseOut = (value, index, e) => {
        this.props.onMouseOut(e, value);

        this.setState({
            statColor: null,
        });
    };

    _getCenterValue = (value) => {
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

    _renderCommas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    _renderBack = (data) => {
        return (
            <div
                className="dashboard-card__stat-list donut-card__scroll"
                data-id={`${this.props["data-id"]}-list`}
                key="dashKey"
            >
                {data.map(({ color, id, label, value }) => (
                    <div key={id} className="donut-card__back-info">
                        <div className="dashboard-card__stat-row-label">{label || id}</div>
                        <div
                            className="dashboard-card__stat-row-number"
                            style={{ color }}>
                            {this._renderCommas(value)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    render () {
        const classes = classnames(
            "donut-card",
            this.props.className,
        );

        const dataWithColors = this._getColors(this.props.data);

        return (
            <DashboardCard {...this.props} data-id={this.props["data-id"]} className={classes}
                front={
                    <ChartWrapper
                        chart={!this.props.loading &&
                            <PieChart
                                centerLabel={
                                    <CenterLabel color={this.state.statColor}>
                                        {this.props.label}
                                    </CenterLabel>
                                }
                                centerValue={
                                    <CenterValue color={this.state.statColor}>
                                        {this._getCenterValue(this.props.value)}
                                    </CenterValue>
                                }
                                data={dataWithColors}
                                onMouseOut={this._mouseOut}
                                onMouseOver={this._mouseOver(dataWithColors)}
                                renderCell={({ selected, ...props }, Cell) => (
                                    <Cell
                                        {...props}
                                        {...selected ? { strokeWidth: 2, stroke: props.fill } : {}}
                                    />
                                )}
                                showTooltips={false}
                            />
                        }
                        title={<ChartTitle title={this.props.title} />}
                    />
                }
                back={(
                    <div>
                        <DashboardCardTitle
                            backTitle
                            title={this.props.title}
                        />
                        {!this.props.loading && ([
                            <div key="backLineKey" className="donut-card__back-line" />,
                            <FormDropDownList
                                data-id={`${this.props["data-id"]}-drop-down`}
                                key="dropdown"
                                className="donut-card__drop-down"
                                options={this.props.options}
                                selectedOption={this.props.selectOption}
                                onValueChange={this.props.onSelect}
                            />,
                            this._renderBack(dataWithColors)
                        ])}
                    </div>
                )}
            />
        );
    }




    static propTypes = {
        "data-id": PropTypes.string,
        label: PropTypes.string,
        title: PropTypes.node,
        className: PropTypes.string,
        value: PropTypes.number,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        innerRadius: PropTypes.number,
        outerRadius: PropTypes.number,
        options: PropTypes.arrayOf(PropTypes.object),
        selectOption: PropTypes.object,
        onSelect: PropTypes.func,
        onMakeDefault: PropTypes.func,
        errorMessage: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
            color: PropTypes.string,
        })).isRequired,
    };

    static defaultProps = {
        "data-id": "donut-card",
        onMouseOut: noop,
        onMouseOver: noop,
    };
}

export default DonutCard;