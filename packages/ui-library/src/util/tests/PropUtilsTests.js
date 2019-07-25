import React from "react";
import { getClickableA11yProps, getIconClassName } from "../PropUtils";
import { KeyCodes } from "../KeyboardUtils";

describe("PropUtils", function () {
    describe("getIconClassName", function () {
        const defaultProps = {
            iconClassName: "iconClassName",
            iconName: "iconName",
            icon: "icon",
            id: "id",
        };
        it("returns iconClassName as passed", function () {
            expect(getIconClassName(defaultProps)).toBe(defaultProps.iconClassName);
        });
        it("returns iconName when no iconClassName", function () {
            expect(getIconClassName({ ...defaultProps, iconClassName: null })).toBe(`icon-${defaultProps.iconName}`);
        });
        it("returns iconName when no iconClassName or iconName", function () {
            expect(getIconClassName({ ...defaultProps, iconClassName: null, iconName: null }))
                .toBe(`icon-${defaultProps.icon}`);
        });
        it("returns null with nothing", function () {
            expect(getIconClassName({})).toBe(null);
        });
        it("returns id with option", function () {
            expect(getIconClassName({ id: defaultProps.id }, { useId: true })).toBe(`icon-${defaultProps.id}`);
        });
        it("returns null non string", function () {
            expect(getIconClassName({ icon: <div></div> })).toBe(null);
        });
    });

    describe("getClickableA11yProps", () => {
        it("returns the expected role, tabIndex and an onKeyDown function", () => {
            const {
                onKeyDown,
                role,
                tabIndex
            } = getClickableA11yProps();

            onKeyDown({ keyCode: KeyCodes.SPACE, preventDefault: () => {} }); // Just calling this so that the default function is covered.
            expect(onKeyDown).toBeTruthy();
            expect(role).toEqual("button");
            expect(tabIndex).toEqual(0);
        });

        it("onKeyDown calls onClick if enter is pressed", () => {
            const onClick = jest.fn();
            const argument = { keyCode: KeyCodes.ENTER, preventDefault: () => {} };

            const {
                onKeyDown
            } = getClickableA11yProps(onClick);

            onKeyDown(argument);

            expect(onClick).toHaveBeenCalledWith(argument);
        });

        it("onKeyDown calls onClick if space is pressed", () => {
            const onClick = jest.fn();
            const argument = { keyCode: KeyCodes.SPACE, preventDefault: () => {} };

            const {
                onKeyDown
            } = getClickableA11yProps(onClick);

            onKeyDown(argument);

            expect(onClick).toHaveBeenCalledWith(argument);
        });
    });
});
