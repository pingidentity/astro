
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import FileInput, { errorTypes } from "../FileInput";
import { mount } from "enzyme";


describe("FileInput", function () {
    // const FileInput = require("../FileInput");

    const testDataId = "myinput";

    const customStrings = {
        select: "Select it",
        remove: "Remove it",
    };

    const defaultProps = {
        "data-id": testDataId,
        onRemove: jest.fn(),
        strings: customStrings,
    };

    function getComponent(opts) {
        return ReactTestUtils.renderIntoDocument(<FileInput {...defaultProps} {...opts} />);
    }

    it("data-id's don't change", () => {
        TestUtils.mountSnapshotDataIds(<FileInput />);
    });

    it("renders the component in initial state", function () {
        const component = getComponent();
        const componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, testDataId);
        const selectBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "select-button");

        expect(componentDom).toBeTruthy();
        expect(componentDom.className).toContain("input-file");
        expect(selectBtn.textContent).toBe(customStrings.select);

    });

    it("renders custom in selected state", function () {
        const fileName = "test.jpg";
        const fileData = "some data";
        const component = getComponent({
            fileData: fileData,
            fileName: fileName,
        });
        const name = TestUtils.findRenderedDOMNodeWithDataId(component, "file-name");
        const data = TestUtils.findRenderedDOMNodeWithDataId(component, "file-data");
        const removeBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "remove-button");

        expect(name.textContent).toContain(fileName);
        expect(data.textContent).toContain(fileData);
        expect(removeBtn.textContent).toContain(customStrings.remove);
    });

    it("renders the component with loading state", function () {
        const component = getComponent({
            loading: true
        });
        const loadingBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "ellipsis-loader");

        expect(loadingBtn).toBeDefined();

    });

    it("calls the onRemove callback", function () {
        const myOnRemove = jest.fn();
        const wrapper = mount(
            <FileInput onRemove={myOnRemove} />
        );

        wrapper.setProps({ fileName: "foobar.png" });

        const removeBtn = wrapper.find(`button[data-id="remove-button"]`);

        expect(myOnRemove).not.toHaveBeenCalled();
        removeBtn.simulate("click");
        expect(myOnRemove).toHaveBeenCalled();

    });

    it("Renders the the fieldset without a border", () => {
        const component = mount(
            <FileInput fileName="hello" noBorder/>
        );
        const element = component.find(".input-file__field-set.unfocused");
        expect(element.exists()).toEqual(true);
    });

    it("Renders the the fileinput with an error", () => {
        const component = mount(
            <FileInput fileName="hello" error={errorTypes.ERROR} />
        );
        const element = component.find(`div[data-id="error-icon"]`);
        expect(element.exists()).toEqual(true);
    });

    it("Renders the the fileinput with an warning", () => {
        const component = mount(
            <FileInput fileName="hello" error={errorTypes.WARNING} />
        );
        const element = component.find(`div[data-id="error-icon"]`);
        expect(element.exists()).toEqual(true);
    });

    it("Renders the file input button with a yellow border when required prop exists", () => {
        const component = mount(
            <FileInput required/>
        );
        const element = component.find(".input-file__select-btn--required");
        expect(element.exists()).toEqual(true);
    });

    it("Renders the file input button without yellow border when required prop does not exist", () => {
        const component = mount(
            <FileInput />
        );
        const element = component.find(".input-file__select-btn--required");
        expect(element.exists()).toEqual(false);
    });
});
