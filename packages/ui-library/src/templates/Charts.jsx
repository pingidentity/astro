import React from "react";

import DashboardCard, { padding } from "ui-library/lib/components/general/charting/Cards/DashboardCard";
import PieChart from "ui-library/lib/components/general/charting/PieChart";
import LineChart from "ui-library/lib/components/general/charting/LineChart";
import ColumnChart from "ui-library/lib/components/general/charting/ColumnChart";
import Legend, {
    alignments as legendAlignments,
    boxAlignments
} from "ui-library/lib/components/general/charting/Legend";

import RockerButton, { rockerTypes } from "ui-library/lib/components/forms/RockerButton";
import ChartWrapper from "ui-library/lib/components/general/charting/ChartWrapper";
import ChartTitle from "ui-library/lib/components/general/charting/ChartTitle";
import { generateTheme } from "ui-library/lib/util/ChartingUtils";
import CardGrid from "ui-library/lib/components/layout/CardGrid";
import FlexRow, {
    justifyOptions,
    flexDirectionOptions,
    spacingOptions,
    alignments
} from "ui-library/lib/components/layout/FlexRow";
import Button from "ui-library/lib/components/buttons/Button";
import Padding from "../components/layout/Padding";
import { sizes } from "../components/layout/Spacing";

/**
 * Mock data
 */
import {
    ColumnData,
    LineData,
    AuthByType,
    RegByDevice,
} from "./ChartData";

class AuthByTypeWrapper extends React.Component {
    state = {
        selectedRocker: 0,
    };

    _handleRockerChange = (labelValues) => {
        this.setState({ selectedRocker: labelValues.index });
    }

    _digestData = (data) => {
        return data.reduce((acc, item) => [
            ...acc,
            {
                ...item,
                value: item.value
                    ? item.value
                    : item.series.reduce((total, seriesItem) => total = total + seriesItem.value, 0),
            }
        ], []);
    };

    render() {
        const controlLabels = ["1D", "1W", "1M", "6M"];

        return (
            <ChartWrapper
                title={<ChartTitle title="Authentications by Type" />}
                legend={
                    <Legend
                        alignment={legendAlignments.CENTER}
                        boxAlignment={boxAlignments.CENTER}
                        data={AuthByType[this.state.selectedRocker].legendData}
                    />
                }
                chart={
                    <PieChart
                        onClick={this.props.onClick}
                        showTooltips={true}
                        data={this._digestData(AuthByType[this.state.selectedRocker].data)}
                        dataValue="chartValue"
                        width={250}
                        height={250}
                        renderTooltip={(props, Tooltip) => (
                            <Tooltip
                                {...props}
                                value={`${props.value}`}
                            />
                        )}
                    />
                }
                controls={
                    <RockerButton
                        labels={controlLabels}
                        noMargin
                        onValueChange={this._handleRockerChange}
                        selectedIndex={this.state.selectedRocker}
                        type={rockerTypes.CHART}
                    />
                }
            />
        );
    }
}

class RegByDeviceWrapper extends React.Component {
    state = {
        selectedRocker: 0,
    };

    _handleRockerChange = (labelValues) => {
        this.setState({ selectedRocker: labelValues.index });
    }

    _digestData = (data) => {
        return data.reduce((acc, item) => [
            ...acc,
            {
                ...item,
                value: item.value
                    ? item.value
                    : item.series.reduce((total, seriesItem) => total = total + seriesItem.value, 0),
            }
        ], []);
    };

    render() {
        const controlLabels = ["1D", "1W", "1M", "6M"];

        return (
            <ChartWrapper
                title={<ChartTitle title="Authentications by Type" />}
                legend={
                    <Legend
                        alignment={legendAlignments.CENTER}
                        boxAlignment={boxAlignments.CENTER}
                        data={RegByDevice[this.state.selectedRocker].legendData}
                    />
                }
                chart={
                    <PieChart
                        onClick={this.props.onClick}
                        showTooltips={true}
                        data={this._digestData(RegByDevice[this.state.selectedRocker].data)}
                        dataValue="chartValue"
                        width={250}
                        height={250}
                        renderTooltip={(props, Tooltip) => (
                            <Tooltip
                                {...props}
                                value={`${props.value}`}
                            />
                        )}
                    />
                }
                controls={
                    <RockerButton
                        labels={controlLabels}
                        noMargin
                        onValueChange={this._handleRockerChange}
                        selectedIndex={this.state.selectedRocker}
                        type={rockerTypes.CHART}
                    />
                }
            />
        );
    }
}

class LineChartWrapper extends React.Component {
    state = {
        selectedRocker: 0,
    };

    _handleRockerChange = (labelValues) => {
        this.setState({ selectedRocker: labelValues.index });
    }

