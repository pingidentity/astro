import React from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts";
import DashboardColors from "./Cards/dashboardColors";
import DashboardCard from "./Cards/DashboardCard";
import DashboardCardList from "./Cards/DashboardCardList";
import RockerButton from "../../forms/RockerButton";
import DashboardCardTitle from "./Cards/DashboardCardTitle";

import classnames from "classnames";
import _ from "underscore";

/**
 * @class StatAreaCard
 * @desc A card that displays area chart and can be flipped to display data list.
 * @param {array} [data-id="stat-area-card"]
 *    The data-id attribute applied to the top-level container
 * @param {string} [className]
 *    Custom class name(s) applied to the top-level container
 * @param {boolean} [loading=false]
 *    When true the splinner animation shows in place of the stats
 * @param {string} [errorMessage]
 *     When provided, the error message and icon will display in place of the regular front/back content.
 * @param {string} [makeDefaultLabel]
 *    The label displayed next to the make-default checkbox
 * @param {function} [onMakeDefault]
 *    Callback triggered when the make-default checkbox is changed.  When provided a checkbox will render on the back
 *    of the card.
 * @param {boolean} [flipped]
 *    If provided, whether or not the card is flipped. If not provided, the component maintains its own state
 * @param {function} [onFlip]
 *    Callback triggered when card is flipped
 * @param {number|string} [accent=blue]
 *    Index of the accent color for this stat card. There are three (0-2) options.
 * @param {string} [subtitle]
 *    Subtitle of the card. Displayed on the front of the card below the title and value.
 * @param {string} [title]
 *    Title of the card. Displayed at top of front and back
 * @param {string} [value]
 *    The single value shown on the front of the card
 * @param {string} [terminateLabel]
 *     Message for terminate line on the chart
 * @param {string} [xAxisKey=id]
 *    The object property can be associated other data in the object and can be used to pass additional information in
 *    in the onMouseOver callback.
 * @param {string} [yAxisKey=value]
 *    The object property that contains the y-axis data in the "data" prop
 * @param {array} [data=[]]
 *    A list of objects that provides the data for the chart
 * @param {array} [listData]
 *    A list of objects that renders as a list of labels and values on the back of the card
 * @param {function} [onMouseOver]
 *    Callback triggered when a chart data-point is hovered over
 * @param {function} [onMouseOver]
 *    Callback triggered when a chart data-point is hovered out
 * @param {boolean} [isNoData=false]
 *    If true card displays placeholder chart
 * @param {array} [noDataData]
 *    If true card displays placeholder chart
 * @param {string|element|array} [noDataSubtitle]
 *    Subtitle for No Data chart
 * @param {string|element|array} [noDataMessage]
 *    Message under No Data chart
 * @param {object} [rockerButtonProps]
 *     An optional object containing the props passed to the range-selector RockerButton component. This may be used
 *     to have greater control over the chart range selector.
 * @param {function} [onRangeChange]
 *    Callback triggered for new range click.
 */

const NO_DATA_DATA =[
    { id: 1, value: 0 },
    { id: 2, value: 1 },
    { id: 3, value: 2 },
    { id: 4, value: 3 },
    { id: 5, value: 5 },
    { id: 6, value: 8 },
    { id: 7, value: 12 },
    { id: 8, value: 13 },
    { id: 9, value: 13 },
    { id: 10, value: 14 },
    { id: 11, value: 18 },
    { id: 12, value: 20 },
    { id: 13, value: 23 },
    { id: 14, value: 24 },
    { id: 15, value: 16 },
    { id: 16, value: 25 },
    { id: 17, value: 25 },
    { id: 18, value: 26 },
    { id: 19, value: 28 },
    { id: 20, value: 30 },
    { id: 21, value: 31 },
    { id: 22, value: 32 },
    { id: 23, value: 32 },
    { id: 24, value: 33 },
    { id: 25, value: 34 },
    { id: 26, value: 30 },
    { id: 27, value: 32 },
    { id: 28, value: 34 },
    { id: 29, value: 33 },
    { id: 30, value: 29 },
];

class StatAreaCard extends React.Component {
    static displayName = "StatAreaCard";

