import React from "react";
import { shallow, mount } from "enzyme";
import TileButton, {
    ActionButton,
    RowButton,
    SquareButton,
    StackedButton,
    TileGrid,
    TopContent,
    Badge
} from "../TileButton";

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
        }).dive();

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
        }).dive();

        const iconComponent = component.find("TileButtonIcon");
        const icon = iconComponent.dive().find(".tile-button__icon");

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
        }).dive();

        const title = component.find("TileButtonTitle");
        const renderedTitle = title.dive().find(".tile-button__title");

        expect(renderedTitle.exists()).toEqual(true);
    });

    it("renders icon if icon is passed in", () => {
        const component = getComponent({
            icon: <div className="special-icon"></div>
        }).dive();

        const iconContainer = component.find("TileButtonIcon");
        const icon = iconContainer.dive().find(".special-icon");

        expect(icon.exists()).toEqual(true);
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

    it("renders the SquareButton", () => {
        const component = shallow(
            <SquareButton
                details="details"
                icon="icon-globe"
                note="INTERESTING"
                title="GREAT TITLE OH MY GOSH"
            >
                content
            </SquareButton>);

        expect(component.exists()).toEqual(true);
    });

    it("renders the RowButton", () => {
        const component = shallow(
            <RowButton
                details="details"
                icon="icon-globe"
                note="INTERESTING"
                title="GREAT TITLE OH MY GOSH"
            >
                content
            </RowButton>);

        expect(component.exists()).toEqual(true);
    });

    it("renders the StackedButton", () => {
        const component = shallow(
            <StackedButton
                details="details"
                icon="icon-globe"
                note="INTERESTING"
                title="GREAT TITLE OH MY GOSH"
            >
                content
            </StackedButton>);

        expect(component.exists()).toEqual(true);
    });

    it("renders the ActionButton", () => {
        const component = shallow(
            <ActionButton
                details="details"
                icon="icon-globe"
                note="INTERESTING"
                title="GREAT TITLE OH MY GOSH"
            >
                content
            </ActionButton>);

        expect(component.exists()).toEqual(true);
    });
});
