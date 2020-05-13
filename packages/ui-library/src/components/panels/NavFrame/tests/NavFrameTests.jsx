import React from "react";
import { shallow } from "enzyme";
import NavFrame from "../NavFrame";
import NavHeader from "../NavHeader";
import NavSidebar from "../NavSidebar";

describe("NavFrame", () => {
    const defaultProps = {
        navTree: [
            {
                id: "SNAAAARF",
                label: "Header 1",
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
                ]
            },
            {
                id: "1",
                label: "Header 2",
                children: [
                    {
                        icon: "globe",
                        id: "-2",
                        label: "The cheap seats",
                        children: [
                            {
                                id: "-4",
                                label: "Lots of mysterious stains",
                                children: [
                                    {
                                        id: "-5",
                                        label: "and a startling amount of gum"
                                    },
                                    {
                                        id: "-8",
                                        label: "I don't like this one bit"
                                    }
                                ]
                            },
                            {
                                id: "-6",
                                label: "Oh no, this one is even worse",
                                children: [
                                    {
                                        id: "-7",
                                        label: "How could a floor be this sticky?"
                                    }
                                ]
                            },
                        ]
                    },
                ]
            }
        ]
    };

    it("renders the component", () => {
        const component = shallow(
            <NavFrame
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("selects first node if no selectedNode is passed in and autoSelectFirstNode is true", () => {
        const component = shallow(
            <NavFrame
                {...defaultProps}
                autoSelectFirstNode={true}
            />
        );

        const header = component.find(NavHeader);
        expect(header.prop("selectedHeader")).toEqual("SNAAAARF");

        const sidebar = component.find(NavSidebar);
        expect(sidebar.prop("selectedSection")).toEqual(2);
        expect(sidebar.prop("selectedNode")).toEqual(5);
    });


    it("only selects first header if no selectedNode is passed in and autoSelectFirstNode is false", () => {
        const component = shallow(
            <NavFrame
                {...defaultProps}
                autoSelectFirstNode={false}
            />
        );

        const header = component.find(NavHeader);
        expect(header.prop("selectedHeader")).toEqual("SNAAAARF");

        const sidebar = component.find(NavSidebar);
        expect(sidebar.prop("selectedSection")).toBeUndefined();
        expect(sidebar.prop("selectedNode")).toBeUndefined();
    });

    it("gets correct header and section if given a selectedNode", () => {
        const component = shallow(
            <NavFrame
                {...defaultProps}
                selectedNode="-7"
            />
        );

        const header = component.find(NavHeader);
        expect(header.prop("selectedHeader")).toEqual("1");

        const sidebar = component.find(NavSidebar);
        expect(sidebar.prop("selectedSection")).toEqual("-2");
        expect(sidebar.prop("selectedNode")).toEqual("-7");
    });

    it("expands sidebar when item is selected from sidebar", () => {
        const component = shallow(
            <NavFrame
                {...defaultProps}
                collapsed={true}
                selectedNode="-7"
            />
        );

        const sidebar = component.find(NavSidebar);
        expect(sidebar.prop("collapsed")).toEqual(true);

        sidebar.prop("onSelectItem")(-7);
        expect(component.find(NavSidebar).prop("collapsed")).toEqual(false);
    });

    it("collapses sidebar when item is selected from sidebar", () => {
        const component = shallow(
            <NavFrame
                {...defaultProps}
                selectedNode="-7"
            />
        );

        const sidebar = component.find(NavSidebar);
        sidebar.prop("onSelectItem")("-7");
        expect(component.find(NavSidebar).prop("collapsed")).toEqual(false);

        component.find(NavHeader).prop("onSelectItem")("1");
        expect(component.find(NavSidebar).prop("collapsed")).toEqual(true);
    });

    it("collapses sidebar when onCollapse is called", () => {
        const component = shallow(
            <NavFrame
                {...defaultProps}
                selectedNode="-7"
            />
        );

        const sidebar = component.find(NavSidebar);
        sidebar.prop("onSelectItem")("-7");
        expect(component.find(NavSidebar).prop("collapsed")).toEqual(false);

        sidebar.prop("onCollapse")();
        expect(component.find(NavSidebar).prop("collapsed")).toEqual(true);
    });

    it("does not render sidebar when isFullScreen is set to true", () => {
        const component = shallow(
            <NavFrame
                {...defaultProps}
                isFullscreen
            />
        );

        expect(component.find(NavSidebar).exists()).toEqual(false);
    });
});
