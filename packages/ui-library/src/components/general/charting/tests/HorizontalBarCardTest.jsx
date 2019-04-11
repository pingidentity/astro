import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import _ from "underscore";
import HorizontalBarCard from "../HorizontalBarCard";



describe("HorizontalBarCard", function () {

    const componentId = "horizontalBar-card";

    function getComponent (opts) {

        const withOptions = _.defaults(opts || {}, {
            "data-id": componentId,
            value: 2000,
            data: [
                { id: "Error 401", label: "401 Unauthorized", value: 2600 },
                { id: "Error 402", label: "402 Payment Required", value: 1890 },
                { id: "Error 403", label: "403 Forbidden", value: 3000 },
                { id: "Error 404", label: "404 Not Found", value: 2000 },
                { id: "Error 408", label: "405 Request Timeout", value: 3500 },
            ],

            options: [
                { label: "This Month", value: "1" },
                { label: "This Hour", value: "2" },
                { label: "Today", value: "3" },
                { label: "This Week", value: "4" },
            ]
        });

        return ReactTestUtils.renderIntoDocument(<HorizontalBarCard {...withOptions} />);
    }

    it("rendered component with data-id=horizontalBar-card", function () {
        const component = getComponent({
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it(" renders a title", function () {
        const component = getComponent({
            title: "Api Error Rate"
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__title");

        expect(element.textContent).toEqual("Api Error Rate");
    });


    it(" renders a number", function () {
        const component = getComponent({
            id: "title",
            value: 3,
            label: "error"
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "horizontalBar-card__total-number");

        expect(element.textContent).toEqual("3");
    });


    it(" renders a label", function () {
        const component = getComponent({
            id: "title",
            value: 3,
            label: "error"
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "horizontalBar-card__label");

        expect(element.textContent).toEqual("error");
    });

    it("renders a number greater than 1000", function () {
        const component = getComponent({
            value: 10000
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "horizontalBar-card__total-number");

        expect(element.textContent).toEqual("10,000");
    });

    it("renders a path", function() {
        const component = getComponent({});
        component.setState({ hoveredSection: "Error 401" });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "horizontalBar-card__hovered");

        expect(element).toBeDefined();
    });

});