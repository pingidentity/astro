import React from "react";
import PropTypes from "prop-types";

import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DashboardColors from "./Cards/dashboardColors";
import DashboardCard from "./Cards/DashboardCard";
import DashboardCardList from "./Cards/DashboardCardList";
import RockerButton from "../../forms/RockerButton";
import DashboardCardTitle from "./Cards/DashboardCardTitle";

import classnames from "classnames";
import _ from "underscore";


/**
 * @class StatCard
 * @desc A card that displays a single statistic, but can be flipped to reveal others as well.
 *
 * @param {number|string} [accent]
 *    Index of the accent color for this stat card. There are three (0-2) options.
 * @param {string} [className]
 *    Custom class name(s) applied to the top-level container
 * @param {array} [data]
 *    A list of objects that provides the data for the chart
 * @param {array} [data-id="stat-card"]
 *    The data-id attribute applied to the top-level container
 * @param {string} [errorMessage]
 *    When provided, the error message and icon will display in place of the regular front/back content.
 * @param {boolean} [flipped]
 *    If provided, whether or not the card is flipped. If not provided, the component maintains its own state
 * @param {array} [listData]
 *    A list of objects that renders as a list of labels and values on the back of the card
 * @param {boolean} [loading=false]
 *    When true the splinner animation shows in place of the stats
 * @param {string} [makeDefaultLabel]
 *    The label displayed next to the make-default checkbox
 * @param {function} [onFlip]
 *    Callback triggered when card is flipped
 * @param {function} [onMouseOver]
 *    Callback triggered when a chart data-point is hovered over
 * @param {function} [onMakeDefault]
 *    Callback triggered when the make-default checkbox is changed.  When provided a checkbox will render on the back
 *    of the card.
 * @param {object} [rockerButtonProps]
 *     An optional object containing the props passed to the range-selector RockerButton component. This may be used
 *     to have greater control over the chart range selector.
 * @param {string} [subTitle]
 *    Subtitle of the card. Displayed on the front of the card below the title and value.
 * @param {string} [title]
 *    Title of the card. Displayed at top of front and back
 * @param {string} [value]
 *    The single value shown on the front of the card
 * @param {string} [xAxisKey]
 *    The object property can be associated other data in the object and can be used to pass additional information in
 *    in the onMouseOver callback.
 * @param {string} yAxisKey
 *    The object property that contains the y-axis data in the "data" prop
 */

class StatAreaCard extends React.Component {
    lastHover = null;

    _onMouseOver = _.debounce((data) => {
        if (!_.isEqual(data, this.lastHover)) {
            this.props.onMouseOver(data.value, data.id);
            this.lastHover = data;
        }
    }, 10);

    _onMouseOut = () => _.debounce(this.props.onMouseOut(), 10);

    render() {
        const dataId = this.props["data-id"];

        const rockerButtonDefaults = {
            "data-id": `${dataId}-range-selector`,
            className: "rocker-button--chart-rocker rocker-button--chart-rocker-small dashboard-card__range-selector\
                stat-area-card__range-selector",
            stateless: false,
            labels: [],
            selected: this.props.selected,
            onValueChange: this.props.onValueChange,
        };

        const classes = classnames(
            "stat-area-card",
            this.props.className,
        );

        const chartMargin = { top: 3, right: 0, bottom: 0, left: 0 }; // top margin needed to keep dot from cutting off
        const hexColor = DashboardColors.COLORS[DashboardColors.getKey(this.props.accent)];

        return (
            <DashboardCard
                {...this.props}
                data-id={dataId}
                className={classes}
                back={
                    <div>
                        <DashboardCardTitle
                            title={this.props.title}
                            backTitle
                        />
                        {!this.props.loading && (
                            <DashboardCardList data={this.props.listData} />
                        )}
                    </div>
                }
                front={
                    <div>
                        <DashboardCardTitle
                            className="dashboard-card__title--stat-area"
                            title={this.props.title}
                        />
                        {!this.props.loading && ([
                            <div key="value" className="dashboard-card__value stat-area-card__value">
                                {this.props.value}
                            </div>,
                            <div key="subtitle" className="dashboard-card__subtitle">
                                {this.props.subtitle}
                            </div>,
                            <ResponsiveContainer width="100%" height={80}>
                                <AreaChart
                                    key="chart"
                                    className="stat-area-card__chart"
                                    data={this.props.data}
                                    margin={chartMargin}>
                                    <XAxis hide={true} />
                                    <YAxis hide={true} />
                                    <Area
                                        connectNulls={false}
                                        dataKey={this.props.yAxisKey}
                                        fill={hexColor}
                                        stroke={hexColor}
                                        fillOpacity={1}
                                        isAnimationActive={false}
                                        legendType={"none"}
                                        name={1}
                                    />
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
                        ])}
                        {this.props.rockerButtonProps
                            ? <RockerButton {...rockerButtonDefaults} {...this.props.rockerButtonProps} />
                            : null}
                    </div>
                }
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
        onMouseOut();
    }
    return true;
};



StatAreaCard.propTypes = {
    "data-id": PropTypes.string,
    accent: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    })),
    errorMessage: PropTypes.string,
    flipped: PropTypes.bool,
    listData: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    })),
    loading: PropTypes.bool,
    makeDefaultLabel: PropTypes.string,
    onFlip: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMakeDefault: PropTypes.func,
    rockerButtonProps: PropTypes.object,
    subTitle: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    xAxisKey: PropTypes.string,
    yAxisKey: PropTypes.string,
};

StatAreaCard.defaultProps = {
    "data-id": "stat-area-card",
    accent: "blue",
    data: [],
    listData: [],
    onFlip: _.noop,
    onMouseOver: _.noop,
    onMouseOut: _.noop,
    onValueChange: _.noop,
    rockerButtonProps: {},
    xAxisKey: "id",
    yAxisKey: "value",
};

StatAreaCard.CustomTooltip = CustomTooltip;
export default StatAreaCard;
