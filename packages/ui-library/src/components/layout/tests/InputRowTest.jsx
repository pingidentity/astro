describe("InputRow", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        InputRow = require("../InputRow");

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(
            <div>
                <InputRow {...props}>Hello there</InputRow>
            </div>
        );
    }
    it("renders with default data-id", function () {
        const component = getComponent({});
        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "input-row");
        expect(section).toBeTruthy();
    });
});