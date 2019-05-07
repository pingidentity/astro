import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import _ from "underscore";
import DonutCard from "../DonutCard";


describe("DonutCard", function () {

    const componentId = "donut-card";

    function getComponent (opts) {
        const withDefaults = _.defaults(opts || {}, {
            "data-id": componentId,
            data: [
                { id: "Enabled Users", value: 120543 , color: "#E12F51" },
                { id: "Inactive Users", value: 51233 },
                { id: "Disabled Users", value: 3000 },
            ],
            options: [
                { label: "Current", value: "1" },
                { label: "30 DAYS", value: "2" },
                { label: "60 DAYS", value: "3" },
                { label: "90 DAYS", value: "4" },
            ]
        });

        return ReactTestUtils.renderIntoDocument(<DonutCard {...withDefaults} />);
    }

    it("rendered component with data-id=donut-card", function () {
        const component = getComponent({
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });


    it("renders a label and number", function () {
        const component = getComponent({
            label: "title",
            value: 3
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "donut-card__center-number");

        expect(element.textContent).toEqual("3");
    });

    it("renders value correctly when greater than 1,000", function () {
        const component = getComponent({
            value: 1234
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "donut-card__center-number");
        expect(element.textContent).toEqual("1.23k");
    });

    it("renders value correctly when greater than 10,000", function () {
        const component = getComponent({
            value: 12345
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "donut-card__center-number");
        expect(element.textContent).toEqual("12.3k");
    });

    it("renders value correctly when greater than 100,000", function () {
        const component = getComponent({
            value: 123456
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "donut-card__center-number");
        expect(element.textContent).toEqual("123k");
    });

    it("renders value correctly when than 1,000,000", function () {
        const component = getComponent({
            value: 1234567
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "donut-card__center-number");
        expect(element.textContent).toEqual("1.23m");
    });

    it("renders a path", function() {
        const component = getComponent({});
        component.setState({ hoveredSection: "Enabled Users" });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "donut-card__hovered");

        expect(element).toBeDefined();
    });

    it("populates the state on mouseover", function () {
        const component = getComponent({});

        const e = {
            preveventDefault: () => {}
        };

        component._mouseOver({
            id: "test"
        }, 0, e);

        expect(component.state.hoveredSection).toEqual("test");
    });
});