    render() {
        const controlLabels = ["1D", "1W", "1M", "6M"];

        return (
            <ChartWrapper
                title={<ChartTitle title="Visitors" />}
                legend={
                    <Legend
                        alignment={legendAlignments.CENTER}
                        boxAlignment={boxAlignments.CENTER}
                        data={LineData[this.state.selectedRocker].legendData}
                    />
                }
                chart={
                    <LineChart
                        onClick={this.props.onClick}
                        data={LineData[this.state.selectedRocker].data}
                        legend={LineData[this.state.selectedRocker].legendData}
                        width="100%"
                        height={200}
                        lines={false}
                        theme={
                            generateTheme(
                                LineData[this.state.selectedRocker].legendData[0].color,
                                LineData[this.state.selectedRocker].legendData
                            )
                        }
                    />
                }
                controls={
                    <RockerButton
                        labels={controlLabels}
                        noMargin
                        onValueChange={this._handleRockerChange}
                        selectedIndex={this.state.selectedRocker}
                        type={rockerTypes.CHART}
                    />
                }
            />
        );
    }
}

class ColumnChartWrapper extends React.Component {
    state = {
        selectedRocker: 0,
    };

    _handleRockerChange = (labelValues) => {
        this.setState({ selectedRocker: labelValues.index });
    }

    render() {
        const controlLabels = ["1D", "1W", "1M", "6M"];

        return (
            <ChartWrapper
                title={<ChartTitle title="Users" />}
                legend={
                    <Legend
                        alignment={legendAlignments.CENTER}
                        boxAlignment={boxAlignments.CENTER}
                        data={ColumnData[this.state.selectedRocker].legendData}
                    />
                }
                chart={
                    <ColumnChart
                        onClick={this.props.onClick}
                        data={ColumnData[this.state.selectedRocker].columnData}
                        legend={ColumnData[this.state.selectedRocker].legendData}
                        height={200}
                        lines={false}
                        renderTooltip={(props, LegendItem) => (
                            <LegendItem
                                color={props.color}
                                label={props.y.label}
                                value={
                                    props.y.label === "Cost"
                                        ? `$${props.value}`
                                        : props.value
                                }
                            />
                        )}
                    />
                }
                controls={
                    <RockerButton
                        labels={controlLabels}
                        noMargin
                        onValueChange={this._handleRockerChange}
                        selectedIndex={this.state.selectedRocker}
                        type={rockerTypes.CHART}
                    />
                }
            />
        );
    }
}

class ChartView extends React.Component {
    render() {
        return (
            <div>
                <FlexRow
                    justify={justifyOptions.END}
                >
                    <Button
                        label="Close"
                        type={Button.buttonTypes.SECONDARY}
                        onClick={this.props.onClose}
                    />
                </FlexRow>
                {this.props.children}
            </div>
        );
    }
}

/**
 * @class Chart Layout
 * @desc This is a template for dashboard Chart Layout
 */
class Charts extends React.Component {
    state = {
        selectedChart: null,
    };

    _selectChart = (chart) => () => {
        console.log(chart);
        this.setState({
            selectedChart: chart,
        });
    }

    _handleCloseChart = () => {
        this.setState({
            selectedChart: null,
        });
    }

    render() {
        return (
            !this.state.selectedChart ? (
                <>
                    <Padding bottom={sizes.XL}>
                        <FlexRow
                            flexDirection={flexDirectionOptions.COLUMN}
                            justify={justifyOptions.CENTER}
                            spacing={spacingOptions.MD}
                            alignment={alignments.CENTER}
                        >
                            <ChartTitle title="Totals for Today" />
                            <Legend
                                alignment={legendAlignments.CENTER}
                                boxAlignment={boxAlignments.CENTER}
                                data={[
                                    {
                                        label: "Registrations",
                                        value: "22.2K",
                                    },
                                    {
                                        label: "Authentications",
                                        value: "25.5K",
                                    },
                                    {
                                        label: "Failed Authentications",
                                        value: "7.3K",
                                    },
                                ]}
                            />
                        </FlexRow>
                    </Padding>

                    <CardGrid>
                        <CardGrid.Block>
                            <DashboardCard
                                padding={padding.MD}
                                front={(
                                    <AuthByTypeWrapper
                                        onClick={this._selectChart(<AuthByTypeWrapper/>)}
                                    />
                                )}/>
                        </CardGrid.Block>
                        <CardGrid.Block>
                            <DashboardCard
                                padding={padding.MD}
                                front={(
                                    <ColumnChartWrapper
                                        onClick={this._selectChart(<ColumnChartWrapper/>)}
                                    />
                                )} />
                        </CardGrid.Block>
                        <CardGrid.Block>
                            <DashboardCard
                                padding={padding.MD}
                                front={(
                                    <LineChartWrapper
                                        onClick={this._selectChart(<LineChartWrapper/>)}
                                    />
                                )} />
                        </CardGrid.Block>
                        <CardGrid.Block>
                            <DashboardCard
                                padding={padding.MD}
                                front={(
                                    <RegByDeviceWrapper
                                        onClick={this._selectChart(<RegByDeviceWrapper/>)}
                                    />
                                )} />
                        </CardGrid.Block>
                    </CardGrid>
                </>
            ) : (
                <ChartView
                    onClose={this._handleCloseChart}
                >
                    {this.state.selectedChart}
                </ChartView>
            )
        );
    }
}

export default Charts;