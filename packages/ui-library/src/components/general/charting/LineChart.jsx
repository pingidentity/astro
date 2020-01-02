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
import uuid from "uuid";

/**
 * @class LineChart
 * @desc Plot data points on a graph with a scrubber.
 *
 * @param {array} data
 *     Array of objects with names and values for the data.
 * @param {string} [dataKey="name"]
 *     Key of the value for the names in the dataset.
 * @param {string} [dataValue="value"]
 *     Key of the value for the values in the dataset.
 * @param {string} [data-id="line-chart"]
 *     The data-id assigned to the top-most container of the component.
 * @param {string} [highlightColor]
 *     Color of the currently highlighted range.
 * @param {array} highlightRange
 *     Start and end indexes of data to be highlighted eg: [3, 5].
 * @param {string} [lineColor]
 *     Color of the line.
 * @param {function} [onHoverDataPoint]
 *     Callback triggered when the mouse moves over a new data point.
 * @param {string} [refrenceLabelColor]
 *     Color of the scrubbing bar label.
 * @param {string} [refrenceLineColor]
 *     Color of the scrubbing bar line.
 * @param {boolean} [showHighLight=false]
 *     If a range highlight should be shown.
 */
export default class LineChart extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        data: PropTypes.array,
        dataKey: PropTypes.string,
        dataValue: PropTypes.string,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        highlightColor: PropTypes.string,
        highlightRange: PropTypes.arrayOf(PropTypes.number),
        lineColor: PropTypes.string,
        onHoverDataPoint: PropTypes.func,
        referenceLineColor: PropTypes.string,
        referenceLabelColor: PropTypes.string,
        showHighlight: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
        "data-id": "line-chart",
        data: [],
        dataKey: "name",
        dataValue: "value",
        height: "100%",
        highlightColor: "#5DA4EC",
        highlightRange: [],
        lineColor: "#193867",
        onHoverDataPoint: _.noop,
        referenceLineColor: "#57A0EA",
        referenceLabelColor: "#676D74",
        showHighlight: false,
    };

    // Used to prevent unnecessary updates when the mouse moves
    mouseLockout = false;
    colorDefUUID = uuid.v4();

    state = {
        activeTooltipIndex: null,
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

    _renderData = (data) => data.map((item) => {
        return (
            <Line
                stroke={this.props.showHighlight ? `url(#${this.colorDefUUID})` : this.props.lineColor}
                strokeWidth={2}
                dataKey={this.props.dataValue}
                dot={false}
                key={item.name}
                isAnimationActive={false}
            />
        );
    });

    render() {
        const selected = this.props.data[this.state.activeTooltipIndex];
        const {
            className,
            "data-id": dataId,
            layout,
            width,
            height,
            data,
            showHighlight,
            highlightRange,
            lineColor,
            highlightColor,
            dataKey,
            referenceLineColor,
            referenceLabelColor,
        } = this.props;

        return (
            <ResponsiveContainer
                className={className}
                height={height}
                width={width}
            >
                <Chart
                    className="line-chart"
                    data-id={dataId}
                    layout={layout}
                    data={data}
                    onMouseMove={this._onHoverDataPoint}
                    margin={{
                        top: 20, right: 30, left: 30, bottom: 5,
                    }}
                >
                    { this._renderData(data) }
                    { showHighlight ? (
                        <defs>
                            <linearGradient id={this.colorDefUUID} x1="0%" y1="0%" x2="100%" y2="0%">
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
                                                        0, Math.ceil(highlightRange[1] / (data.length-1) * 100)
                                                    )}%`
                                                }
                                                stopColor={highlightColor}
                                                key="3"
                                            />,
                                            <stop
                                                offset={
                                                    // % of data before second highlight element
                                                    `${Math.max(
                                                        0, Math.ceil(highlightRange[1] / (data.length-1) * 100)
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
                    ) : null }
                    <XAxis dataKey={dataKey} hide={true} />
                    {data.length > 0 &&
                        <ReferenceLine
                            x={selected ? selected.name : null}
                            stroke={referenceLineColor}
                            position="start"
                            label={{
                                position: "top",
                                value: selected ? selected.name : null,
                                fill: referenceLabelColor,
                                fontSize: 14,
                            }}
                        />
                    }
                </Chart>
            </ResponsiveContainer>
        );
    }
}
