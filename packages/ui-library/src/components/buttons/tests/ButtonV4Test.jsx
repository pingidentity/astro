window.__DEV__ = true;

jest.dontMock("../Button");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import _ from "underscore";
import TestUtils from "../../../testutil/TestUtils";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import Button from "../Button";

describe("Button", function () {
    const componentId = "button";

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
        });

        return ReactTestUtils.renderIntoDocument(<div><Button {...opts} /></div>);
    }

    it("rendered component with data-id=button", function () {
        const component = getComponent({
            submit: true
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("data-id's do not change", () => {
        mountSnapshotDataIds(
            <Button
                disabled
                disabledText="test"
            />
        );
    });

    it("renders href tag with 'a' ", function () {
        const component = getComponent({
            href: "cnn.com"
        });

        const element = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders a help hint if disabconstext has a string and disabled is true ", function () {
        const component = getComponent({
            disabledText: "hello",
            disabled: true
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "button_help-hint");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });


    it("renders the button with click callback", function () {
        const onClick = jest.fn();
        const component = getComponent({
            onClick: onClick
        });
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(onClick).not.toBeCalled();
        ReactTestUtils.Simulate.click(button);
        expect(onClick).toBeCalled();
    });

    it("does not throw error with default onClick", () => {
        const component = getComponent();
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        ReactTestUtils.Simulate.click(button);
        expect(button).toBeTruthy();
    });
});
