import React from "react";
import { shallow } from "enzyme";
import Spacing, { sizes } from "../Spacing";

describe("Spacing", () => {
    it("renders the component", () => {
        const component = shallow(
            <Spacing />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders with top spacing xs class", () => {
        const component = shallow(
            <Spacing top={sizes.XS}/>
        );

        expect(component.find(".space-top-xs").exists()).toEqual(true);
    });

    it("renders with top spacing sm class", () => {
        const component = shallow(
            <Spacing top={sizes.SM}/>
        );

        expect(component.find(".space-top-sm").exists()).toEqual(true);
    });

    it("renders with top spacing md class", () => {
        const component = shallow(
            <Spacing top={sizes.MD}/>
        );

        expect(component.find(".space-top-md").exists()).toEqual(true);
    });

    it("renders with top spacing lg class", () => {
        const component = shallow(
            <Spacing top={sizes.LG}/>
        );

        expect(component.find(".space-top-lg").exists()).toEqual(true);
    });

    it("renders with top spacing xl class", () => {
        const component = shallow(
            <Spacing top={sizes.XL}/>
        );

        expect(component.find(".space-top-xl").exists()).toEqual(true);
    });

    it("renders with bottom spacing xs class", () => {
        const component = shallow(
            <Spacing bottom={sizes.XS}/>
        );

        expect(component.find(".space-bottom-xs").exists()).toEqual(true);
    });

    it("renders with bottom spacing sm class", () => {
        const component = shallow(
            <Spacing bottom={sizes.SM}/>
        );

        expect(component.find(".space-bottom-sm").exists()).toEqual(true);
    });

    it("renders with bottom spacing md class", () => {
        const component = shallow(
            <Spacing bottom={sizes.MD}/>
        );

        expect(component.find(".space-bottom-md").exists()).toEqual(true);
    });

    it("renders with bottom spacing lg class", () => {
        const component = shallow(
            <Spacing bottom={sizes.LG}/>
        );

        expect(component.find(".space-bottom-lg").exists()).toEqual(true);
    });

    it("renders with bottom spacing xl class", () => {
        const component = shallow(
            <Spacing bottom={sizes.XL}/>
        );

        expect(component.find(".space-bottom-xl").exists()).toEqual(true);
    });

    it("renders with left spacing xs class", () => {
        const component = shallow(
            <Spacing left={sizes.XS}/>
        );

        expect(component.find(".space-left-xs").exists()).toEqual(true);
    });

    it("renders with left spacing sm class", () => {
        const component = shallow(
            <Spacing left={sizes.SM}/>
        );

        expect(component.find(".space-left-sm").exists()).toEqual(true);
    });

    it("renders with left spacing md class", () => {
        const component = shallow(
            <Spacing left={sizes.MD}/>
        );

        expect(component.find(".space-left-md").exists()).toEqual(true);
    });

    it("renders with left spacing lg class", () => {
        const component = shallow(
            <Spacing left={sizes.LG}/>
        );

        expect(component.find(".space-left-lg").exists()).toEqual(true);
    });

    it("renders with left spacing xl class", () => {
        const component = shallow(
            <Spacing left={sizes.XL}/>
        );

        expect(component.find(".space-left-xl").exists()).toEqual(true);
    });

    it("renders with right spacing xs class", () => {
        const component = shallow(
            <Spacing right={sizes.XS}/>
        );

        expect(component.find(".space-right-xs").exists()).toEqual(true);
    });

    it("renders with right spacing sm class", () => {
        const component = shallow(
            <Spacing right={sizes.SM}/>
        );

        expect(component.find(".space-right-sm").exists()).toEqual(true);
    });

    it("renders with right spacing md class", () => {
        const component = shallow(
            <Spacing right={sizes.MD}/>
        );

        expect(component.find(".space-right-md").exists()).toEqual(true);
    });

    it("renders with right spacing lg class", () => {
        const component = shallow(
            <Spacing right={sizes.LG}/>
        );

        expect(component.find(".space-right-lg").exists()).toEqual(true);
    });

    it("renders with right spacing xl class", () => {
        const component = shallow(
            <Spacing right={sizes.XL}/>
        );

        expect(component.find(".space-right-xl").exists()).toEqual(true);
    });
});