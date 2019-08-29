window.__DEV__ = true;

jest.dontMock("../HeatmapCard");
jest.dontMock("../../../forms/RockerButton");

import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";

describe("HeatmapCard", function () {
    const React = require("react");
    const ReactTestUtils = require("react-dom/test-utils");
    const TestUtils = require("../../../../testutil/TestUtils");
    const HeatmapCard = require("../HeatmapCard");
    const _ = require("underscore");

    const chartData = [
        [
            { myLabel: "L11", myValue: 11 },
            { myLabel: "L12", myValue: 12 },
            { myLabel: "L13", myValue: 13 },
            { myLabel: "L14", myValue: 14 },
        ],
        [
            { myLabel: "L21", myValue: 21 },
            { myLabel: "L22", myValue: 22 },
            { myLabel: "L23", myValue: 23 },
            { myLabel: "L24", myValue: 24 },
        ],
        [
            { myLabel: "L31", myValue: 31 },
            { myLabel: "L32", myValue: 32 },
            { myLabel: "L33", myValue: 33 },
            { myLabel: "L34", myValue: 34 },
        ],
        [
            { myLabel: "L41", myValue: 41 },
            { myLabel: "L42", myValue: 42 },
            { myLabel: "L43", myValue: 43 },
            { myLabel: "L44", myValue: 44 },
        ]
    ];

    const xAxisLabels = ["x1", "x2", "x3", "x4"];
    const yAxisLabels = ["y1", "y2", "y3", "y4"];

    const rockerButtonProps = {
        labels: ["A", "B", "C", "D"]
    };

    const dataId = "mr-heatmap";

    const defaultProps = {
        className: "my-custom-classname",
        chartTitle: "My Chart Title",
        "data-id": dataId,
        data: chartData,
        heatColor: "#ff0000",
        labelKey: "myLabel",
        onValueChange: jest.fn(),
        rockerButtonProps: rockerButtonProps,
        tooltipSubtitle: "my tt subtitle",
        valueKey: "myValue",
        xAxisLabels: xAxisLabels,
        yAxisLabels: yAxisLabels,
        valueTitle: "My Value Title",
        value: "1,000",
        valueSubtitle: "my value subtitle",
    };

    function getComponent(props) {
        return ReactTestUtils.renderIntoDocument(
            <div><HeatmapCard {...defaultProps} {...props} /></div>
        );
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <HeatmapCard
                data={chartData}
            />
        );
    });

    it("renders with the default data-id", function () {
        const component = getComponent();
        const container = TestUtils.findRenderedDOMNodeWithDataId(component, dataId);

        expect(container).toBeTruthy();
    });

    it("renders the chart title", function () {
        const component = getComponent();
        const title = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__title");

        expect(title.textContent).toBe(defaultProps.chartTitle);
    });

    it("renders the value", function () {
        const component = getComponent();
        const value = TestUtils.findRenderedDOMNodeWithDataId(component, `${dataId}-value`);

        expect(value.textContent).toBe(defaultProps.value);
    });

    it("renders the value title", function () {
        const component = getComponent();
        const valueTitle = TestUtils.findRenderedDOMNodeWithDataId(component, `${dataId}-value-title`);

        expect(valueTitle.textContent).toBe(defaultProps.valueTitle);
    });

    it("renders the value subtitle", function () {
        const component = getComponent();
        const valueSubtitle = TestUtils.findRenderedDOMNodeWithDataId(component, `${dataId}-value-subtitle`);

        expect(valueSubtitle.textContent).toBe(defaultProps.valueSubtitle);
    });

    it("renders the x-axis labels", function () {
        const component = getComponent();

        const xLabels = TestUtils.scryRenderedDOMNodesWithClass(component, "heatmap__xlabel");
        expect(xLabels.length).toEqual(xAxisLabels.length); // add one for y-axis spacer

        xAxisLabels.forEach((label, index) => {
            const domItem = TestUtils.findRenderedDOMNodeWithDataId(component, `${dataId}-chart-xlabel-${index}`);
            expect(label).toBe(domItem.textContent);
        });
    });

    it("renders the y-axis labels", function () {
        const component = getComponent();

        const yLabels = TestUtils.scryRenderedDOMNodesWithClass(component, "heatmap__ylabel");
        expect(yLabels.length).toEqual(yAxisLabels.length); // add one for y-axis spacer

        yAxisLabels.forEach((label, index) => {
            const domItem = TestUtils.findRenderedDOMNodeWithDataId(component, `${dataId}-chart-ylabel-${index}`);
            expect(label).toBe(domItem.textContent);
        });
    });

    it("renders the correct number of cells", function () {
        const component = getComponent();
        const rows = TestUtils.scryRenderedDOMNodesWithClass(component, "heatmap__row");

        rows.forEach((row, rowIndex) => {
            if (rowIndex > 0) {
                const cells = TestUtils.scryRenderedDOMNodesWithClass(row, "help-tooltip");

                // offset data index by -1 because first row is x-axis
                expect(cells.length).toBe(chartData[rowIndex - 1].length);
            }
        });
    });

    it("renders cells when simple values are passed in instead of objects", function () {
        const flatData = [
            [11, 12, 13, 14],
            [21, 22, 23, 24],
            [31, 32, 33, 34],
            [41, 42, 43, 44],
        ];
        const component = getComponent({
            data: flatData
        });
        const rows = TestUtils.scryRenderedDOMNodesWithClass(component, "heatmap__row");

        rows.forEach((row, rowIndex) => {
            if (rowIndex > 0) {
                const cells = TestUtils.scryRenderedDOMNodesWithClass(row, "help-tooltip");

                // offset data index by -1 because first row is x-axis
                expect(cells.length).toBe(chartData[rowIndex - 1].length);
            }
        });
    });

    it("renders the rocker button labels", function () {
        const component = getComponent();

        const rockerButton = TestUtils.findRenderedDOMNodeWithDataId(component, `${dataId}-range-selector`);

        expect(rockerButton.children.length).toBe(rockerButtonProps.labels.length);

        _.each(rockerButton.children, (item, index) => {
            expect(item.textContent).toBe(rockerButtonProps.labels[index]);
        });
    });

    it("the callback is triggered when rocker button is clicked", function () {
        const onValueChange = jest.fn();
        const component = getComponent({
            onValueChange: onValueChange
        });

        const rockerButton = TestUtils.findRenderedDOMNodeWithDataId(component, `${dataId}-range-selector`);

        expect(onValueChange).not.toHaveBeenCalled();
        expect(rockerButton.className).toContain("sel-0");

        const clickIndex = 2;
        ReactTestUtils.Simulate.click(rockerButton.childNodes[clickIndex]);

        expect(rockerButton.className).toContain(`sel-${clickIndex}`);
        expect(onValueChange).toHaveBeenCalled();
    });

    it("the adds the proper cell shading", function () {
        const component = getComponent();

        const rows = TestUtils.scryRenderedDOMNodesWithClass(component, "heatmap__row");

        const firstRow = rows[1]; // skip x-axis labels (+1)
        const firstRowCells = TestUtils.scryRenderedDOMNodesWithClass(firstRow, "help-tooltip");
        const firstCell = firstRowCells[0];
        const firstCellColor = TestUtils.findRenderedDOMNodeWithClass(firstCell, "heatmap__cell-color");
        expect(JSON.stringify(firstCellColor.style)).toContain("rgba(255, 0, 0, 0)");

        const lastRow = rows[4]; // skip x-axis labels (+1)
        const lastRowCells = TestUtils.scryRenderedDOMNodesWithClass(lastRow, "help-tooltip");
        const lastCell = lastRowCells[3];
        const lastCellColor = TestUtils.findRenderedDOMNodeWithClass(lastCell, "heatmap__cell-color");
        expect(JSON.stringify(lastCellColor.style)).toContain("rgb(255, 0, 0)");
    });

    it("renders cells if value are all 0's", function () {
        const zeroData = [
            [0, 0, 0, 0],

        ];
        const component = getComponent({
            data: zeroData,
        });
        const rows = TestUtils.scryRenderedDOMNodesWithClass(component, "heatmap__row");

        const firstRow = rows[1]; // skip x-axis labels (+1)
        const zeroRowCells = TestUtils.scryRenderedDOMNodesWithClass(firstRow, "help-tooltip");
        const zeroCell = zeroRowCells[0];
        const zeroCellColor = TestUtils.findRenderedDOMNodeWithClass(zeroCell, "heatmap__cell-color");

        expect(zeroCellColor.style._values["background-color"]).toEqual("rgba(255, 0, 0, 0)");

    });
});