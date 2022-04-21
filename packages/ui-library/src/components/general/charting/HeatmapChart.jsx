import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import ChartTooltip, { textAlignments } from "./ChartTooltip";
import DashboardCard from "./Cards/DashboardCard";
import HelpHint from "../../tooltips/HelpHint";
import Utils from "../../../util/Utils";

const defaultRender = (cellData, props) => (
    <ChartTooltip
        textAlignment={textAlignments.CENTER}
        label={cellData[props.labelKey]}
        values={[
            {
                id: props.tooltipSubtitle,
                value: cellData[props.valueKey],
            },
        ]}
    />
);

const HeatmapChart = (props) => {
    const {
        averageValueData,
        averageValueTitle,
        chartTitle,
        data,
        dataId,
        errorMessage,
        heatColor,
        loading,
        noDataMessage,
        tooltipProps,
        tooltipRenderer,
        valueKey,
        xAxisLabels,
        yAxisLabels,
    } = props;

    const getDataMinMax = useCallback(() => {
        const simplifiedData = data.map((row) => {
            return row.map((cell) => {
                return typeof cell === "object" ? cell[valueKey] : cell;
            });
        });
        const flattenedData = [].concat(...simplifiedData);

        return {
            min: Math.min(...flattenedData),
            max: Math.max(...flattenedData),
        };
    }, [data, valueKey]);

    const { min, max } = getDataMinMax();
    const dataRange = useMemo(() => max - min, [min, max]);

    const renderCell = (cellData, cellIndex, rowIndex) => {
        const rowLabel =
      cellIndex === 0 ? (
          <div
              className="heatmap-chart__chart__ylabel"
              data-id={`${dataId}-chart-ylabel-${rowIndex}`}
              key={`row-label-${rowIndex}`}
          >
              {yAxisLabels[rowIndex]}
          </div>
      ) : null;
        let cellContent, cellValue;

        if (typeof cellData === "object") {
            cellContent = tooltipRenderer(cellData, props);
            cellValue = cellData[valueKey];
        } else {
            cellContent = cellData;
            cellValue = cellData;
        }

        const cellAlpha =
      dataRange === 0 && min === 0 ? 0 : (cellValue - min) / dataRange;

        return [
            rowLabel,
            <HelpHint
                data-id={`heatmap-hint_${cellValue}_${rowIndex}`}
                delayHide={0}
                delayShow={0}
                hintText={cellContent}
                key={`cell-${rowIndex}-${cellIndex}`}
                placement={HelpHint.Placements.BOTTOM}
                type={HelpHint.Types.LIGHT}
                triggerClassName="heatmap-chart__chart__cell"
                tooltipProps={tooltipProps}
            >
                <div
                    className="heatmap-chart__chart__cell"
                    style={{
                        backgroundColor: Utils.HexToRgba(heatColor, cellAlpha),
                    }}
                />
            </HelpHint>,
        ];
    };

    const renderRow = (rowData, rowIndex) => (
        <div className="heatmap-chart__chart__cells-row" key={`row-${rowIndex}`}>
            {rowData.map((cellData, cellIndex) =>
                renderCell(cellData, cellIndex, rowIndex)
            )}
        </div>
    );

    const renderCells = () => data.map(renderRow);

    const renderAmPmRow = () => (
        <div className="heatmap-chart__time">
            <div className="heatmap-chart__time__am">
                <div className="heatmap-chart__time__line heatmap-chart__time__line--am" />
                <div className="heatmap-chart__time__text heatmap-chart__time__text--am">
          AM
                </div>
                <div className="heatmap-chart__time__line heatmap-chart__time__line--am" />
            </div>
            <div className="heatmap-chart__time__pm">
                <div className="heatmap-chart__time__line heatmap-chart__time__line--pm" />
                <div className="heatmap-chart__time__text heatmap-chart__time__text--pm">
          PM
                </div>
                <div className="heatmap-chart__time__line heatmap-chart__time__line--pm" />
            </div>
        </div>
    );

    const renderXAxis = () => {
    //  first/hard-coded div is a spacer to clear the y-axis labels
        return (
            <div className="heatmap-chart__row">
                <div className="heatmap-chart__chart__spacer" />
                {xAxisLabels.map((label, index) => (
                    <div
                        className={`heatmap-chart__chart__xlabel ${
                            index < 12
                                ? "heatmap-chart__chart__xlabel--am"
                                : "heatmap-chart__chart__xlabel--pm"
                        }`}
                        data-id={`${dataId}-chart-xlabel-${index}`}
                        key={`xaxis-label-${label} ${index < 12 ? "am" : "pm"}`}
                    >
                        {label}
                    </div>
                ))}
            </div>
        );
    };

    const renderChartHeader = () => (
        <div className="heatmap-chart__average">
            <div className="heatmap-chart__average__row">
                <div className="heatmap-chart__average__cell" />
                <div className="heatmap-chart__average__title">{averageValueTitle}</div>
            </div>
            <div className="heatmap-chart__average__value">{averageValueData}</div>
        </div>
    );

    const renderChart = () => (
        <>
            {renderChartHeader()}
            <div className="heatmap-card__content">
                <div className="heatmap-card__chart-container">
                    {renderAmPmRow()}
                    <div
                        className="heatmap-chart__chart"
                        data-id={`${dataId}-chart`}
                        style={{
                            backgroundColor: Utils.HexToRgba(heatColor, 0.1),
                        }}
                    >
                        {renderXAxis()}
                        {renderCells()}
                    </div>
                </div>
            </div>
        </>
    );

    const renderNoData = () => (
        <div className="heatmap-chart__no-data">{noDataMessage}</div>
    );

    if (loading || errorMessage) {
        return <DashboardCard loading={loading} errorMessage={errorMessage} />;
    }

    if (!data || data.length === 0) {
    }

    return (
        <div className="heatmap-chart">
            <div className="heatmap-chart__title">{chartTitle}</div>
            {data?.length ? renderChart() : renderNoData()}
        </div>
    );
};

HeatmapChart.propTypes = {
    chartTitle: PropTypes.string,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.array),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
    ]),
    averageValueTitle: PropTypes.string,
    averageValueData: PropTypes.string,
    valueKey: PropTypes.string,
    errorMessage: PropTypes.string,
    noDataMessage: PropTypes.string,
    loading: PropTypes.bool,
    heatColor: PropTypes.string,
    labelKey: PropTypes.string,
    tooltipSubtitle: PropTypes.string,
    dataId: PropTypes.string,
    tooltipProps: PropTypes.object,
    tooltipRenderer: PropTypes.func,
    xAxisLabels: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
    yAxisLabels: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
};

HeatmapChart.defaultProps = {
    dataId: "heatmap-chart",
    heatColor: "#00AF18",
    tooltipRenderer: defaultRender,
    chartTitle: "Sign-ons by day/hour",
    averageValueTitle: "Daily Average",
    valueKey: "value",
    noDataMessage: "No Data Available",
    labelKey: "label",
    tooltipProps: { interactive: false },
    xAxisLabels: [
        12,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
    ],
    yAxisLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

export default HeatmapChart;
