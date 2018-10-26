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


    it("renders the button with click callback", function () {
        let onClick = jest.genMockFunction();
        let component = getComponent({
            onClick: onClick
        });
        let button = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(onClick).not.toBeCalled();
        ReactTestUtils.Simulate.click(button);
        expect(onClick).toBeCalled();
    });


});