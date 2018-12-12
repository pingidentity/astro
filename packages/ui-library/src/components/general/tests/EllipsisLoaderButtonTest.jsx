window.__DEV__ = true;

jest.dontMock("../EllipsisLoader");
jest.dontMock("../EllipsisLoaderButton");

describe("Ellipsis loader button", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var Utils = require("../../../util/Utils");
    var EllipsisLoaderButton = require("../EllipsisLoaderButton");
    var callback;
    var buttonId = "test-loader";
    var buttonText = "Text Button";

    beforeEach(function () {
        callback = jest.fn();
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

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <EllipsisLoaderButton
                    id="foo"
                    text="bar"
                    loading={false}
                    onClick={jest.fn()}
                />
            );
        }).toThrow(expectedError);
    });

    // it("throws error when deprecated prop 'onButtonClick' is passed in", function () {
    //     var expectedError = new Error(Utils.deprecatePropError("onButtonClick", "onClick"));
    //
    //     expect(function () {
    //         <EllipsisLoaderButton
    //             onButtonClick={jest.fn()}
    //             loading={false}
    //             text="bar"
    //         />
    //     }).toThrow(expectedError);
    // });

});
