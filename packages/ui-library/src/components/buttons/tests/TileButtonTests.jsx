import React from "react";
import { shallow, mount } from "enzyme";
import TileButton, { TileGrid, TopContent, Badge } from "../TileButton";

window.__DEV__ = true;

describe("TileButton", () => {
    function getComponent({
        "dataid": dataId = "test-button",
        ...props
    } = {}) {
        return shallow(
            <TileButton
                data-id={dataId}
                {...props}
            />
        );
    }

    it("renders the component", () => {
        const component = getComponent();

        expect(component.exists()).toEqual(true);
    });

    it("renders details if details prop is passed in", () => {
        const component = getComponent({
            details: ["detail"]
        });

        const details = component.find(".tile-button__details");

        expect(details.exists()).toEqual(true);
    });

    it("renders with selected class if selected prop is passed in", () => {
        const component = getComponent({
            selected: true
        });

        const selected = component.find(".tile-button--selected");

        expect(selected.exists()).toEqual(true);
    });

    it("renders icon if iconName is passed in", () => {
        const component = getComponent({
            iconName: "globe"
        });

        const icon = component.find(".tile-button__icon");

        expect(icon.exists()).toEqual(true);
    });

    it("renders with panel class if panel and selected are true", () => {
        const component = getComponent({
            panel: true,
            selected: true
        });

        const panel = component.find(".tile-button--panel");

        expect(panel.exists()).toEqual(true);
    });

    it("renders title if title is passed in", () => {
        const component = getComponent({
            title: "title"
        });

        const title = component.find(".tile-button__title");

        expect(title.exists()).toEqual(true);
    });

    it("renders icon if icon is passed in", () => {
        const component = getComponent({
            icon: <div className="special-icon"></div>
        });

        const iconContainer = component.find(".tile-button__icon-container");
        const icon = component.find(".special-icon");

        expect(iconContainer.exists()).toEqual(true);
        expect(icon.exists()).toEqual(true);
    });

    it("prevents default on mouse down", () => {
        const mockE = { preventDefault: jest.fn() };
        const component = getComponent();

        component.find("div").simulate("mousedown", mockE);
        expect(mockE.preventDefault).toHaveBeenCalled();
    });

    it("renders the badge", function () {
        const component = mount(
            <TileButton>
                <Badge text="Some text" />
            </TileButton>
        );

        const element = component.find(".feature-badge");
        expect(element.exists()).toEqual(true);
    });

    it("renders the left top content", function () {
        const component = mount(
            <TileButton>
                <TopContent left="Some text" />
            </TileButton>
        );

        const element = component.find(".tile-button__top-left");
        expect(element.exists()).toEqual(true);
    });

    it("renders the right top content", function () {
        const component = mount(
            <TileButton>
                <TopContent right="Some text" />
            </TileButton>
        );

        const element = component.find(".tile-button__top-right");
        expect(element.exists()).toEqual(true);
    });

    it("stops click propagation on TopContent", function () {
        const stopPropagation = jest.fn();
        const event = { stopPropagation };

        const component = mount(
            <TileGrid>
                <TopContent right="Some text" />
            </TileGrid>
        );

        component.find(TopContent).simulate("click", event);
        expect(stopPropagation).toHaveBeenCalled();
    });

    it("renders the TileGrid", function () {
        const component = mount(
            <TileGrid>
                <TileButton />
            </TileGrid>
        );

        const element = component.find(".tile-button__grid");
        expect(element.exists()).toEqual(true);
    });
});
