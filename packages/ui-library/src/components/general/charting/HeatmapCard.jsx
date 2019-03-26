import React from "react";
import PropTypes from "prop-types";

import ChartTooltip, { textAlignments } from "./ChartTooltip";
import DashboardCard from "./Cards/DashboardCard";
import HelpHint from "../../tooltips/HelpHint";
import RockerButton from "../../forms/RockerButton";

import classnames from "classnames";
import Utils from "../../../util/Utils";
import _ from "underscore";

/**
* @typedef HeatMap~DataItem
* @desc An object describing a data item in the data list.
*
* @property {object|string} label
*    The text that appears above the tooltip value.
* @property {object|string|number} value
*    The value that appears in each cell tooltip. The value also determines the shade of each cell. The larger the value
*    the darker the cell.
*/

/**
 * @typedef HeatMapCard~tooltipRenderer
 * @desc An object describing the start and end dates (inclusive) of a selectable date range.
 *
 * @param {object} cellData
 *     An object containing the data for that cell.
 * @param {obejct} props
 *     The props of the HeatMapCard component.
 */

/**
* @class HeatMapCard
* @desc A charting component that renders data as a series of sectors in a pie with optional cuztomizable legend and tooltips.
*
* @param {string} [className]
*    The classname(s) applied to the top-level container of the component.
* @param {object|string} chartTitle
*    The text that displays along the top of the heat map card.
* @param {string} [data-id="heatmap-card"]
*    The data-id applied to the top-level container of the component.
* @param {string} [errorMessage]
*    When provided, the error message and icon will display in place of the regular content.
* @param {string} [heatColor="#193967"]
*    The base hexidecimal color that the heat map shades are based upon. The highest value in the heat map will appear
*    as this color.
* @param {string} [labelKey="label"]
*    The object property name (in the data prop) that contains the information that you want to be used as the label
*    for each tooltip. Each cell tooltip has it's own label text.
* @param {boolean} [loading=false]
*    When true the splinner animation shows in place of the heatmap
* @param {object} [rockerButtonProps]
*     An optional object containing the props passed to the range-selector RockerButton component. This may be used
*     to have greater control over the chart range selector.
* @param {string} [valueKey="value"]
*    The object property name (in the data prop) that contains the information that you want to be used as the value
*    for each tooltip. Each cell tooltip has it's own value.
* @param {string} [valueKey="value"]
*    The object property name (in the data prop) that contains the information that you want to be used as the value
*    for each tooltip. Each cell tooltip has it's own value.
* @param {function} [tooltipRenderer]
*    A function that renders the contents of the tooltip
* @param {object|string} [tooltipSubtitle]
*    The content to display below the value in the cell tooltip.
* @param {array} [xAxisLabels]
*    The labels that appear along the x-axis of the heat map
* @param {array} [yAxisLabels]
*    The labels that appear along the y-axis of the heat map
*
*/

const _defaultRender = (cellData, props) => (
    <ChartTooltip
        textAlignment={textAlignments.CENTER}
        label={cellData[props.labelKey]}
        values={[{
            id: props.tooltipSubtitle,
            value: cellData[props.valueKey]
        }]}
    />
);

class HeatMapCard extends React.Component {
    static displayName = "HeatMap";

