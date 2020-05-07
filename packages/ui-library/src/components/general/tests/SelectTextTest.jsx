import React from "react";
import { shallow } from "enzyme";
import SelectText from "../SelectText";
import { selectTextWithinElement } from "../../../util/DOMUtils";

jest.mock("../../../util/DOMUtils");
jest.dontMock("../SelectText");

const testText = "test text";
const testClass = "testClass";
const setup = (propOptions) => {
    const props = {
        select: false,
        ...propOptions,
    };

    const enzymeWrapper = shallow(
        <SelectText {...props}>
            {testText}
        </SelectText>
    );
    return { props, enzymeWrapper };
};

/*
 * Tests for SelectText component.
 *
 * These tests are not overly comprehensive since true
 * text selection cannot actually be tested as it is
 * browser provided functionality.  All we can test here
 * is that the component makes the right calls to the
 * global object at the right times (not that text
 * actually ends up being selected).
 */
describe("SelectText", () => {
    beforeEach(() => {
        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({
            removeAllRanges: jest.fn(),
            addRange: jest.fn(),
            toString: () => "",
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("calls _selectText when props change", () => {
        const { enzymeWrapper } = setup();
        const instance = enzymeWrapper.instance();
        const selectTextSpy = jest.spyOn(instance, "_selectText");
        expect(selectTextSpy).not.toHaveBeenCalled();

        enzymeWrapper.setProps({ select: true });
        expect(selectTextSpy).toHaveBeenCalledTimes(1);
    });

    it("calls select util function when select prop is passed in", () => {
        expect(selectTextWithinElement).not.toHaveBeenCalled();
        const { enzymeWrapper } = setup({ className: testClass, select: true });

        expect(selectTextWithinElement).toHaveBeenCalled();
        expect(enzymeWrapper.hasClass(testClass)).toBe(true);
    });

    it("triggers onClick callback", () => {
        const callback = jest.fn();
        const { enzymeWrapper } = setup({ onClick: callback });
        expect(selectTextWithinElement).not.toHaveBeenCalled();

        enzymeWrapper.simulate("click");
        expect(selectTextWithinElement).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("render component with data-id", () => {
        const testDataId = "test-data-id";
        const { enzymeWrapper } = setup({ "data-id": testDataId });
        expect(enzymeWrapper.prop("data-id")).toBe(testDataId);
    });

    it("render component with default data-id", () => {
        const testDataId = "select-text";
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.prop("data-id")).toBe(testDataId);
    });
});
