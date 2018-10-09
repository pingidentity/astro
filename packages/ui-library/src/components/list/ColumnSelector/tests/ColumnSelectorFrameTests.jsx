import React from "react";
import { mount } from "enzyme";
import ColumnSelectorFrame from "../ColumnSelectorFrame";

window.__DEV__ = true;

describe("ColumnSelectorFrame", () => {
    const baseClassName = "column-selector";
    function getComponent({
        "dataid": dataId = "test-frame",
        ...props
    } = {}) {
        return mount(
            <ColumnSelectorFrame
                data-id={dataId}
                {...props}
            />
        );
    }

    it("renders the component", () => {
        const component = getComponent();

        expect(component.exists()).toEqual(true);
    });

    it("renders children and passes correct state down", () => {
        const component = getComponent({
            children: ({ query }) => query,
            query: "quack"
        });

        const options = component.find(`div.${baseClassName}__columns`);

        expect(options.text()).toEqual("quack");
    });

    it("calls onSearch if provided", () => {
        const onSearch = jest.fn();
        const component = getComponent({
            onSearch: onSearch
        });

        const searchBox = component.find("input[data-id=\"searchBox-input\"]");

        searchBox.simulate("change", { target: { value: "Quack" } });

        expect(onSearch).toHaveBeenCalledWith("Quack");
    });

    it("does not call onSearch if not provided", () => {
        const onSearch = jest.fn();
        const component = getComponent();

        const searchBox = component.find("input[data-id=\"searchBox-input\"]");

        searchBox.simulate("change", { target: { value: "Quack" } });

        expect(onSearch).not.toHaveBeenCalled();
    });

    it("sets state of search if not defined in props", () => {
        const component = getComponent();

        const searchBox = component.find("input[data-id=\"searchBox-input\"]");

        searchBox.simulate("change", { target: { value: "Quack" } });

        expect(component.state().query).toEqual("Quack");
    });

    it("does not set state of search if defined in props", () => {
        const component = getComponent({
            query: "BORK"
        });

        const searchBox = component.find("input[data-id=\"searchBox-input\"]");

        searchBox.simulate("change", { target: { value: "Quack" } });

        expect(component.state().query).toEqual("BORK");
    });
});
