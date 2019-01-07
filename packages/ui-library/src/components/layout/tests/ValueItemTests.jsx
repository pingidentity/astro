jest.dontMock("../ValueItem");

describe("ValueItem", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ValueItem = require("../ValueItem"),
        dataId = "my-value-item",
        value = "Hello there";

    function getComponent (opts) {
        return ReactTestUtils.renderIntoDocument(
            <div>
                <ValueItem data-id={dataId} icon={<span className="icon-chat" />} {...opts}>{value}</ValueItem>
            </div>
        );
    }

    it("renders with data-id and classes", function () {
        const component = getComponent();
        const item = TestUtils.findRenderedDOMNodeWithDataId(component, dataId);

        expect(item).toBeTruthy();

        const iconDom = TestUtils.findRenderedDOMNodeWithClass(item, "value-item__icon");
        const valueDom = TestUtils.findRenderedDOMNodeWithClass(item, "value-item__value");

        expect(iconDom.childNodes[0]).toBeTruthy();
        expect(valueDom.textContent).toBe(value);
    });

    it("renders as inline when specified", function () {
        const component = getComponent({ inline: true });
        const item = TestUtils.findRenderedDOMNodeWithDataId(component, dataId);
        expect(item.className).toContain("value-item__inline");
    });
});
