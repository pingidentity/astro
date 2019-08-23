window.__DEV__ = true;

jest.dontMock("./commonTests");
jest.dontMock("../index.js");
jest.dontMock("../v2");
jest.dontMock("../v2-stateful");
jest.dontMock("../v2-stateless");
jest.dontMock("../v2-constants.js");
jest.dontMock("../../FormError");
jest.dontMock("../../FormLabel");

//mock the exif api
jest.setMock("exif-js", { getData: jest.fn() });
jest.setMock("fix-orientation", jest.fn() );

describe("FileUpload", function () {
    const React = require("react");
    const ReactDOM = require("react-dom");
    const ReactTestUtils = require("react-dom/test-utils");
    const { mount } = require("enzyme");
    const TestUtils = require("../../../../testutil/TestUtils");
    const FileUpload = require("../index.js");
    const CommonTests = require("./commonTests");
    const Utils = require("../../../../util/Utils");
    const _ = require("underscore");

    //require these files so that jest will count them in coverage
    require("../v2-stateful");
    require("../v2-stateless");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            labelRemove: "Remove File",
            labelSelect: "Select File",
            labelMaxFileSize: "Max Size 4MB",

            "data-id": "testFileUpload",
            maxFileSizeKb: 10,
            showThumbnail: true,
            onValidate: jest.fn(),

            onPreviewReady: jest.fn(),
            onError: jest.fn()
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

    it("data-id's don't change", () => {
        TestUtils.mountSnapshotDataIds(
            <FileUpload />
        );
    });

    it("onchange callback", function () {
        var component = getComponent({ onChange: jest.fn() });

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
        var component = getComponent({ onValidate: null, fileName: "file.jpg" });
        var fileInput = get(component, "input");
        var removeButton = get(component, "removeButton");

        ReactTestUtils.Simulate.click(removeButton);

        expect(fileInput.value).toEqual("");
    });

    it("will reset the value of the file input value when the remove link is clicked.", function () {
        const component = getComponent({ onValidate: jest.fn(), fileName: "file.jpg" });
        const removeButton = get(component, "removeButton");

        component.props.onValidate.mockClear();
        ReactTestUtils.Simulate.click(removeButton);

        // Jest no longer allows manually setting the value of inputs and calling onChange
        // on a file input requires creating a FileList (https://developer.mozilla.org/en-US/docs/Web/API/FileList)
        // There is no public API for creating one of these lists, so there isn't a good way to test this behavior.
        expect(component.props.onValidate).toBeCalled();
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

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'title' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("title", "labelText"));

        expect(function () {
            getComponent({ title: "something" });
        }).toThrow(expectedError);
    });

    it("true default: renders default image if no thumbnail is passed in", () => {
        const component = getComponent({
            defaultImage: "pictureofanuglydog.png",
            flags: ["true-default"]
        });

        const defaultImage = TestUtils.findRenderedDOMNodeWithClass(component, "input-image-thumb--default");

        expect(defaultImage).toBeTruthy();
    });

    it("true default: throws a warning when defaultImage is passed in without flag enabled", () => {
        console.warn = jest.fn();

        getComponent({
            defaultImage: "stuff.png"
        });

        expect(console.warn).toHaveBeenCalled();
    });

    it("true default: does not throw a warning when defaultImage is passed in with flag enabled", () => {
        console.warn = jest.fn();

        getComponent({
            defaultImage: "stuff.png",
            flags: ["true-default"]
        });

        expect(console.warn).not.toHaveBeenCalled();
    });

    it("fires cannonball warning for the stateless veraion", function() {
        console.warn = jest.fn();
        getComponent({ stateless: true });
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire cannonball warning for the stateful veraion", function() {
        console.warn = jest.fn();
        getComponent({ stateless: false });
        expect(console.warn).not.toBeCalled();
    });

    it("renders node if given node as default image", () => {
        const component = mount(
            <FileUpload
                flags={["true-default"]}
                defaultImage={<div data-id="default-test" />}
            />
        );

        expect(component.find("[data-id=\"default-test\"]"));
    });

    it("Renders the file input button with a yellow border when required prop exists", () => {
        const component = mount(
            <FileUpload required/>
        );
        const element = component.find(".input-file-upload__select-btn--required");
        expect(element.exists()).toEqual(true);
    });

    it("Renders the file input button without yellow border when required prop does not exist", () => {
        const component = mount(
            <FileUpload />
        );
        const element = component.find(".input-file-upload__select-btn--required");
        expect(element.exists()).toEqual(false);
    });
});
