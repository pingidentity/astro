import React from "react";
import PropTypes from "prop-types";
import {
    LineChart as Chart,
    Line,
    XAxis,
    ReferenceLine,
    ResponsiveContainer
} from "recharts";
import _ from "underscore";
import Spinner from "../../general/Spinner";

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
 * @param {string} [highlightColor]
 *     Color of the currently highlighted range.
 * @param {array} highlightRange
 *     Start and end indexes of data to be highlighted eg: [3, 5].
 * @param {array} [legend]
 *     Array of objects to assiciate labels and ids.
 * @param {array} [lineColors]
 *     Array of objects of colors and ids.
 * @param {function} [onHoverDataPoint]
 *     Callback triggered when the mouse moves over a new data point.
 * @param {string} [refrenceLabelColor]
 *     Color of the scrubbing bar label.
 * @param {string} [refrenceLineColor]
 *     Color of the scrubbing bar line.
 * @param {boolean} [showHighLight=false]
 *     If a range highlight should be shown.
 * @param {string} [width]
 *     Width of the chart.
 */
export default class LineChart extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        data: PropTypes.array,
        errorMessage: PropTypes.string,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        highlightColor: PropTypes.string,
        highlightRange: PropTypes.arrayOf(PropTypes.number),
        legend: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                id: PropTypes.string,
            })
        ),
        lineColors: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            color: PropTypes.string
        })),
        loadingMessage: PropTypes.string,
        onHoverDataPoint: PropTypes.func,
        referenceLineColor: PropTypes.string,
        referenceLabelColor: PropTypes.string,
        showHighlight: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
        "data-id": "line-chart",
        data: [],
        height: "100%",
        highlightColor: "#5DA4EC",
        highlightRange: [],
        legend: [],
        lineColor: ["#193867"],
        onHoverDataPoint: _.noop,
        referenceLineColor: "#57A0EA",
        referenceLabelColor: "#676D74",
        showHighlight: false,
        width: "100%",
    };

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
            this._renderLine(id, this.props.lineColors.find(c => c.id === id).color)
        );

    _renderHighlight = (legend, colors) => {
        const {
            highlightRange,
            data,
            highlightColor,
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
                                        stopColor={highlightColor}
                                        key="2"
                                    />,
                                    <stop
                                        offset={
                                            // % of data before second highlight element
                                            `${Math.max(
                                                0, Math.ceil(highlightRange[1] / (data.length - 1) * 100)
                                            )}%`
                                        }
                                        stopColor={highlightColor}
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
            referenceLineColor,
            referenceLabelColor,
        } = this.props;

        const selected = data[this.state.activeTooltipIndex];

        return (
            <ReferenceLine
                x={selected ? selected.label : null}
                stroke={referenceLineColor}
                position="start"
                label={{
                    position: "top",
                    value: selected ? selected.label : null,
                    fill: referenceLabelColor,
                    fontSize: 14,
                }}
            />
        );
    }

    render() {
        const {
            className,
            "data-id": dataId,
            layout,
            width,
            height,
            data,
            showHighlight,
        } = this.props;

        const noCustomState = !this.props.errorMessage && !this.props.loadingMessage;

        return [
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
                    data={this._digestData(data, this.props.legend)}
                    onMouseMove={this._onHoverDataPoint}
                    margin={{
                        top: 20, right: 30, left: 30, bottom: 5,
                    }}
                >
                    {
                        // Show data if not error/loading
                        noCustomState
                            ? this._renderData(this.props.legend)
                            : null
                    }
                    {
                        // Show highlight if prop is enabled and no error/loading
                        noCustomState &&
                        showHighlight
                            ? this._renderHighlight(this.props.legend, this.props.lineColors)
                            : null
                    }
                    <XAxis dataKey="name" hide={true} />
                    {
                        // Render RefLine if no error/loading and there is data
                        noCustomState &&
                        data.length > 0 &&
                        this._renderReferenceLine()
                    }
                </Chart>
            </ResponsiveContainer>,
            (
                this.props.errorMessage ? (
                    <div className="line-chart__error" key="error">
                        {this.props.errorMessage}
                    </div>
                ) : null
            ),
            (
                this.props.loadingMessage ? (
                    <div className="line-chart__loading" key="loading">
                        <Spinner
                            show={true}
                            defaultText={this.props.loadingMessage}
                        />
                        <div className="line-chart__loading-text">
                            {this.props.loadingMessage}
                        </div>
                    </div>
                ) : null
            )
        ];
    }
}
