import { handleOpen } from "../../../util/behaviors/popsOver.js";

import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import KeyboardUtils from "../../../util/KeyboardUtils";
import Popover from "../Popover";
import _ from "underscore";
const Wrapper = TestUtils.UpdatePropsWrapper;

window.__DEV__ = true;

jest.dontMock("../Popover");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../../util/Utils.js");

jest.mock("popper.js");
jest.mock("react-portal");

describe("Popover", function() {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    beforeEach(function() {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("renders open state using portal", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={true}>
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );
        var popupFrame = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popup-frame"
        );
        var content = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "content"
        );

        expect(popupFrame.length).toBe(1);
        expect(content.length).toBe(1);
    });

    it("renders closed state", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={false}>
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );
        var popoverTarget = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popover__trigger"
        );

        expect(popoverTarget.length).toBe(1);

        var popoverContainer = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popover__container"
        );
        var popupFrame = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popup-frame"
        );
        var content = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "content"
        );

        expect(popoverContainer.length).toBe(0);
        expect(popupFrame.length).toBe(0);
        expect(content.length).toBe(0);
    });

    it("renders with top and left classes", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={true} placement="top left">
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );
        var withLeftClass = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popover--left"
        );
        var withTopClass = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popover--top"
        );

        expect(withLeftClass.length).toBe(1);
        expect(withTopClass.length).toBe(1);
    });

    it("renders with right class", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={true} placement="right">
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );
        var withRightClass = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popover--right"
        );

        expect(withRightClass.length).toBe(1);
    });

    it("renders with top and left placement using a portal", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={true} placement="top left">
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );
        var withLeftClass = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popover--left"
        );
        var withTopClass = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popover--top"
        );

        expect(withLeftClass.length).toBe(1);
        expect(withTopClass.length).toBe(1);
    });

    it("renders with right placement using a portal", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={true} placement="right">
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );
        var withRightClass = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popover--right"
        );

        expect(withRightClass.length).toBe(1);
    });

    it("renders with center placement using a portal", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={true} placement="center">
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );
        var withRightClass = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "popover--right"
        );

        expect(withRightClass.length).toBe(0);
    });

    it("notifies toggle when clicking trigger", function() {
        var callback = jest.fn();

        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <Popover onToggle={callback} label="hello" open={false}>
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );

        var target = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "popover__trigger"
        );

        expect(callback).not.toBeCalled(); //make sure callback was NOT triggered

        ReactTestUtils.Simulate.click(target, {});

        expect(callback).toBeCalled(); //make sure callback was triggered
    });

    it("registers global listener on mount if component is open", function() {
        //let's override defer or execute func immediately for tests
        _.defer = function(func) {
            func();
        };

        ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={true}>
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );

        expect(
            TestUtils.mockCallsContains(window.addEventListener, "click")
        ).toBe(true);
        expect(
            TestUtils.mockCallsContains(window.addEventListener, "keydown")
        ).toBe(true);
    });

    it("does not register global listener on mount if component is closed", function() {
        //let's override defer or execute func immediately for tests
        _.defer = function(func) {
            func();
        };

        ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={false}>
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );

        expect(
            TestUtils.mockCallsContains(window.addEventListener, "click")
        ).toBe(false);
        expect(
            TestUtils.mockCallsContains(window.addEventListener, "keydown")
        ).toBe(false);
    });

    it("unregister global listeners on unmount", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <Popover label="hello" open={true}>
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );

        expect(
            TestUtils.mockCallsContains(window.removeEventListener, "click")
        ).toBe(false);
        expect(
            TestUtils.mockCallsContains(window.removeEventListener, "keydown")
        ).toBe(false);

        //trigger unmount
        ReactDOM.unmountComponentAtNode(
            ReactDOM.findDOMNode(component).parentNode
        );

        expect(
            TestUtils.mockCallsContains(window.removeEventListener, "click")
        ).toBe(true);
        expect(
            TestUtils.mockCallsContains(window.removeEventListener, "keydown")
        ).toBe(true);
    });

    it("unregisters listener when transitioning from open to closed", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <Wrapper type={Popover} label="hello" open={true}>
                <div className="content">Popover</div>
            </Wrapper>
        );

        component._setProps({ open: false });

        expect(
            TestUtils.mockCallsContains(window.removeEventListener, "click")
        ).toBe(true);
        expect(
            TestUtils.mockCallsContains(window.removeEventListener, "keydown")
        ).toBe(true);
    });

    it("registers listener when transitioning from closed to open", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <Wrapper type={Popover} label="hello" open={false}>
                <div className="content">Popover</div>
            </Wrapper>
        );

        component._setProps({ open: true });

        expect(
            TestUtils.mockCallsContains(window.addEventListener, "click")
        ).toBe(true);
        expect(
            TestUtils.mockCallsContains(window.addEventListener, "keydown")
        ).toBe(true);
    });

    it("registers and unregisters listener when transitioning -- stateful", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <Wrapper type={Popover} label="hello">
                <div className="content">Popover</div>
            </Wrapper>
        );

        var trigger = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "popover__trigger"
        );
        ReactTestUtils.Simulate.click(trigger, {});
        expect(
            TestUtils.mockCallsContains(window.addEventListener, "click")
        ).toBe(true);
        expect(
            TestUtils.mockCallsContains(window.addEventListener, "keydown")
        ).toBe(true);

        ReactTestUtils.Simulate.click(trigger, {});
        expect(
            TestUtils.mockCallsContains(window.removeEventListener, "click")
        ).toBe(true);
        expect(
            TestUtils.mockCallsContains(window.removeEventListener, "keydown")
        ).toBe(true);
    });

    it("triggers callback when clicked outside", function() {
        var callback = jest.fn();

        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({
            toString: () => "",
        });

        ReactTestUtils.renderIntoDocument(
            <div>
                <Popover onToggle={callback} label="hello" open={true}>
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );

        var handler = TestUtils.findMockCall(
            window.addEventListener,
            "click"
        )[1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        };

        expect(callback).not.toBeCalled();

        //click outside
        handler(e);

        expect(callback).toBeCalled();
    });

    it("triggers callback when global key event fires", function() {
        var callback = jest.fn();

        ReactTestUtils.renderIntoDocument(
            <div>
                <Popover onToggle={callback} label="hello" open={true}>
                    <div className="content">Popover</div>
                </Popover>
            </div>
        );

        var handler = TestUtils.findMockCall(
            window.addEventListener,
            "keydown"
        )[1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
            keyCode: KeyboardUtils.KeyCodes.ESC
        };
        var eWrong = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
            keyCode: 2
        };

        expect(callback).not.toBeCalled();
        handler(eWrong);
        expect(callback).not.toBeCalled();

        //click outside
        handler(e);

        expect(callback).toBeCalled();
    });

    it("call handleOpen", function() {
        var callback = jest.fn();

        expect(callback).not.toBeCalled();
        handleOpen({ onOpen: callback });
        expect(callback).toBeCalled();
    });
});
