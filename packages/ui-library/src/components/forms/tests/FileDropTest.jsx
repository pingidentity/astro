
jest.dontMock("../FileDrop");


describe("FileDrop", function () {

    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        ReactDOM = require("react-dom"),
        TestUtils = require("../../../testutil/TestUtils"),
        FileDrop = require("../FileDrop"),
        _ = require("underscore");

    const componentId = "foobar";

    const defaultStrings = {
        drop: "Drag and drop a file here to upload",
        separator: "or",
        select: "Select a file",
        change: "Change file",
        remove: "Remove file",
    };

    const customStrings = {
        drop: "Drag it",
        separator: "alternatively",
        select: "Select it",
        change: "Change it",
        remove: "Remove it",
    };

    function getComponent(opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            onRemove: jest.genMockFunction(),
        });
        return ReactTestUtils.renderIntoDocument(<FileDrop {...opts} />);
    }


    it("Renders the component in initial state", function () {
        const component = getComponent();

        const componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);
        expect(componentDom).toBeTruthy();

        const label = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-label`);
        expect(label).toBeTruthy();

        const input = TestUtils.findRenderedDOMNodeWithDataId(label, `${componentId}-input`);
        expect(input).toBeTruthy();

        const dropText = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-drop-text`);
        expect(dropText.textContent).toBe(defaultStrings.drop);

        const separatorText = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-separator-text`);
        expect(separatorText.textContent).toBe(defaultStrings.separator);

        const selectLink = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-select-link`);
        expect(selectLink.textContent).toBe(defaultStrings.select);
    });

    it("Renders custom strings in initial state", function () {
        const component = getComponent({
            strings: customStrings
        });

        const dropText = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-drop-text`);
        expect(dropText.textContent).toBe(customStrings.drop);

        const separatorText = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-separator-text`);
        expect(separatorText.textContent).toBe(customStrings.separator);

        const selectLink = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-select-link`);
        expect(selectLink.textContent).toBe(customStrings.select);
    });

    it("Renders the default selected state", function () {
        const customFileName = "myfilename.jpg";
        const component = getComponent({
            fileName: customFileName
        });

        const icon = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-icon`);
        expect(icon.className).toBe("icon-check icon__rounded input-filedrop__icon");

        const fileName = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-file-name`);
        expect(fileName.textContent).toBe(customFileName);

        const label = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-label`);
        expect(label.textContent).toContain(defaultStrings.change);

        const removeLink = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-remove-link`);
        expect(removeLink.textContent).toBe(defaultStrings.remove);
    });

    it("Renders the selected state with custom strings", function () {
        const customFileName = "myfilename.jpg";
        const component = getComponent({
            fileName: customFileName,
            strings: customStrings,
        });

        const fileName = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-file-name`);
        expect(fileName.textContent).toBe(customFileName);

        const label = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-label`);
        expect(label.textContent).toContain(customStrings.change);

        const removeLink = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-remove-link`);
        expect(removeLink.textContent).toBe(customStrings.remove);
    });

    it("Does not render remove link when onRemove not provided", function () {
        const component = getComponent({
            onRemove: null
        });

        const removeLink = TestUtils.findRenderedDOMNodeWithDataId(component, `${componentId}-remove-link`);
        expect(removeLink).toBeFalsy();
    });

    it("Triggers onValueChange callback", function () {
        const onValueChange = jest.genMockFunction();
        const evtObj = { target: {
            files: ["myfile.jpg"],
            type: "image/jpg"
        } };
        const component = getComponent({
            onValueChange: onValueChange
        });

        expect(onValueChange).not.toHaveBeenCalled();
        component._onInputChange(evtObj);
        expect(onValueChange).toHaveBeenCalledWith(evtObj.target.files[0], evtObj);

    });

    it("Triggers onValueChange on drop", function () {
        const onValueChange = jest.genMockFunction();
        const preventDefault = jest.genMockFunction();
        const stopPropagation = jest.genMockFunction();
        const fileObj = {
            name: "myfile.jpg",
            type: "image/jpg"
        };
        const evtObj = {
            target: {
                files: [fileObj],
            },
            dataTransfer: {
                files: [fileObj],
            },
            preventDefault: preventDefault,
            stopPropagation: stopPropagation
        };
        const component = getComponent({
            onValueChange: onValueChange
        });

        expect(onValueChange).not.toHaveBeenCalled();
        component._onDrop(evtObj);
        expect(onValueChange).toHaveBeenCalledWith(fileObj, evtObj);
    });

    it("Does NOT trigger onValueChange on drop with wrong mimetype", function () {
        const onValueChange = jest.genMockFunction();
        const preventDefault = jest.genMockFunction();
        const stopPropagation = jest.genMockFunction();
        const fileObj = {
            name: "myfile.jpg",
            type: "image/jpg"
        };
        const evtObj = {
            target: {
                files: [fileObj],
            },
            dataTransfer: {
                files: [fileObj],
            },
            preventDefault: preventDefault,
            stopPropagation: stopPropagation
        };
        const component = getComponent({
            onValueChange: onValueChange,
            accept: ["text/csv"]
        });

        component._onDrop(evtObj);
        expect(onValueChange).not.toHaveBeenCalledWith(fileObj, evtObj);
    });

    it("Hightlights the drop area on hover", function () {
        const component = getComponent();

        component._onHover();
        expect(component.state.hovered).toBe(true);

        component._onExit();
        expect(component.state.hovered).toBe(false);
    });

    it("Removes event listeners on unmount", function () {
        const component = getComponent();
        const componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);
        componentDom.removeEventListener = jest.genMockFunction();

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        ["dragenter", "dragleave", "dragover", "drop"].forEach(eventName => {
            expect(componentDom.removeEventListener).toBeCalledWith(eventName, component._preventDefaults);
        });

        ["dragleave", "drop"].forEach(eventName => {
            expect(componentDom.removeEventListener).toBeCalledWith(eventName, component._onExit);
        });

        ["dragenter", "dragover"].forEach(eventName => {
            expect(componentDom.removeEventListener).toBeCalledWith(eventName, component._onHover);
        });

        ["drop"].forEach(eventName => {
            expect(componentDom.removeEventListener).toBeCalledWith(eventName, component._onDrop);
        });
    });
});
