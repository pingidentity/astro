window.__DEV__ = true;

jest.dontMock("./commonTests.jsx");
jest.dontMock("../index.js");
jest.dontMock("../v2.jsx");
jest.dontMock("../v2-stateful.jsx");
jest.dontMock("../v2-stateless.jsx");
jest.dontMock("../v2-constants.js");
jest.dontMock("../../FormError.jsx");
jest.dontMock("../../FormLabel.jsx");
jest.dontMock("../../../../util/Utils");

//mock the exif api
jest.setMock("exif-js", { getData: jest.genMockFunction() });
jest.setMock("fix-orientation", jest.genMockFunction() );

describe("FileUpload", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FileUpload = require("../index.js"),
        CommonTests = require("./commonTests.jsx"),
        _ = require("underscore");

    //require these files so that jest will count them in coverage
    require("../v2-stateful.jsx");
    require("../v2-stateless.jsx");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            labelRemove: "Remove File",
            labelSelect: "Select File",
            labelMaxFileSize: "Max Size 4MB",

            "data-id": "testFileUpload",
            maxFileSizeKb: 10,
            showThumbnail: true,
            onValidate: jest.genMockFunction(),

            onPreviewReady: jest.genMockFunction(),
            onError: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<FileUpload {...opts} />);
    }

    function get (component, part, opt) {
        var stateless = (component.refs.FileUploadStateful
            ? component.refs.FileUploadStateful
            : component).refs.FileUploadStateless;
        var findByDataId = TestUtils.findRenderedDOMNodeWithDataId.bind(TestUtils, component);

        switch (part) {
            case "input":
                return ReactDOM.findDOMNode(stateless.refs.fileInput);
            case "removeButton":
                return ReactDOM.findDOMNode(stateless.refs.remove);
            case "preview":
                return findByDataId("imageThumb");
            case "error-handler":
                return component.props.onError;
            case "error-message":
                return findByDataId(component.props["data-id"] + "-errormessage");
            case "accepted-types":
                return findByDataId(component.props["data-id"] + "-restrictions-accepted-types");
            case "max-size":
                return findByDataId(component.props["data-id"] + "-restrictions-max-size");
            case "filename":
                return findByDataId(component.props["data-id"] + "-fileName");
            case "files-accepted-message":
                return findByDataId(component.props["data-id"] + "-filesAcceptedMessage");
            case "enum":
                switch (opt) {
                    case "cantread":
                        return FileUpload.ErrorCodes.CANT_READ;
                    case "toobig":
                        return FileUpload.ErrorCodes.TOO_BIG;
                    case "wrongmime":
                        return FileUpload.ErrorCodes.WRONG_MIME_TYPE;
                }
        }
    }

    //Run the common tests
    CommonTests.run(getComponent, get);

    //bind the change simulator
    var simulateChange = CommonTests.simulateChange.bind(null, get);

    it("onchange callback", function () {
        var component = getComponent({ onChange: jest.genMockFunction() });

        simulateChange(component);

        expect(component.props.onChange).toBeCalled();
    });

    it("shows an error message when set", function () {
        var fileUploadErrorMsg = "Please upload a valid file",
            component = getComponent({ errorMessage: fileUploadErrorMsg }),
            error = get(component, "error-message");

        expect(error.textContent).toEqual(fileUploadErrorMsg);
    });

    it("does not show an error message when not set", function () {
        var component = getComponent(),
            error = get(component, "error-message");

        expect(error).toBeFalsy();
    });

    it("displays error returned by onValidate", function () {
        var component = getComponent({ onValidate: function () { return "this is my error"; } });

        simulateChange(component);

        var errorContainer = get(component, "error-message");

        expect(errorContainer).toBeTruthy();
        expect(errorContainer.textContent).toEqual("this is my error");
    });

    it("will generate an error when file size is more than the maximum size.", function () {
        var component = getComponent({ maxFileSizeKb: 10 });
        var errorHandler = get(component, "error-handler");

        simulateChange(component, { size: 21870 });

        expect(errorHandler).toBeCalledWith(get(component, "enum", "toobig"));
    });

    it("will set error text when file is not one of the accepted types.", function () {
        var component = getComponent();
        var errorHandler = get(component, "error-handler");

        simulateChange(component, { name: "someFile.bmp", type: "image/bmp" });

        expect(errorHandler).toBeCalledWith(get(component, "enum", "wrongmime"));
    });

    it("will reset without onValidate", function () {
        var component = getComponent({ onValidate: null });
        var fileInput = get(component, "input");
        var removeButton = get(component, "removeButton");

        ReactTestUtils.Simulate.click(removeButton);

        expect(fileInput.value).toEqual("");
    });

    it("will reset the value of the file input value when the remove link is clicked.", function () {
        var component = getComponent({ onValidate: jest.genMockFunction() });
        var fileInput = get(component, "input");
        var removeButton = get(component, "removeButton");

        fileInput.value = "someFile.png";
        expect(fileInput.value).toEqual("someFile.png");

        component.props.onValidate.mockClear();
        ReactTestUtils.Simulate.click(removeButton);

        expect(component.props.onValidate).toBeCalled();
        expect(fileInput.value).toEqual("");
    });

    it("works when HTML5 Api is not available", function () {
        global.File = null;

        var component = getComponent();

        simulateChange(component);

        if (component.props.onFileChange) {
            expect(component.props.onFileChange).toBeCalled();
        } else {
            //the new component does not have an onFileChange callback
            expect(component.refs.FileUploadStateful.state.thumbnailSrc).toEqual("");
        }
    });
});
