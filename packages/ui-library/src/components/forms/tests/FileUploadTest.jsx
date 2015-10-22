window.__DEV__ = true;

jest.dontMock('../../../testutil/TestUtils');
jest.dontMock('../FileUpload.jsx');
jest.dontMock('../../../util/Utils');
jest.dontMock('underscore');

var fileMock = function (parts, filename, properties) {
    return {
        parts: parts,
        filename: filename,
        properties: properties,
        size: parts[0] ? parts[0].length : 0,
        type: properties.type
    };
};
var previewReadyHandler = jest.genMockFunction();

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

describe('FileUpload', function () {
    var React = require('react/addons');
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require('../../../testutil/TestUtils');
    var FileUpload = require('../FileUpload.jsx');
    var componentWithValidation;
    var validatorFn = jest.genMockFunction();
    var errorFn = jest.genMockFunction();

    // helper function to generate fake image data for file size testing
    function getFakeJpegBlob (iterations) {
        var x = '1234567890';
        while (iterations) {
            x += x + x;
            iterations = iterations - 1;
        }
        return x;
    }

    describe('with validation settings set', function () {
        beforeEach(function () {
            componentWithValidation = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FileUpload
                accept="image/jpeg, image/jpg, image/gif, image/png"
                maxFileSizeKb={10}
                showThumbnail={true}
                referenceName="testFileUpload"
                onPreviewReady={previewReadyHandler}
                validator={validatorFn}
                buttonText="Select File"
                removeFileLabel="Remove File"
                errorHandler={errorFn} />
            /* jshint ignore:end */
            );
        });

        it('will not generate an error when file size is less than the maximum size.', function () {
            var fileInputDOMComponent = TestUtils.findRenderedDOMComponentWithDataId(componentWithValidation,
                                            'testFileUpload_input').getDOMNode();

            var fakeFile = new global.File([getFakeJpegBlob(5)], 'someFile.jpeg', { type: 'image/jpeg' });

            ReactTestUtils.Simulate.change(fileInputDOMComponent, {
                target: {
                    value: 'someFile.jpeg',
                    files: [fakeFile]
                }
            });

            // calls the validator function on change
            expect(validatorFn).toBeCalled();
            expect(errorFn).not.toBeCalled();
        });

        it('will generate an error when file size is more than the maximum size.', function () {
            var fileInputDOMComponent = TestUtils.findRenderedDOMComponentWithDataId(componentWithValidation,
                                            'testFileUpload_input').getDOMNode();

            // fake JPEG here is 21870 bytes - the rendered component has a max file size of 10000 bytes
            var fakeFile = new global.File([getFakeJpegBlob(7)], 'someFile.jpeg', { type: 'image/jpeg' });

            ReactTestUtils.Simulate.change(fileInputDOMComponent, {
                target: {
                    value: 'someFile.jpeg',
                    files: [fakeFile]
                }
            });

            // calls the validator function on change
            expect(validatorFn).toBeCalled();
            expect(errorFn).toBeCalledWith('cid.users.fileUpload.error.tooBig');
        });

        it('will set error text when file is not one of the accepted types.', function () {
            var fileInputDOMComponent = TestUtils.findRenderedDOMComponentWithDataId(componentWithValidation,
                                            'testFileUpload_input').getDOMNode();

            // image/bmp is not in the accepted file type array
            var fakeFile = new global.File([getFakeJpegBlob(1)], 'someFile.bmp', { type: 'image/bmp' });

            ReactTestUtils.Simulate.change(fileInputDOMComponent, {
                target: {
                    value: 'someFile.bmp',
                    files: [fakeFile]
                }
            });

            // calls the validator function on change
            expect(validatorFn).toBeCalled();
            expect(errorFn).toBeCalledWith('cid.users.fileUpload.error.fileType');
        });

        it('will reset the value of the file input value when the remove link is clicked.', function () {
            var inputTypeFile = ReactTestUtils.scryRenderedDOMComponentsWithTag(componentWithValidation, 'input')[0];
            var removeButton =
                ReactTestUtils.findRenderedDOMComponentWithClass(componentWithValidation, 'file-remove');

            inputTypeFile.getDOMNode().value = 'someFile.png';
            expect(inputTypeFile.getDOMNode().value).toEqual('someFile.png');

            ReactTestUtils.Simulate.click(removeButton);

            // calls the validator function on reset
            expect(validatorFn).toBeCalled();
            expect(inputTypeFile.getDOMNode().value).toEqual('');
        });

        it('shows an error message when one is set', function () {
            var fileUploadErrorMsg = 'Please upload a valid file';

            var errorTooltip =
                TestUtils.findRenderedDOMComponentWithDataId(componentWithValidation, 'testFileUpload_tooltip');

            // expect no error text to be rendered to begin with
            expect(errorTooltip.props.children).toEqual('');

            // simulate an error state
            componentWithValidation.setState({
                errorMessage: fileUploadErrorMsg
            });

            errorTooltip =
                TestUtils.findRenderedDOMComponentWithDataId(componentWithValidation, 'testFileUpload_tooltip');

            // renders the error in a tooltip
            expect(errorTooltip.props.children).toEqual(fileUploadErrorMsg);

            // simulate a valid state
            componentWithValidation.setState({
                errorMessage: ''
            });

            errorTooltip =
                TestUtils.findRenderedDOMComponentWithDataId(componentWithValidation, 'testFileUpload_tooltip');

            // no error is rendered
            expect(errorTooltip.props.children).toEqual('');
        });

        it('calls "onPreviewReady" when the image file is loaded', function () {
            var fileInputDOMComponent = TestUtils.findRenderedDOMComponentWithDataId(
                                            componentWithValidation,
                                            'testFileUpload_input'
                                        ).getDOMNode();

            var fakeFile = new global.File([getFakeJpegBlob(2)], 'someFile.jpeg', { type: 'image/jpeg' });

            ReactTestUtils.Simulate.change(fileInputDOMComponent, {
                target: {
                    value: 'someFile.jpeg',
                    files: [fakeFile]
                }
            });

            expect(previewReadyHandler).toBeCalled();
        });
    });

    it('will show the filename when the showThumbnail property is not set', function () {
        var componentNoValidation = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FileUpload accept="" referenceName="testFileUpload" buttonText="" removeFileLabel="" />
            /* jshint ignore:end */
        );

        var fileInputDOMComponent =
        TestUtils.findRenderedDOMComponentWithDataId(componentNoValidation, 'testFileUpload_input').getDOMNode();

        var fakeFile = new global.File([getFakeJpegBlob(1)], 'someFile.jpeg', { type: 'image/bmp' });

        fileInputDOMComponent.files = [];

        // fake image file
        fileInputDOMComponent.files[0] = fakeFile;
        ReactTestUtils.Simulate.change(fileInputDOMComponent, {
            target: {
                value: 'someFile.jpeg',
                files: [fakeFile]
            }
        });

        // doesn't show the files accepted message
        var filesAcceptedMsg =
        TestUtils.findRenderedDOMComponentWithDataId(componentNoValidation, 'filesAcceptedMsg');
        expect(filesAcceptedMsg).toBeFalsy();
    });
});