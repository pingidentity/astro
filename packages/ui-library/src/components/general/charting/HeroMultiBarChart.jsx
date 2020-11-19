import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
    Cell,
    LabelList,
    Tooltip } from "recharts";
import ChartTitle from "./ChartTitle";
import PageSpinner from "../PageSpinner";
import Icon, { iconSizes } from "../Icon";
import Legend, {
    alignments as legendAlignments,
    boxAlignments,
} from "./Legend";
import Padding from "../../layout/Padding";

const SectionHoverHandler = ({ onChange, ...rest }) => {
    useEffect(() => {
        onChange(rest);
    },[rest.label, rest.active]);

    return null;
};

/**
* @class HeroMultiBarChart
* @desc A charting component that renders a single full-width bar chart. This chart contains multi bar chart.
*
* @param {string} [data-id="hero-multi-bar-chart"]
*     The data-id assigned to the top-most container of the component.
* @param {string} [bgImage]
*     A url to an image to display in the background of the component.
* @param {number} [chartWidth=800]
*     The width of the area containing the bar graph
* @param {number} [chartHeight=250]
*     The text renderered in the upper-left of the component
* @param {boolean} [loading=false]
*     When true the splinner animation shows in place of the charts
* @param {string} [loadingMessage="Loading..."]
*     The optional text to display below the loading spinner
* @param {string} [errorMessage]
*     When provided, the error message and icon will display in place of the chart and center text.
* @param {string} [xAxisKey="id"]
*    The object property that contains the x-axis data in the "data" prop
* @param {string} [title]
*    The value for chart title
* @param {string} [array]
*     The optional an array of objects containing the data for Legend component
* @param {array} data
*     An array of objects containing the data for multi series bar chart
* @param {aray} dataKeys
*    An object containing the keys for y-axis data in the "data" prop .
* @param {object} rockerButtonProps
*     An object containing the props passed to the range-selector RockerButton component
* @param {function} [labelFormater]
*     An optional prop with formater for tooltip label
* @param {function} [onBarMouseOver]
*     An optional prop with handler for bar mouse over
* @param {function} [onBarMouseOut]
*     An optional prop with handler for bar mouse out
*/

const labelHeight = 20;

export default class HeroMultiBarChart extends Component {

    static propTypes = {
        "data-id": PropTypes.string,
        bgImage: PropTypes.string,
        chartWidth: PropTypes.number,
        chartHeight: PropTypes.number,
        errorMessage: PropTypes.string,
        loading: PropTypes.bool,
        loadingMessage: PropTypes.string,
        title: PropTypes.string,
        legend: PropTypes.array,
        xAxisKey: PropTypes.string,
        data: PropTypes.array,
        dataKeys: PropTypes.array.isRequired,
        rockerButtonProps: PropTypes.object,
        onBarMouseOver: PropTypes.func,
        onBarMouseOut: PropTypes.func,
        onGroupSelectionChange: PropTypes.func,
    };

    static defaultProps = {
        "data-id": "hero-multi-bar-chart",
        bgImage: "",
        chartWidth: 800,
        chartHeight: 250,
        loading: false,
        loadingMessage: "Loading...",
        xAxisKey: "id",
        onBarMouseOver: _.noop,
        onBarMouseOut: _.noop,
        onGroupSelectionChange: _.noop,
    };

    state = {
        barSelected: null
    };

    _handleBarMouseOver = (key, index, entry) => () => {
        this.props.onBarMouseOver(key, index, entry);
        this.setState({ barSelected: { key, index, entry } });
    }

    _handleBarMouseOut = () => {
        this.props.onBarMouseOut();
        this.setState({ barSelected: null });
    }

    _kFormatter = (value) => Math.abs(value) > 999
        ? Math.sign(value) * ((Math.abs(value) / 1000).toFixed(1)) + "K"
        : Math.sign(value) * Math.abs(value);

