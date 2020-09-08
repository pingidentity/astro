import React from "react";
import { shallow } from "enzyme";
import Divider from "../Divider";

describe("QuickActions.Divider", () => {
    it("renders the Divider component", () => {
        const component = shallow(<Divider />);
        expect(component.exists()).toEqual(true);
    });
});