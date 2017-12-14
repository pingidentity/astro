window.__DEV__ = true;

jest.dontMock("../If");


describe("If component", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var If = require("../If");

    it("renders children when test value is true", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <If test={true}>
                <div data-id="conditionalContent">
                    <p>Some content</p>
                </div>
            </If>
        );

        var content = TestUtils.findRenderedDOMNodeWithDataId(component, "conditionalContent");
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.textContent).toEqual("Some content");
    });
    
    it("does not render children when test value is false", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <If test={false}>
                <div data-id="conditionalContent">
                    <p>Some content</p>
                </div>
            </If>
        );

        var content = TestUtils.scryRenderedDOMNodesWithDataId(component, "conditionalContent");
        expect(content.length).toBe(0);
    });
});
