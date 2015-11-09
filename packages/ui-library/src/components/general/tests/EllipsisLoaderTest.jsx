window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../EllipsisLoader.jsx");
jest.dontMock("underscore");
jest.dontMock("underscore.string");
jest.dontMock("classnames");

describe("Ellipsis loader", function () {
    var React = require("react/addons");
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require("../../../testutil/TestUtils");
    var EllipsisLoader = require("../EllipsisLoader.jsx");

    it("renders the animated ellipsis when the loading flag is set to true", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader id="test-loader" loading={true} className="css-class"/>
        );

        var loader = TestUtils.findRenderedDOMComponentWithDataId(component, "test-loader");
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        expect(loader.getDOMNode().className).toEqual("icon-ellipsis css-class");
    });

    it("does not render anything when the loading flag is set to false", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader id="test-loader" loading={false}/>
        );

        var test = TestUtils.scryRenderedDOMComponentsWithDataId(component, "test-loader");
        expect(test.length).toBe(0);
    });
});