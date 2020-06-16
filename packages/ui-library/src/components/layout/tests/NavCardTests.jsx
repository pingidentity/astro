import React from "react";
import { shallow } from "enzyme";
import NavCard, { Title } from "../NavCard";

describe("Nav Card", () => {
    it("renders the NavCard component", () => {
        const component = shallow(
            <NavCard> A child </NavCard>
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders the Title component", () => {
        const component = shallow(
            <Title>Quite a title here</Title>
        );

        expect(component.exists()).toEqual(true);
    });
});