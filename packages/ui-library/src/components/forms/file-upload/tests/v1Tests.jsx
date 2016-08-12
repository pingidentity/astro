window.__DEV__ = true;

jest.dontMock("../index.js");
jest.dontMock("../v1.jsx");
jest.dontMock("./commonTests.jsx");
jest.dontMock("../../../../util/Utils");
jest.dontMock("../../FormLabel.jsx");
jest.dontMock("../../FormError.jsx");
//mock the exif api
jest.setMock("exif-js", { getData: jest.genMockFunction() });
jest.setMock("fix-orientation", jest.genMockFunction() );

describe("FileUpload", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        Utils = require("../../../../util/ReduxTestUtils.js"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FileUpload = require("../v1.jsx"),
        CommonTests = require("./commonTests.jsx"),
        _ = require("underscore");

    function getComponent (opts, useWrapper) {
        opts = _.defaults(opts || {}, {
            maxFileSizeKb: 10,
            maxFileSizeLabel: "Max Size 4MB",
            accept: "image/jpeg, image/jpg, image/gif, image/png",
            showThumbnail: true,
            referenceName: "testFileUpload",
            buttonText: "Select File",
            removeFileLabel: "Remove File",

            onFileChange: jest.genMockFunction(),
            onPreviewReady: jest.genMockFunction(),
            validator: jest.genMockFunction(),
            errorHandler: jest.genMockFunction()
        });

        if (useWrapper) {
            return ReactTestUtils.renderIntoDocument(<Utils.Wrapper type={FileUpload} opts={opts} />);
        }

        return ReactTestUtils.renderIntoDocument(<FileUpload {...opts} />);
    }

    function get (component, part, opt) {
        var findByDataId = TestUtils.findRenderedDOMNodeWithDataId.bind(TestUtils, component);

        switch (part) {
            case "input":
                return ReactDOM.findDOMNode(component.refs.fileInput);
            case "removeButton":
                return ReactDOM.findDOMNode(component.refs.remove);
            case "preview":
                return ReactDOM.findDOMNode(component.refs.imageThumb);
            case "error-handler":
                return component.props.errorHandler;
            case "files-accepted-message":
                return findByDataId(component, "filesAcceptedMsg");
            case "error-message":
                return findByDataId(component.props["referenceName"] + "_errormessage");
            case "accepted-types":
                return TestUtils.scryRenderedDOMNodesWithClass(component, "accepted-types")[0];
            case "max-size":
                return TestUtils.scryRenderedDOMNodesWithClass(component, "max-size")[0];
            case "filename":
                return TestUtils.scryRenderedDOMNodesWithClass(component, "file-name")[0];
            case "enum":
                switch (opt) {
                    case "cantread":
                        return FileUpload.ErrorCodes.CantRead;
                    case "toobig":
                        return FileUpload.ErrorCodes.TooBig;
                    case "wrongmime":
                        return FileUpload.ErrorCodes.WrongMimeType;
                }
        }
    }

    //Run the common tests
    CommonTests.run(getComponent, get);

    //bind the change simulator
    var simulateChange = CommonTests.simulateChange.bind(null, get);

    it("receives new props", function () {
        var component = getComponent({}, true);

        component.sendProps({ defaultImage: "blah" });
        expect(component.refs.target.state.thumbnailSrc).toEqual("blah");
    });

    it("has no error handler", function () {
        var component = getComponent({
            errorHandler: null
        });

        simulateChange(component, { size: 20000 });
    });

    it("shows an error message when one is set", function () {
        var fileUploadErrorMsg = "Please upload a valid file";
        var component = getComponent();
        var error = get(component, "error-message");

        expect(error).toBeFalsy();

        component.setState({ errorMessage: fileUploadErrorMsg });
        var componentUpdated = ReactDOM.findDOMNode(component);
        error = TestUtils.findRenderedDOMNodeWithDataId(componentUpdated,
            component.props["referenceName"] + "_errormessage");
        expect(error.textContent).toEqual(fileUploadErrorMsg);

        component.setState({ errorMessage: "" });
        componentUpdated = ReactDOM.findDOMNode(component);
        error = TestUtils.findRenderedDOMNodeWithDataId(componentUpdated,
            component.props["referenceName"] + "_errormessage");
        expect(error).toBeFalsy();
    });

    it("displays error returned by validator", function () {
        var component = getComponent({ validator: function () { return "this is my error"; } });

        simulateChange(component);

        var errorContainer = get(component, "error-message");

        expect(errorContainer.getAttribute("class")).toContain("show");
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

    it("will reset without validator", function () {
        var component = getComponent({ validator: null });
        var fileInput = get(component, "input");
        var removeButton = get(component, "removeButton");

        ReactTestUtils.Simulate.click(removeButton);

        expect(fileInput.value).toEqual("");
    });

    it("will reset the value of the file input value when the remove link is clicked.", function () {
        var component = getComponent({ validator: jest.genMockFunction() });
        var fileInput = get(component, "input");
        var removeButton = get(component, "removeButton");

        fileInput.value = "someFile.png";
        expect(fileInput.value).toEqual("someFile.png");

        component.props.validator.mockClear();
        ReactTestUtils.Simulate.click(removeButton);

        expect(component.props.validator).toBeCalled();
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
            expect(component.refs.stateful.state.thumbnailSrc).toEqual("");
        }
    });
});
