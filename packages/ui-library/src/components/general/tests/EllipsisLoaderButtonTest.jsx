window.__DEV__ = true;

jest.dontMock("../EllipsisLoader.jsx");
jest.dontMock("../EllipsisLoaderButton.jsx");

describe("Ellipsis loader button", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
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
                data-id={buttonId}
                loading={true}
                className={buttonCss}
                text={buttonText}
                onClick={callback} />
        );

        var button = TestUtils.findRenderedDOMNodeWithDataId(component, buttonId);
        expect(button.className).toEqual("ellipsis-loader-button loading " + buttonCss);
    });

    it("does not render anything when the loading flag is set to false", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoaderButton
                data-id={buttonId}
                text={buttonText}
                loading={false}
                onClick={callback} />
        );

        var button = TestUtils.findRenderedDOMNodeWithDataId(component, buttonId);
        expect(button.className).toEqual("ellipsis-loader-button");
    });

    it("renders the button text", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoaderButton
                data-id={buttonId}
                text={buttonText}
                loading={false}
                onClick={callback} />
        );

        var button = TestUtils.findRenderedDOMNodeWithDataId(component, buttonId);
        expect(button.textContent).toEqual(buttonText);
    });

    it("check if warning with id vs data-id", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <EllipsisLoaderButton
                id={buttonId}
                text={buttonText}
                loading={false}
                onClick={callback} />
        );
        expect(console.warn).toBeCalled();
    });

    it("check if warning with id vs data-id", function () {
        console.warn = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoaderButton
                text={buttonText}
                loading={false}
                onClick={callback} />
        );
        var button = TestUtils.findRenderedDOMNodeWithDataId(component, "ellipsis-loader-button");
        expect(button.textContent).toEqual(buttonText);
        expect(console.warn).not.toBeCalled();
    });

    it("check if warning with onButtonClick vs onClick", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <EllipsisLoaderButton
                data-id={buttonId}
                text={buttonText}
                loading={false}
                onButtonClick={callback} />
        );
        expect(console.warn).toBeCalled();
    });

});
