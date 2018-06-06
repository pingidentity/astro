window.__DEV__ = true;

jest.dontMock("../PageSpinner");
jest.dontMock("../Spinner");

describe("PageSpinner", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        PageSpinner = require("../PageSpinner"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            show: true,
        });

        return ReactTestUtils.renderIntoDocument(
            <div>
            <PageSpinner {...opts}>
                <div>whatever</div>
            </PageSpinner>
            </div>
        );
    }


    it("render component with data-id", function () {
        const component = getComponent(
            { "data-id": "page-spinner" }
        );

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "spinner__text");

        expect(element).toBeDefined();
    });

    it("renders text", function () {
        const myContent = "whatever";

        const component = getComponent({
            children: myContent
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "spinner__text");
        console.log(element);

        expect(element.textContent).toBe(myContent);

    });
});