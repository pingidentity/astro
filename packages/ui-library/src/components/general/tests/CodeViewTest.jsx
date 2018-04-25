window.__DEV__ = true;

jest.dontMock("../CodeView");
jest.dontMock("../SelectText");

describe("CodeView", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore"),
        CodeView = require("../CodeView");

    let componentId = "code-view";

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId
        });

        return ReactTestUtils.renderIntoDocument(<CodeView {...opts} />);
    }

    it("rendered component with data-id", function() {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeDefined();
    });

    it("renders a code tag", function () {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithTag(component, "code");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders a pre tag", function () {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithTag(component, "pre");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders content", function () {
        let myContent = "text";

        let component = getComponent({
            value: myContent
        });

        let element = TestUtils.findRenderedDOMNodeWithTag(component, "code");

        expect(element.textContent).toBe(myContent);
    });
});