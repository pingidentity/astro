import React from "react";
import { shallow } from "enzyme";
import InlineTextField from "../InlineTextField";


it("should render component", () => {
    const component = shallow(
        <InlineTextField/>
    );
    expect(component.exists()).toEqual(true);
});