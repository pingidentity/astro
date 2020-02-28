window.__DEV__ = true;

import React from "react";
import { mount } from "enzyme";

const defaultProps = {
    title: <div>Test Title</div>,
    subtitle: <div>Test Subtitle</div>,
    description: <div>Some words go here...</div>
};

jest.useFakeTimers();

describe("ExpandableCard", () => {
    const { default: ExpandableCard, ExpandableCardRow, statusTypes }= require("../ExpandableCard");

    const getComponent = props => mount((
        <ExpandableCardRow>
            <ExpandableCard {...defaultProps} {...props} />
        </ExpandableCardRow>
    ));

    const getExpandButton = (component) => {
        return component.find("[data-id='expand-btn'] > button");
    };

    const getEditButton = (component) => {
        return component.find("[data-id='edit-btn'] > button");
    };

    const getDeleteButton = (component) => {
        return component.find("[data-id='delete-btn'] > button");
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

    it("shows the cardControls when opened", () => {
        const toggleCallback = jest.fn();
        const component = getComponent({
            onToggle: toggleCallback,
            cardControls: (
                <h1>Hi, Mom!</h1>
            )
        });
        const expandButton = getExpandButton(component);

        expandButton.simulate("click");

        const cardControls = component.find(".expandable-card__cardControls");

        expect(cardControls.exists()).toEqual(true);
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

    it("don't show delete button is showDelete=false", () => {
        const component = getComponent({
            showDelete: false
        });

        const deleteButton = getDeleteButton(component);

        expect(deleteButton.exists()).toEqual(false);
    });

    it("calls onDelete when clicked", () => {
        const onDelete = jest.fn();
        const component = getComponent({
            onDelete
        });

        const deleteButton = getDeleteButton(component);

        deleteButton.simulate("click");

        expect(onDelete).toHaveBeenCalled();
    });

    it("disables edit if isEditEnabled=false", () => {
        const component = getComponent({
            isEditEnabled: false,
        });

        const editButton = getEditButton(component);

        expect(editButton.props().disabled).toEqual(true);
    });

    it("hides edit if showEdit=false", () => {
        const component = getComponent({
            showEdit: false,
        });

        const editButton = getEditButton(component);

        expect(editButton.exists()).toEqual(false);
    });

    it("calls onEditButtonClick when clicked", () => {
        const onEdit = jest.fn();
        const component = getComponent({
            onEditButtonClick: onEdit,
        });

        const editButton = getEditButton(component);

        editButton.simulate("click");

        expect(onEdit).toHaveBeenCalled();
    });

    it("adds a status if provided", () => {
        const component = getComponent({
            status: statusTypes.ERROR,
            statusText: "Status Text"
        });

        const status = component.find("[data-id='status-badge'] > .chip-component");

        expect(status.exists()).toEqual(true);
        expect(status.text()).toEqual("Status Text");
    });
});