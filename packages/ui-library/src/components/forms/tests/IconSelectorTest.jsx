import React from "react";
import IconSelector from "../IconSelector";
import { mount } from "enzyme";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";

const radioItems = [
    { id: "cog", iconName: "cog" },
    { id: "puzzle", iconName: "puzzle" },
    { id: "badge", iconName: "badge" },
    { id: "key", iconName: "key" },
    { id: "globe", iconName: "globe" },
    { id: "apps", iconName: "apps" },
    { id: "beaker", iconName: "beaker" },
    { id: "device", iconName: "device" },
];

describe("IconSelector", function () {

    function getWrapper(props) {
        return mount(
            <IconSelector
                items={radioItems}
                labelText="hello"
                {...props}
            />
        );
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <IconSelector
                items={radioItems}
                labelText="hello"
            />
        );
    });

    it("renders width default data-id", function () {
        const wrapper = getWrapper();

        expect(wrapper.find("[data-id='icon-selector']")).toBeTruthy();
    });

    it("fires onValueChange when clicked", function() {
        const callback = jest.fn();
        const wrapper = getWrapper({ onValueChange: value => callback(value) });

        const button = wrapper.find("[data-id='icon-selector-button_puzzle']");

        expect(callback).not.toHaveBeenCalled();
        button.simulate("click");
        expect(callback).toHaveBeenCalledWith("puzzle");
    });
});