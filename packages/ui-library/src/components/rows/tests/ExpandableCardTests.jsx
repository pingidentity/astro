window.__DEV__ = true;

import React from "react";
import { render, screen } from "@testing-library/react";
import { mount } from "enzyme";

const defaultProps = {
    title: <div>Test Title</div>,
    collapsedContent: <div>Some words go here...</div>
};

jest.useFakeTimers();

describe("ExpandableCard", () => {
    const { default: ExpandableCard, ExpandableCardRow } = require("../ExpandableCard");

    const getComponent = (props) => mount(
        <ExpandableCardRow>
            <ExpandableCard {...defaultProps} {...props} />
        </ExpandableCardRow>
    );

    const renderComponent = (props) => render(
        <ExpandableCardRow>
            <ExpandableCard {...defaultProps} {...props} />
        </ExpandableCardRow>
    );

    const getExpandButton = (component) => {
        return component.find("[data-id='expand-btn'] > button");
    };

    it("renders with default data-id", () => {
        const component = getComponent();

        const card = component.find("[data-id='expandable-card']");

        expect(card.exists()).toEqual(true);
    });

    it("renders with custom data-id", () => {
        const component = getComponent({
            "data-id": "expandable-card-test"
        });

        const card = component.find("[data-id='expandable-card-test']");

        expect(card.exists()).toEqual(true);
    });

    it("expands the card when ExpandButton clicked", () => {
        const toggleCallback = jest.fn();
        const component = getComponent({
            onToggle: toggleCallback,
        });
        const expandButton = getExpandButton(component);

        expandButton.simulate("click");

        expect(toggleCallback).toHaveBeenCalled();
    });

    it("scrolls content into view after expanded", () => {
        const component = getComponent();
        const expandButton = getExpandButton(component);

        // Mock scrollIntoView
        let scrollIntoViewMock = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

        expandButton.simulate("click");

        jest.runAllTimers();

        expect(scrollIntoViewMock).toHaveBeenCalled();
    });

    it("shows collapsedContent when collapsed", () => {
        renderComponent({
            expanded: false,
        });
        const collapsible = screen.queryByTestId("expandable-card-collapsed-content");
        expect(collapsible).toBeVisible();
    });

    it("hides children when collapsed", () => {
        const component = getComponent({
            expanded: false,
        });

        expect(component.exists(".expandable-card__content--expanded")).toEqual(false);
    });

    it("shows children when expanded", () => {
        const component = getComponent({
            expanded: true,
        });

        expect(component.exists(".expandable-card__content--expanded")).toEqual(true);
    });
});