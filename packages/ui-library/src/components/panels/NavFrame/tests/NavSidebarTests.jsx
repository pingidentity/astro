import React from "react";
import { shallow } from "enzyme";
import Icon from "../../../general/Icon";
import NavSidebar, {
    SidebarNode,
    SidebarGroup,
    SidebarSection
} from "../NavSidebar";

describe("NavSidebar", () => {
    const defaultProps = {
        navTree: [
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
    };

    it("renders the component", () => {
        const component = shallow(
            <NavSidebar
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders a SidebarSection for each section provided", () => {
        const component = shallow(
            <NavSidebar
                {...defaultProps}
            />
        );

        const sections = component.find(SidebarSection);

        expect(sections.length).toEqual(2);
    });

    it("marks correct SidebarSection as selected", () => {
        const component = shallow(
            <NavSidebar
                {...defaultProps}
                selectedSection="-2"
            />
        );

        const [unselected, selected] = component.find(SidebarSection);

        expect(unselected.props.selected).toEqual(false);
        expect(selected.props.selected).toEqual(true);
    });

    it("marks correct SidebarSection as selected based on selectedNode if no selectedSection is passed", () => {
        const component = shallow(
            <NavSidebar
                {...defaultProps}
                selectedNode="-5"
            />
        );

        const [unselected, selected] = component.find(SidebarSection);

        expect(unselected.props.selected).toEqual(false);
        expect(selected.props.selected).toEqual(true);
    });

    it("does not render SidebarGroup if collapsed", () => {
        const component = shallow(
            <NavSidebar
                {...defaultProps}
                collapsed={true}
                selectedSection="-2"
                selectedNode="-5"
            />
        );

        expect(component.find(SidebarGroup).exists()).toEqual(false);
    });

    it("renders correct group and renders correct node as selected when sidebar is not collapsed", () => {
        const component = shallow(
            <NavSidebar
                {...defaultProps}
                collapsed={false}
                selectedSection="-2"
                selectedNode="-5"
            />
        );

        const [selectedGroup] = component.find(SidebarGroup);
        expect(selectedGroup.props.label).toEqual("Lots of mysterious stains");

        const [selectedNode, irrelevantNode] = selectedGroup.props.children;
        expect(selectedNode.props.selected).toEqual(true);
        expect(irrelevantNode.props.selected).toEqual(false);
    });

    describe("SidebarSection", () => {
        it("renders the component", () => {
            const component = shallow(
                <SidebarSection
                    id="Empty. Hollow"
                />
            );

            expect(component.exists()).toEqual(true);
        });

        it("calls onClick with its id", () => {
            const onClick = jest.fn();
            const component = shallow(
                <SidebarSection
                    id="Spacious"
                    onClick={onClick}
                />
            );

            component.find("[data-id=\"sidebar-section_Spacious\"]")
                .simulate("click", { stopPropagation: () => {} });
            expect(onClick.mock.calls[0][0]).toEqual("Spacious");
        });

        it("renders an icon if icon prop is provided", () => {
            const component = shallow(
                <SidebarSection
                    id="THE VOID"
                    icon="globe"
                />
            );

            const icon = component.find(Icon);
            expect(icon.exists()).toEqual(true);
        });

        it("does not render an icon if no icon prop is provided", () => {
            const component = shallow(
                <SidebarSection
                    id="THE VOID"
                />
            );

            const icon = component.find(Icon);
            expect(icon.exists()).toEqual(false);
        });
    });

    describe("SidebarGroup", () => {
        it("renders the component", () => {
            const component = shallow(
                <SidebarGroup/>
            );

            expect(component.exists()).toEqual(true);
        });

        it("renders with divider class if hasDivider is true", () => {
            const component = shallow(
                <SidebarGroup
                    hasDivider
                />
            );

            expect(component.find(".nav-sidebar__group--with-divider").exists()).toEqual(true);
        });

        it("does not render with divider class if hasDivider is false", () => {
            const component = shallow(
                <SidebarGroup/>
            );

            expect(component.find(".nav-sidebar__group--with-divider").exists()).toEqual(false);
        });
    });

    describe("SidebarNode", () => {
        it("renders the component", () => {
            const component = shallow(
                <SidebarNode
                    id="The very end"
                />
            );

            expect(component.exists()).toEqual(true);
        });

        it("calls onClick with correct ID", () => {
            const onClick = jest.fn();

            const component = shallow(
                <SidebarNode
                    id="The very end"
                    onClick={onClick}
                />
            );

            component.find("[data-id=\"sidebar-node_The very end\"]")
                .simulate("click", { stopPropagation: () => {} });
            expect(onClick.mock.calls[0][0]).toEqual("The very end");
        });
    });
});
