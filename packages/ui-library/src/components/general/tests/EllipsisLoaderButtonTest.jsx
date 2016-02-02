window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../EllipsisLoader.jsx");
jest.dontMock("../EllipsisLoaderButton.jsx");
jest.dontMock("underscore");
jest.dontMock("classnames");

describe("Ellipsis loader button", function () {
    var React = require("react/addons");
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require("../../../testutil/TestUtils");
    var EllipsisLoaderButton = require("../EllipsisLoaderButton.jsx");
    var callback;
    var buttonId = "test-loader";
    var buttonText = "Text Button";

    beforeEach(function () {
        callback = jest.genMockFunction();
    });

    it("renders the animated ellipsis when the loading flag is set to true", function () {
        var buttonCss = "css-class";

        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoaderButton
                id={buttonId}
                loading={true}
                className={buttonCss}
                text={buttonText}
                onButtonClick={callback} />
        );

        var button = TestUtils.findRenderedDOMComponentWithDataId(component, buttonId);
        expect(button.getDOMNode().className).toEqual("ellipsis-loader-button loading " + buttonCss);
    });

    it("does not render anything when the loading flag is set to false", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoaderButton
                id={buttonId}
                text={buttonText}
                loading={false}
                onButtonClick={callback} />
        );

        var button = TestUtils.findRenderedDOMComponentWithDataId(component, buttonId);
        expect(button.getDOMNode().className).toEqual("ellipsis-loader-button");
    });

    it("renders the button text", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoaderButton
                id={buttonId}
                text={buttonText}
                loading={false}
                onButtonClick={callback} />
        );

        var button = TestUtils.findRenderedDOMComponentWithDataId(component, buttonId);
        expect(button.getDOMNode().textContent).toEqual(buttonText);
    });
});
