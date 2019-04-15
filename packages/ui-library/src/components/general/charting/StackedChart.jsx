import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Utils from "../../../util/Utils";

import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts";

class StackedChart extends Component {
    // Convert UI-Lib API-style data to something Rechart-readable
    _digestData = (data) => data.map(({ id, data: d }) => (
        {
            name: id,
            ...d.reduce((a, value, i) => ({
                ...a,
                [i]: value
            }), {})
        }
    ));

    state = {
        legend: this.props.legend.reverse().map(i => i.id),
        selected: {},
        data: this._digestData(this.props.data)
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            this.setState({ data: this._digestData(nextProps.data) });
        }
    }

    _handleMouseOut = (...args) => {
        this.setState({ selected: {} });

        this.props.onMouseOut(...args);
    }

    _handleMouseOver = (id) => (value, index, e) => {
        const data = {
            x: {
                index,
                label: value.name
            },
            y: {
                index: this.state.legend.indexOf(id),
                label: id
            }
        };

        this.setState({ selected: data });

        this.props.onMouseOver(data, e);
    }

    _handleOnClick = (id) => (value, index, e) => {
        const data = {
            x: {
                index,
                label: value.name
            },
            y: {
                index: this.state.legend.indexOf(id),
                label: id
            }
        };

        this.props.onClick(data, e);
    }

    _renderTooltip = (data) => {
        if (data.payload[0] && this.state.selected.y) {
            return (
                <div className="frequency-tooltip">
                    <div className="frequency-tooltip__title">
                        {data.payload[this.state.selected.y.index].payload.name}
                    </div>
                    <div className="frequency-tooltip__data">
                        {`${data.payload[this.state.selected.y.index].value}% of ${this.props.units}`}
                    </div>
                    <div className="frequency-tooltip__link">
                        Click segment to view report
                    </div>
                </div>
            );
        }
    };

    shouldComponentUpdate = (nextProps) =>
        this.state.legend.includes(nextProps.selectedId) &&
        nextProps.selectedId !== this.props.selectedId ||
        !nextProps.selectedId

    render() {
        const {
            legend,
            selectedId,
            colors,
            "data-id": dataId,
            terminateLabel,
            highlightRow,
        } = this.props;

        const classes = classnames(
            this.props.className,
        );

        /**
         * This is used to get the last empty data object provided
         * to display the termination label at
         */
        const lastEmpty = this.state.data.slice(0).reverse().map(o => o.name).indexOf("");

        return (
            <div data-id={dataId} style={{ height: "220px", minWidth: "300px", width: "100%" }}>
                <ResponsiveContainer height={220} width="100%">
                    <BarChart
                        data={this.state.data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                        className={classes}
                        barCategoryGap={"25%"}
                        reverseStackOrder={true}
                    >
                        <Tooltip
                            isAnimationActive={false}
                            content={this._renderTooltip}
                            cursor={false}
                        />
                        {lastEmpty > -1 &&
                            <ReferenceLine
                                x={this.state.data.length - 1 - lastEmpty}
                                stroke="#686f77"
                                strokeDasharray="3 3"
                                label={{
                                    value: terminateLabel,
                                    fontSize: "12px",
                                    angle: -90,
                                    dx: -8
                                }}
                            />
                        }
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                        />
                        <YAxis width={40} />
                        {
                            legend.map(({ id }, key) => (
                                <Bar
                                    key={key}
                                    data-id="stacked-chart-bar"
                                    dataKey={key}
                                    stackId="a"
                                    onMouseOver={this._handleMouseOver(id)}
                                    onMouseOut={this._handleMouseOut}
                                    onClick={this._handleOnClick(id)}
                                    stroke={colors[key]}
                                    fill={`${selectedId &&
                                        selectedId !== id &&
                                        highlightRow ? Utils.HexToRgba(colors[key], 0.25) : colors[key]}`}
                                />
                            ))
                        }
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }

    static propTypes = {
        label: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            data: PropTypes.arrayOf(PropTypes.number)
        })).isRequired,
        legend: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            color: PropTypes.string
        })).isRequired,
        selectedId: PropTypes.string,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        onClick: PropTypes.func,
        units: PropTypes.string,
        terminateLabel: PropTypes.string,
        highlightRow: PropTypes.bool,
    };

    static defaultProps = {
        // Ignore default mouse events for testing
        onMouseOut: /* istanbul ignore next  */ () => {},
        onMouseOver: /* istanbul ignore next  */ () => {},
        onClick: /* istanbul ignore next  */ () => {},
    }
}

export default StackedChart;