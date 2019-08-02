jest.dontMock("../Anchor");
import KeyboardUtils from "../../../util/KeyboardUtils";

describe("Anchor", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Anchor = require("../Anchor");

    it("renders and calls click event", function() {
        var callback = jest.fn();
        var component = ReactTestUtils.renderIntoDocument(
            <Anchor onClick={callback}>Hello</Anchor>
        );

        var element = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.mouseDown(element);
        ReactTestUtils.Simulate.click(element);
        expect(callback).toBeCalled();
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("renders and calls click event with enter key", function() {
        var callback = jest.fn();
        var component = ReactTestUtils.renderIntoDocument(
            <Anchor onClick={callback}>Hello</Anchor>
        );

        var element = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.keyPress(element, {
            charCode: 22
        });
        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.keyPress(element, {
            charCode: KeyboardUtils.KeyCodes.ENTER
        });
        expect(callback).toBeCalled();
    });

    it("renders an add link", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <Anchor type={Anchor.linkTypes.ADD}>Hello</Anchor>
        );

        var element = TestUtils.findRenderedDOMNodeWithClass(component, "icon-plus");

        expect(element).toBeTruthy();
    });

    it("renders a remove link", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <Anchor type={Anchor.linkTypes.REMOVE}>Hello</Anchor>
        );

        var element = TestUtils.findRenderedDOMNodeWithClass(component, "icon-clear");

        expect(element).toBeTruthy();
    });

    it("renders page return link", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <Anchor type={Anchor.linkTypes.PAGE_RETURN}> Hello</Anchor>
        );

        var element = TestUtils.findRenderedDOMNodeWithClass(component, "page-return-link");

        expect(element).toBeTruthy();
    });
});

