import React from "react";
import { shallow } from "enzyme";
import Padding, { sizes } from "../Padding";

describe("Padding", () => {
    it("renders the component", () => {
        const component = shallow(
            <Padding />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders with top padding xs class", () => {
        const component = shallow(
            <Padding top={sizes.XS}/>
        );

        expect(component.find(".padding-component--top-xs").exists()).toEqual(true);
    });

    it("renders with top padding sm class", () => {
        const component = shallow(
            <Padding top={sizes.SM}/>
        );

        expect(component.find(".padding-component--top-sm").exists()).toEqual(true);
    });

    it("renders with top padding md class", () => {
        const component = shallow(
            <Padding top={sizes.MD}/>
        );

        expect(component.find(".padding-component--top-md").exists()).toEqual(true);
    });

    it("renders with top padding lg class", () => {
        const component = shallow(
            <Padding top={sizes.LG}/>
        );

        expect(component.find(".padding-component--top-lg").exists()).toEqual(true);
    });

    it("renders with top padding xl class", () => {
        const component = shallow(
            <Padding top={sizes.XL}/>
        );

        expect(component.find(".padding-component--top-xl").exists()).toEqual(true);
    });

    it("renders with bottom padding xs class", () => {
        const component = shallow(
            <Padding bottom={sizes.XS}/>
        );

        expect(component.find(".padding-component--bottom-xs").exists()).toEqual(true);
    });

    it("renders with bottom padding sm class", () => {
        const component = shallow(
            <Padding bottom={sizes.SM}/>
        );

        expect(component.find(".padding-component--bottom-sm").exists()).toEqual(true);
    });

    it("renders with bottom padding md class", () => {
        const component = shallow(
            <Padding bottom={sizes.MD}/>
        );

        expect(component.find(".padding-component--bottom-md").exists()).toEqual(true);
    });

    it("renders with bottom padding lg class", () => {
        const component = shallow(
            <Padding bottom={sizes.LG}/>
        );

        expect(component.find(".padding-component--bottom-lg").exists()).toEqual(true);
    });

    it("renders with bottom padding xl class", () => {
        const component = shallow(
            <Padding bottom={sizes.XL}/>
        );

        expect(component.find(".padding-component--bottom-xl").exists()).toEqual(true);
    });

    it("renders with left padding xs class", () => {
        const component = shallow(
            <Padding left={sizes.XS}/>
        );

        expect(component.find(".padding-component--left-xs").exists()).toEqual(true);
    });

    it("renders with left padding sm class", () => {
        const component = shallow(
            <Padding left={sizes.SM}/>
        );

        expect(component.find(".padding-component--left-sm").exists()).toEqual(true);
    });

    it("renders with left padding md class", () => {
        const component = shallow(
            <Padding left={sizes.MD}/>
        );

        expect(component.find(".padding-component--left-md").exists()).toEqual(true);
    });

    it("renders with left padding lg class", () => {
        const component = shallow(
            <Padding left={sizes.LG}/>
        );

        expect(component.find(".padding-component--left-lg").exists()).toEqual(true);
    });

    it("renders with left padding xl class", () => {
        const component = shallow(
            <Padding left={sizes.XL}/>
        );

        expect(component.find(".padding-component--left-xl").exists()).toEqual(true);
    });

    it("renders with right padding xs class", () => {
        const component = shallow(
            <Padding right={sizes.XS}/>
        );

        expect(component.find(".padding-component--right-xs").exists()).toEqual(true);
    });

    it("renders with right padding sm class", () => {
        const component = shallow(
            <Padding right={sizes.SM}/>
        );

        expect(component.find(".padding-component--right-sm").exists()).toEqual(true);
    });

    it("renders with right padding md class", () => {
        const component = shallow(
            <Padding right={sizes.MD}/>
        );

        expect(component.find(".padding-component--right-md").exists()).toEqual(true);
    });

    it("renders with right padding lg class", () => {
        const component = shallow(
            <Padding right={sizes.LG}/>
        );

        expect(component.find(".padding-component--right-lg").exists()).toEqual(true);
    });

    it("renders with right padding xl class", () => {
        const component = shallow(
            <Padding right={sizes.XL}/>
        );

        expect(component.find(".padding-component--right-xl").exists()).toEqual(true);
    });
});