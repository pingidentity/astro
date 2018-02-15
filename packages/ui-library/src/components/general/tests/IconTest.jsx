window.__DEV__ = true;

jest.dontMock("../Icon");

describe("Icon", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Icon = require("../Icon");

    const getComponent = (props) => {
        /*
        NOTE: Pure components must be wrapped in an element (div or whatever) so that Jest can properly render the
        component. Jest will return the component as null if this is not done.
        */
        return ReactTestUtils.renderIntoDocument(<div><Icon {...props} /></div>);
    };

    it("renders the component", function () {
        var dataId = "myicon",
            childContent = "Some child content",
            iconName = "cog",
            component = getComponent({
                "data-id": dataId,
                iconName: iconName,
                children: childContent
            }),
            iconContainer = TestUtils.findRenderedDOMNodeWithDataId(component, dataId),
            iconGraphic = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-graphic"),
            iconContent = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-content");

        expect(iconContainer).toBeDefined();
        expect(iconGraphic).toBeDefined();
        expect(iconContent).toBeDefined();

        expect(iconGraphic.className).toContain("icon-" + iconName);
        expect(iconContent.textContent).toBe(childContent);
    });

});
