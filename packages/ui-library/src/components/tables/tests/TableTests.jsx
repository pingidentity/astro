// jest.dontMock("../Table");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import { mount, shallow } from "enzyme";
import Table, {
    columnAlignments,
    overflowOptions,
    tableLayouts,
    tableWidths,
    Divider
} from "../Table";

jest.useFakeTimers();
describe("Table", function () {
    const headData = [
        "name",
        "age",
        "city"
    ];

    const bodyData = [
        [
            "tom",
            "25",
            "denver"
        ],
        [
            "jane",
            "36",
            "breckenridge"
        ],
        [
            "roy",
            "19",
            "arvada"
        ]
    ];

    const dataObjects = [
        {
            name: "tom",
            age: 25,
            city: "denver"
        },
        {
            name: "jane",
            age: 36,
            city: "breckenridge"
        },
        {
            name: "roy",
            age: 19,
            city: "arvada"
        }
    ];

    it("renders table with head and body", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><Table headData={headData} bodyData={bodyData} /></div>);

        const head = TestUtils.scryRenderedDOMNodesWithTag(component, "thead");
        const rows = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "th");
        const values = TestUtils.scryRenderedDOMNodesWithTag(component, "td");

        expect(head.length).toBe(1);
        expect(rows.length).toBe(4);
        expect(labels.length).toBe(3);
        expect(values.length).toBe(9);

    });

    it("renders table with data objects", function () {
        const component = ReactTestUtils.renderIntoDocument(<div><Table data={dataObjects} /></div>);

        const head = TestUtils.scryRenderedDOMNodesWithTag(component, "thead");
        const rows = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "th");
        const values = TestUtils.scryRenderedDOMNodesWithTag(component, "td");

        expect(head.length).toBe(1);
        expect(rows.length).toBe(4);
        expect(labels.length).toBe(3);
        expect(values.length).toBe(9);
    });

    it("renders table with row labels", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><Table headData={headData} bodyData={bodyData} rowLabels={true} /></div>);

        const head = TestUtils.scryRenderedDOMNodesWithTag(component, "thead");
        const rows = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "th");
        const values = TestUtils.scryRenderedDOMNodesWithTag(component, "td");

        expect(head.length).toBe(1);
        expect(rows.length).toBe(4);
        expect(labels.length).toBe(6);
        expect(values.length).toBe(6);

    });

    it("renders table without lines", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><Table headData={headData} bodyData={bodyData} lines={false} /></div>);

        const findClass = TestUtils.scryRenderedDOMNodesWithClass(component, "grid--no-lines");

        expect(findClass.length).toBe(1);
    });

    it("renders table using a cell renderer", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><Table headData={headData} bodyData={bodyData} cellRenderers={[
                null, value => <div data-id="age">{value}</div>
            ]} /></div>);

        const ages = TestUtils.scryRenderedDOMNodesWithDataId(component, "age");

        expect(ages.length).toBe(3);
    });

    it("does not render with solid lines class if there is header data", () => {
        const component = ReactTestUtils.renderIntoDocument(
            <div><Table headData={headData} bodyData={bodyData} cellRenderers={[
                null, value => <div data-id="age">{value}</div>
            ]} /></div>);

        const solidLines = TestUtils.findRenderedDOMNodeWithClass(component, "grid--solid-lines");

        expect(solidLines).toBeFalsy();
    });

    it("renders with full width class if width is full", () => {
        const component = shallow(
            <Table
                bodyData={bodyData}
                width={tableWidths.FULL}
            />
        );

        expect(component.find(".grid--full-width").exists()).toBeTruthy();
    });

    it("does not render with full width class if width is not full", () => {
        const component = shallow(
            <Table
                bodyData={bodyData}
            />
        );

        expect(component.find(".grid--full-width").exists()).toBeFalsy();
    });

    it("renders with fixed class if layout is fixed", () => {
        const component = shallow(
            <Table
                bodyData={bodyData}
                layout={tableLayouts.FIXED}
            />
        );

        expect(component.find(".grid--fixed").exists()).toBeTruthy();
    });

    it("does not render with fixed class if layout is not fixed", () => {
        const component = shallow(
            <Table
                bodyData={bodyData}
            />
        );

        expect(component.find(".grid--fixed").exists()).toBeFalsy();
    });

    it("renders correct column with center alignment class", () => {
        const component = shallow(
            <Table
                bodyData={bodyData}
                headData={headData}
                columnStyling={[
                    {
                        alignment: columnAlignments.CENTER
                    }
                ]}
            />
        );

        const [firstHeader, secondHeader] = component.find("th");

        expect(firstHeader.props.className).toContain("grid__column--alignment-center");
        expect(secondHeader.props.className).not.toContain("grid__column--alignment-center");
    });

    it("renders correct column and cell with ellipsis overflow class", () => {
        const component = mount(
            <Table
                bodyData={bodyData}
                headData={headData}
                columnStyling={[
                    {
                        contentOverflow: overflowOptions.ELLIPSIS
                    }
                ]}
            />
        );

        const [firstHeader, secondHeader] = component.find("th Text");

        expect(firstHeader.props.overflow).toEqual("ellipsis");
        expect(secondHeader.props.children.props).toBeUndefined();

        const [firstCell, secondCell] = component.find("td");

        expect(firstCell.props.children.props.className).toContain("grid__cell-content-wrapper--overflow-ellipsis");
        expect(secondCell.props.children.props.className)
            .not
            .toContain("grid__cell-content-wrapper--overflow-ellipsis");
    });

    it("renders with column width if width is passed in", () => {
        const component = mount(
            <Table
                bodyData={bodyData}
                headData={headData}
                columnStyling={[
                    {
                        width: "50px"
                    }
                ]}
            />
        );

        const [firstHeader, secondHeader] = component.find("th");

        expect(firstHeader.props.style.width).toEqual("50px");
        expect(secondHeader.props.style.width).not.toEqual("50px");

        const [firstCell, secondCell] = component.find("td");

        expect(firstCell.props.style.width).toEqual("50px");
        expect(secondCell.props.style.width).not.toEqual("50px");
    });

    it("renders with column max width if width is passed in", () => {
        const component = mount(
            <Table
                bodyData={bodyData}
                headData={headData}
                columnStyling={[
                    {
                        maxWidth: "50px"
                    }
                ]}
            />
        );

        const [firstHeader, secondHeader] = component.find("th");

        expect(firstHeader.props.style.maxWidth).toEqual("50px");
        expect(secondHeader.props.style.maxWidth).not.toEqual("50px");

        const [firstCell, secondCell] = component.find("td");

        expect(firstCell.props.style.maxWidth).toEqual("50px");
        expect(secondCell.props.style.maxWidth).not.toEqual("50px");
    });

    it("renders with column max width if width is passed in", () => {
        const component = mount(
            <Table
                bodyData={bodyData}
                headData={headData}
                columnStyling={[
                    {
                        minWidth: "50px"
                    }
                ]}
            />
        );

        const [firstHeader, secondHeader] = component.find("th");

        expect(firstHeader.props.style.minWidth).toEqual("50px");
        expect(secondHeader.props.style.minWidth).not.toEqual("50px");

        const [firstCell, secondCell] = component.find("td");

        expect(firstCell.props.style.minWidth).toEqual("50px");
        expect(secondCell.props.style.minWidth).not.toEqual("50px");
    });

    it("renders with overflow ellipsis class if overflow value is ellipsis", () => {
        const component = mount(
            <Table
                bodyData={bodyData}
                headData={headData}
                columnStyling={[
                    {
                        minWidth: "50px"
                    }
                ]}
            />
        );

        const [firstHeader, secondHeader] = component.find("th");

        expect(firstHeader.props.style.minWidth).toEqual("50px");
        expect(secondHeader.props.style.minWidth).not.toEqual("50px");

        const [firstCell, secondCell] = component.find("td");

        expect(firstCell.props.style.minWidth).toEqual("50px");
        expect(secondCell.props.style.minWidth).not.toEqual("50px");
    });

    it("renders an empty table cell without errors", () => {
        const component= mount(
            <Table
                headData={headData}
                bodyData={[[
                    undefined,
                    undefined
                ]]}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders a divider when the divder component is called", () => {
        const component = shallow (
            <Divider />
        );
        expect(component.exists()).toEqual(true);
    });

    it("renders with fixedHeader class if fixedHeader prop is used", () => {
        const component = shallow(
            <Table
                bodyData={bodyData}
                headData={headData}
                fixedHeader
            />
        );

        component.instance().setState({ loaded: true });
        expect(component.find(".tr--fixed-header").exists()).toBeTruthy();
    });

    it("does not render the fixedHeader class if fixedHeader prop is not used", () => {
        const component = shallow(
            <Table
                bodyData={bodyData}
                headData={headData}
            />
        );
        expect(component.find(".tr--fixed-header").exists()).toBeFalsy();
    });

    it("sets loaded state to true if fixedHeader prop is true", () => {

        const component = shallow(
            <Table
                bodyData={bodyData}
                headData={headData}
                fixedHeader
            />
        );

        expect(component.state("loaded")).toEqual(false);

        jest.runAllTimers();

        expect(component.state("loaded")).toEqual(true);
    });

    it("adds resize listener on mount", () => {
        window.addEventListener = jest.fn();

        expect(window.addEventListener.mock.calls.find(([event]) => {
            return event === "resize";
        })).not.toBeDefined();

        mount(
            <Table
                bodyData={bodyData}
                headData={headData}
                fixedHeader
            />
        );

        const resizeListener = window.addEventListener.mock.calls.find(([event]) => {
            return event === "resize";
        });

        expect(resizeListener).toBeDefined();
        // Just calling the function here to make sure it doesn't error out.
        resizeListener[1]();
    });

    it("removes resize listener on unmount", () => {
        window.removeEventListener = jest.fn();

        const component = mount(
            <Table
                bodyData={bodyData}
                headData={headData}
                fixedHeader
            />
        );

        expect(window.removeEventListener.mock.calls.find(([event]) => {
            return event === "resize";
        })).not.toBeDefined();

        component.unmount();

        expect(window.removeEventListener.mock.calls.find(([event]) => {
            return event === "resize";
        })).toBeDefined();
    });
});