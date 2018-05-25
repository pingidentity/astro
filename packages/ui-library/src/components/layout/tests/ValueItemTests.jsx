jest.dontMock("../ValueItem");

describe("ValueItem", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ValueItem = require("../ValueItem");

    function getComponent () {
        return ReactTestUtils.renderIntoDocument(
            <div>
                <ValueItem icon={<span className="icon-chat"/>}>Hello there</ValueItem>
            </div>
        );
    }

    it("renders with data-id and classes", function () {
        const component = getComponent({});
        const item = TestUtils.findRenderedDOMNodeWithDataId(component, "value-item");
        expect(item).toBeTruthy();

        const icon = TestUtils.findRenderedDOMNodeWithClass(item, "value-item__icon");
        const value = TestUtils.findRenderedDOMNodeWithClass(item, "value-item__value");

        expect(icon).toBeTruthy();
        expect(value).toBeTruthy();
    });
});
