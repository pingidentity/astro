import React from "react";
import { shallow } from "enzyme";
import TileButton from "../TileButton";

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
});
