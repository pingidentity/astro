import React from "react";
import { shallow, mount } from "enzyme";
import NavCard, { Title } from "../NavCard";
import * as QuickActions from "../../panels/QuickActions";

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

    it("renders with inverted class", () => {
        const child = <QuickActions.Section />;
        const component = mount(
            <NavCard invertColor>
                {child}
            </NavCard>
        );

        expect(component.find(".nav-card--inverted").exists()).toEqual(true);
        expect(component.find(QuickActions.Section).props().invertColor).toEqual(true);
    });

    it("renders the Title component with inverted children", () => {
        const child = <QuickActions.EditButton />;
        const component = shallow(
            <Title invertColor>{child}</Title>
        );

        expect(component.find(QuickActions.EditButton).props().invertColor).toEqual(true);
    });
});