import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import InputRow, { InputRowAccessories } from "../InputRow";

describe("InputRow", function () {
    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(
            <div>
                <InputRow {...props}>{props.children}</InputRow>
            </div>
        );
    }
    it("renders with default data-id", function () {
        const component = getComponent({});
        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "input-row");
        expect(section).toBeTruthy();
    });

    it("renders the content", function () {
        const content = "Some content";
        const component = getComponent({
            children: content,
        });
        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "input-row");
        expect(section.textContent).toBe(content);
    });

    it("renders rowAccessories", function () {
        const dataId = "row-accessories";
        const content = (<button>Accessorize!</button>);
        const accessories = <InputRowAccessories data-id={dataId}>{content}</InputRowAccessories>;
        const component = getComponent({ children: accessories });
        const accessoriesDom = TestUtils.findRenderedDOMNodeWithDataId(component, dataId);

        expect(accessoriesDom).toBeTruthy();
        expect(accessoriesDom.className).toBe("input-row__accessories");
        expect(accessoriesDom.childNodes[0].textContent).toBe("Accessorize!");
    });
});
