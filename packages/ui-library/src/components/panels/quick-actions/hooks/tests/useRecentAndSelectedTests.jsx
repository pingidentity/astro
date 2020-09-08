import React from "react";
import { mount } from "enzyme";
import { DragDropContext } from "react-dnd";
import TestBackend from "react-dnd-test-backend";
import useRecentAndSelected from "../useRecentAndSelected";

describe("QuickActions.useRecentAndSelected", () => {
    const useRecentDefaultActions = {
        "applications": [
            {
                id: "idp",
                label: "IdP Connection",
                iconName: "pf-authentication-integration",
            },
            {
                id: "spc",
                label: "SP Connections",
                iconName: "globe",
            },
            {
                id: "sc",
                label: "Signing Certificates",
                iconName: "globe",
            },
            {
                id: "oauth",
                label: "OAuth Authorization Server Settings",
                iconName: "globe",
            },
            {
                id: "meta",
                label: "Metadata Settings",
                iconName: "globe",
            },
            {
                id: "sms",
                label: "SMS Provider Settings",
                iconName: "globe",
            },
            {
                id: "sms2",
                label: "SMS Provider Settings",
                iconName: "globe",
            },
        ],
        "authentication": [
            {
                id: "idp1",
                label: "IdP Connection",
                iconName: "pf-authentication-integration",
            },
            {
                id: "spc1",
                label: "SP Connections",
                iconName: "globe",
            },
            {
                id: "sc1",
                label: "Signing Certificates",
                iconName: "globe",
            },
            {
                id: "oauth1",
                label: "OAuth Authorization Server Settings",
                iconName: "globe",
            },
            {
                id: "meta1",
                label: "Metadata Settings",
                iconName: "globe",
            },
            {
                id: "sms1",
                label: "SMS Provider Settings",
                iconName: "globe",
            },
            {
                id: "sms21",
                label: "SMS Provider Settings",
                iconName: "globe",
            },
        ]
    };

    const UseRecentTestComponent = DragDropContext(TestBackend)(({
        onValueChange = () => {},
        recentIds = [],
        selectedIds = [],
        actions = useRecentDefaultActions,
        maxSelected
    }) => {
        const renderedActions = useRecentAndSelected(onValueChange, actions, selectedIds, recentIds, maxSelected);

        return Object.entries(renderedActions).map(([label, groupActions]) => (
            <div data-id={label}>
                {groupActions}
            </div>
        ));
    });

    describe("useRecentAndSelected", () => {
        it("renders selected and recent ids from main actions", () => {
            const component = mount(<UseRecentTestComponent selectedIds={["idp"]} recentIds={["spc"]} />);

            const selected = component.find("[data-id=\"selected\"]").find("HoverAction");
            const recent = component.find("[data-id=\"recent\"]").find("HoverAction");

            expect(selected.prop("iconName")).toEqual("pf-authentication-integration");
            expect(recent.prop("iconName")).toEqual("globe");
        });

        it("adds item to selected ids when clicked", () => {
            const onValueChange = jest.fn();
            const component = mount(<UseRecentTestComponent onValueChange={onValueChange} />);
            expect(onValueChange).not.toHaveBeenCalled();

            const item = component.find("[data-id=\"applications\"]").find("HoverAction").first();
            item.simulate("click");

            expect(onValueChange).toHaveBeenCalledWith({ selected: ["idp"], recent: [] });
        });

        it("doesn't add item that's already been added", () => {
            const onValueChange = jest.fn();
            const component = mount(<UseRecentTestComponent onValueChange={onValueChange} selectedIds={["idp"]} />);
            expect(onValueChange).not.toHaveBeenCalled();

            const item = component.find("[data-id=\"draggable-action_idp\"]").find("HoverAction");
            item.simulate("click");

            expect(onValueChange).not.toHaveBeenCalled();
        });

        it("adds item to selected ids and moves last selected to recent when selected is full", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    maxSelected={2}
                    selectedIds={["idp", "spc"]}
                />);
            expect(onValueChange).not.toHaveBeenCalled();

            const item = component.find("[data-id=\"draggable-action_oauth\"]").find("HoverAction");
            item.simulate("click");

            expect(onValueChange).toHaveBeenCalledWith({ selected: ["oauth", "idp"], recent: ["spc"] });
        });

        it("removes added item from recent ids", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    maxSelected={2}
                    recentIds={["idp"]}
                />);
            expect(onValueChange).not.toHaveBeenCalled();

            const item = component.find("[data-id=\"draggable-action_idp\"]").find("HoverAction");
            item.simulate("click");

            expect(onValueChange).toHaveBeenCalledWith({ selected: ["idp"], recent: [] });
        });

        it("moves selected item to recent when clicked", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    maxSelected={2}
                    selectedIds={["idp"]}
                />);
            expect(onValueChange).not.toHaveBeenCalled();

            const item = component.find("[data-id=\"selected-action_idp\"]").find("HoverAction");
            item.simulate("click");

            expect(onValueChange).toHaveBeenCalledWith({ selected: [], recent: ["idp"] });
        });

        it("doesn't allow more than 5 recent items when selected is clicked", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    maxSelected={2}
                    selectedIds={["idp"]}
                    recentIds={["spc", "oauth", "meta", "sms", "sms2"]}
                />);
            expect(onValueChange).not.toHaveBeenCalled();

            const item = component.find("[data-id=\"selected-action_idp\"]").find("HoverAction");
            item.simulate("click");

            expect(onValueChange)
                .toHaveBeenCalledWith({ selected: [], recent: ["idp", "spc", "oauth", "meta", "sms"] });
        });

        it("adds back recent item when clicked", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    maxSelected={2}
                    recentIds={["idp"]}
                />);
            expect(onValueChange).not.toHaveBeenCalled();

            const item = component.find("[data-id=\"recent-action_idp\"]").find("HoverAction");
            item.simulate("click");

            expect(onValueChange).toHaveBeenCalledWith({ selected: ["idp"], recent: [] });
        });

        it("disables selected items and marks them with a check", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    maxSelected={2}
                    selectedIds={["idp"]}
                />);

            const item = component.find("[data-id=\"draggable-action_idp\"]").find("HoverAction");
            item.simulate("click");

            expect(onValueChange).not.toHaveBeenCalled();
            expect(item.prop("cornerIcon")).toEqual("check");
        });

        it("correctly adds placeholder when base action is dragged", () => {
            const component = mount(<UseRecentTestComponent />);

            const item = component.find("[data-id=\"draggable-action_idp\"]").find("DragDropBase");
            item.prop("onDragStart")();
            component.update();
            const placeholder = component.find("[data-id=\"selected-action-placeholder\"]").find("DragDropBase");

            expect(placeholder.exists()).toEqual(true);
        });

        it("correctly adds placeholder when base action is dragged and there are no selected items", () => {
            const component = mount(
                <UseRecentTestComponent
                    selectedIds={[]}
                />);

            const item = component.find("[data-id=\"draggable-action_idp\"]").find("DragDropBase");
            item.prop("onDragStart")();
            component.update();
            const placeholder = component.find("[data-id=\"selected-action-placeholder\"]").find("DragDropBase");

            expect(placeholder.exists()).toEqual(true);
        });

        it("removes the placeholder when the drag to selected is canceled", () => {
            const component = mount(
                <UseRecentTestComponent
                    selectedIds={[]}
                />);

            const item = component.find("[data-id=\"draggable-action_idp\"]").find("DragDropBase");
            item.prop("onDragStart")();
            component.update();
            const placeholder = component.find("[data-id=\"selected-action-placeholder\"]").find("DragDropBase");

            expect(placeholder.exists()).toEqual(true);

            // Have to get the selected action again, otherwise its onCancel will call with an outdated state.
            component.find("[data-id=\"draggable-action_idp\"]").find("DragDropBase").prop("onCancel")();
            component.update();

            expect(component.find("[data-id=\"selected-action-placeholder\"]").exists()).toEqual(false);
        });

        it("adds base item to selected and removes placeholder when it's dragged to the placeholder", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    selectedIds={[]}
                />);

            const item = component.find("[data-id=\"draggable-action_idp\"]").find("DragDropBase");
            item.prop("onDragStart")();
            component.update();
            const placeholder = component.find("[data-id=\"selected-action-placeholder\"]").find("DragDropBase");

            expect(placeholder.exists()).toEqual(true);

            placeholder.prop("onDrop")(0, undefined, undefined, undefined, undefined, "idp");
            component.update();

            expect(component.find("[data-id=\"selected-action-placeholder\"]").exists()).toEqual(false);
            expect(onValueChange).toHaveBeenCalledWith({ selected: ["idp"], recent: [] });
        });

        it("reorders selected options when dragged", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    selectedIds={["idp", "meta", "spc"]}
                />);

            const item = component.find("[data-id=\"selected-action_idp\"]").find("DragDropBase");
            item.prop("onDrag")(1, null, null, null, null, "idp");
            component.update();
            const placeholder = component.find("[data-id=\"selected-action-placeholder\"]").find("DragDropBase");

            expect(placeholder.exists()).toEqual(true);

            placeholder.prop("onDrop")(1, undefined, undefined, undefined, undefined, "idp");
            component.update();

            expect(onValueChange).toHaveBeenCalledWith({ selected: ["meta", "idp", "spc"], recent: [] });
        });

        it("doesn't do anything if a base item is dropped onto another base item", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    selectedIds={["meta", "spc"]}
                />);

            const item = component.find("[data-id=\"draggable-action_idp\"]").find("DragDropBase");
            item.prop("onDragStart")();
            component.update();

            const base = component.find("[data-id=\"draggable-action_idp\"]").find("DragDropBase");
            base.prop("onDrop")();

            expect(onValueChange).not.toHaveBeenCalled();
        });

        it("resets placeholder when selected item is dragged out of bounds", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    selectedIds={["idp", "meta", "spc"]}
                />);

            const item = component.find("[data-id=\"selected-action_idp\"]").find("DragDropBase");
            item.prop("onDrag")(1, null, null, null, null, "idp");
            component.update();

            const draggingItem = component.find("[data-id=\"selected-action_idp\"]").find("DragDropBase");
            draggingItem.prop("onCancel")(false);
            component.update();

            const placeholder = component.find("[data-id=\"selected-action-placeholder\"]");
            expect(placeholder.exists()).toEqual(false);
        });

        it("reorders selected items when dropped onto a generic drag area", () => {
            const onValueChange = jest.fn();
            const component = mount(
                <UseRecentTestComponent
                    onValueChange={onValueChange}
                    selectedIds={["idp", "spc"]}
                />);

            const item = component.find("[data-id=\"selected-action_idp\"]").find("DragDropBase");
            item.prop("onDrag")(1, null, null, null, null, "idp");
            component.update();

            const draggingItem = component.find("[data-id=\"selected-action_idp\"]").find("DragDropBase");
            draggingItem.prop("onCancel")(true);

            expect(onValueChange).toHaveBeenCalledWith({ selected: ["spc", "idp"], recent: [] });
        });
    });
});