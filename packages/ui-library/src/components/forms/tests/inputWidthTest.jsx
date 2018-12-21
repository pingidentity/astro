window.__DEV__ = true;

jest.dontMock("../InputWidths");

import {
    InputWidths,
    InputWidthClasses,
    InputWidthProptypes,
    InputWidthProptypesAuto,
    getInputWidthClass
} from "../InputWidths";

const InputWidthClassesReference = {
    [InputWidths.AUTO]: "input-width-auto",
    [InputWidths.XS]: "input-width-xsmall",
    [InputWidths.SM]: "input-width-small",
    [InputWidths.MD]: "input-width-medium",
    [InputWidths.LG]: "input-width-large",
    [InputWidths.XL]: "input-width-xlarge",
    [InputWidths.XX]: "input-width-full",
    [InputWidths.MAX]: "input-width-max",
    [InputWidths.AUTO]: "input-width-auto",
};

describe("InputWidths", function () {

    it("returns correct CSS classes", function () {
        Object.keys(InputWidths).forEach(widthKey => {
            expect(InputWidthClasses[widthKey]).toBe(InputWidthClassesReference[widthKey]);
        });
    });

    it("returns correct Proptypes", function () {
        Object.keys(InputWidths).forEach(widthKey => {
            expect(InputWidthProptypesAuto.indexOf(widthKey)).not.toBe(-1);

            if (widthKey !== "AUTO") {
                expect(InputWidthProptypes.indexOf(widthKey)).not.toBe(-1);
            }
        });
    });

    it("returns correct CSS classes from getInputWidthClass", function () {
        Object.keys(InputWidths).forEach(widthKey => {
            expect(getInputWidthClass({ width: widthKey })).toBe(InputWidthClassesReference[widthKey]);
        });
    });

    it("returns null from getInputWidthClass if class is already provided", function () {
        Object.keys(InputWidths).forEach(widthKey => {
            const cssClasses = `${InputWidthClasses[widthKey]} some-other-class`;
            expect(getInputWidthClass({ className: cssClasses })).toBe(null);
        });
    });

    it("fires warning if CSS class is used", function () {
        console.warn = jest.fn();

        getInputWidthClass({
            className: InputWidthClasses[InputWidths.MD]
        });

        expect(console.warn).toBeCalledWith("Deprecated: use the input 'width' prop instead of 'input-width-*' CSS " +
            "classes. Support for 'input-width-*' CSS classes will be removed in next version");
    });

    it("does not fire warning when in prod environment", function () {
        process.env.NODE_ENV = "production";
        console.warn = jest.fn();

        getInputWidthClass({
            className: InputWidthClasses[InputWidths.MD]
        });

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

    it("does not fire warning if non-width CSS class is used", function () {
        console.warn = jest.fn();

        getInputWidthClass({
            className: "my-css-class"
        });

        expect(console.warn).not.toBeCalled();
    });
});
