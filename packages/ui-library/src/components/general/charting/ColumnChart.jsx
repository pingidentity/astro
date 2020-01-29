import React from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, Cell, Tooltip, ReferenceLine, ResponsiveContainer, CartesianGrid } from "recharts";
import _ from "underscore";
import classnames from "classnames";

import Color from "color";
import DashboardCardTitle from "./Cards/DashboardCardTitle";
import { LegendItem } from "./Legend";
import { defaultRender } from "../../../util/PropUtils";
import Spinner from "../../general/Spinner";

/**
 * @class ColumnChart
 * @desc A chart with stacked columns.
 *
 * @param {string} [data-id="column-chart"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     A class name applied to the top-level element in the component.
 * @param {Object[]} [data=[]]
 *     The data to be passed to the component.
 * @param {string} [data.id]
 *     ID for individual x-axis points.
 * @param {int[]} [data.data]
 *     Array of integers representing the data within the chart.
 * @param {Object[]} [legend=[]]
 *     Legend for the chart.
 * @param {string} [referenceLineColor]
 *     The color for the chart's reference line, represented by a hex
 *     color. For example, "#FFFFFF".
 * @param {boolean} [stacked=true]
 *     Determines if the bars in each category should be stacked. If set
 *     to false, bars will display side-by-side.
 */

/**
 * Callback triggered when a user clicks on the chart.
 * @callback ColumnChart~onClick
 * @param {Object} [event]
 *     The event that triggered the callback.
 */

/**
 * Callback triggered when a user mouses over the chart.
 * @callback ColumnChart~onMouseOver
 * @param {Object} [data]
 *     The datapoint being hovered over.
 * @param {Object} [event]
 *     The event that triggered the callback.
*/

/**
 * Callback triggered when a user mouses out of the chart.
 * @callback ColumnChart~onMouseOut
 * @param {Object} [event]
 *     The event that triggered the callback.
*/

/**
 * Function that can be used to change how the tooltip renders. For example,
 * showing a value as $38 instead of just 38.
 * @callback ColumnChart~renderTooltip
 * @param {Object} props
 *     The props of the default component; these can be spread into the component.
 * @param {Object} defaultComponent
 *     The component that the ColumnChart renders by default.
*/


export const ColumnChartTitle = ({ className, ...props }) => (
    <DashboardCardTitle
        {...props}
        className={classnames(className, "dashboard-card__title--horizontal-bar-card")}
    />
);

export default class ColumnChart extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                data: PropTypes.arrayOf(PropTypes.shape({}))
            })
        ),
        height: PropTypes.number,
        onClick: PropTypes.func,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        legend: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            color: PropTypes.string
        })),
        referenceLineColor: PropTypes.string,
        renderTooltip: PropTypes.func,
        stacked: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    static defaultProps = {
        "data-id": "column-chart",
        data: [],
        height: 300,
        legend: [],
        onClick: _.noop,
        onMouseOver: _.noop,
        onMouseOut: _.noop,
        referenceLineColor: "#57A0EA",
        renderTooltip: defaultRender,
        stacked: true,
        width: "100%"
    };

    state = {
        selected: null,
    };

    _digestData = (data) =>
        data.reduce((a, item) => ([
            ...a,
            {
                name: item.id,
                ...this.props.legend.reduce((b, key, index) => ({
                    ...b,
                    [index]: item.data.find(dataPoint => dataPoint.id === key.id).value,
                }), {})
            }
        ]), []);

    _handleClick = (id) => (value, index, e) => {
        const data = {
            x: {
                index,
                label: value.name
            },
            y: {
                index: [...this.props.legend].reverse().findIndex((i) => i.id === id),
                label: id
            }
        };

        this.props.onClick(data, e);
    }

    _handleMouseOut = (value, index, e) => {
        this.setState({ selected: null });

        this.props.onMouseOut(e);
    }

    _handleMouseOver = (id) => (value, index, e) => {
        const data = {
            x: {
                index,
                label: value.name
            },
            y: {
                index: [...this.props.legend].reverse().findIndex((i) => i.id === id),
                label: id
            }
        };

        this.setState({
            selected: data
        });

        this.props.onMouseOver(data, e);
    }

    _renderTooltip = () => {
        if (!this.state.selected) {
            return;
        }

        const data = {
            color: [...this.props.legend].reverse()[this.state.selected.y.index].color,
            x: this.state.selected.x,
            y: this.state.selected.y,
            value: this.props.data
                .find(o => o.id === this.state.selected.x.label).data
                .find(o => o.id === this.state.selected.y.label).value
        };

        return (
            <div className="column-chart__tooltip">
                {this.props.renderTooltip(data, LegendItem)}
            </div>
        );
    };

    render() {
        const {
            data,
            errorMessage,
            legend,
            loadingMessage,
            "data-id": dataId,
        } = this.props;

        const digestedData = this._digestData(data);

        const hasCustomState = errorMessage !== undefined || loadingMessage !== undefined;

        const emptyLines = [...Array.from({ length: 4 }, (v, i) => this.props.height / (4) * i), this.props.height];

        const {
            x = {},
            y = {},
        } = this.state.selected || {};

        return (
            <>
                <ResponsiveContainer
                    className={this.props.className}
                    height={this.props.height}
                    width={this.props.width}
                >
                    <BarChart
                        data={digestedData}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                        className="column-chart"
                        data-id={dataId}
                        onMouseOut={this._handleMouseOut}
                    >
                        <XAxis dataKey="name" hide={true} />
                        <CartesianGrid
                            vertical={false}
                            horizontalPoints={digestedData.length === 0 ? emptyLines : undefined}
                        />
                        <Tooltip
                            isAnimationActive={true}
                            content={this._renderTooltip}
                            cursor={false}
                        />
                        {
                            !hasCustomState && legend.map(({ id, label, color }, key) => {
                                return (
                                    <Bar
                                        label={label ? label : id}
                                        dataKey={key}
                                        key={id}
                                        stackId={ this.props.stacked ? "a" : id }
                                        maxBarSize={60}
                                        fill={color}
                                        onClick={this._handleClick(id)}
                                        onMouseOver={this._handleMouseOver(id)}
                                        onMouseOut={this._handleMouseOut}
                                        radius={key === legend.length - 1 || !this.props.stacked ? [3, 3, 0, 0] : null}
                                    >
                                        {
                                            digestedData.map((item) => (
                                                <Cell
                                                    key={item.name}
                                                    className="column-chart__cell"
                                                    style={{
                                                        stroke: x.label === item.name && y.label === id
                                                            ? Color(color).lighten(0.5)
                                                            : color,
                                                        strokeWidth: "1px",
                                                    }}
                                                />
                                            ))}
                                    </Bar>
                                );
                            })
                        }
                        {legend.length > 0 && !hasCustomState &&
                        <ReferenceLine
                            x={this.state.selected ? this.state.selected.x.label : null}
                            stroke="#57A0EA"
                            label={{
                                position: "top",
                                value: this.state.selected ? this.state.selected.x.label : null,
                                fill: this.props.referenceLineColor,
                                fontSize: 14
                            }}
                        />
                        }
                    </BarChart>
                </ResponsiveContainer>
                {
                    errorMessage ? (
                        <div className="column-chart__error">
                            {errorMessage}
                        </div>
                    ) : null
                }
                {
                    loadingMessage ? (
                        <div className="column-chart__loading">
                            <Spinner
                                show={true}
                                defaultText={loadingMessage}
                            />
                            <div className="column-chart__loading-text">
                                {loadingMessage}
                            </div>
                        </div>
                    ) : null
                }
            </>
        );
    }
}
