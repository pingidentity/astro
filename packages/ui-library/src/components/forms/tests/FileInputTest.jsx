
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import FileInput from "../FileInput";
import _ from "underscore";


describe("FileInput", function () {

    const testDataId = "myinput";

    const customStrings = {
        select: "Select it",
        remove: "Remove it",
    };

    function getComponent(opts) {
        opts = _.defaults(opts || {}, {
            "data-id": testDataId,
            onRemove: jest.fn(),
            strings: customStrings,
        });
        return ReactTestUtils.renderIntoDocument(<FileInput {...opts} />);
    }

    it("Renders the component in initial state", function () {
        const component = getComponent();
        const componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, testDataId);
        const selectBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "select-button");

        expect(componentDom).toBeTruthy();
        expect(componentDom.className).toContain("input-file");
        expect(selectBtn.textContent).toBe(customStrings.select);

    });

    it("Renders custom in selected state", function () {
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
});
