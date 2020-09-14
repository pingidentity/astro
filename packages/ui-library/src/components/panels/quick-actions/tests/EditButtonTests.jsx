import React from "react";
import { shallow } from "enzyme";
import EditButton from "../EditButton";

describe("QuickActions.EditButton", () => {
    it("renders the EditButton component", () => {
        const component = shallow(
            <EditButton
                onClick={() => console.log("Clicked")}
            />
        );

        expect(component.exists()).toEqual(true);
    });
});