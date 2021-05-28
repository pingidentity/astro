import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import { ResponsiveContainer, BarChart, XAxis, Tooltip, Bar, Cell, YAxis } from "recharts";
import RockerButton from "../../forms/RockerButton";
import PageSpinner from "../../general/PageSpinner";

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
* @param {string} [errorMessage]
*     When provided, the error message and icon will display in place of the chart and center text.
* @param {string} greeting
*     The text renderered in the upper-left of the component
* @param {boolean} [loading=false]
*     When true the splinner animation shows in place of the charts
* @param {string} [loadingMessage]
*     The optional text to display below the loading spinner
* @param {object} onValueChange
*     The function called whenever the date range changes
* @param {object} [rockerButtonProps]
*     An optional object containing the props passed to the range-selector RockerButton component. This may be used
*     to have greater control over the chart range selector.
* @param {string} selected
*     A string containing the id of the currently selected date range
* @param {string} subtitle
*    The smaller text renderered in the bottom of the text block above the bar chart
* @param {string} subtitleText
*    DEPRECATED. Use "subtitle" instead.
* @param {string} title
*    The text renderered on the top of the text block above the bar chart
* @param {string} titleText
*    DEPRECATED. Use "title" instead.
* @param {string} tooltipBottomLabel
*    The text renderered in each tooltip next to the bottom series data value
* @param {string} tooltipTopLabel
*    The text renderered in each tooltip next to the top series data value
* @param {string} value
*    The large text renderered in the middle of the text block above the bar chart
* @param {string} totalValue
*    DEPRECATED. Use "value" instead.
* @param {string} topSeriesKey
*    An object containing the object key and color of the top series data contained in the "data" prop.
* @param {string} bottomSeriesKey
*    An object containing the object key and color of the bottom series data contained in the "data" prop.
* @param {string} xAxisKey
*    The object property that contains the x-axis data in the "data" prop
*/

const xAxisHeight = 30;
const botChartOffset = 10;

const CustomTooltip = (props) => {
    /* istanbul ignore next  */
    const payload = props.payload[0] && props.payload[0].payload;

    /* istanbul ignore next  */
    if (!payload) { return false; }

    /* istanbul ignore next  */
    if (!props.selected) { return false; }

    const tooltipTopLabel = payload.tooltipTopLabel || props.tooltipTopLabel;
    const tooltipBottomLabel = payload.tooltipBottomLabel || props.tooltipBottomLabel;

    /* istanbul ignore next  */
    return (
        <div style={{
            backgroundColor: "#fff",
            borderRadius: "2px",
            borderWidth: 0,
            padding: "10px",
        }}>
            <div className="hero-tooltip">
                <div>
                    {payload[props.topSeriesKey].toLocaleString("en")} {tooltipTopLabel}
                </div>
                <div className="hero-tooltip__bottom-value">
                    {payload[props.bottomSeriesKey].toLocaleString("en")} {tooltipBottomLabel}
                </div>
            </div>
        </div>
    );
};

export default class HeroChart extends Component {

    state = {
        barSelected: null,
        isGreetingHidden: false
    };

    componentDidMount() {
        this._handleResize();
        window.addEventListener("resize", this._handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._handleResize);
    }

    _handleResize = _.debounce(() => {
        const greetingElement = ReactDOM.findDOMNode(this._greeting);
        const titleElement = ReactDOM.findDOMNode(this._title);
        // +60px to width described in the requirements
        const greetingWidth = greetingElement && (greetingElement.clientWidth + greetingElement.offsetLeft + 60);
        const titleOffsetLeft = titleElement.offsetLeft;

        this.setState({ isGreetingHidden: greetingWidth >= titleOffsetLeft });
    }, 100);

    _handleBarMouseOver = (key, index) => () => {
        this.setState({ barSelected: `${key}-${index}` });
    }

    _handleBarMouseOut = () => {
        this.setState({ barSelected: null });
    }

    _renderBars = (data, key, color) => {

        const getOpacity = (index) => this.props.isAstro
            ? this.state.barSelected === `${key}-${index}` ? 0.6 : 1
            : this.state.barSelected === `${key}-${index}` ? 1 : 0.6;
        return (
            <Bar
                key={"bar-" + key}
                dataKey={key}
                name={key}
                isAnimationActive={false}
                minPointSize={5}
                background={{ fill: "transparent" }}
            >
                {data.map((entry, index) => (
                    <Cell
                        onMouseOver={this._handleBarMouseOver(key, index)}
                        onMouseOut={this._handleBarMouseOut}
                        cursor="pointer"
                        fill={color}
                        style={{
                            opacity: getOpacity(index)
                        }}
                        key={`cell-${index}`}
                    />
                ))}
            </Bar>
        );
    };

