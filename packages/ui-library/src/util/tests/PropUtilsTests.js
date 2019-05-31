import React from "react";
import { getIconClassName } from "../PropUtils";


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
});
