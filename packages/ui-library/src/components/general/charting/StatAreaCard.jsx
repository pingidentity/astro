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
 * @param {boolean} [isNoData]
 *    If true card displays placeholder chart
 * @param {array} [noDataData]
 *    If true card displays placeholder chart
 * @param {string} [noDataSubtitle]
 *    Subtitle for No Data chart
 * @param {string|element|array} [noDataMessage]
 *    Message for No Data chart
 * @param {object} [rockerButtonProps]
 *     An optional object containing the props passed to the range-selector RockerButton component. This may be used
 *     to have greater control over the chart range selector.
 */

const NO_DATA_DATA =[
    { id: 1, value: 0 },
    { id: 2, value: 1 },
    { id: 3, value: 2 },
    { id: 4, value: 3 },
    { id: 5, value: 5 },
    { id: 6, value: 8 },
    { id: 7, value: 13 },
    { id: 8, value: 12 },
    { id: 9, value: 12 },
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
        isNoData: PropTypes.bool,
        noDataData: PropTypes.array,
        noDataSubtitle: PropTypes.string,
        noDataMessage: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.array,
        ]),
        xAxisKey: PropTypes.string,
        yAxisKey: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "stat-area-card",
        accent: "blue",
        data: [],
        xAxisKey: "id",
        yAxisKey: "value",
        terminateLabel: "NO DATA YET",
        listData: [],
        onFlip: _.noop,
        onMouseOver: _.noop,
        onMouseOut: _.noop,
        onValueChange: _.noop,
        isNoData: false,
        noDataData: NO_DATA_DATA,
        noDataSubtitle: "NOT DATA AVAIBLE",
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

    _getChart = () => {
        const hexColor = DashboardColors.COLORS[DashboardColors.getKey(this.props.accent)];
        const referenceLineIndex = !this.props.data[0][this.props.yAxisKey]
            ? _.findIndex(this.props.data, point => (point[this.props.yAxisKey]))
            : null;

        return [
            <div key="value" className="dashboard-card__value stat-area-card__value">
                {this.props.value}
            </div>,
            <div key="subtitle" className="dashboard-card__subtitle">
                {this.props.subtitle}
            </div>,
            <ResponsiveContainer
                key="area-chart-container"
                className="stat-area-card__chart"
                width="100%"
                height={80}
            >
                <AreaChart
                    data={this.props.data}
                    margin={{ right: 15, left: 15 }}
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
        ];
    }
    _getNoData = () => {
        const noDataMessage = this.props.noDataMessage
            ? (
                <div key="message" className="stat-area-card__no-data-message">
                    {this.props.noDataMessage}
                </div>
            )
            : null;

        return [
            <div key="subtitle" className="stat-area-card__no-data-subtitle">
                {this.props.noDataSubtitle}
            </div>,
            noDataMessage,
            <ResponsiveContainer
                key="area-chart-container"
                className="stat-area-card__chart"
                width="100%"
                height={80}
            >
                <AreaChart
                    data={this.props.noDataData}
                    margin={{ right: 15, left: 15 }}
                >
                    <defs>
                        <linearGradient id="no-data-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#83C1E7" />
                            <stop offset="100%" stopColor="#4C8DCA" />
                        </linearGradient>
                    </defs>
                    <Area
                        connectNulls={false}
                        dataKey={this.props.yAxisKey}
                        fill="url(#no-data-gradient)"
                        fillOpacity={0.8}
                        stroke="none"
                        legendType="none"
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        ];
    }

    _getFront = () => {
        const rockerButtonDefaults = {
            "data-id": `${this.props["data-id"]}-range-selector`,
            className: classnames(
                "rocker-button--chart-rocker",
                "rocker-button--chart-rocker-small",
                "dashboard-card__range-selector",
                "stat-area-card__range-selector"
            ),
            stateless: false,
            labels: [],
            selected: this.props.selected,
            onValueChange: this.props.onValueChange,
        };

        return (
            <div>
                <DashboardCardTitle
                    className="dashboard-card__title--stat-area"
                    title={this.props.title}
                />
                {!this.props.loading && this.props.isNoData && this._getNoData()}
                {!this.props.loading && !this.props.isNoData && this._getChart()}
                {
                    this.props.rockerButtonProps
                        ? <RockerButton
                            {...rockerButtonDefaults}
                            {...this.props.rockerButtonProps}
                            flags={["p-stateful"]}
                        />
                        : null
                }
            </div>
        );
    }

    _getBack = () => {
        return (
            <div>
                <DashboardCardTitle
                    title={this.props.title}
                    backTitle
                />
                {!this.props.loading && (
                    <DashboardCardList data={this.props.listData} />
                )}
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
