import React, { createRef } from "react";
import PropTypes from "prop-types";
import {
    BarChart,
    Bar,
    XAxis,
    Cell,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
    CartesianGrid,
    YAxis
} from "recharts";
import _ from "underscore";
import classnames from "classnames";

import ChartLabel from "./ChartLabel";
import Color from "color";
import DashboardCardTitle from "./Cards/DashboardCardTitle";
import { LegendItem } from "./Legend";
import { defaultRender } from "../../../util/PropUtils";
import { getEvenLineCoords } from "../../../util/ChartingUtils";
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
 * @param {boolean} [lines=true]
 *     If true, chart will show horizontal lines.
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
        lines: PropTypes.bool,
        baseYAxisId: PropTypes.string,
        referenceLabelColor: PropTypes.string,
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
        lines: true,
        onClick: _.noop,
        onMouseOver: _.noop,
        onMouseOut: _.noop,
        baseYAxisId: "BASE_YAXIS_ID",
        referenceLabelColor: "#676e75",
        referenceLineColor: "#57A0EA",
        renderTooltip: defaultRender,
        stacked: true,
        width: "100%"
    };

    state = {
        selected: { x: null, y: null },
        refLineTranslate: 0,
    };

    _barChartRef = createRef();
    _lastChartWidth = 0;
    _tooltipRef = createRef();

    _digestData = (data) =>
        data.map(item => (
            {
                name: item.id,
                ...this.props.legend.reduce((b, key, index) => ({
                    ...b,
                    [index]: item.data.find(dataPoint => dataPoint.id === key.id).value,
                }), {})
            }
        ));

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
        this.setState({ selected: { x: null, y: null } });

        this.props.onMouseOut(e);
    }

    _handleMouseOver = (id) => (value, index, e) => {
        const data = {
            x: {
                index,
                label: value.name,
                location: value.x,
                width: value.width
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

    _generateYAxes = (legend) => {
        const yAxes = [];

        return legend.map(axis => {
            if (axis.yAxisId && !yAxes.includes(axis.yAxisId)) {
                yAxes.push(axis.yAxisId);
                return (<YAxis key={axis.yAxisId} yAxisId={axis.yAxisId} hide={true} />);
            } else if (!axis.yAxisId && !yAxes.includes(this.props.baseYAxisId)) {
                yAxes.push(this.props.baseYAxisId);
                return (<YAxis key={this.props.baseYAxisId} yAxisId={this.props.baseYAxisId} hide={true} />);
            }
        });
    };

    _renderTooltip = () => {
        if (!this.state.selected.y) {
            return;
        }

        const valueByX = this.props.data.find(o => o.id === this.state.selected.x.label);
        const valueByY = valueByX ? valueByX.data.find(o => o.id === this.state.selected.y.label) : null;
        const legendItem = [...this.props.legend].reverse()[this.state.selected.y.index];

        // Check to see if this.props.data has selected bar's info to show
        if (!valueByY || !legendItem) { return; }

        const data = {
            color: legendItem.color,
            x: this.state.selected.x,
            y: this.state.selected.y,
            value: valueByY.value
        };

        return (
            <div className="column-chart__tooltip" ref={this._tooltipRef}>
                {this.props.renderTooltip(data, LegendItem)}
            </div>
        );
    };

    _getYAxisId = (selectedY) => {
        const selectedYItem =
            selectedY !== null
                ? this.props.legend.find(({ id }) => selectedY.label === id)
                : null;
        return selectedYItem
            ? selectedYItem.yAxisId
            : this.props.baseYAxisId;
    }

    _labelTranslate = 0;

    render() {
        const {
            data,
            errorMessage,
            legend,
            loadingMessage,
            "data-id": dataId,
            lines,
            referenceLabelColor,
            baseYAxisId
        } = this.props;

        const digestedData = this._digestData(data);

        const hasCustomState = errorMessage !== undefined || loadingMessage !== undefined;

        const horizontalPoints = getEvenLineCoords(this.props.height);

        const {
            x: selectedX,
            y: selectedY,
        } = this.state.selected;

        // Have to do all of this to figure out if the tooltip would go outside the container.
        // If that happens normally, the tooltip will jump to a pretty random spot.
        this._lastChartWidth = this._barChartRef.current ? this._barChartRef.current.props.width : this._lastChartWidth;
        const tooltipWidth = this._tooltipRef.current ? this._tooltipRef.current.getBoundingClientRect().width : 150;
        const tooltipOverflow = (selectedX ? selectedX.location : 0) + (tooltipWidth / 2) - this._lastChartWidth;
        const tooltipOffset = tooltipOverflow > 0
            ? (this.state.refLineTranslate - tooltipOverflow)
            : this.state.refLineTranslate + 5;

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
                        ref={this._barChartRef}
                    >
                        <XAxis dataKey="name" hide={true} />
                        {this._generateYAxes(legend)}

                        {lines
                            ? <CartesianGrid
                                vertical={false}
                                horizontalPoints={horizontalPoints}
                            />
                            : null
                        }
                        <Tooltip
                            content={this._renderTooltip}
                            cursor={false}
                            offset={tooltipOffset}
                        />
                        { !hasCustomState && legend.map(({ id, label, color, yAxisId = baseYAxisId }, index) => {
                            return (
                                <Bar
                                    label={label ? label : id}
                                    yAxisId={yAxisId}
                                    dataKey={index}
                                    key={id}
                                    stackId={this.props.stacked ? "a" : id}
                                    maxBarSize={60}
                                    background ={!this.props.stacked && { fillOpacity: 0, strokeOpacity: 0 }} //empty background so we can hover on whole row
                                    onClick={this._handleClick(id)}
                                    onMouseOver={this._handleMouseOver(id)}
                                    onMouseOut={this._handleMouseOut}
                                    radius={
                                        index === legend.length - 1 ||
                                        !this.props.stacked ||
                                        legend.findIndex(legendItem => Object.keys(legendItem).includes("yAxisId")) > -1
                                            ? [3, 3, 0, 0]
                                            : null
                                    }
                                >
                                    {
                                        digestedData.map((item) => {
                                            return (
                                                <Cell
                                                    key={item.name}
                                                    style={{
                                                        stroke: selectedX &&
                                                        selectedX.label === item.name &&
                                                        selectedY.label === id
                                                            ? Color(color).lighten(0.5)
                                                            : color
                                                    }}
                                                    strokeWidth= "1px"
                                                    fill={color}
                                                />
                                            );})}
                                </Bar>
                            );})}

                        {legend.length > 0 && !hasCustomState && selectedX &&
                            <ReferenceLine
                                x={selectedX.label}
                                yAxisId={this._getYAxisId(selectedY)}
                                stroke={this.props.referenceLineColor}
                                label={({ viewBox }) => {
                                    // This is awful and I am sorry. It's the only way to find the x coordinate
                                    // of the reference line/tooltip.
                                    const ref = 0 - (viewBox.x - selectedX.location - (selectedX.width / 2));
                                    if (this.state.refLineTranslate !== ref) {
                                        this.setState({ refLineTranslate: ref });
                                    }
                                    return (<ChartLabel
                                        chartWidth={this._lastChartWidth}
                                        color={referenceLabelColor}
                                        label={selectedX.label}
                                        x={selectedX.location + (selectedX.width / 2)}
                                        y={viewBox.y}
                                    />);
                                }}
                                transform={`translate(${this.state.refLineTranslate}, 0)`}
                                className="column-chart__line"
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
