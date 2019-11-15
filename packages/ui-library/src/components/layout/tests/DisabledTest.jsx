import React from "react";
import { shallow } from "enzyme";
import Disabled from "../Disabled";
import HelpHint from "../../tooltips/HelpHint";

describe("Disabled", () => {
    it("renders the disabled component with text inside", () => {
        const component = shallow(<Disabled>this is text</Disabled>);

        expect(component.exists()).toEqual(true);
    });

    it("renders the disabled component with a helpHint", () => {
        const component = shallow(<Disabled disabledText="hello">this is text</Disabled>);

        const disabledHelpHint = component.find(HelpHint);


        expect(disabledHelpHint.exists()).toEqual(true);
    });

    it("renders the disabled component without a helphint", () => {
        const component = shallow(<Disabled>this is text</Disabled>);

        const disabled = component.find(HelpHint);


        expect(disabled.exists()).toEqual(false);
    });
});