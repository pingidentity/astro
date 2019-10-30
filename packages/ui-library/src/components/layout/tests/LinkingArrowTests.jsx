import React from "react";
import { shallow } from "enzyme";
import LinkingArrow from "../LinkingArrow";

describe("LinkingArrow", () => {
    it("renders the component", () => {
        const component = shallow(<LinkingArrow title="CONNECTIONS" />);

        expect(component.exists()).toEqual(true);
    });
});