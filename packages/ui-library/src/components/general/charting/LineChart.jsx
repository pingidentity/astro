import React, { createRef } from "react";
import PropTypes from "prop-types";
import {
    LineChart as Chart,
    Line,
    XAxis,
    ReferenceLine,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import _ from "underscore";

import { getEvenLineCoords } from "../../../util/ChartingUtils";
import ChartLabel from "./ChartLabel";

/**
 * @class LineChart
 * @desc Plot data points on a graph with a scrubber.
 *
 * @param {array} data
 *     Array of objects with names and values for the data.
 * @param {string} [data-id="line-chart"]
 *     The data-id assigned to the top-most container of the component.
 * @param {string} [height]
 *     Height of the chart.
 * @param {array} highlightRange
 *     Start and end indexes of data to be highlighted eg: [3, 5].
 * @param {array} [legend]
 *     Array of objects to associate labels and ids.
 * @param {array} [lines=false]
 *     If true, chart will show horizontal lines.
 * @param {function} [onClick]
 *     Callback triggered when the mouse clicks a data point.
 * @param {function} [onHoverDataPoint]
 *     Callback triggered when the mouse moves over a new data point.
 * @param {function} [onMouseLeave]
 *     Callback triggered when the mouse moves leaves a chart.
 * @param {boolean} [showHighLight=false]
 *     If a range highlight should be shown.
 * @param {object} theme
 *     Theme with referenceLabelColor, referenceLineColor, highlightColor, and dataColors
 * @param {string} [width]
 *     Width of the chart.
 */
export default class LineChart extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        data: PropTypes.array,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        highlightRange: PropTypes.arrayOf(PropTypes.number),
        legend: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                id: PropTypes.string,
            })
        ),
        lines: PropTypes.bool,
        onClick: PropTypes.func,
        onHoverDataPoint: PropTypes.func,
        onMouseLeave: PropTypes.func,
        showHighlight: PropTypes.bool,
        theme: PropTypes.shape({
            referenceLineColor: PropTypes.string,
            referenceLabelColor: PropTypes.string,
            dataColors: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string,
                color: PropTypes.string
            })),
        }),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
        "data-id": "line-chart",
        data: [],
        height: "100%",
        highlightRange: [],
        legend: [],
        lines: true,
        onClick: _.noop,
        onHoverDataPoint: _.noop,
        showHighlight: false,
        theme: {
            referenceLineColor: "#57A0EA",
            referenceLabelColor: "#676e75",
            dataColors: [],
            highlightColor: "#5DA4EC",
        },
        width: "100%",
    };

    chartRef = createRef();
    lastChartWidth = null;

    // Used to prevent unnecessary updates when the mouse moves
    mouseLockout = false;

    state = {
        activeTooltipIndex: null,
    };

    /**
     * Convert data into Recharts-readable format
     */
    _digestData = (data) => {
        return data.reduce((a, item) => ([
            ...a,
            {
                name: item.label,
                ...item.points.reduce((b, point) => ({
                    ...b,
                    [point.id]: point.value,
                }), {})
            }
        ]), []);
    }

    _onLeaveChart = () => {
        this.setState({ activeTooltipIndex: -1 });
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave();
        }
    };

    _onHoverDataPoint = (data) => {
        /* istanbul ignore if  */
        if (this.mouseLockout || !data) {
            return;
        }

        /* istanbul ignore next  */
        setTimeout(() => {
            this.mouseLockout = false;
        }, 5);

        const index = data.activeTooltipIndex;
        this.setState((prevState) => {
            if (prevState.activeTooltipIndex !== index) {
                this.mouseLockout = true;
                this.props.onHoverDataPoint(data.activeTooltipIndex);
                return {
                    activeTooltipIndex: index,
                };
            }
        });
    }

    /**
     * Render one line with a color and id
     */
    _renderLine = (id, color) => (
        <Line
            stroke={this.props.showHighlight ? `url(#color-${id})` : color}
            strokeWidth={2}
            dataKey={id}
            dot={false}
            key={id}
            isAnimationActive={false}
        />
    );

    /**
     * Render lines for each legend item
     */
    _renderData = (legend) =>
        legend.map(({ id }) =>
            this._renderLine(id, this.props.theme.dataColors.find(c => c.id === id).color)
        );

    _renderHighlight = (legend, colors) => {
        const {
            data,
            highlightRange,
            theme,
        } = this.props;

        return legend.map((item) => {
            const lineColor = colors.find(c => c.id === item.id).color;

            return (
                <defs>
                    <linearGradient id={`color-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        {
                            highlightRange[0] !== undefined &&
                            highlightRange[1] !== undefined
                                ? [
                                    <stop
                                        offset="0%"
                                        stopColor={lineColor}
                                        key="0"
                                    />,
                                    <stop
                                        offset={
                                            // % of data before first highlight element
                                            `${Math.max(0, Math.ceil(
                                                highlightRange[0] / (data.length - 1) * 100
                                            ))}%`
                                        }
                                        stopColor={lineColor}
                                        key="1"
                                    />,
                                    <stop
                                        offset={
                                            // % of data before first highlight element
                                            `${Math.max(
                                                0, Math.ceil(highlightRange[0] / (data.length - 1) * 100)
                                            )}%`
                                        }
                                        stopColor={theme.highlightColor}
                                        key="2"
                                    />,
                                    <stop
                                        offset={
                                            // % of data before second highlight element
                                            `${Math.max(
                                                0, Math.ceil(highlightRange[1] / (data.length - 1) * 100)
                                            )}%`
                                        }
                                        stopColor={theme.highlightColor}
                                        key="3"
                                    />,
                                    <stop
                                        offset={
                                            // % of data before second highlight element
                                            `${Math.max(
                                                0, Math.ceil(highlightRange[1] / (data.length - 1) * 100)
                                            )}%`
                                        }
                                        stopColor={lineColor}
                                        key="4"
                                    />,
                                    <stop
                                        offset="100%"
                                        stopColor={lineColor}
                                        key="5"
                                    />,
                                ] : (
                                    <stop
                                        offset="100%"
                                        stopColor={lineColor}
                                    />
                                )}
                    </linearGradient>
                </defs>
            );
        });
    }

    _renderReferenceLine = () => {
        const {
            data,
            theme
        } = this.props;

        const selected = data[this.state.activeTooltipIndex];

        return (
            <ReferenceLine
                x={selected ? selected.label : null}
                stroke={theme.referenceLineColor}
                position="start"
                label={({ viewBox: { x, y } }) => {
                    // Have to have this here for scoping issues during testing
                    const selectedDataPoint = data[this.state.activeTooltipIndex];
                    return selectedDataPoint
                        ? <ChartLabel
                            // Have to use the ref
                            chartWidth={this.chartRef.current.props.width}
                            color={theme.referenceLabelColor}
                            label={selectedDataPoint.label}
                            offset={5}
                            x={x}
                            y={y}
                        />
                        : null;
                }}
            />
        );
    }

    render() {
        const {
            className,
            "data-id": dataId,
            data,
            height,
            layout,
            legend,
            lines,
            onClick,
            showHighlight,
            theme,
            width,
        } = this.props;

        return (
            <ResponsiveContainer
                className={className}
                height={height}
                width={width}
                key="chart"
            >
                <Chart
                    className="line-chart"
                    data-id={dataId}
                    layout={layout}
                    data={this._digestData(data, legend)}
                    onMouseMove={this._onHoverDataPoint}
                    onMouseLeave={this._onLeaveChart}
                    onClick={onClick}
                    margin={{
                        top: 20, right: 30, left: 30, bottom: 5,
                    }}
                    ref={this.chartRef}
                >
                    {lines === true
                        ? <CartesianGrid
                            vertical={false}
                            horizontalPoints={getEvenLineCoords(this.props.height)}
                        />
                        : null
                    }
                    {this._renderData(legend)}
                    {
                        // Show highlight if prop is enabled
                        showHighlight
                            ? this._renderHighlight(legend, theme.dataColors)
                            : null
                    }
                    <XAxis dataKey="name" hide={true} />
                    {
                        data.length > 0 && legend.length > 0 &&
                        this._renderReferenceLine()
                    }
                </Chart>
            </ResponsiveContainer>
        );
    }
}
