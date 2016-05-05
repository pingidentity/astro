window.__DEV__ = true;

jest.dontMock("../FileUpload.jsx");
jest.dontMock("../../../util/Utils");

var fileMock = function (parts, filename, properties) {
    return {
        parts: parts,
        filename: filename,
        properties: properties,
        size: parts[0] ? parts[0].length : 0,
        type: properties.type
    };
};

// mocks for the HTML File API used by the component
global.File = global.File || fileMock;
global.FileList = global.FileList || {};
global.FileReader = function () {
    return {
        readAsDataURL: function (file) {
            if (file) {
                this.onloadend(file);
            } else {
                this.onerror();
            }
        }
    };
};

describe("FileUpload", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        FileUpload = require("../FileUpload.jsx"),
        _ = require("underscore");

    // helper function to generate fake image data for file size testing
    function getFakeJpegBlob (iterations) {
        var x = "1234567890";
        while (iterations) {
            x += x + x;
            iterations = iterations - 1;
        }
        return x;
    }

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            accept: "image/jpeg, image/jpg, image/gif, image/png",
            maxFileSizeKb: 10,
            showThumbnail: true,
            referenceName: "testFileUpload",
            buttonText: "Select File",
            removeFileLabel: "Remove File",
            onPreviewReady: jest.genMockFunction(),
            validator: jest.genMockFunction(),
            errorHandler: jest.genMockFunction()
        });


        return ReactTestUtils.renderIntoDocument(<FileUpload {...opts} />);
    }

    it("will not generate an error when file size is less than the maximum size.", function () {
        var component = getComponent();
        var fileInput = ReactDOM.findDOMNode(component.refs.fileInput);
        var fakeFile = new global.File([getFakeJpegBlob(5)], "someFile.jpeg", { type: "image/jpeg" });

        ReactTestUtils.Simulate.change(fileInput, {
            target: {
                value: "someFile.jpeg",
                files: [fakeFile]
            }
        });

        // calls the validator function on change
        expect(component.props.validator).toBeCalled();
        expect(component.props.errorHandler).not.toBeCalled();
    });

    it("shows default Image before something is uploaded", function () {
        var logo = "https://www.pingidentity.com/etc/designs/pic/clientlibs-all/logos/PingIdentity_logo.png";
        var component = getComponent({ defaultImage: logo });
        var preview = ReactDOM.findDOMNode(component.refs.imageThumb);

        expect(preview.getAttribute("src")).toBe(logo);
    });

    it("will generate an error when file size is more than the maximum size.", function () {
        var component = getComponent();
        var fileInput = ReactDOM.findDOMNode(component.refs.fileInput);

        // fake JPEG here is 21870 bytes - the rendered component has a max file size of 10000 bytes
        var fakeFile = new global.File([getFakeJpegBlob(7)], "someFile.jpeg", { type: "image/jpeg" });

        ReactTestUtils.Simulate.change(fileInput, {
            target: {
                value: "someFile.jpeg",
                files: [fakeFile]
            }
        });

        // calls the validator function on change
        expect(component.props.validator).toBeCalled();
        expect(component.props.errorHandler).toBeCalledWith(FileUpload.ErrorCodes.TooBig);
    });

    it("will set error text when file is not one of the accepted types.", function () {
        var component = getComponent();
        var fileInput = ReactDOM.findDOMNode(component.refs.fileInput);

        // image/bmp is not in the accepted file type array
        var fakeFile = new global.File([getFakeJpegBlob(1)], "someFile.bmp", { type: "image/bmp" });

        ReactTestUtils.Simulate.change(fileInput, {
            target: {
                value: "someFile.bmp",
                files: [fakeFile]
            }
        });

        // calls the validator function on change
        expect(component.props.validator).toBeCalled();
        expect(component.props.errorHandler).toBeCalledWith(FileUpload.ErrorCodes.WrongMimeType);
    });

    it("will reset the value of the file input value when the remove link is clicked.", function () {
        var component = getComponent();
        var fileInput = ReactDOM.findDOMNode(component.refs.fileInput);
        var removeButton = ReactDOM.findDOMNode(component.refs.remove);

        fileInput.value = "someFile.png";
        expect(fileInput.value).toEqual("someFile.png");

        ReactTestUtils.Simulate.click(removeButton);

        // calls the validator function on reset
        expect(component.props.validator).toBeCalled();
        expect(fileInput.value).toEqual("");
    });

    it("shows an error message when one is set", function () {
        var fileUploadErrorMsg = "Please upload a valid file";
        var component = getComponent();
        var errorTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "testFileUpload_errormessage");
        var errorTooltipText = TestUtils.findRenderedDOMNodeWithClass(errorTooltip, "tooltip-text");

        // expect no error text to be rendered to begin with
        expect(errorTooltipText.textContent).toEqual("");

        // simulate an error state
        component.setState({ errorMessage: fileUploadErrorMsg });

        errorTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "testFileUpload_errormessage");

        // renders the error in a tooltip
        expect(errorTooltipText.textContent).toEqual(fileUploadErrorMsg);

        // simulate a valid state
        component.setState({
            errorMessage: ""
        });

        errorTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "testFileUpload_errormessage");

        // no error is rendered
        expect(errorTooltipText.textContent).toEqual("");
    });

    it('calls "onPreviewReady" when the image file is loaded', function () {
        var component = getComponent();
        var fileInput = ReactDOM.findDOMNode(component.refs.fileInput);

        var fakeFile = new global.File([getFakeJpegBlob(2)], "someFile.jpeg", { type: "image/jpeg" });

        ReactTestUtils.Simulate.change(fileInput, {
            target: {
                value: "someFile.jpeg",
                files: [fakeFile]
            }
        });

        expect(component.props.onPreviewReady).toBeCalled();
    });

    it("will add disabled css class to container", function () {
        var component = getComponent({ disabled: true });

        expect(ReactDOM.findDOMNode(component).className).toContain("disabled");
    });

    it("will not respond to actions while disabled", function () {
        var component = getComponent({ disabled: true });
        var fileInput = ReactDOM.findDOMNode(component.refs.fileInput);
        var removeButton = ReactDOM.findDOMNode(component.refs.remove);

        expect(fileInput.disabled).toBeTruthy();

        fileInput.value = "someFile.png";
        ReactTestUtils.Simulate.click(removeButton);

        // calls the validator function on reset
        expect(fileInput.value).toEqual("someFile.png");
    });

    it("will show the filename when the showThumbnail property is not set", function () {
        var component = getComponent();
        var fileInput = ReactDOM.findDOMNode(component.refs.fileInput);
        var fakeFile = new global.File([getFakeJpegBlob(1)], "someFile.jpeg", { type: "image/bmp" });

        fileInput.files = [];

        // fake image file
        fileInput.files[0] = fakeFile;
        ReactTestUtils.Simulate.change(fileInput, {
            target: {
                value: "someFile.jpeg",
                files: [fakeFile]
            }
        });

        // doesn't show the files accepted message
        var filesAcceptedMsg = TestUtils.findRenderedDOMNodeWithDataId(component, "filesAcceptedMsg");
        expect(filesAcceptedMsg).toBeFalsy();
    });
});