    _renderXAxis = (xAxisKey, numDataPoints) => {

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
                axisLine={false}
                dataKey={xAxisKey}
                domain={["dataMin", "dataMax"]}
                dy={4}
                stroke={this.props.isAstro ? "#515F6B" : "rgba(255, 255, 255, 0.9)"}
                tick={{ fontSize: fontSize }}
                tickLine={false}
                height={xAxisHeight}
                interval={0}
            />
        );
    };

    _getSeriesMax = (data, series) => {
        return _.max(data, function (item) { return item[series]; })[series];
    };

    render() {
        const {
            "data-id": dataId,
            bgImage,
            bottomSeriesKey,
            data,
            chartHeight,
            chartWidth,
            errorMessage,
            greeting,
            loading,
            loadingMessage,
            onValueChange,
            rockerButtonProps,
            selected,
            subtitle,
            subtitleText,
            title,
            titleText,
            tooltipBottomLabel,
            tooltipTopLabel,
            topSeriesKey,
            totalValue,
            value,
            xAxisKey,
            isAstro,
        } = this.props;

        const labels = ["1D", "1W", "1M", "3M"];

        const rockerButtonDefaults = {
            "data-id": `${dataId}-range-selector`,
            className: "hero-chart__rocker",
            type: RockerButton.rockerTypes.CHART,
            labels,
            onValueChange: onValueChange,
            initialState: {
                selected: labels.indexOf(selected),
            }
        };

        const topSeriesMax = this._getSeriesMax(data, topSeriesKey);
        const botSeriesMax = this._getSeriesMax(data, bottomSeriesKey);

        const topChartPercent = topSeriesMax / (topSeriesMax + botSeriesMax);
        const botChartPercent = 1 - topChartPercent;

        const hMinusX = chartHeight - xAxisHeight;
        const topChartHeight = (Math.round(topChartPercent * hMinusX) + xAxisHeight) || 0;
        const botChartHeight = (Math.round(botChartPercent * hMinusX)) || 0;

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
            content: <CustomTooltip
                bottomSeriesKey={bottomSeriesKey}
                topSeriesKey={topSeriesKey}
                tooltipTopLabel={tooltipTopLabel}
                tooltipBottomLabel={tooltipBottomLabel}
            />,
            offset: -55,
        };

        const heroStyles = { backgroundImage: bgImage ? `url("${bgImage}")` : null };
        const greetingClassNames = classnames(
            "hero-chart__greeting",
            { "hero-chart__greeting--hidden": this.state.isGreetingHidden }
        );


        const topColor = isAstro ? "#3C5080" : "#fff";
        const bottomColor = isAstro ? "rgba(163, 19, 0, 0.6)": "#ffa500";

        return (
            <div data-id={dataId}
                className={classnames("hero-chart", { "hero-chart--astro": isAstro })}
                style={heroStyles}
            >
                {greeting && <div className={greetingClassNames} ref={node => this._greeting = node}>{greeting}</div>}
                {!errorMessage &&
                    <div key="center-text" className="hero-chart__center-text">
                        <div className="hero-chart__title" ref={node => this._title = node}>{title || titleText}</div>
                        <div className="hero-chart__value">{value || totalValue}</div>
                        <div className="hero-chart__subtitle">{subtitle || subtitleText}</div>
                    </div>
                }
                {!errorMessage && !loading && [
                    <ResponsiveContainer
                        key="top-chart"
                        className="hero-chart__top-chart"
                        height={topChartHeight}
                        width="100%"
                    >
                        <BarChart
                            {...chartProps}
                            data-id={`${dataId}-top-chart`}
                            height={topChartHeight}
                        >
                            {this._renderXAxis(xAxisKey, data.length)}
                            <Tooltip
                                {...tooltipProps}
                                position={{ y: -25 }}
                                selected={this.state.barSelected}
                            />
                            {this._renderBars(data, topSeriesKey, topColor)}
                        </BarChart>
                    </ResponsiveContainer>
                    ,
                    <ResponsiveContainer
                        key="bottom-chart"
                        className="hero-chart__bottom-chart"
                        height={botChartHeight + botChartOffset}
                        width="100%"
                    >
                        <BarChart
                            {...chartProps}
                            data-id={`${dataId}-bottom-chart`}
                            height={botChartHeight}
                            margin={{ bottom: botChartOffset }}
                        >
                            <YAxis reversed hide />
                            <Tooltip
                                {...tooltipProps}
                                position={{ y: botChartHeight }}
                                selected={this.state.barSelected}
                            />
                            {this._renderBars(data, bottomSeriesKey, bottomColor)}
                        </BarChart>
                    </ResponsiveContainer>
                ]}
                <RockerButton
                    key="range-selector"
                    {...rockerButtonDefaults}
                    {...rockerButtonProps}
                />
                {!errorMessage && loading &&
                    <PageSpinner className="hero-chart__loader" show>{loadingMessage}</PageSpinner>
                }
                {errorMessage &&
                    <div className="hero-chart__error">
                        <div className="icon-cogs hero-chart__error-icon" />
                        <div className="hero-chart__error-text">
                            {errorMessage}
                        </div>
                    </div>
                }
            </div>
        );
    }

    static propTypes = {
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
        errorMessage: PropTypes.string,
        loading: PropTypes.bool,
        loadingMessage: PropTypes.string,
        rockerButtonProps: PropTypes.object,
        selected: PropTypes.string,
        strings: PropTypes.object,
        topSeriesKey: PropTypes.string,
        xAxisKey: PropTypes.string,
        isAstro: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "hero-chart",
        bgImage: "",
        chartWidth: 800,
        chartHeight: 200,
        loading: false,
        onValueChange: _.noop,
        rockerButtonProps: {},
        xAxisKey: "id",
        isAstro: false,
    };
}