    _renderXAxis = () => {
        const { xAxisKey, data } = this.props;
        const numDataPoints = data.length;
        // resize the font based on the number of datapoints (until we can find a more elegant fix)
        let fontSize = 15;

        if (numDataPoints > 25) {
            fontSize = 11;
        } else if (numDataPoints > 23) {
            fontSize = 12;
        } else if (numDataPoints > 21) {
            fontSize = 13;
        } else if (numDataPoints > 18) {
            fontSize = 14;
        }

        return (
            <XAxis
                minTickGap={10}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize }}
                stroke="rgba(255, 255, 255, 0.8)"
                dataKey={xAxisKey}
                domain={["dataMin", "dataMax"]}
                dy={4}
                padding={{ left: 30, right: 30 }}
            />
        );
    };

    _renderYAxis = () => {
        return (
            <YAxis
                axisLine={false}
                tickLine={false}
                stroke="rgba(255, 255, 255, 0.8)"
                tickCount={6}
                tickFormatter={this._kFormatter}
            />
        );
    }

    _renderHoverLabel = (props) => {
        const { labelFormater } = this.props;
        const { barSelected } = this.state;
        const { x, y, width, height, value, index, labelKey } = props;
        const middleWidth = x + width / 2;

        return barSelected && (index === barSelected.index) && (labelKey === barSelected.key)
            ? (
                <g>
                    <line x1={middleWidth} y1={labelHeight} x2={middleWidth} y2={y + height} stroke="#57A0EA" />
                    <text x={middleWidth} y={labelHeight/2} fill="#fff" textAnchor="middle" dominantBaseline="middle">
                        {labelFormater ? labelFormater(barSelected) : value }
                    </text>
                </g>
            )
            : null;
    };

    _renderBars = () => {
        const { data, dataKeys, dataKeysStyle } = this.props;
        const { barSelected } = this.state;

        return _.map(dataKeys, (key) => {
            return (
                <Bar
                    key={`bar-${key}`}
                    dataKey={key}
                    name={key}
                    isAnimationActive={false}
                    minPointSize={5}
                    background={{ fill: "transparent" }}
                >
                    {data.map((entry, index) => {
                        const isHovered = barSelected && barSelected.key === key && barSelected.index === index;
                        const color = _.get(dataKeysStyle, `${key}.color`)
                            ? _.get(dataKeysStyle, `${key}.color`)
                            : "#fff";
                        const hoverColor = _.get(dataKeysStyle, `${key}.hoverColor`)
                            ? _.get(dataKeysStyle, `${key}.hoverColor`)
                            : color;

                        return (
                            <Cell
                                key={`bar-${entry}-${index}`}
                                onMouseOver={this._handleBarMouseOver(key, index, entry)}
                                onMouseOut={this._handleBarMouseOut}
                                cursor="pointer"
                                fill={isHovered ? hoverColor : color}
                                style={{ opacity: isHovered && (hoverColor === color) ? 0.6 : 1 }}
                            />
                        );
                    })}
                    <LabelList
                        dataKey={key}
                        labelKey={key}
                        content={this._renderHoverLabel}
                    />
                </Bar>
            );
        });
    };

    render() {
        const {
            "data-id": dataId,
            bgImage,
            loading,
            loadingMessage,
            errorMessage,
            title,
            legend,
            rockerButton,
            data,
            chartHeight,
            chartWidth,
            onGroupSelectionChange,
        } = this.props;
        const heroStyles = { backgroundImage: bgImage ? `url("${bgImage}")` : null };

        return (
            <div data-id={dataId} className="hero-chart" style={heroStyles}>
                {
                    errorMessage &&
                    <div className="hero-chart__error">
                        <Icon iconName="cogs" iconSize={iconSizes.XXL} />
                        <div className="hero-chart__error-text">{errorMessage}</div>
                    </div>
                }
                {
                    !errorMessage && loading &&
                    <PageSpinner className="hero-chart__loader" show>{loadingMessage}</PageSpinner>
                }
                {
                    !errorMessage && !loading && [
                        <ChartTitle key="title" className="hero-chart__title" title={title} />,
                        <Padding key="legend" vertical="sm">
                            <Legend
                                alignment={legendAlignments.CENTER}
                                boxAlignment={boxAlignments.CENTER}
                                data={legend}
                            />
                        </Padding>,
                        <ResponsiveContainer
                            key="multi-bar-chart-container"
                            className="hero-chart__top-chart"
                            height={chartHeight}
                            width="100%"
                        >
                            <BarChart
                                data-id={`${dataId}-multi-bar-chart`}
                                data={data}
                                height={chartHeight}
                                width={chartWidth}
                                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                barGap="2"
                                barCategoryGap="30%"
                                margin={{ top: labelHeight }}
                            >
                                <CartesianGrid vertical={false} stroke="rgba(255, 255, 255, 0.4)" />

                                {/* tooltip is the only way for us to get any feedback when mousing over a group */}
                                <Tooltip
                                    cursor={false}
                                    content={<SectionHoverHandler onChange={onGroupSelectionChange} />} />
                                {this._renderYAxis()}
                                {this._renderXAxis()}
                                {this._renderBars()}

                            </BarChart>
                        </ResponsiveContainer>
                    ]
                }
                {rockerButton && <div className="hero-chart__rocker">{rockerButton}</div>}
            </div>
        );
    }
}
