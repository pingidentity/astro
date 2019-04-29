import React from "react";
import { mount } from "enzyme";
import ColumnSelectorRow, { buttonTypes } from "../ColumnSelectorRow";

window.__DEV__ = true;

describe("ColumnSelectorRow", () => {
    function getComponent({
        buttonType = buttonTypes.ADD,
        "dataid": dataId = "test-row",
        expandable = false,
        id = "default",
        ...props
    } = {}) {
        return mount(
            <ColumnSelectorRow
                buttonType={buttonType}
                data-id={dataId}
                expandable={expandable}
                id={id}
                {...props}
            />
        );
    }

    it("renders the component", () => {
        const component = getComponent();

        expect(component).toBeTruthy();
    });

    it("toggles open when clicked", () => {
        const component = getComponent({
            expandable: true,
        });

        expect(component.state().open).toEqual(false);

        component
            .find("div[data-id=\"row-toggle\"]")
            .simulate("click");

        expect(component.state().open).toEqual(true);
    });

    it("does not toggle open if open is defined in props", () => {
        const onToggle = jest.fn();
        const component = getComponent({
            expandable: true,
            onToggle,
            open: false
        });

        expect(component.state().open).toEqual(false);

        component
            .find("div[data-id=\"row-toggle\"]")
            .simulate("click");

        expect(component.state().open).toEqual(false);
        expect(onToggle).toHaveBeenCalled();
    });

    it("renders a title icon if defined in props", () => {
        const component = getComponent({
            titleIcon: "cog"
        });

        const icon = component.find("div.icon");

        expect(icon.exists()).toEqual(true);
    });

    it("does not render title icon if not defined in props", () => {
        const component = getComponent();

        const icon = component.find("div.icon");

        expect(icon.exists()).toEqual(false);
    });

    it("renders a subtitle if defined in props", () => {
        const component = getComponent({
            subtitle: "subtitle"
        });

        const subtitle = component.find(".column-selector__row-subtitle");

        expect(subtitle.exists()).toEqual(true);
    });

    it("does not render subtitle if not defined in props", () => {
        const component = getComponent();

        const subtitle = component.find(".column-selector__row-subtitle");

        expect(subtitle.exists()).toEqual(false);
    });

    it("renders a plus button for the ADD button type", () => {
        const component = getComponent({
            buttonType: buttonTypes.ADD
        });

        const button = component.find("button.column-selector__row-button");

        expect(button.props().className).toContain("plus");
    });

    it("renders a plus button for the ADD button type", () => {
        const component = getComponent({
            buttonType: buttonTypes.REMOVE
        });

        const button = component.find("button.column-selector__row-button");

        expect(button.props().className).toContain("minus");
    });

    it("renders custom button", () => {
        const component = getComponent({
            customButton: <div className="unrepentantly-fake-button" />
        });
        const oldButton = component.find("button.column-selector__row-button");
        const custom = component.find("div.unrepentantly-fake-button");

        expect(oldButton.exists()).toEqual(false);
        expect(custom.exists()).toEqual(true);
    });

    it("renders custom button using function", () => {
        const customClick = jest.fn();

        const component = getComponent({
            customButton: (({ handleOnButtonClick }) =>
                <button className="a-real-button" onClick={handleOnButtonClick} />),
            onButtonClick: customClick
        });

        component.find("button.a-real-button").simulate("click");

        expect(customClick).toHaveBeenCalled();
    });

    it("renders children and passes correct state down", () => {
        const component = getComponent({
            children: ({ open }) => open ? "open" : "very closed",
            open: true
        });

        const options = component.find("div.column-selector__row-options");

        expect(options.text()).toEqual("open");
    });
});