    static propTypes = {
        "data-id": PropTypes.string,
        loading: PropTypes.bool,
        flipped: PropTypes.bool,
        errorMessage: PropTypes.string,
        makeDefaultLabel: PropTypes.string,
        className: PropTypes.string,
        accent: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        title: PropTypes.string,
        subtitle: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ])
        })),
        listData: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ])
        })),
        onFlip: PropTypes.func,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        onMakeDefault: PropTypes.func,
        rockerButtonProps: PropTypes.object,
        onRangeChange: PropTypes.func,
        isNoData: PropTypes.bool,
        noDataData: PropTypes.array,
        noDataSubtitle: PropTypes.string,
        noDataMessage: PropTypes.string,
        xAxisKey: PropTypes.string,
        yAxisKey: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "stat-area-card",
        accent: "blue",
        data: [],
        xAxisKey: "id",
        yAxisKey: "value",
        listData: [],
        onFlip: _.noop,
        onMouseOver: _.noop,
        onMouseOut: _.noop,
        onRangeChange: _.noop,
        isNoData: false,
        rockerButtonProps: {},
    };

    lastHover = null;

    _onMouseOver = _.debounce((data) => {
        if (!_.isEqual(data, this.lastHover)) {
            this.props.onMouseOver(data.value, data.id);
            this.lastHover = data;
        }
    }, 10);

    _onMouseOut = _.debounce(() => {
        if (this.lastHover !== null) {
            this.props.onMouseOut();
            this.lastHover = null;
        }
    }, 10);

    _getFrontTitle = () => {
        return <DashboardCardTitle className="stat-area-card__front-title" title={this.props.title} />;
    }

    _getChartWithData = () => {
        const hexColor = DashboardColors.COLORS[DashboardColors.getKey(this.props.accent)];
        const rockerButtonDefaults = {
            "data-id": `${this.props["data-id"]}-range-selector`,
            className: classnames(
                "dashboard-card__range-selector",
                "stat-area-card__range-selector"
            ),
            stateless: false,
            type: RockerButton.rockerTypes.CHART_SMALL,
            labels: [],
            selected: this.props.selected,
            onValueChange: this.props.onRangeChange,
            disabled: this.props.isNoData
        };
        const rockerButton = this.props.rockerButtonProps
            ? (
                <RockerButton
                    {...rockerButtonDefaults}
                    {...this.props.rockerButtonProps}
                />
            )
            : null;
        const referenceLineIndex = this.props.data[0] && !_.isNumber(this.props.data[0][this.props.yAxisKey])
            ? _.findIndex(this.props.data, point => _.isNumber(point[this.props.yAxisKey]))
            : null;

        return (
            <div>
                {this._getFrontTitle()}
                <div className="stat-area-card__value">{this.props.value}</div>
                <div className="dashboard-card__subtitle">{this.props.subtitle}</div>
                <ResponsiveContainer
                    className="stat-area-card__chart"
                    width="100%"
                    height={80}
                >
                    <AreaChart
                        data={this.props.data}
                        margin={{
                            top: 3,
                            right: 15,
                            left: referenceLineIndex ? 25 : 15
                        }}
                    >
                        <Area
                            connectNulls={false}
                            dataKey={this.props.yAxisKey}
                            fill={hexColor}
                            stroke={hexColor}
                            fillOpacity={1}
                            legendType="none"
                            isAnimationActive={false}
                        />
                        {
                            _.isNumber(referenceLineIndex) &&
                            <ReferenceLine
                                x={referenceLineIndex}
                                style={{ transform: "translateX(-10px)" }}
                                stroke="#686f77"
                                strokeDasharray="3 3"
                                label={{
                                    value: this.props.terminateLabel,
                                    fontSize: "10px",
                                    angle: -90,
                                    dx: -20
                                }}
                            />
                        }
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={false}
                            onMouseOver={this._onMouseOver}
                            onMouseOut={this._onMouseOut}
                            xAxisKey={this.props.xAxisKey}
                            yAxisKey={this.props.yAxisKey}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                {rockerButton}
            </div>
        );
    }
    _getChartWithoutData = () => {
        const noDataData = _.isEmpty(this.props.noDataData)
            ? _.map(NO_DATA_DATA, point => ({
                [this.props.xAxisKey]: point.id,
                [this.props.yAxisKey]: point.value,
            }))
            : this.props.noDataData;

        return (
            <div>
                {this._getFrontTitle()}
                {
                    this.props.noDataSubtitle &&
                    <div className="dashboard-card__subtitle">
                        {this.props.noDataSubtitle}
                    </div>
                }
                {
                    this.props.noDataMessage &&
                    <div className="stat-area-card__no-data-message">
                        {this.props.noDataMessage}
                    </div>
                }
                <ResponsiveContainer
                    className="stat-area-card__chart"
                    width="100%"
                    height={100}
                >
                    <AreaChart
                        data={noDataData}
                        margin={{ right: 15, left: 15 }}
                    >
                        <Area
                            connectNulls={false}
                            dataKey={this.props.yAxisKey}
                            fill="#e8ebed"
                            fillOpacity={0.8}
                            stroke="none"
                            legendType="none"
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }

    _getChart = () => {
        return this.props.isNoData
            ? this._getChartWithoutData()
            : this._getChartWithData();
    }

    _getFront = () => {
        return this.props.loading
            ? this._getFrontTitle()
            : this._getChart();
    }

    _getBack = () => {
        return (
            <div>
                <DashboardCardTitle backTitle title={this.props.title} />
                {!this.props.loading && <DashboardCardList data={this.props.listData} />}
            </div>
        );
    }

    render() {
        return (
            <DashboardCard
                {...this.props}
                className={classnames("stat-area-card", this.props.className)}
                front={this._getFront()}
                back={this._getBack()}
            />
        );
    }

}

// No tooltip is displayed. This code is used only to trigger an onMouseOver event.
const CustomTooltip = ({
    onMouseOver,
    onMouseOut,
    active,
    payload: [
        { payload } = {}
    ],
    xAxisKey,
    yAxisKey
}) => {
    if (payload && onMouseOver) {
        onMouseOver({
            value: _.has(payload, yAxisKey) && payload[yAxisKey],
            id: _.has(payload, xAxisKey) && payload[xAxisKey]
        });
    }

    if (!active && onMouseOut) {
        /* istanbul ignore next */
        onMouseOut();
    }
    return null;
};

StatAreaCard.CustomTooltip = CustomTooltip;
export default StatAreaCard;
