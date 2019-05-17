import React from "react";
import { shallow } from "enzyme";
import Chip, { chipColors } from "../Chip";

describe("Chip", () => {
    it("renders the component", () => {
        const component = shallow(<Chip />);

        expect(component.exists()).toEqual(true);
    });

    it("renders with the correct color class", () => {
        const component = shallow(
            <Chip
                color={chipColors.CYAN}
            />
        );

        const cyan = component.find(".chip-component--color-cyan");

        expect(cyan.exists()).toEqual(true);
    });

    it("renders with full width class if fullWidth is true", () => {
        const component = shallow(
            <Chip
                fullWidth
            />
        );

        const fullWidth = component.find(".chip-component--full-width");

        expect(fullWidth.exists()).toEqual(true);
    });

    it("does not render with full width class if fullWidth is false", () => {
        const component = shallow(
            <Chip
                fullWidth={false}
            />
        );

        const fullWidth = component.find(".chip-component--full-width");

        expect(fullWidth.exists()).toEqual(false);
    });
});
