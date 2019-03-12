window.__DEV__ = true;

jest.dontMock("../Button");

describe("Button", function () {
    let React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Button = require("../Button"),
        _ = require("underscore");

    let componentId = "button";



    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId
        });

        return ReactTestUtils.renderIntoDocument(<Button {...opts} />);
    }

    it("rendered component with data-id=button", function () {
        let component = getComponent({
            submit: true
        });

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders href tag with 'a' ", function () {
        let component = getComponent({
            href: "cnn.com"
        });

        let element = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders a help hint if disableText has a string and disabled is true ", function () {
        let component = getComponent({
            disabledText: "hello",
            disabled: true
        });

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, "button_help-hint");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });


    it("renders the button with click callback", function () {
        let onClick = jest.fn();
        let component = getComponent({
            onClick: onClick
        });
        let button = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(onClick).not.toBeCalled();
        ReactTestUtils.Simulate.click(button);
        expect(onClick).toBeCalled();
    });

    it("prevents default for a mouse down event", function() {
        const callback = jest.fn();
        const component = getComponent();
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        const event = { preventDefault: callback };

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.mouseDown(button, event);
        expect(callback).toBeCalled();
    });

    it("should show Cannonball warning if using 'add' class with no flag", function() {
        console.warn = jest.fn();

        expect(console.warn).not.toBeCalled();
        getComponent({ iconName: "add" });
        expect(console.warn).toBeCalled();
    });

    it("should not show the Cannonball warning if 'noSpacing' is true", function() {
        console.warn = jest.fn();

        getComponent({ iconName: "add", noSpacing: true });
        expect(console.warn).not.toBeCalled();
    });

    it("should not show the Cannonball warning if not using the add class", function() {
        console.warn = jest.fn();

        getComponent();
        expect(console.warn).not.toBeCalled();
    });

    it("should not show the Cannonball warning if the flag is set", function() {
        console.warn = jest.fn();

        getComponent({ iconName: "add", flags: [ "add-button-margin" ] });
        expect(console.warn).not.toBeCalled();
    });

});