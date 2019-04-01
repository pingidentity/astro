import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import PasswordStrengthMeter from "../PasswordStrengthMeter";

jest.dontMock("../PasswordStrengthMeter");

describe("PasswordStrengthMeter", function () {

    const defaultLabels = ["super bad", "bad", "ok", "nice"];

    const defaultProps = {
        "data-id": "my-component",
        labels: defaultLabels
    };

    function getComponent(opts) {
        return ReactTestUtils.renderIntoDocument(
            <span><PasswordStrengthMeter {...defaultProps} {...opts} /></span>
        );
    }

    it("renders no bar coloring if score is zero", function () {
        const component = getComponent({ score: 0 });
        const componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);
        expect(componentDom.className).toContain("password-meter--s0");
    });

    it("renders a very weak score", function () {
        const component = getComponent({ score: 1 });
        const componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);
        const label = TestUtils.findRenderedDOMNodeWithDataId(componentDom, "password-meter-label");
        expect(componentDom.className).toContain("password-meter--s1");
        expect(label.textContent).toContain(defaultLabels[0]);
    });

    it("renders a weak score", function () {
        const component = getComponent({ score: 2 });
        const componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);
        const label = TestUtils.findRenderedDOMNodeWithDataId(componentDom, "password-meter-label");
        expect(componentDom.className).toContain("password-meter--s2");
        expect(label.textContent).toContain(defaultLabels[1]);
    });

    it("renders a good score", function () {
        const component = getComponent({ score: 3 });
        const componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);
        const label = TestUtils.findRenderedDOMNodeWithDataId(componentDom, "password-meter-label");
        expect(componentDom.className).toContain("password-meter--s3");
        expect(label.textContent).toContain(defaultLabels[2]);
    });

    it("renders a strong score", function () {
        const component = getComponent({ score: 4 });
        const componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);
        const label = TestUtils.findRenderedDOMNodeWithDataId(componentDom, "password-meter-label");
        expect(componentDom.className).toContain("password-meter--s4");
        expect(label.textContent).toContain(defaultLabels[3]);
    });
});