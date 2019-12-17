import React from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, Cell, Tooltip, ReferenceLine, CartesianGrid } from "recharts";
import _ from "underscore";
import Color from "color";
import Legend from "./Legend";

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

export default class ColumnChart extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                data: PropTypes.arrayOf(PropTypes.number)
            })
        ),
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        legend: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            color: PropTypes.string
        })),
        referenceLineColor: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "column-chart",
        data: [],
        legend: [],
        onMouseOver: _.noop,
        onMouseOut: _.noop,
        referenceLineColor: "#57A0EA",
    };

    state = {
        selected: {},
        legend: [...this.props.legend].reverse(),
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

    _handleMouseOut = (value, index, e) => {
        this.setState({ selected: {} });

        this.props.onMouseOut(e);
    }

    _handleMouseOver = (id) => (value, index, e) => {
        this.setState((prevState) => {
            const data = {
                x: {
                    index,
                    label: value.name
                },
                y: {
                    index: prevState.legend.findIndex((i) => i.id === id),
                    label: id
                }
            };

            this.props.onMouseOver(data, e);

            return { selected: data };
        });
    }

    _renderTooltip = () => {
        if (!this.state.selected.y) {
            return;
        }

        const d = [
            {
                color: this.state.legend[this.state.selected.y.index].color,
                label: this.state.selected.y.label,
                value: this.props.data
                    .find(o => o.id === this.state.selected.x.label).data
                    .find(o => o.id === this.state.selected.y.label).value
            }
        ];

        return (
            <div className="column-chart__tooltip">
                <Legend data={d} />
            </div>
        );
    };

    render() {
        const {
            data,
            legend,
            "data-id": dataId,
        } = this.props;

        const digestedData = this._digestData(data);

        return (
            <BarChart
                width={550}
                height={300}
                data={digestedData}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
                className="column-chart"
                data-id={dataId}
            >
                <XAxis dataKey="name" hide={true} />
                <CartesianGrid vertical={false} />
                <Tooltip
                    isAnimationActive={false}
                    content={this._renderTooltip}
                    cursor={false}
                />
                {
                    legend.map(({ id, label, color }, key) => {
                        return (
                            <Bar
                                label={label ? label : id}
                                dataKey={key}
                                key={id}
                                stackId="a"
                                maxBarSize={60}
                                fill={color}
                                onMouseOver={this._handleMouseOver(id)}
                                onMouseOut={this._handleMouseOut}
                                radius={key === legend.length - 1 ? [3, 3, 0, 0] : null}
                            >
                                {
                                    digestedData.map((item) => (
                                        <Cell
                                            key={item.name}
                                            className="column-chart__cell"
                                            style={{
                                                stroke: this.state.selected.x &&
                                                    this.state.selected.y &&
                                                    this.state.selected.x.label === item.name &&
                                                    this.state.selected.y.label === id
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
                <ReferenceLine
                    x={this.state.selected.x ? this.state.selected.x.label : null}
                    stroke="#57A0EA"
                    label={{
                        position: "top",
                        value: this.state.selected.x ? this.state.selected.x.label : null,
                        fill: this.props.referenceLineColor,
                        fontSize: 14
                    }}
                />
            </BarChart>
        );
    }
}
