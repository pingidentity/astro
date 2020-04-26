import React from "react";

import DashboardCard, { padding } from "ui-library/lib/components/general/charting/Cards/DashboardCard";
import { CardRow } from "ui-library/lib/components/general/charting/Cards/";
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

class DemoChart extends React.Component {
    static defaultProps = {
        data: {}
    }
    controlLabels = ["1D", "1W", "1M", "6M", "No Data"];
    state = {
        selectedRocker: 0,
        loading: true
    }
    componentDidMount() {
        //randomly load data from 1 - 3 s
        setTimeout(() => this.setState({ loading: false }), Math.floor(Math.random() * 3000) + 1000);
    }

    _handleRockerChange = (labelValues) => {
        this.setState({ selectedRocker: labelValues.index });
    }

    render() {
        const { selectedRocker, loading } = this.state;
        const { legendData = [], data = [] } = this.props.data[selectedRocker] || {};

        return (
            <DashboardCard
                padding={padding.MD}
                front={
                    <ChartWrapper
                        loadingMessage={loading && "loading"}
                        message={selectedRocker === 4 && "no data"}
                        title={<ChartTitle title={this.props.title} />}
                        legend={
                            <Legend
                                alignment={legendAlignments.CENTER}
                                boxAlignment={boxAlignments.CENTER}
                                data={loading ? [] : legendData}
                            />
                        }
                        chart={this.props.renderChart(
                            loading
                                ? { chartData: [], legendData: [] }
                                : { chartData: data, legendData }
                        )}
                        controls={
                            <RockerButton
                                labels={this.controlLabels}
                                noMargin
                                onValueChange={this._handleRockerChange}
                                selectedIndex={selectedRocker}
                                type={rockerTypes.CHART}
                            />
                        }
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

                    <CardRow>
                        <DemoChart
                            data={AuthByType}
                            title="Authentications By Type"
                            renderChart={(data) => {
                                //just using this transform to match PingID existing data. Not needed for component.
                                const transformData = (d) => d.chartData.map((item) => (
                                    {
                                        ...item,
                                        value: item.value
                                            ? item.value
                                            : item.series.reduce(
                                                (total, seriesItem) => total = total + seriesItem.value,
                                                0
                                            ),
                                    }
                                ));

                                return (
                                    <PieChart
                                        data={data ? transformData(data) : undefined}
                                        showTooltips={true}
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
                                );
                            }}
                        />

                        <DemoChart
                            data={ColumnData}
                            title="Users"
                            renderChart={(data) => (
                                <ColumnChart
                                    onClick={this.props.onClick}
                                    legend={data && data.legendData}
                                    data={data && data.chartData}
                                    height={200}
                                    //lines={false}
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
                            )}

                        />

                    </CardRow>
                    <CardRow>
                        <DemoChart
                            data={LineData}
                            title="Visitors"
                            renderChart={(data) => {console.log(data); return (
                                <LineChart
                                    width="100%"
                                    height={200}
                                    data={data.chartData}
                                    legend={data.legendData}
                                    theme={data.legendData.length > 0
                                        ? generateTheme(
                                            data.legendData[0].color,
                                            data.legendData
                                        )
                                        : null
                                    }
                                />
                            );}}
                        />

                        <DemoChart
                            data={RegByDevice}
                            title="Registrations By Device"
                            renderChart={(data) => {
                                //just using this transform to match PingID existing data. Not needed for component.
                                const transformData = d => d.chartData.map((item) => (
                                    {
                                        ...item,
                                        value: item.value
                                            ? item.value
                                            : item.series.reduce(
                                                (total, seriesItem) => total = total + seriesItem.value,
                                                0
                                            ),
                                    }
                                ));
                                return (
                                    <PieChart
                                        data={data.chartData ? transformData(data) : undefined}
                                        showTooltips={true}
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
                                );
                            }

                            }
                        />
                    </CardRow>
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
