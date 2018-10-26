window.__DEV__ = true;

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../../testutil/TestUtils";
import _ from "underscore";
import DashboardCard from "../DashboardCard";


jest.dontMock("../DashboardCard");

describe("DashboardCard", function () {

    const componentId = "dashboard-card";

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId
        });

        return ReactTestUtils.renderIntoDocument(<DashboardCard {...opts} />);
    }

    it("responds to flip", function () {
        const callback = jest.genMockFunction();
        const component = getComponent({
            flipped: true,
            onFlip: callback,
            back: <div/>
        });
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-view-toggle`);

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(toggle);
        expect(callback).toBeCalled();
    });

    it("responds to flip without a callback", function () {
        const component = getComponent({
            back: <div/>
        });
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-view-toggle`);

        expect(component.state.flipped).not.toBeTruthy();
        ReactTestUtils.Simulate.click(toggle);
        expect(component.state.flipped).toBeTruthy();
    });

    it("responds to checkbox", function () {
        const callback = jest.genMockFunction();
        const component = getComponent({
            back: <div/>,
            defaultChecked: false,
            onMakeDefault: callback
        });
        const checked = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-make-default`);

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.change(checked, { target: { checked: true } });
        expect(callback).toBeCalled();
    });

    it("renders a checkbox", function () {
        const callback = jest.genMockFunction();
        const component = getComponent({
            flipped: true,
            back: <div/>,
            defaultChecked: true,
            onMakeDefault: callback
        });
        const checked = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-make-default`);

        expect(component.state.defaultChecked).not.toBeTruthy();
        ReactTestUtils.Simulate.change(checked, { target: { checked: true } });
        expect(component.state.defaultChecked).toBeTruthy();
    });


    it("renders the error when provided", function () {
        const errorMessageText = "Uh oh.";
        const component = getComponent({ errorMessage: errorMessageText });

        const errorMessage = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__error");
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.textContent).toBe(errorMessageText);

        const topChart = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__front");
        expect(topChart).toBeTruthy();

        const back = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__back");
        expect(back).toBeFalsy();

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__front-title");
        expect(title).toBeFalsy();

        const control = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__control");
        expect(control).toBeFalsy();
    });

    it("renders the spinner when provided", function () {
        const component = getComponent({
            loading: true
        });

        const spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__loader");
        expect(spinnerContainer).toBeTruthy();

        const pageSpinner = TestUtils.findRenderedDOMNodeWithClass(spinnerContainer, "page-loader");
        expect(pageSpinner).toBeTruthy();
    });
});