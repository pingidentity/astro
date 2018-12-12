window.__DEV__ = true;

var ReactDOM = require("react-dom"),
    ReactTestUtils = require("react-dom/test-utils"),
    TestUtils = require("../../../../testutil/TestUtils"),
    //mocks
    exif = require("exif-js"),
    fix = require("fix-orientation"),
    _ = require("underscore");

var fileReadErr = false;

exports.mockFile = function (parts, filename, properties) {
    return {
        parts: parts,
        filename: filename,
        size: parts[0] ? parts[0].length : 0,
        type: properties.type,
        result: properties.result
    };
};

exports.getFakeJpegBlob = function (size) {
    return (new Int32Array(size)).map(function () {
        return "0";
    }).join("");
};

exports.getFakeJpegFile = function (opts) {
    opts = opts || {};

    _.defaults(opts, { size: 10, name: "someFile.jpeg", type: "image/jpeg" });

    /* eslint-disable */
    return (new exports.mockFile([exports.getFakeJpegBlob(opts.size)], opts.name, opts));
    /* eslint-enable */
};

exports.simulateChange = function (get, component, opts) {
    var fileInput = get(component, "input");
    opts = _.defaults(opts || {}, { size: 5, name: "someFile.jpeg" });

    ReactTestUtils.Simulate.change(fileInput, {
        target: {
            value: opts.name,
            files: [exports.getFakeJpegFile(opts)]
        }
    });
};

exports.run = function (getComponent, get) {
    // mocks for the HTML File API used by the component
    global.FileList = {};
    global.FileReader = function () {
        return {
            readAsDataURL: function (file) {
                this.result = file.result;
                return (!fileReadErr && file) ? this.onloadend() : this.onerror();
            }
        };
    };

    beforeEach(function () {
        global.File = exports.mockFile;
        fileReadErr = false;
        exif.getData.mockClear();
        fix.mockClear();
    });

    var simulateChange = function (component, opts) {
        return exports.simulateChange(get, component, opts);
    };

    it("has no validator", function () {
        var component = getComponent({ validator: null });
        var errorContainer = get(component, "error-message");

        simulateChange(component);

        expect(errorContainer).toBeFalsy();

    });

    it("has no max file size", function () {
        var component = getComponent({ maxFileSizeKb: null });
        var errorHandler = get(component, "error-handler");

        simulateChange(component, { size: 20000 });

        expect(errorHandler).not.toBeCalled();
    });

    it("will handle data reader error", function () {
        fileReadErr = true;

        var component = getComponent();
        var errorHandler = get(component, "error-handler");

        simulateChange(component);

        expect(errorHandler).toBeCalledWith(get(component, "enum", "cantread"));
    });

    it("will not generate an error when file size is less than the maximum size.", function () {
        var component = getComponent();
        var errorHandler = get(component, "error-handler");

        simulateChange(component);

        expect(errorHandler).not.toBeCalled();
    });

    it("shows default Image before something is uploaded", function () {
        var logo = "https://www.pingidentity.com/etc/designs/pic/clientlibs-all/logos/PingIdentity_logo.png";
        var component = getComponent({ defaultImage: logo });
        var preview = get(component, "preview");

        expect(preview.getAttribute("src")).toBe(logo);
    });

    it("will handle contentUrl", function () {
        var component = getComponent();

        simulateChange(component, { result: "data: someurl" });

        //expect it to read the exif data and try to correct orientation
        expect(exif.getData).toBeCalled();

        //exec the callback with no arguments
        exif.getData.mock.calls[0][1].call({ exifdata: { Orientation: "-90" } });

        //fix orientation should be called because exifdata is defined
        expect(fix).toBeCalled();
        //exec the callback with a new contentUrl
        var uri = "data:image/gif;base64," + global.btoa("someOtherUrl");
        fix.mock.calls[0][2](uri, "");

        expect(component.props.onPreviewReady).toBeCalledWith(uri);

        jest.runAllTimers();
    });

    it("will handle content without exif data", function () {
        var component = getComponent();
        var uri = "data:image/gif;base64," + global.btoa("someUrl");

        simulateChange(component, { result: uri });

        //exec the callback with no arguments
        exif.getData.mock.calls[0][1].call({ exifdata: {} });

        expect(component.props.onPreviewReady).toBeCalledWith(uri);
    });

    it("doesnt pass onFileChange", function () {
        var component = getComponent({ onFileChange: null });

        simulateChange(component);
        //no exception thrown means test passes
    });

    it("doesnt pass onPreviewReady", function () {
        var component = getComponent({ onPreviewReady: null });

        simulateChange(component);
        //no exception thrown means test passes
    });

    it('calls "onPreviewReady" when the image file is loaded', function () {
        var component = getComponent();

        simulateChange(component);

        expect(component.props.onPreviewReady).toBeCalled();
    });

    it("will add disabled css class to container", function () {
        var component = getComponent({ disabled: true });

        expect(ReactDOM.findDOMNode(component).className).toContain("disabled");
    });

    it("will add stacked css class to container", function () {
        var component = getComponent({ stacked: true });

        expect(TestUtils.findRenderedDOMNodeWithClass(component, "stacked"));
    });

    it("will not respond to actions while disabled", function () {
        var fileName = "someFile.png";
        var component = getComponent({ disabled: true, fileName: fileName });
        var removeButton = get(component, "removeButton");
        var fileInput = get(component, "input");

        expect(fileInput.disabled).toEqual(true);
        ReactTestUtils.Simulate.click(removeButton);

        expect(component.props.onValidate).not.toBeCalled();
    });

    it("will wont show the filename when the showThumbnail property is set", function () {
        var component = getComponent({ showThumbnail: true });

        simulateChange(component);

        expect(get(component, "filename")).toBeFalsy();
    });

    it("will show the filename when the showThumbnail property is not set", function () {
        var component = getComponent({ showThumbnail: false });

        simulateChange(component);

        expect(get(component, "filename").textContent).toEqual("someFile.jpeg");
    });

    it("it will display the max size", function () {
        var component = getComponent({ showThumbnail: true });

        expect(get(component, "max-size").textContent).toEqual("Max Size 4MB");
    });

    it("it will display the accept types", function () {
        var component = getComponent({ showThumbnail: true });

        expect(get(component, "accepted-types").textContent).toEqual("jpeg, jpg, gif, png");
    });
};
