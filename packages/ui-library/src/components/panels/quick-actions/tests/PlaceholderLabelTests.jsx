import React from "react";
import { shallow } from "enzyme";
import PlaceholderLabel from "../PlaceholderLabel";

describe("PlaceholderLabel", () => {
    it("renders the PlaceholderLabel component", () => {
        const component = shallow(<PlaceholderLabel />);
        expect(component.exists()).toEqual(true);
    });
});