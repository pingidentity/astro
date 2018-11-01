import React from "react";
import { shallow } from "enzyme";
import { isDOMComponent, renderIntoDocument } from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import DropDownSelector from "../DropDownSelector";
import MultiseriesChart, { chartTypes } from "../MultiseriesChart";
import { toRechartsDataFormat } from "../../../../util/ChartingUtils";

window.__DEV__ = true;

describe("MultiseriesChart", () => {
    const baseClass = "multiseries-chart";
    const points = [1, 2, 3, 4, 5];
    const baseData = [
        {
            id: "confluence",
            name: "Confluence",
            data: points
        },
        {
            id: "dataDog",
            name: "DataDog",
            data: points
        },
        {
            id: "docuSign",
            name: "DocuSign",
            data: points
        },
        {
            id: "googleCalendar",
            name: "Google Calendar",
            data: points
        },
        {
            id: "googleDrive",
            name: "Google Drive",
            data: points
        },
        {
            id: "time",
            name: "Time",
            data: [
                "Jan '18",
                "Feb '18",
                "Mar '18",
                "Apr '18",
                "May '18",
                "June '18",
                "July '18",
                "Aug '18",
                "Sept '18",
                "Oct '18",
                "Nov '18",
                "Dec '18"
            ]
        }
    ];

    const defaults = {
        onResultClick: jest.genMockFunction(),
        data: toRechartsDataFormat(baseData),
        options: baseData,
        xAxisKey: "time"
    };

    const dummyEvent = {
        persist: () => {}
    };

    const getComponent = (props) => {
        return renderIntoDocument(
            <MultiseriesChart
                {...{
                    ...defaults,
                    ...props
                }}
            />
        );
    };

    it("should render the component", () => {
        const component = getComponent();
        expect(component).toBeTruthy();
    });

    it("renders with multiseries-chart--line class for line chart", () => {
        const component = getComponent({
            bottomPanel: <div/>,
            type: chartTypes.LINE
        });

        const line = TestUtils.findRenderedDOMNodeWithClass(component, `${baseClass}--line`);
        const bottomPanel = TestUtils.findRenderedDOMNodeWithClass(component, `${baseClass}__bottom-panel--line`);
        expect(isDOMComponent(line)).toEqual(true);
        expect(isDOMComponent(bottomPanel)).toEqual(true);
    });

    it("does not render with multiseries-chart--line class for area chart", () => {
        const component = getComponent({
            bottomPanel: <div/>,
            selectedDataSets: ["confluence"],
            type: chartTypes.AREA
        });

        const line = TestUtils.findRenderedDOMNodeWithClass(component, `${baseClass}--line`);
        const bottomPanel = TestUtils.findRenderedDOMNodeWithClass(component, `${baseClass}__bottom-panel--line`);
        expect(isDOMComponent(line)).toEqual(false);
        expect(isDOMComponent(bottomPanel)).toEqual(false);
    });

    it("renders bottom panel if there is a bottom panel prop", () => {
        const component = getComponent({
            bottomPanel: <div data-id="panel"/>,
            type: chartTypes.LINE
        });
        const bottomPanel = TestUtils.findRenderedDOMNodeWithDataId(component, "panel");
        expect(isDOMComponent(bottomPanel)).toEqual(true);
    });

    it("does not render bottom panel if there is not a bottom panel prop", () => {
        const component = getComponent({
            type: chartTypes.LINE
        });
        const bottomPanel = TestUtils.findRenderedDOMNodeWithClass(component, `${baseClass}__bottom-panel`);
        expect(isDOMComponent(bottomPanel)).toEqual(false);
    });

    it("renders title if there is a title prop", () => {
        const component = getComponent({
            title: <div data-id="title"/>,
            type: chartTypes.LINE
        });
        const title = TestUtils.findRenderedDOMNodeWithDataId(component, "title");
        expect(isDOMComponent(title)).toEqual(true);
    });

    it("does not render title if there is not a title prop", () => {
        const component = getComponent({
            type: chartTypes.LINE
        });
        const title = TestUtils.findRenderedDOMNodeWithClass(component, `${baseClass}__title`);
        expect(isDOMComponent(title)).toEqual(false);
    });

    it("renderYAxis returns correct value if label is passed in", () => {
        const component = getComponent({
            label: "SNARF",
            type: chartTypes.LINE
        });
        const label = component.renderYAxis("SNARF");
        expect(label).toBeTruthy();
    });

    it("does not render label if there is not a label prop", () => {
        const component = getComponent({
            type: chartTypes.LINE
        });
        const label = TestUtils.findRenderedDOMNodeWithClass(component, `${baseClass}__chart-axis-label`);
        expect(isDOMComponent(label)).toEqual(false);
    });

    it("correctly sets selected datasets", () => {
        const component = getComponent();
        component.handleSelectDataSet({ id: "confluence" }, dummyEvent);
        expect(component.state.selectedDataSets).toEqual(["confluence"]);
    });

    it("does not update its state on add if selectedDataSets prop is passed in", () => {
        const component = getComponent({
            selectedDataSets: []
        });
        component.handleSelectDataSet({ id: "confluence" }, dummyEvent);
        expect(component.state.selectedDataSets).toEqual([]);
    });

    it("calls onSelectOption prop", () => {
        const onSelectOption = jest.fn();
        const component = getComponent({ onSelectOption });
        component.handleSelectDataSet({ id: "confluence" }, dummyEvent);
        expect(onSelectOption).toHaveBeenCalledWith("confluence", dummyEvent);
    });

    it("correctly deselects datasets", () => {
        const component = getComponent();
        component.handleSelectDataSet({ id: "confluence" }, dummyEvent);
        component.handleDeselectDataSet("confluence", dummyEvent);
        expect(component.state.selectedDataSets).toEqual([]);
    });

    it("does not update its state on remove if selectedDataSets prop is passed in", () => {
        const component = getComponent({
            selectedDataSets: ["confluence"]
        });
        component.handleDeselectDataSet({ id: "confluence" }, dummyEvent);
        expect(component.state.selectedDataSets).toEqual(["confluence"]);
    });

    it("calls onDeselectOption prop", () => {
        const onDeselectOption = jest.fn();
        const component = getComponent({ onDeselectOption });
        component.handleDeselectDataSet("confluence", dummyEvent);
        expect(onDeselectOption).toHaveBeenCalledWith("confluence", dummyEvent);
    });

    it("renderTooltip correctly runs custom tooltip function", () => {
        const custom = jest.fn();
        const component = getComponent({
            tooltip: custom
        });

        component.renderTooltip({
            label: "Jan '18'",
            payload: [
                {
                    dataKey: "confluence",
                    data: points[0]
                },
                {
                    dataKey: "dataDog",
                    data: points[0]
                },
                {
                    dataKey: "docuSign",
                    data: points[0]
                },
                {
                    dataKey: "googleCalendar",
                    data: points[0]
                },
                {
                    dataKey: "googleDrive",
                    data: points[0]
                }
            ]
        });

        expect(custom).toHaveBeenCalled();
    });

    it("renderTooltip handles null payload", () => {
        const custom = jest.fn();
        const component = getComponent({
            tooltip: custom
        });

        component.renderTooltip({
            label: "Jan '18'",
            payload: null
        });

        expect(custom).toHaveBeenCalled();
    });

    it("renderTooltip handles undefined payload", () => {
        const custom = jest.fn();
        const component = getComponent({
            tooltip: custom
        });

        component.renderTooltip({
            label: "Jan '18'",
            payload: undefined
        });

        expect(custom).toHaveBeenCalled();
    });

    it("should render if menuRequiredText is a string", () => {
        const component = shallow(
            <MultiseriesChart
                {...defaults}
                menuRequiredText="required"
            />
        );

        const selector = component.find(DropDownSelector);

        expect(selector.props().requiredText).toEqual("required");
    });

    it("should render if menuRequiredText is a function", () => {
        const requiredFn = () => "required";
        const component = shallow(
            <MultiseriesChart
                {...defaults}
                menuRequiredText={requiredFn}
            />
        );

        const selector = component.find(DropDownSelector);

        expect(selector.props().requiredText).toEqual("required");
    });
});
