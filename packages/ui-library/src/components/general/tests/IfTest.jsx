window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../If.jsx");


describe("If component", function () {
    var React = require("react/addons");
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require("../../../testutil/TestUtils");
    var If = require("../If.jsx");

    it("renders children when test value is true", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <If test={true}>
                <div data-id="conditionalContent">
                    <p>Some content</p>
                </div>
            </If>
        );

        var content = TestUtils.findRenderedDOMComponentWithDataId(component, "conditionalContent");
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.getDOMNode().textContent).toEqual("Some content");
    });
    
    it("does not render children when test value is false", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <If test={false}>
                <div data-id="conditionalContent">
                    <p>Some content</p>
                </div>
            </If>
        );

        var content = TestUtils.scryRenderedDOMComponentsWithDataId(component, "conditionalContent");
        expect(content.length).toBe(0);
    });
});