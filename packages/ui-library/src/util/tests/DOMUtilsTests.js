
import React from "react";
import { mount } from "enzyme";
import * as DOMUtils from "../DOMUtils";

const testText = "test text";
const setup = (propOptions) => {
    const props = {
        ...propOptions,
    };

    const enzymeWrapper = mount(
        <div {...props}>
            {testText}
        </div>
    );
    return { props, enzymeWrapper };
};

describe("DOMUtilsTests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a value when measuring an element's width", () => {
        const elem = {
            getBoundingClientRect: () => ({ width: "666px" }),
        };
        expect(DOMUtils.measureWidth(elem)).toEqual("666px");
    });

    it("should call all browser functions for browsers which support getSelection", () => {
        /*
        * Node / Jest runtime environment does not have the concept of selecting text, so we
        * cannot directly test the text selection. Instead, we create the appropriate mock functions
        * and see that they are called on the global object.
        */
        const removeAllRanges = jest.fn();
        const addRange = jest.fn();
        const selectNodeContents = jest.fn();
        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({
            removeAllRanges: removeAllRanges,
            addRange: addRange,
            toString: () => "",
        });
        global.document.createRange = () => ({ selectNodeContents });
        const { enzymeWrapper } = setup();
        const DOMNode = enzymeWrapper.getDOMNode();
        expect(global.getSelection).not.toHaveBeenCalled();
        expect(removeAllRanges).not.toHaveBeenCalled();
        expect(addRange).not.toHaveBeenCalled();

        DOMUtils.selectTextWithinElement(DOMNode);
        expect(global.getSelection).toHaveBeenCalledTimes(1);
        expect(removeAllRanges).toHaveBeenCalledTimes(1);
        expect(addRange).toHaveBeenCalledTimes(1);
        expect(selectNodeContents.mock.calls[0][0].childNodes[0].nodeValue).toBe(testText);
    });

    it("should call all browser functions for browsers which support createTextRange", () => {
        const moveToElement = jest.fn();
        const select = jest.fn();
        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({ toString: () => "" });
        global.document.body.createTextRange = () => ({
            moveToElementText: moveToElement,
            select: select
        });
        const { enzymeWrapper } = setup();
        const DOMNode = enzymeWrapper.getDOMNode();
        expect(moveToElement).not.toHaveBeenCalled();
        expect(select).not.toHaveBeenCalled();

        DOMUtils.selectTextWithinElement(DOMNode);
        expect(moveToElement).toHaveBeenCalledTimes(1);
        expect(moveToElement.mock.calls[0][0].textContent).toBe(testText);
        expect(select).toHaveBeenCalledTimes(1);
    });

    it("should use native select function if available on the element", () => {
        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({
            removeAllRanges: jest.fn(),
            addRange: jest.fn(),
            toString: () => "",
        });
        const enzymeWrapper = mount(<input value={testText} readOnly />);
        const DOMNode = enzymeWrapper.getDOMNode();
        const spy = jest.spyOn(DOMNode, "select");
        expect(spy).not.toHaveBeenCalled();

        DOMUtils.selectTextWithinElement(DOMNode);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});


