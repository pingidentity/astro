jest.dontMock("../PageSection");

describe("PageSection", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        PageSection = require("../PageSection");

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(
            <div>
                <PageSection title="Section" description="Something about this" {...props}>Hello there</PageSection>
            </div>
        );
    }

    it("renders with default data-id", function () {
        const component = getComponent({});
        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "page-section");
        expect(section).toBeTruthy();
    });

    it("renders with custom data-id", function () {
        const component = getComponent({
            "data-id": "test-page-section",
        });

        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "test-page-section");
        expect(section).toBeTruthy();
    });
});
