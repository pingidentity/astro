import React from "react";
import { shallow } from "enzyme";
import Button from "../Button";
import TutorialButton from "../TutorialButton";

describe("Tutorial Button", () => {
    it("renders the component with correct props", () => {
        const passedProps = {
            className: "customClassName",
            "data-id": "this-thing-here",
            label: "Something interesting",
            onClick: jest.fn()
        };
        const component = shallow(<TutorialButton {...passedProps} />);

        expect(component.exists()).toBeTruthy();

        const {
            className,
            "data-id": dataId,
            onClick
        } = component.find(Button).props();

        expect(className).toContain(passedProps.className);
        expect(dataId).toEqual(passedProps["data-id"]);
        expect(onClick).toEqual(passedProps.onClick);

    });
});
