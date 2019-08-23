import React from "react";
import OptionList from "../OptionList";
import { mount } from "enzyme";
import { mountSnapshotDataIds } from "../../../testutil/TestUtils";

const options = [
    {
        label: "One",
        value: 1,
        iconName: "user",
    },
    {
        heading: true,
        label: "next",
    },
    {
        label: "Two",
        value: 2,
        helpHintText: "HELP",
    },
];

// this component gets most of its coverage from being tested in other components
describe("OptionList", function () {

    function getWrapper(props) {
        return mount(
            <OptionList
                options={options}
                {...props}
            />
        );
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <OptionList
                options={options}
            />
        );
    });

    it("renders an icon", function () {
        const wrapper = getWrapper();

        expect(wrapper.find(".option-list__icon")).toBeTruthy();
    });

    it("fires the onValueChange callback", function() {
        const callback = jest.fn();
        const wrapper = getWrapper({ onValueChange: callback });

        expect(callback).not.toHaveBeenCalled();
        wrapper.find("[data-id='option-item_1']").hostNodes().simulate("click");
        expect(callback).toHaveBeenCalled();
    });

    it("mousedown prevents default", function() {
        const callback = jest.fn();
        const wrapper = getWrapper();

        expect(callback).not.toHaveBeenCalled();

        const event = {
            preventDefault: callback,
        };
        wrapper.find("li[data-id='option-item_1']").props().onMouseDown(event);

        expect(callback).toHaveBeenCalled();
    });
});