    static propTypes = {
        className: PropTypes.string,
        chartTitle: PropTypes.node,
        data: PropTypes.oneOfType([
            PropTypes.arrayOf(
                PropTypes.array
            ),
            PropTypes.arrayOf(
                PropTypes.arrayOf(
                    PropTypes.object
                )
            )
        ]),
        "data-id": PropTypes.string,
        errorMessage: PropTypes.string,
        heatColor: PropTypes.string,
        labelKey: PropTypes.string,
        loading: PropTypes.bool,
        onValueChange: PropTypes.func,
        rockerButtonProps: PropTypes.object,
        tooltipRenderer: PropTypes.func,
        tooltipSubtitle: PropTypes.string,
        valueKey: PropTypes.string,
        xAxisLabels: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ])
        ),
        yAxisLabels: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ])
        ),
        valueTitle: PropTypes.node,
        value: PropTypes.node,
        valueSubtitle: PropTypes.node,
    };

    static defaultProps = {
        "data-id": "heatmap-card",
        heatColor: "#193967",
        labelKey: "label",
        onValueChange: _.noop,
        rockerButtonProps: null,
        tooltipRenderer: _defaultRender,
        valueKey: "value",
        xAxisLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "00"],
        yAxisLabels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    }

    _getDataMinMax() {
        const simplifiedData = this.props.data.map(row => {
            return row.map(cell => {
                return typeof cell === "object" ? cell[this.props.valueKey] : cell;
            });
        });
        const flattenedData = [].concat(...simplifiedData);

        return {
            min: Math.min(...flattenedData),
            max: Math.max(...flattenedData),
        };
    }

    _renderCells = (dataRange, min) => this.props.data.map((rowData, rowIndex) => {
        return (
            <div className="heatmap__row" key={`row-${rowIndex}`}>
                {rowData.map((cellData, cellIndex) => {
                    const rowLabel = cellIndex === 0 ? (
                        <div
                            className="heatmap__ylabel"
                            data-id={`${this.props["data-id"]}-chart-ylabel-${rowIndex}`}
                            key={`row-label-${rowIndex}`}>
                            {this.props.yAxisLabels[rowIndex]}
                        </div>
                    ) : null;
                    let cellContent, cellValue;

                    if (typeof cellData === "object") {
                        cellContent = this.props.tooltipRenderer(cellData, this.props);
                        cellValue = cellData[this.props.valueKey];
                    } else {
                        cellContent = cellData;
                        cellValue = cellData;
                    }

                    const cellAlpha = (dataRange === 0 && min === 0) ? 0 : (cellValue - min) / dataRange;


                    return ([
                        rowLabel,
                        <HelpHint
                            delayHide={0}
                            hintText={cellContent}
                            key={`cell-${rowIndex}-${cellIndex}`}
                            placement={HelpHint.Placements.BOTTOM}
                            type={HelpHint.Types.LIGHT}
                            triggerClassName="heatmap__cell-color">
                            <div
                                className="heatmap__cell-color"
                                style={{
                                    backgroundColor: Utils.HexToRgba(
                                        this.props.heatColor, cellAlpha
                                    )
                                }}
                            />
                        </HelpHint>
                    ]);
                })}
            </div>
        );
    });

    _renderXAxis() {
        //  first/hard-coded div is a spacer to clear the y-axis labels
        return (
            <div className="heatmap__row">
                <div className="heatmap__spacer" />
                {
                    this.props.xAxisLabels.map((label, index) => {
                        return (
                            <div
                                className="heatmap__xlabel"
                                data-id={`${this.props["data-id"]}-chart-xlabel-${index}`}
                                key={`xaxis-label-${label}`}>
                                {label}
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        const dataId = this.props["data-id"];
        const { min, max } = this._getDataMinMax();
        const dataRange = max - min;
        const rockerButtonDefaults = {
            "data-id": `${dataId}-range-selector`,
            className: "rocker-button--chart-rocker heatmap-card__range-selector",
            stateless: false,
            labels: ["1W", "1M", "3M", "6M"],
            selected: null,
            onValueChange: this.props.onValueChange,
        };

        return (
            <DashboardCard
                className={classnames("heatmap-card", this.props.className)}
                data-id={dataId}
                errorMessage={this.props.errorMessage}
                loading={this.props.loading}
                front={(
                    <div>
                        {!this.props.loading && ([
                            <div className="heatmap-card__chart" key="heatmap-chart">
                                <div className="heatmap-card__chart-title" data-id={`${dataId}-chart-title`}>
                                    {this.props.chartTitle}
                                </div>
                                <div
                                    className="heatmap"
                                    data-id={`${dataId}-chart`}
                                    style={{ backgroundColor: Utils.HexToRgba(
                                        this.props.heatColor, 0.1)
                                    }}>
                                    {this._renderXAxis()}
                                    {this._renderCells(dataRange, min)}
                                </div>
                                <div>
                                    {this.props.rockerButtonProps
                                        ? <RockerButton {...rockerButtonDefaults} {...this.props.rockerButtonProps} />
                                        : null}
                                </div>
                            </div>,
                            <div className="heatmap-card__data" key="heatmap-data">
                                <div className="heatmap-card__title" data-id={`${dataId}-value-title`}>
                                    {this.props.valueTitle}
                                </div>
                                <div className="heatmap-card__value" data-id={`${dataId}-value`}>
                                    {this.props.value}
                                </div>
                                <div className="heatmap-card__subtitle" data-id={`${dataId}-value-subtitle`}>
                                    {this.props.valueSubtitle}
                                </div>
                            </div>
                        ])}
                    </div>
                )}
            />
        );
    }
}

module.exports = HeatMapCard;