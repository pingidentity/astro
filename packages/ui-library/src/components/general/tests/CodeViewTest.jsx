window.__DEV__ = true;

jest.dontMock("../CodeView");
jest.dontMock("../SelectText");

describe("CodeView", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore"),
        CodeView = require("../CodeView");

    const componentId = "code-view";

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            value: "",
            language: "json"
        });

        return ReactTestUtils.renderIntoDocument(<CodeView {...opts} />);
    }

    it("rendered component with data-id", function() {
        const component = getComponent({});

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeDefined();
    });

    it("renders a code tag", function () {
        const component = getComponent({});

        const element = TestUtils.findRenderedDOMNodeWithTag(component, "code");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders a pre tag", function () {
        const component = getComponent({});

        const element = TestUtils.findRenderedDOMNodeWithTag(component, "pre");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders content and language", function () {
        const myContent = "text";

        const component = getComponent({
            value: myContent,
            language: "xml"
        });

        const element = TestUtils.findRenderedDOMNodeWithTag(component, "code");

        expect(element.textContent).toBe(myContent);
    });

    it("is logging warning if you supplied an invalid language", function () {

        console.warn = jest.fn();

        const myContent = "text";

        getComponent({
            value: myContent,
            language: "pemyrearlstone"
        });


        expect(console.warn).toBeCalled();
    });
});