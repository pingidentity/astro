import React, { useCallback, useState } from "react";
import HeatmapChart from "../../../../components/general/charting/HeatmapChart";
import Layout from "../../../../components/general/ColumnLayout";
import Checkbox from "../../../../components/forms/FormCheckbox";
import Button from "../../../../components/buttons/Button";
import defaultDemoData from "./demoHeatmapChartData.json";

const HeatmapChartDemo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(defaultDemoData);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const hours = [
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
    ];

    const generateDemoData = useCallback(() => {
        return days.map((day) => {
            return hours.map((hour) => {
                return {
                    value: Math.floor(Math.random() * 1000),
                    label: `${day.toUpperCase()} ${hour}:00${
                        hour < 12 ? "am" : "pm"
                    } MST`,
                };
            });
        });
    }, []);

    const updateDemoData = () => setData(generateDemoData());

    const removeDemoData = () => setData([]);

    const toggleError = () =>
        setError((prevState) => (prevState ? null : "Lorem ipsum dolor"));

    const toggleLoading = () => setLoading((prevState) => !prevState);

    return (
        <div>
            <Layout.Row autoWidth>
                <Layout.Column>
                    <Checkbox
                        label="Show error message"
                        checked={Boolean(error)}
                        onChange={toggleError}
                    />
                </Layout.Column>
                <Layout.Column>
                    <Checkbox
                        label="Show loading indicator"
                        checked={loading}
                        onChange={toggleLoading}
                    />
                </Layout.Column>
                <Layout.Column>
                    <Button label="Generate Heatmap data" onClick={updateDemoData} />
                </Layout.Column>
                <Layout.Column>
                    <Button label="Delete Heatmap data" onClick={removeDemoData} />
                </Layout.Column>
            </Layout.Row>
            <HeatmapChart
                data={data}
                averageValueData="10.5M"
                tooltipSubtitle="Average sign-ons"
                errorMessage={error}
                loading={loading}
            />
        </div>
    );
};

export default HeatmapChartDemo;
