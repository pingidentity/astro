window.__DEV__ = true;

jest.dontMock("../PageSpinner");
jest.dontMock("../Spinner");

describe("PageSpinner", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        PageSpinner = require("../PageSpinner"),
        _ = require("underscore");

    const dataId = "my-page-spinner";

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


    it("render component as normal-sized by default", function () {
        const component = getComponent(
            { "data-id": dataId }
        );

        expect(component).toBeDefined();

        const smallSpinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "page-loader--small");
        expect(smallSpinnerContainer).toBeFalsy();
    });

    it("renders text", function () {
        const message = "whatever";
        const component = getComponent({
            children: message
        });

        const spinnerText = TestUtils.findRenderedDOMNodeWithClass(component, "page-loader__text");
        expect(spinnerText.textContent).toBe(message);
    });

    it("displays small", function () {
        const component = getComponent({
            small: true
        });

        const smallSpinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "page-loader--small");
        expect(smallSpinnerContainer).toBeTruthy();
    });

    it("displays as modal", function () {
        const component = getComponent({
            modal: true
        });

        const modalSpinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "modal");
        expect(modalSpinnerContainer).toBeTruthy();
    });
});