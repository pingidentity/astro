import React from "react";
import { mount } from "enzyme";
import ColumnSelectorColumn, { ColumnTitle } from "../ColumnSelectorColumn";

window.__DEV__ = true;

describe("ColumnSelectorColumn", () => {
    const baseClassName = "column-selector__column";

    function getComponent({
        "dataid": dataId = "test-column",
        subtitle,
        title,
        ...props
    } = {}) {
        return mount(
            <ColumnSelectorColumn
                data-id={dataId}
                {...props}
            >
                <ColumnTitle title={title} subtitle={subtitle} />
            </ColumnSelectorColumn>
        );
    }

    it("renders the component", () => {
        const component = getComponent();

        expect(component.exists()).toEqual(true);
    });

    it("renders a subtitle if defined in props", () => {
        const component = getComponent({
            subtitle: "subtitle",
            title: "title"
        });

        const subtitle = component.find(`div.${baseClassName}-subtitle`);

        expect(subtitle.exists()).toEqual(true);
    });

    it("does not render subtitle if not defined in props", () => {
        const component = getComponent();

        const subtitle = component.find(`div.${baseClassName}-subtitle`);

        expect(subtitle.exists()).toEqual(false);
    });
});
