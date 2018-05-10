import React from "react";
import PropTypes from "prop-types";
import RockerButton from "../../../components/forms/RockerButton";
import { BarChart, XAxis, Tooltip, Bar } from "recharts";
import _ from "underscore";


/**
* @class HeroChart
* @desc A charting component that renders a single full-width bar chart.  This chart contains two series, one above the
*    x-axis and one below. The data for both series must both contain all positive numbers.  A data range selector is
*    also shown.
*
* @param {string} [data-id="hero-chart"]
*     The data-id assigned to the top-most container of the component.
* @param {string} [bgImage]
*     A url to an image to display in the background of the component.
* @param {number} [chartWidth=800]
*     The width of the area containing the bar graph
* @param {number} [chartHeight=200]
*     The height of the area containing the bar graph including both series of data and the x-axis labels
* @param {array} data
*     An array of objects containing the data for both the top and bottom series of data.
* @param {object} rockerButtonProps
*     An object containing the props passed to the range-selector RockerButton component

* @param {string} greetingText
*    The text renderered in the upper-left of the component
* @param {string} titleText
*    The text renderered on the top of the text block above the bar chart
* @param {string} subtitleText
*    The smaller text renderered in the bottom of the text block above the bar chart
* @param {string} totalValue
*    The large text renderered in the middle of the text block above the bar chart

* @param {string} topSeriesKey
*     An object containing the object key and color of the top series data contained in the "data" prop.
* @param {string} bottomSeriesKey
*     An object containing the object key and color of the bottom series data contained in the "data" prop.
* @param {string} xAxisKey
*     The object key of the x-axis data contained in the "data" prop
*/

const _renderBars = (key, color) => {
    return (
        <Bar
            key={"bar-" + key}
            dataKey={key}
            name={key}
            fill={color}
            isAnimationActive={false}
        />
    );
};

const _renderXAxis = (xAxisKey) => {
    return (
        <XAxis
            axisLine={false}
            dataKey={xAxisKey}
            domain={["dataMin", "dataMax"]}
            dy={4}
            stroke={"rgba(255, 255, 255, 0.9)"}
            tick={{ fontSize: 15 }}
            tickLine={false}
            height={30}
        />
    );
};

const _getSeriesMax = (data, series) => {
    return _.max(data, function (item) { return item[series]; })[series];
};
const HeroChart = ({
        "data-id": dataId,
        bgImage,
        bottomSeriesKey,
        data,
        chartHeight,
        chartWidth,
        greetingText,
        onValueChange,
        rockerButtonProps,
        subtitleText,
        titleText,
        tooltipBottomLabel,
        tooltipTopLabel,
        topSeriesKey,
        totalValue,
        xAxisKey,
    }) => {

    const rockerButtonDefaults = {
        "data-id": `${dataId}-range-selector`,
        className: "rocker-button--chart-rocker hero-chart__rocker",
        stateless: false,
        labels: ["1D", "1W", "1M", "3M"],
        onValueChange: onValueChange,
    };

    const xAxisHeight = 30;
    const topSeriesMax = _getSeriesMax(data, topSeriesKey) - xAxisHeight; // x-axis is part-of/included-in the top chart
    const botSeriesMax = _getSeriesMax(data, bottomSeriesKey);

    const topChartPercent = topSeriesMax / (topSeriesMax + botSeriesMax);
    const botChartPercent = 1 - topChartPercent;

    const topChartHeight = Math.round(topChartPercent * chartHeight);
    const botChartHeight = Math.round(botChartPercent * chartHeight);
    const chartProps = {
        barCategoryGap: 7,
        data: data,
        width: chartWidth,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    };
    const tooltipProps = {
        cursor: {
            fill: "transparent",
            fillOpacity: "0",
            color: "#fff",
        },
        isAnimationActive: false,
        animationDuration: 100,
        wrapperStyle: {
            backgroundColor: "#fff",
            borderRadius: "2px",
            borderWidth: 0,
            padding: "10px",
        },
        content: <CustomTooltip
            bottomSeriesKey={bottomSeriesKey}
            topSeriesKey={topSeriesKey}
            tooltipTopLabel={tooltipTopLabel}
            tooltipBottomLabel={tooltipBottomLabel}
        />,
        offset: -55,
    };

    const heroStyles = { backgroundImage: bgImage ? `url("${bgImage}")` : null };

    return (
        <div data-id={dataId} className="hero-chart" style={heroStyles}>
            <div className="hero-chart__greeting">{greetingText}</div>
            <div className="hero-chart__center-text">
                <div className="hero-chart__title">{titleText}</div>
                <div className="hero-chart__total">{totalValue}</div>
                <div className="hero-chart__subtitle">{subtitleText}</div>
            </div>
            <div className="hero-chart__top-chart">
                <BarChart
                    {...chartProps}
                    data-id={`${dataId}-top-chart`}
                    height={topChartHeight}>
                    {_renderXAxis(xAxisKey)}
                    <Tooltip {...tooltipProps} />
                    {_renderBars(topSeriesKey, "#fff")}
                </BarChart>
            </div>
            <div className="hero-chart__bottom-chart">
                <BarChart
                    {...chartProps}
                    data-id={`${dataId}-bottom-chart`}
                    height={botChartHeight}>
                    <Tooltip {...tooltipProps} position={{ y: botChartHeight }} />
                    {_renderBars(bottomSeriesKey, "#ffa500")}
                </BarChart>
            </div>
            <RockerButton {...rockerButtonDefaults} {...rockerButtonProps} />
        </div>
    );
};

const CustomTooltip = (props) => {
    /* istanbul ignore next  */
    const payload = props.payload[0] && props.payload[0].payload;

    /* istanbul ignore next  */
    if (!payload) { return false; }

    /* istanbul ignore next  */
    return (
        <div className="hero-tooltip">
            <div>
                {payload[props.topSeriesKey].toLocaleString("en")} {props.tooltipTopLabel}
            </div>
            <div className="hero-tooltip__bottom-value">
                {payload[props.bottomSeriesKey].toLocaleString("en")} {props.tooltipBottomLabel}
            </div>
        </div>
    );
};

HeroChart.propTypes = {
    "data-id": PropTypes.string,
    bgImage: PropTypes.string,
    bottomSeriesKey: PropTypes.string,
    chartWidth: PropTypes.number,
    chartHeight: PropTypes.number,
    chartStatistic: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    data: PropTypes.array,
    rockerButtonProps: PropTypes.object,
    strings: PropTypes.object,
    topSeriesKey: PropTypes.string,
    xAxisKey: PropTypes.string,
};

HeroChart.defaultProps = {
    "data-id": "hero-chart",
    bgImage: "",
    chartWidth: 800,
    chartHeight: 200,
    onValueChange: _.noop,
    rockerButtonProps: {},
    xAxisKey: "id",
};

module.exports = HeroChart;
