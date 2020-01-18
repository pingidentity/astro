window.__DEV__ = true;

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import LabelValuePairs from "../LabelValuePairs";
import _ from "underscore";
import { shallow } from "enzyme";

describe("LabelValuePairs", function () {

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
            value: "No"
        },
        {
            label: "Registration",
            value: "No"
        },
        {
            title: "More Data Below",
        },
        {
            label: "Data",
            value: "1",
        },
        {
            label: "Data",
            value: "2",
        },
        {
            label: "Data",
            value: "3",
        },
        {
            title: "Title with hint",
            hintText: "This is where we put it"
        },
    ];

    const mockData2 = [
        {
            label: "Zero",
            value: 0,
        },
        {
            label: "One",
            value: 1,
        },
        {
            label: "Undefined",
        },
        {
            label: "Blank",
            value: "",
        }
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
        let component = getComponent({});

        let elements = TestUtils.scryRenderedDOMNodesWithClass(component, "__react_component_tooltip");

        expect(elements.length).toEqual(2);
    });

    it("renders hr tag", function () {
        let component = getComponent({});

        let element = TestUtils.scryRenderedDOMNodesWithTag(component, "hr");

        expect(element.length).toEqual(1);
    });

    it("renders two titles", function () {
        let component = getComponent({});

        let elements = TestUtils.scryRenderedDOMNodesWithClass(component, "label-value-pairs__title");

        expect(elements.length).toEqual(2);
    });

    it("renders empty values", function() {
        const component = shallow(<LabelValuePairs dataPairs={mockData2} />);

        expect(component.find(".label-value-pairs__label").length).toBe(4);
    });

    it("does not render empty values", function() {
        const component = shallow(<LabelValuePairs dataPairs={mockData2} pruneEmpty />);

        expect(component.find(".label-value-pairs__label").length).toBe(2);
    });

});