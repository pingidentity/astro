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
                { id: "Inactive Users", value: 51233, color: "green" },
                { id: "Disabled Users", value: 3000, color: "pink" },
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

    it("renders a title", function () {
        const component = getComponent({
            title: "title"
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(element).toBeTruthy();
    });

    it("renders a label and number", function () {
        const component = getComponent({
            label: "title",
            value: 3
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(element).toBeTruthy();
    });

    it("renders a number greater than 1000", function () {
        const component = getComponent({
            value: 10000
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(element).toBeTruthy();
    });

    it("renders a dropdown", function() {
        const component = getComponent({});
        const dropDown = TestUtils.findRenderedDOMNodeWithDataId(component, "donut-card-drop-down");

        expect(dropDown).toBeDefined();
    });

    it("renders a Pie Chart", function() {
        const component = getComponent({});
        const pieChart = TestUtils.findRenderedDOMNodeWithDataId(component, "donut-card-chart");

        expect(pieChart).toBeDefined();
    });

    it("renders a back title", function() {
        const component = getComponent({});
        const title = TestUtils.findRenderedDOMNodeWithDataId(component, "donut-card-back-title");

        expect(title).toBeDefined();
    });


    it("renders hr tag", function() {
        const component = getComponent({});

        const element = TestUtils.scryRenderedDOMNodesWithTag(component, "hr");

        expect(element.length).toEqual(2);
    });

    it("renders an svg", function() {
        const component = getComponent({});

        const element = TestUtils.scryRenderedDOMNodesWithTag(component, "svg");

        expect(element.length).toEqual(3);
    });

    it("should render the state color", function() {
        const component = getComponent({});
        component.setState({ statColor: "red" });

        expect(component).toBeTruthy();
    });

    it("should render the state color to null", function() {
        const component = getComponent({});
        component.setState({ statColor: null });

        expect(component).toBeTruthy();
    });

});