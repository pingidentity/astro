window.__DEV__ = true;

jest.dontMock("../EllipsisLoader.jsx");

describe("Ellipsis loader", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var EllipsisLoader = require("../EllipsisLoader.jsx");

    it("renders the animated ellipsis when the loading flag is set to true", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader id="test-loader" loading={true} className="css-class"/>
        );

        var loader = TestUtils.findRenderedDOMNodeWithDataId(component, "test-loader");
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        expect(loader.className).toEqual("icon-ellipsis css-class");
    });

    it("does not render anything when the loading flag is set to false", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader id="test-loader" loading={false}/>
        );

        var test = TestUtils.scryRenderedDOMNodesWithDataId(component, "test-loader");
        expect(test.length).toBe(0);
    });
});
