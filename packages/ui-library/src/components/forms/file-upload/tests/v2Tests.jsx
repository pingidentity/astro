window.__DEV__ = true;

jest.dontMock("../index.js");
jest.dontMock("../v2.jsx");
jest.dontMock("../v2-stateful.jsx");
jest.dontMock("../v2-stateless.jsx");
jest.dontMock("../v2-constants.js");
jest.dontMock("./commonTests.jsx");
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
            validator: jest.genMockFunction(),

            onPreviewReady: jest.genMockFunction(),
            onError: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<FileUpload {...opts} />);
    }

    function get (component, part, opt) {
        var stateless = (component.refs.stateful ? component.refs.stateful : component).refs.stateless;
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

    it("shows an error message when one is set", function () {
        var fileUploadErrorMsg = "Please upload a valid file";
        var component = getComponent();
        var error = get(component, "error-message");

        expect(error.textContent).toEqual("");

        component.refs.stateful.setState({ errorMessage: fileUploadErrorMsg });
        expect(error.textContent).toEqual(fileUploadErrorMsg);

        component.refs.stateful.setState({ errorMessage: "" });
        expect(error.textContent).toEqual("");
    });
});
