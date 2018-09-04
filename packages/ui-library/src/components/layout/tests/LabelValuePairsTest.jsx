window.__DEV__ = true;

jest.dontMock("../LabelValuePairs");

describe("LabelValuePairs", function () {
    let React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        LabelValuePairs= require("../LabelValuePairs"),
        _ = require("underscore");

    const mockData = [
        {
            label: "Attribute Type",
            value: "String"
        },
        {
            label: "Category",
            value: "Profile"
        },
        {
            label: "name",
            value: "Tony Stark"
        },
        {
            label: "Display Name",
            value: "Iron Man"
        },
        {
            label: "Description with helphint",
            value: "Tony Stark is a playboy billionare who is a super hero with an iron suit",
            hintText: "this is the help text",
            hintPlacement: "left",
            hintLink: "#"
        },
        {
            divider: true,
        },
        {
            label: "Required",
            value: "NO"
        },
        {
            label: "Resgistration",
            value: "NO"
        },
    ];


    let componentId = "label-value-pairs";

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            dataPairs: mockData
        });

        return ReactTestUtils.renderIntoDocument(<div><LabelValuePairs {...opts} /></div>);
    }

    it("rendered component with data-id=label-display", function () {
        let component = getComponent({
        });

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders three div tags", function () {
        let component = getComponent({});

        let element = TestUtils.scryRenderedDOMNodesWithTag(component, "div");

        expect(element.length).toEqual(1);
    });

    it("renders a helphint", function () {
        let component = getComponent({
            hintText: "this is the help text",
        });

        let element = TestUtils.findRenderedDOMNodeWithClass(component, "__react_component_tooltip");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders hr tag", function () {
        let component = getComponent({});

        let element = TestUtils.scryRenderedDOMNodesWithTag(component, "hr");

        expect(element.length).toEqual(1);
    });

});