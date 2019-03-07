import React from "react";
import OptionList from "../OptionList";
import { mount } from "enzyme";

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

    it("renders an icon", function () {
        const wrapper = getWrapper();

        expect(wrapper.find(".option-list__icon")).toBeTruthy();
    });

    it("fires a the onValueChange callback", function() {
        const callback = jest.fn();
        const wrapper = getWrapper({ onValueChange: callback });

        expect(callback).not.toHaveBeenCalled();
        wrapper.find("[data-id='option-item']").first().simulate("click");
        expect(callback).toHaveBeenCalled();
    });
});