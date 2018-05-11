jest.dontMock("../EditSection");

describe("EditSection", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        EditSection = require("../EditSection");

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(<div><EditSection {...props}>Hello there</EditSection></div>);
    }

    it("renders with default data-id", function () {
        const component = getComponent({});
        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "edit-section");
        expect(section).toBeTruthy();
    });

    it("renders with custom data-id", function () {
        const component = getComponent({
            "data-id": "test-edit-section",
            buttonBarProps: {
                "data-id": "test-button-bar"
            }
        });

        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "test-edit-section");
        expect(section).toBeTruthy();

        const bar = TestUtils.findRenderedDOMNodeWithDataId(component, "test-button-bar");
        expect(bar).toBeTruthy();
    });
});
