import React from "react";
import StatCardRow from "../StatCardRow";
import { shallow } from "enzyme";


describe("Stat Card Row", () => {

    it("renders the component", () => {
        const component = shallow(<StatCardRow />);

        expect(component.exists()).toBeTruthy();
    });

    it("renders with correct left alignment class", () => {
        const component = shallow(<StatCardRow alignCards={"left"} />);

        expect(component.find(".dashboard-card-row--content-left").exists()).toBeTruthy();
    });

    it("renders with correct right alignment class", () => {
        const component = shallow(<StatCardRow alignCards={"right"} />);

        expect(component.find(".dashboard-card-row--content-right").exists()).toBeTruthy();
    });

    it("renders with correct center alignment class", () => {
        const component = shallow(<StatCardRow alignCards={"center"} />);

        expect(component.find(".dashboard-card-row--content-center").exists()).toBeTruthy();
    });

});