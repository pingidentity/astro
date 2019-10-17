import React from "react";
import { mount, shallow } from "enzyme";
import NavSearch from "../NavSearch";

describe("NavSearch", () => {
    const defaultProps = {
        navTree: [
            {
                id: "SNAAAARF",
                label: "Header 1",
                children: [
                    {
                        id: "evenworse",
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
        ]
    };
    it("renders the component", () => {
        const component = mount(
            <NavSearch
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("opens the modal when onOpen is called", () => {
        const onOpen = jest.fn();
        const component = shallow(
            <NavSearch
                {...defaultProps}
                onOpen={onOpen}
            />
        ).dive();

        expect(component.prop("open")).toEqual(false);
        component.prop("onOpen")();
        expect(component.prop("open")).toEqual(true);
    });

    it("closes the modal when onClose is called", () => {
        const onClose = jest.fn();
        const component = shallow(
            <NavSearch
                {...defaultProps}
                onClose={onClose}
            />
        ).dive();

        component.prop("onOpen")();
        expect(component.prop("open")).toEqual(true);
        component.prop("onClose")();
        expect(component.prop("open")).toEqual(false);
    });

    it("closes the modal when onSearchClick is called", () => {
        const onSearchClick = jest.fn();
        const component = shallow(
            <NavSearch
                {...defaultProps}
                onSearchClick={onSearchClick}
            />
        ).dive();

        component.prop("onOpen")();
        expect(component.prop("open")).toEqual(true);
        component.prop("onSearchClick")();
        expect(component.prop("open")).toEqual(false);
    });
});