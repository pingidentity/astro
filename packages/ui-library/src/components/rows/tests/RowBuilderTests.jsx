window.__DEV__ = true;

jest.dontMock("../RowBuilder.jsx");

import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import React from "react";
import { isDOMComponent, renderIntoDocument, Simulate } from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import RowBuilder, { renderRemoveIcon } from "../RowBuilder";

describe("RowBuilder", () => {

    const defaultRows = [
        {
            id: "first",
            content: <div/>
        },
        {
            id: "second",
            content: <div/>
        }
    ];

    function getComponent({
        "data-id": dataId = "row-builder-test",
        rows = defaultRows,
        ...props
    } = {}) {
        return renderIntoDocument(
            <div>
                <RowBuilder data-id={dataId} rows={rows} {...props} />
            </div>
        );
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <RowBuilder
                rows={defaultRows}
            />
        );
    });

    it("renders all rows passed in", () => {
        const component = getComponent();
        const rows = TestUtils.scryRenderedDOMNodesWithClass(component, "row-builder__row");

        expect(rows.length).toEqual(2);
    });

    it("calls onAdd prop when add button is clicked", () => {
        const onAdd = jest.fn();
        const component = getComponent({ onAdd });
        const add = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "row-builder-add"
        );
        const addAnchor = TestUtils.findRenderedDOMNodeWithTag(
            add,
            "a"
        );

        Simulate.click(addAnchor);
        expect(onAdd).toHaveBeenCalled();
    });

    it("does not call onAdd prop when not passed in", () => {
        const onAdd = jest.fn();
        const component = getComponent();
        const add = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "row-builder-add"
        );
        const addAnchor = TestUtils.findRenderedDOMNodeWithTag(
            add,
            "a"
        );

        Simulate.click(addAnchor);
        expect(onAdd).not.toHaveBeenCalled();
    });

    it("calls onRemove prop with row id when remove button is clicked", () => {
        const onRemove = jest.fn();
        const component = getComponent({ onRemove });
        const removeButton = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "row-builder-test-first-delete"
        );

        Simulate.click(removeButton);
        expect(onRemove.mock.calls[0][1]).toEqual("first");
    });

    it("does not call onRemove prop when not passed in", () => {
        const onRemove = jest.fn();
        const component = getComponent();
        const removeButton = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "row-builder-test-first-delete"
        );

        Simulate.click(removeButton);
        expect(onRemove).not.toHaveBeenCalled();
    });

    it("renders remove label when showRemoveLabel prop is set to true", () => {
        const component = getComponent({ showRemoveLabel: true });
        const labels = TestUtils.scryRenderedDOMNodesWithClass(component, "row-builder__remove__label");

        expect(labels.length).not.toEqual(0);
    });

    it("does not render remove label when showRemoveLabel prop is set to true", () => {
        const component = getComponent({ showRemoveLabel: false });
        const label = TestUtils.findRenderedDOMNodeWithClass(component, "row-builder__remove__label");

        expect(label).toBeFalsy();
    });

    it("does not render delete but if row has removable prop set to false", () => {
        const component = getComponent({
            content: [<div />],
            id: "no-remove",
            removable: false
        });

        const deleteButton = TestUtils.findRenderedDOMNodeWithDataId(component, "row-builder-test-no-remove-delete");

        expect(isDOMComponent(deleteButton)).toBeFalsy();
    });

    it("renders custom add button when given node", () => {
        const component = getComponent({
            renderAddButton: <div data-id="addButtonTest" />
        });

        const addButton = TestUtils.findRenderedDOMNodeWithDataId(component, "addButtonTest");

        expect(addButton).toBeTruthy();
    });

    it("renders custom add button when given function", () => {
        const component = getComponent({
            renderAddButton: () => <div data-id="addButtonTest" />
        });

        const addButton = TestUtils.findRenderedDOMNodeWithDataId(component, "addButtonTest");

        expect(addButton).toBeTruthy();
    });

    it("renders custom remove button when given node", () => {
        const customClass = "custom-remove-btn";
        const component = getComponent({
            renderRemoveButton: <div className={customClass} />
        });

        const customRemoveButtons = TestUtils.scryRenderedDOMNodesWithClass(component, customClass);

        expect(customRemoveButtons.length).toBe(defaultRows.length);
    });

    it("renders custom remove icon and fires callback", () => {
        const callback = jest.fn();

        const component = getComponent({
            renderRemoveButton: renderRemoveIcon,
            onRemove: callback,
        });

        const icons = TestUtils.scryRenderedDOMNodesWithClass(component, "iconComponent--clickable");
        expect(icons.length).toBeTruthy();

        expect(callback).not.toBeCalled();
        Simulate.click(icons[0]);
        expect(callback).toBeCalled();
    });

    it("doesn't render custom remove icon when row is not removeable", () => {
        const component = getComponent({
            renderRemoveButton: renderRemoveIcon,
            rows: [
                {
                    id: "one",
                    content: <div />,
                    removable: false,
                }
            ]
        });

        expect(TestUtils.findRenderedDOMNodeWithClass(component, "icon--clickable")).toBeFalsy();
    });

    it("renders custom remove button when given function", () => {
        const customClass = "custom-remove-btn";
        const component = getComponent({
            renderRemoveButton: () => <div className={customClass} />
        });

        const customRemoveButtons = TestUtils.scryRenderedDOMNodesWithClass(component, customClass);

        expect(customRemoveButtons.length).toBe(defaultRows.length);
    });

    it("renders separator", () => {
        const separator = renderIntoDocument(
            <div>
                <RowBuilder.Separator>
                    <div data-id="separatorTest" />
                </RowBuilder.Separator>
            </div>
        );

        const testDiv = TestUtils.findRenderedDOMNodeWithDataId(separator, "separatorTest");
        expect(testDiv).toBeTruthy();
    });

    it("renders row", () => {
        const row = renderIntoDocument(
            <div>
                <RowBuilder.Row>
                    <div data-id="rowTest" />
                </RowBuilder.Row>
            </div>
        );

        const testDiv = TestUtils.findRenderedDOMNodeWithDataId(row, "rowTest");
        expect(testDiv).toBeTruthy();
    });
});
