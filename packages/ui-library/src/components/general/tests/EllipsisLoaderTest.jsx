window.__DEV__ = true;

jest.dontMock("../EllipsisLoader");

describe("Ellipsis loader", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var EllipsisLoader = require("../EllipsisLoader");

    it("renders the animated ellipsis when the loading flag is set to true", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader data-id="test-loader" loading={true} className="css-class"/>
        );

        var loader = TestUtils.findRenderedDOMNodeWithDataId(component, "test-loader");
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        expect(loader.className).toEqual("icon-ellipsis css-class");
    });

    it("does not render anything when the loading flag is set to false", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader data-id="test-loader" loading={false}/>
        );

        var test = TestUtils.scryRenderedDOMNodesWithDataId(component, "test-loader");
        expect(test.length).toBe(0);
    });

    it("supports default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader loading={false}/>
        );
        var test = TestUtils.scryRenderedDOMNodesWithDataId(component, "ellipsis-loader");
        expect(test.length).toBe(0);
    });

});
