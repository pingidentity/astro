import React from "react";
import PropTypes, { checkPropTypes } from "prop-types";
import { KeyCodes } from "../KeyboardUtils";
import { generateNavTreePropType, getClickableA11yProps, getIconClassName, getIcon } from "../PropUtils";
import { shallow } from "enzyme";
import Icon from "../../components/general/Icon";


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

    describe("getIcon", function () {
        it("returns icon if string passed in", function () {
            const component = shallow(
                getIcon("globe")
            ).dive();
            expect(component.find(".icon-globe").exists()).toEqual(true);
        });
        it("returns icon if icon is passed in", function () {
            const icon = <Icon iconName="globe"/>;
            const component = getIcon(icon);

            expect(component).toBe(icon);
        });

    });

    describe("generateNavTreePropType", () => {
        it("throws error for tree with invalid prop on one of its levels", () => {
            console.error = jest.fn();
            const tree = [
                {
                    id: <div>I AM INCORRECT AND SORRY FOR WHAT I AM</div>,
                    label: "Header 1",
                    children: [
                        {
                            id: "evenworse",
                            icon: "globe",
                            label: "Section without children"
                        }
                    ]
                },
                {
                    id: "1",
                    label: "Header 2",
                    children: [
                        {
                            icon: "globe",
                            id: 2,
                            label: "Section",
                            children: [
                                {
                                    id: 4,
                                    label: "Group",
                                    children: [
                                        {
                                            id: 5,
                                            label: "End node"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 3,
                            label: "SPLEHRT"
                        }
                    ]
                }
            ];

            const propType = generateNavTreePropType(4);

            checkPropTypes({ tree: propType }, { tree });

            expect(console.error).toHaveBeenCalledTimes(1);
        });

        it("throws error for custom propType on correct level", () => {
            console.error = jest.fn();
            const tree = [
                {
                    justTheWorstProp: 21212121,
                    id: "1",
                    label: "Header 2",
                    children: [
                        {
                            justTheWorstProp: 21212121,
                            icon: "globe",
                            id: 2,
                            label: "Section",
                            children: [
                                {
                                    justTheWorstProp: 21212121,
                                    id: 4,
                                    label: "Group",
                                    children: [
                                        {
                                            justTheWorstProp: 21212121,
                                            id: 5,
                                            label: "End node"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 3,
                            label: "SPLEHRT"
                        }
                    ]
                }
            ];

            const propType = generateNavTreePropType(4, [null, { justTheWorstProp: PropTypes.string }]);

            checkPropTypes({ tree: propType }, { tree });

            expect(console.error).toHaveBeenCalledTimes(1);
        });
    });
});
