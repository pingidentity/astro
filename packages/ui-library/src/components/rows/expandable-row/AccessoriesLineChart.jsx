import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, ReferenceLine } from "recharts";
import HelpHint from "../../tooltips/HelpHint";

import _ from "underscore";

/**
 * @class AccessoriesLineChart
 * @desc Component used only with expandable row component as an accessories.
 *
 * @param {string} [data-id="accessories-line-chart"]
 *     To define the base "data-id" value for the top-level HTML containers.
 * @param {string} [title]
 *     A string that serves as the title shown on the accessories.
 * @param {string} [count]
 *     A string that serves as the count shown on the accessories.
 * @param {string} [countLablel]
 *     A string that serves as the countLablel shown on the accessories.
 * @param {any} [hint]
 *     A string or JSX object that serves as the hint shown on hovered chart.
 * @param {any} [hintProps]
 *     A object that used for HelpHint as custom props.
 * @param {string} [chartLabel]
 *     A string that serves as the chartLablel shown below the chart.
 * @param {string} [trend]
 *     A string that serves as the chartLablel shown right from the chart.
 * @param {bool} [isTrendPositive=false]
 *     Whether the chart and trend color is blue or black.
 * @param {array} [data=[]]
 *     A list of objects that provides the data for the chart.
 * @param {string} [xAxisKey="id"]
 *    The object property that contains the x-axis data in the "data" prop
 * @param {string} [yAxisKey="value"]
 *    The object property that contains the y-axis data in the "data" prop
*  @param {function} [onLineChartClick]
 *     Click handler.
 *
 * @example
 *     <ExpandableRow.SimpleWrapper>
 *        <ExpandableRow
 *            title="Expanded Row with Line Chart"
 *            subtitle="Row Subtitle"
 *            expanded={false}
 *            onToggle={() => {}}
 *            rowAccessories={[
 *                <RowAccessoriesLineChart
 *                    key="row-accessories-line-chart"
 *                    title="Avg daily sign-ons:"
 *                    count="1,234,234"
 *                    countLabel="Past 7 days"
 *                    hint="See Contributing Data"
 *                    chartLabel="12 wk trend"
 *                    trend="+ 8.6%"
 *                    isTrendPositive={true}
 *                    data={[
 *                        { id: 1, value: 1 },
 *                        { id: 2, value: 5 },
 *                        { id: 3, value: 3 },
 *                        { id: 4, value: 2 },
 *                        { id: 5, value: 5 },
 *                        { id: 6, value: 1 },
 *                    ]}
 *                />,
 *                <Toggle key="toggle" />
 *            ]}
 *        />
 *     </ExpandableRow.SimpleWrapper>
 */

export default class AccessoriesLineChart extends React.Component {
    static displayName = "AccessoriesLineChart";

    static propTypes = {
        "data-id": PropTypes.string,
        title: PropTypes.string,
        count: PropTypes.string,
        countLabel: PropTypes.string,
        hint: PropTypes.any,
        hintProps: PropTypes.any,
        chartLabel: PropTypes.string,
        trend: PropTypes.string,
        isTrendPositive: PropTypes.bool,
        data: PropTypes.array.isRequired,
        xAxisKey: PropTypes.string,
        yAxisKey: PropTypes.string,
        onLineChartClick: PropTypes.func
    };

    static defaultProps = {
        "data-id": "accessories-line-chart",
        isTrendPositive: false,
        data: [],
        xAxisKey: "id",
        yAxisKey: "value",
    };

    _getTitle = () => {
        return this.props.title && <div key="title" className="accessories-line-chart__title">{this.props.title}</div>;
    };

    _getCount = () => {
        return this.props.count && (
            <div key="count" className="accessories-line-chart__count-wrapper">
                <div className="accessories-line-chart__count">{this.props.count}</div>
                <div className="accessories-line-chart__count-label">{this.props.countLabel}</div>
            </div>
        );
    };

    _getLineChart = () => {
        const trendColor = this.props.isTrendPositive ? "#2A60B1" : "#000";
        let referenceLinePoint;
        const isZeroTrend = _.chain(this.props.data)
            .filter(point => _.has(point, this.props.yAxisKey))
            .every(point => point[this.props.yAxisKey] === 0)
            .value();

        if (this.props.data[0] && !_.has(this.props.data[0], this.props.yAxisKey)) {
            referenceLinePoint = _.find(this.props.data.slice(1), point => _.has(point, this.props.yAxisKey)) ||
            _.last(this.props.data);
        }

        return (
            <div
                key="chart-wrapper"
                data-id={`${this.props["data-id"]}-chart-wrapper`}
                className="accessories-line-chart__chart-wrapper"
                onClick={this.props.onLineChartClick}
            >
                <div>
                    <div className="accessories-line-chart__chart">
                        {
                            _.isEmpty(this.props.data)
                                ? <div className="accessories-line-chart__no-data-chart" />
                                : <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                        cursor="pointer"
                                        data={this.props.data}
                                    >
                                        <XAxis dataKey={this.props.xAxisKey} hide={true} />
                                        {
                                            isZeroTrend &&
                                           <YAxis domain={[-1, 1]} hide={true} />
                                        }
                                        <Line
                                            type="monotone"
                                            dot={false}
                                            isAnimationActive={false}
                                            dataKey={this.props.yAxisKey}
                                            stroke={trendColor}
                                            strokeWidth={1}
                                        />
                                        {
                                            referenceLinePoint && referenceLinePoint[this.props.xAxisKey] &&
                                            <ReferenceLine
                                                data-id="reference-line"
                                                x={referenceLinePoint[this.props.xAxisKey]}
                                                stroke="#686f77"
                                                strokeDasharray="2 2"
                                            />
                                        }
                                    </LineChart>
                                </ResponsiveContainer>

                        }

                    </div>
                    <div className="accessories-line-chart__chart-label">{this.props.chartLabel}</div>
                </div>
                <span className="accessories-line-chart__trend" style={{ color: trendColor }}>{this.props.trend}</span>
            </div>
        );
    };

    _getLineChartWithHint = () => {
        return (
            <div key="hint-wrapper" className="accessories-line-chart__hint-wrapper">
                <HelpHint
                    data-id={`${this.props["data-id"]}-helphint`}
                    placement="top"
                    hintText={this.props.hint}
                    {...this.props.hintProps}
                >
                    {this._getLineChart()}
                </HelpHint>
            </div>
        );
    };

    render() {
        return [
            this._getTitle(),
            this._getCount(),
            this.props.hint ? this._getLineChartWithHint() : this._getLineChart()
        ];
    }
}
