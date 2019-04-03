import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Utils from "../../../util/Utils";

import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer } from "recharts";

class StackedChart extends Component {
    state = {
        legend: this.props.legend.map(i => i.id)
    };

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

    shouldComponentUpdate = (nextProps) =>
        this.state.legend.includes(nextProps.selectedId) &&
        nextProps.selectedId !== this.props.selectedId ||
        !nextProps.selectedId

    render() {
        const {
            legend,
            data,
            selectedId,
            "data-id": dataId,
            onMouseOut,
        } = this.props;

        const classes = classnames(
            this.props.className,
        );

        return (
            <div data-id={dataId} style={{ height: "200px", minWidth: "300px", width: "100%" }}>
                <ResponsiveContainer height={200} width="100%">
                    <BarChart
                        data={this._digestData(data)}
                        margin={{ top: 50, right: 30, left: 0, bottom: 5 }}
                        className={classes}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        {
                            legend.map(({ id, color }, key) => (
                                <Bar
                                    key={key}
                                    data-id="stacked-chart"
                                    dataKey={key}
                                    stackId="a"
                                    onMouseOver={this._handleMouseOver(id)}
                                    onMouseOut={onMouseOut}
                                    onClick={this._handleOnClick(id)}
                                    fill={`${selectedId && selectedId !== id ? Utils.HexToRgba(color, 0.25) : color}`}
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
    };

    static defaultProps = {
        // Ignore default mouse events for testing
        onMouseOut: /* istanbul ignore next  */ () => {},
        onMouseOver: /* istanbul ignore next  */ () => {},
        onClick: /* istanbul ignore next  */ () => {},
    }
}

export default StackedChart;