window.__DEV__ = true;

jest.dontMock("../ExpandableRow");
jest.dontMock("../../../tooltips/DetailsTooltip");
jest.dontMock("../../../tooltips/HelpHint");
jest.mock("popper.js");
jest.mock("react-portal");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";
import TestUtils from "../../../../testutil/TestUtils";
import KeyboardUtils from "../../../../util/KeyboardUtils";
import ExpandableRow from "../ExpandableRow";
import DragDrop from "../../DragDrop";
import HelpHint from "../../../tooltips/HelpHint";
import { DragDropContext } from "react-dnd";
import _ from "underscore";
import TestBackend from "react-dnd-test-backend";

describe("ExpandableRow v4", function() {

    function wrapInTestContext(Component) {
        return DragDropContext(TestBackend)(
            class extends React.Component {
                render() {
                    return <Component {...this.props} />;
                }
            }
        );
    }

    function getComponent(opts) {
        opts = _.defaults(opts || {}, {
            title: <div>Test Title</div>,
            subtitle: <div>Test Subtitle</div>,
            content: <div data-id="content">Test Content</div>,
            onToggle: jest.fn(),
        });

        const WrappedComponent = opts.ordering ? wrapInTestContext(ExpandableRow) : ExpandableRow;

        return TestUtils.renderInWrapper(<WrappedComponent {...opts} />);
    }

    function getTwoComponents(opts, opts2) {
        const defaults = {
            title: <div>Test Title</div>,
            subtitle: <div>Test Subtitle</div>,
            content: <div data-id="content">Test Content</div>,
            onToggle: jest.fn(),
        };
        opts = _.defaults(opts || {}, defaults);
        opts2 = _.defaults(opts2 || {}, defaults);

        const DoubleComponent = () => (
            <div>
                <ExpandableRow {...opts} />
                <ExpandableRow {...opts2} />
            </div>
        );
        const WrappedComponent = wrapInTestContext(DoubleComponent);

        return ReactTestUtils.renderIntoDocument(<WrappedComponent />);
    }

    function getContainer(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");
    }

    function getExpandButton(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "expand-btn");
    }

    function getEditButton(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "edit-btn");
    }

    function getDeleteButton(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn");
    }

    function getOrderingInput(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "ordering-input");
    }

    it("data-id's don't change", () => {
        const Wrapped = DragDropContext(TestBackend)(() => (
            <ExpandableRow
                title={<div>Test Title</div>}
                subtitle={<div>Test Subtitle</div>}
                content={<div data-id="content">Test Content</div>}
                onToggle={jest.fn()}
                ordering={{
                    position: 3,
                    total: 10,
                    onReorder: jest.fn()
                }}
                rowAccessories="BORK BORK"
                showEdit
                showDelete
                status={ExpandableRow.Statuses.GOOD}
                expanded
                rowMessage={{
                    type: ExpandableRow.RowMessageTypes.ERROR,
                    text: "OH NO OOPS"
                }}
            />
        ));
        mountSnapshotDataIds(<Wrapped />);
    });

    it("renders with default data-id", function() {
        const component = getComponent();

        const row = TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");

        expect(row).toBeDefined();
    });

    it("renders with given data-id", function() {
        const component = getComponent({ "data-id": "myRow" });

        const row = TestUtils.findRenderedDOMNodeWithDataId(component, "myRow");

        expect(row).toBeDefined();
    });

    it("renders with given id", function() {
        const component = getComponent({ id: "myRow" });

        const row = TestUtils.findRenderedDOMNodeWithDataId(component, "myRow");

        expect(row).toBeDefined();
    });

    it("renders the row message if provided", function() {
        const rowMessageObj = {
                text: "The row message appears at the top of the expanded row only when the row is expanded.",
                type: ExpandableRow.RowMessageTypes.WARNING
            },
            component = getComponent({ rowMessage: rowMessageObj, expanded: true });

        const rowMessage = TestUtils.findRenderedDOMNodeWithDataId(component, "item-message");

        expect(rowMessage).toBeDefined();
        expect(rowMessage.getAttribute("class")).toContain(rowMessageObj.type);
        expect(rowMessage.textContent).toContain(rowMessageObj.text);
    });

    describe("renders custom delete tooltip content with render prop", () => {
        it("calls confirmDeleteContent with passing-in expected props", () => {
            const confirmDeleteContentMock = jest.fn();
            getComponent({
                confirmDeleteContent: confirmDeleteContentMock,
                expanded: true,
                showDeleteConfirm: true,
            });
            expect(confirmDeleteContentMock).toBeCalledTimes(1);
            const argumentKeyNames = Object.keys(confirmDeleteContentMock.mock.calls[0][0]);
            expect(argumentKeyNames).toContain("onCancel");
            expect(argumentKeyNames).toContain("onConfirm");
            expect(argumentKeyNames).toContain("confirmLabel");
            expect(argumentKeyNames).toContain("cancelLabel");
        });

        it("renders custom content returned from render prop", () => {
            const deleteTtText = "My custom content";
            const deleteTtClass = "my-delete-tt";
            const deleteTtContent = () => (<div className={deleteTtClass}>{deleteTtText}</div>);
            const component = getComponent({
                confirmDeleteContent: deleteTtContent,
                expanded: true,
                showDeleteConfirm: true,
            });
            const ttContent = ReactTestUtils.findRenderedDOMComponentWithClass(component, deleteTtClass);
            expect(ttContent.textContent).toEqual(deleteTtText);
        });

        it("renders custom delete title", () => {
            const deleteTitle = "Custom delete title";
            const deleteTtContent = () => (<div />);
            const component = getComponent({
                confirmDeleteContent: deleteTtContent,
                expanded: true,
                showDeleteConfirm: true,
                confirmDeleteTitle: deleteTitle
            });

            const deleteTitleTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "details-title");
            expect(deleteTitleTooltip.textContent).toEqual(deleteTitle);
        });

        it("renders Confirm button with expected label and onclick handler", () => {
            const onConfirmDeleteMock = jest.fn();
            const confirmButtonId = "confirm-custom-button";
            const deleteTtContent = ({ onConfirm, confirmLabel }) =>
                (<button key="confirm" data-id={confirmButtonId} onClick={onConfirm}>Yes({confirmLabel})</button>);
            const component = getComponent({
                confirmDeleteContent: deleteTtContent,
                expanded: true,
                showDeleteConfirm: true,
                onDeleteConfirmClick: onConfirmDeleteMock,
            });
            const confirmButton = TestUtils.findRenderedDOMNodeWithDataId(component, confirmButtonId);
            expect(confirmButton.textContent).toEqual("Yes(Delete)");
            expect(onConfirmDeleteMock).not.toBeCalled();
            ReactTestUtils.Simulate.click(confirmButton);
            expect(onConfirmDeleteMock).toBeCalled();
        });

        it("renders Cancel button with expected label and onclick handler", () => {
            const onCancelMock = jest.fn();
            const cancelButtonId = "confirm-custom-button";
            const deleteTtContent = ({ onCancel, cancelLabel }) =>
                (<button key="cancel" data-id={cancelButtonId} onClick={onCancel}>No({cancelLabel})</button>);
            const component = getComponent({
                confirmDeleteContent: deleteTtContent,
                expanded: true,
                showDeleteConfirm: true,
                onDeleteCancelClick: onCancelMock
            });
            const cancelButton = TestUtils.findRenderedDOMNodeWithDataId(component, cancelButtonId);
            expect(cancelButton.textContent).toEqual("No(Cancel)");
            ReactTestUtils.Simulate.click(cancelButton);
            expect(onCancelMock).toBeCalled();
        });
    });

    it("stateless: renders component as collapsed (by default)", function() {
        const component = getComponent();
        const expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");

        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
    });

    it("stateless: no toggle callback", function() {
        const component = getComponent({ onToggle: undefined });
        const expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
        //as long as no exception is thrown, the test will pass
    });

    it("stateless: renders the expand button", function() {
        const component = getComponent();
        const expandButton = getExpandButton(component);

        expect(ReactTestUtils.isDOMComponent(expandButton)).toBeTruthy();
    });

    it("stateless: renders the edit button by default", function() {
        const component = getComponent({ expanded: true });

        expect(ReactTestUtils.isDOMComponent(getEditButton(component))).toBeTruthy();
    });

    it("stateless: renders custom edit button", function() {
        const component = getComponent({
            expanded: true,
            editButton: <div data-id="custom-edit-button">Click me</div>
        });

        const customButton = TestUtils.findRenderedDOMNodeWithDataId(component, "custom-edit-button");

        expect(ReactTestUtils.isDOMComponent(getEditButton(component))).toBeFalsy();
        expect(customButton.textContent).toBe("Click me");
    });

    it("stateless: renders custom className", function() {
        const component = getComponent({
            expanded: true,
            className: "extra"
        });

        expect(getContainer(component).getAttribute("class")).toContain("extra");
    });

    it("stateless: renders the delete button by default", function() {
        const component = getComponent({ expanded: true });

        expect(ReactTestUtils.isDOMComponent(getDeleteButton(component))).toBeTruthy();
    });

    it("stateless: renders row without delete button when showDelete prop is set to false", function() {
        const component = getComponent({ expanded: true, showDelete: false });

        // check css on row
        expect(getContainer(component).className).toContain("no-delete");

        // make sure delete button not rendered
        expect(ReactTestUtils.isDOMComponent(getDeleteButton(component))).toBeFalsy();
    });

    it("stateless: passes non-hash path", function() {
        const component = getComponent({
            expanded: true,
            editViewRoute: "/my/route"
        });

        const editButton = getEditButton(component);

        expect(editButton.getAttribute("href")).toEqual("/my/route");
    });

    it("stateless: renders the specified delete button", function() {
        const component = getComponent({
            expanded: true,
            deleteButton: <div data-id="custom-delete-button">Delete Me</div>
        });

        const customButton = TestUtils.findRenderedDOMNodeWithDataId(component, "custom-delete-button");

        expect(ReactTestUtils.isDOMComponent(getDeleteButton(component))).toBeFalsy();
        expect(customButton.textContent).toEqual("Delete Me");
    });

    it("stateless: calls onToggle when expanded", function() {
        const component = getComponent({ expanded: true });
        const expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
        expect(component.props.children.props.onToggle).lastCalledWith(true);
    });

    it("stateless: calls onToggle when collapsed", function() {
        const component = getComponent();
        const expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
        expect(component.props.children.props.onToggle).toBeCalled();
        expect(component.props.children.props.onToggle.mock.calls[0][0]).toBe(false);
    });

    it("stateless: no exception is thrown when onToggle is null", function() {
        const component = getComponent({ onToggle: null });
        const expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
    });

    it("expands when clicking on the expand icon and collapses when clicked on again", function() {
        const component = getComponent();
        const expandButton = getExpandButton(component);

        // expand
        ReactTestUtils.Simulate.click(expandButton);

        const expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        const content = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.textContent).toEqual("Test Content");
        expect(component.props.children.props.onToggle.mock.calls[0][0]).toEqual(false);

        // collapse
        ReactTestUtils.Simulate.click(expandButton);
        const expanded = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expanded)).toBeFalsy();
        expect(component.props.children.props.onToggle.mock.calls[1][0]).toEqual(true);
    });

    it("does not expand if expanded prop is set to false", () => {
        const component = getComponent({ expanded: false });
        const expandButton = getExpandButton(component);

        // expand
        ReactTestUtils.Simulate.click(expandButton);

        const expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(expandedRow).toEqual(null);
        expect(component.props.children.props.onToggle).lastCalledWith(false);
    });


    it("stateful: renders the row as expanded if expanded prop is set to true", function() {
        const component = getComponent({ expanded: true });
        const expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        const content = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
    });

    it("stateless: renders the view icon when isEditEnabled prop is set to false", function() {
        const component = getComponent({ expanded: true, isEditEnabled: false });
        const viewButton = TestUtils.findRenderedDOMNodeWithDataId(component, "edit-btn");

        expect(viewButton.className).toEqual("view-btn");
    });

    it("stateless: renders an empty disabled button when showEdit prop is set to false", function() {
        const component = getComponent({ expanded: true, showEdit: false });
        const expandableRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");

        expect(expandableRow.className).toContain("no-edit");
    });

    it("stateless: renders the content when passed in as a children instead of a prop", function() {
        const component = getComponent({
            expanded: true,
            children: <div data-id="content-children">Content</div>
        });

        const expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();

        const content = TestUtils.findRenderedDOMNodeWithDataId(component, "content-children");
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.textContent).toEqual("Content");
    });

    it("stateless: renders the right-side/row-accessories content", function() {
        const linkText = "Control Link",
            rowAccessoriesLink = <a className="control-link">{linkText}</a>;

        const component = getComponent({ rowAccessories: rowAccessoriesLink });

        const rowAccessories = ReactTestUtils.findRenderedDOMComponentWithClass(component, "row-accessories");
        expect(rowAccessories).toBeTruthy();

        const rowAccessoriesContent = ReactTestUtils.findRenderedDOMComponentWithClass(component, "control-link");
        expect(rowAccessoriesContent).toBeTruthy();

        expect(rowAccessoriesContent.textContent).toEqual(linkText);
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("stateless: renders the right-side/row-accessories help hint", function() {
        const // helpText = "I need help",
            labelText = "Help, I need somebody",
            rowAccessoriesHelp = (
                <HelpHint data-id="help-me" className="width-auto bottom" hintText="I need help">
                    <label className="row-help">Help, I need somebody</label>
                </HelpHint>
            );

        const component = getComponent({ rowAccessories: rowAccessoriesHelp });

        const rowAccessories = TestUtils.findRenderedDOMNodeWithDataId(component, "row-accessories");
        expect(rowAccessories).toBeTruthy();

        const rowAccessoriesHelpElement = TestUtils.findRenderedDOMNodeWithDataId(component, "help-me");
        expect(rowAccessoriesHelpElement).toBeDefined();

        // rowAccessoriesHelpContent = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text-content");
        // expect(rowAccessoriesHelpContent).toBeTruthy();

        // expect(rowAccessoriesHelpContent.textContent).toEqual(helpText);

        const rowAccessoriesLabelContent = ReactTestUtils.findRenderedDOMComponentWithClass(component, "row-help");
        expect(rowAccessoriesLabelContent).toBeTruthy();

        expect(rowAccessoriesLabelContent.textContent).toEqual(labelText);
    });

    it("stateless: renders a row image when provided", function() {
        const imagePath = "http://p1.com/images/image1.jpg";

        // test without image
        let component = getComponent();
        let imageContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "item-image");
        expect(imageContent.length).toEqual(0);

        // test with image
        component = getComponent({ image: imagePath });
        imageContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "item-image");
        expect(imageContent.length).toEqual(1);
        expect(imageContent[0].src).toEqual(imagePath);
    });

    it("stateless: renders a row icon when provided", function() {
        const iconType = "icon-cog";

        // test without icon
        let component = getComponent();
        let iconContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "item-icon");
        expect(iconContent.length).toEqual(0);

        // test with icon
        component = getComponent({ icon: iconType });
        iconContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "item-icon");
        expect(iconContent.length).toEqual(1);

        iconContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "icon-cog");
        expect(iconContent.length).toEqual(1);
    });

    it("stateless: should generate delete button with confirmation when confirmDelete provided", function() {
        const component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true
        });

        const deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeTruthy();
        expect(getDeleteButton(component)).toBeNull();
    });

    it("stateful: should generate delete button with confirmation when confirmDelete provided", function() {
        const component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true,
        });

        const deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeTruthy();
        expect(getDeleteButton(component)).toBeNull();
    });

    it("stateless: should generate delete button without confirmation when confirmDelete not provided", function() {
        const component = getComponent({
            expanded: true,
            showDelete: true
        });

        const deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeNull();
        expect(getDeleteButton(component)).toBeTruthy();
    });

    it("stateful: should generate delete button without confirmation when confirmDelete not provided", function() {
        const component = getComponent({
            expanded: true,
            showDelete: true,
        });

        const deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeNull();
        expect(getDeleteButton(component)).toBeTruthy();
    });

    it("stateful: should show delete confirm dialog", function() {
        const component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true
        });

        let deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toBeFalsy();

        const deleteBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");

        ReactTestUtils.Simulate.click(deleteBtn);

        deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toBeTruthy();
    });

    it("stateful: should hide delete confirm dialog", function() {
        const component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true,
            initialState: {
                showDeleteConfirm: true,
            },
        });

        const deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toBeTruthy();
        const cancelButton = TestUtils.findRenderedDOMNodeWithDataId(deleteConfirmDialog, "button-group-cancel");
        ReactTestUtils.Simulate.click(cancelButton);

        const dialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(dialog).toBeFalsy();
    });

    it("should show and hide delete confirm dialog if confirmDelete is true", () => {
        const component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true,
        });

        expect(
            TestUtils.findRenderedDOMNodeWithDataId(component, "details-content")
        ).toBeFalsy();
        const deleteButton = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");

        ReactTestUtils.Simulate.click(deleteButton);

        const deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toBeTruthy();
        const confirmDelete = TestUtils.findRenderedDOMNodeWithDataId(deleteConfirmDialog, "confirm-delete");
        ReactTestUtils.Simulate.click(confirmDelete);

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "details-content")).toBeFalsy();
    });

    it("should close confirm dialog when cancel is clicked", () => {
        const component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true,
        });

        expect(
            TestUtils.findRenderedDOMNodeWithDataId(component, "details-content")
        ).toBeFalsy();
        const deleteButton = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");

        ReactTestUtils.Simulate.click(deleteButton);

        const deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toBeTruthy();
        const cancelButton = TestUtils.findRenderedDOMNodeWithDataId(deleteConfirmDialog, "button-group-cancel");
        ReactTestUtils.Simulate.click(cancelButton);

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "details-content")).toBeFalsy();
    });

    it("should not show confirm dialog if confirmDelete is false", () => {
        const component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: false,
        });

        expect(
            TestUtils.findRenderedDOMNodeWithDataId(component, "details-content")
        ).toBeFalsy();
        const deleteButton = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn");

        ReactTestUtils.Simulate.click(deleteButton);

        const deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toEqual(null);
    });

    it("should not show confirm dialog if showDeleteConfirm is passed as false", () => {
        const component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true,
            showDeleteConfirm: false,
        });

        expect(
            TestUtils.findRenderedDOMNodeWithDataId(component, "details-content")
        ).toBeFalsy();
        const deleteButton = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");

        ReactTestUtils.Simulate.click(deleteButton);

        const deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toEqual(null);
    });

    it("stateful: should trigger onDelete callback when confirmDelete is false", function() {
        const component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: false,
            showDeleteConfirm: true,
            onDelete: jest.fn()
        });

        const deleteBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn");

        ReactTestUtils.Simulate.click(deleteBtn);

        expect(component.props.children.props.onDelete).toBeCalled();
    });

    it("stateless: renders the status as good", function() {
        const component = getComponent({ status: ExpandableRow.Statuses.GOOD });
        const status = TestUtils.findRenderedDOMNodeWithDataId(component, "status");
        const icon = TestUtils.findRenderedDOMNodeWithClass(status, "status-indicator--icon");
        expect(icon.className).toContain("status-indicator--icon__success");
    });

    it("stateless: renders the status as error", function() {
        const component = getComponent({ status: ExpandableRow.Statuses.ERROR });
        const status = TestUtils.findRenderedDOMNodeWithDataId(component, "status");
        const icon = TestUtils.findRenderedDOMNodeWithClass(status, "status-indicator--icon");
        expect(icon.className).toContain("status-indicator--icon__error");
    });

    it("stateless: should trigger onEditButtonClick callback on edit-btn click", function() {
        const component = getComponent({ expanded: true, showEdit: true, onEditButtonClick: jest.fn() });

        const editButton = getEditButton(component);

        ReactTestUtils.Simulate.click(editButton);

        expect(component.props.children.props.onEditButtonClick).toBeCalled();
    });

    it("stateful: should trigger onEditButtonClick callback on edit-btn click", function() {
        const component = getComponent({
            expanded: true,
            showEdit: true,
            onEditButtonClick: jest.fn()
        });

        const editButton = getEditButton(component);

        ReactTestUtils.Simulate.click(editButton);

        expect(component.props.children.props.onEditButtonClick).toBeCalled();
    });

    it("fires reorder event from input when in ordering mode", function() {
        const callback = jest.fn();
        const component = getComponent({
            ordering: {
                position: 3,
                total: 10,
                onReorder: callback
            }
        });
        const orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.click(orderingInput);
        ReactTestUtils.Simulate.change(orderingInput, { target: { value: "5" } });
        // the displayed value is one more than the actual value so that the
        // first record can be shown as 1
        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        expect(callback).lastCalledWith(3, 4);

        ReactTestUtils.Simulate.change(orderingInput, { target: { value: "-1" } });
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        expect(callback).lastCalledWith(3, 0);

        ReactTestUtils.Simulate.change(orderingInput, { target: { value: "11" } });
        ReactTestUtils.Simulate.blur(orderingInput);
        expect(callback).lastCalledWith(3, 10);
    });

    it("fires reorder event from up/down keys when in ordering mode", function() {
        const callback = jest.fn();
        let component = getComponent({
            ordering: {
                position: 3,
                total: 10,
                onReorder: callback
            }
        });
        let orderingInput = getOrderingInput(component);

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_UP });
        expect(callback).lastCalledWith(3, 5);

        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        expect(callback).lastCalledWith(3, 2);

        // lower bound
        component = getComponent({
            ordering: {
                position: 0,
                total: 10,
                onReorder: callback
            }
        });
        orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        expect(callback).lastCalledWith(0, 0);

        // upper bound
        component = getComponent({
            ordering: {
                position: 9,
                total: 10,
                onReorder: callback
            }
        });
        orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_UP });
        expect(callback).lastCalledWith(9, 10);
    });

    it("fires no events from other keys when in ordering mode", function() {
        const callback = jest.fn();
        const component = getComponent({

            ordering: {
                position: 3,
                total: 10,
                onReorder: callback
            }
        });
        const orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: 6 });
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: 100 });
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: 150 });
        expect(callback).not.toBeCalled();
    });

    it("calls drag handler for input when in ordering mode", function() {
        const callback = jest.fn();
        const component = getComponent({
            ordering: {
                position: 3,
                total: 10,
                onReorder: callback
            }
        });
        const orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.dragStart(orderingInput);
    });

    it("calls onReorder callback when dropping", function() {
        const callback = jest.fn();
        const root = getTwoComponents(
            {
                ordering: {
                    position: 3,
                    total: 10,
                    onReorder: callback
                }
            },
            {
                ordering: {
                    position: 6,
                    total: 10,
                    onReorder: callback
                }
            }
        );

        const mockOffset = {
            clientOffset: { x: 0, y: 0 },
            getSourceClientOffset: function() {
                return { x: 0, y: 0 };
            }
        };

        const backend = root.getManager().getBackend();

        const components = TestUtils.scryRenderedComponentsWithType(root, DragDrop);

        // first drop on itself
        backend.simulateBeginDrag([components[0].getDecoratedComponentInstance().getHandlerId()], mockOffset);
        backend.simulateHover([components[0].getHandlerId()], mockOffset);
        backend.simulateDrop();
        backend.simulateEndDrag();

        // now drop on the other one
        backend.simulateBeginDrag([components[0].getDecoratedComponentInstance().getHandlerId()], mockOffset);
        backend.simulateHover([components[1].getHandlerId()], mockOffset);

        expect(callback).not.toBeCalled();
        backend.simulateDrop();

        expect(callback).toBeCalled();
    });

    it("renders scrolling wrapper with data-id", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <div><ExpandableRow.ScrollingWrapper>nothing</ExpandableRow.ScrollingWrapper></div>
        );

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "scrolling-wrapper");
        expect(element).not.toBeNull();
    });

    it("renders scrolling wrapper with a title", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <div><ExpandableRow.ScrollingWrapper title="the title">nothing</ExpandableRow.ScrollingWrapper></div>
        );

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "result-set__title");
        expect(element).not.toBeNull();
    });

    it("renders simple wrapper with data-id", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <div><ExpandableRow.SimpleWrapper>nothing</ExpandableRow.SimpleWrapper></div>
        );

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "simple-wrapper");
        expect(element).not.toBeNull();
    });

    it("should show positionValue in ordering field", function() {
        const callback = jest.fn();
        const component = getComponent({
            ordering: {
                position: 3,
                positionValue: 7,
                total: 10,
                onReorder: callback,
            },
        });
        const orderingInput = getOrderingInput(component);

        expect(orderingInput.value).toBe("8");
    });

    it("should fire positionOnValueChange", function () {
        const callback = jest.fn();
        const component = getComponent({
            ordering: {
                position: 3,
                total: 10,
                onPositionValueChange: value => callback(value),
            },
        });
        const orderingInput = getOrderingInput(component);
        ReactTestUtils.Simulate.change(orderingInput, { target: { value: "8" } });
        expect(callback).lastCalledWith(7);
    });

    it("should reorder after changing input value without onPositionValueChange callback", function () {
        const callback = jest.fn();
        const component = getComponent({
            ordering: {
                position: 3,
                total: 10,
                onReorder: callback,
            },
        });
        const orderingInput = getOrderingInput(component);
        ReactTestUtils.Simulate.change(orderingInput, { target: { value: "8" } });
        ReactTestUtils.Simulate.blur(orderingInput);

        expect(callback).lastCalledWith(3, 7);
    });

    it("should not reorder if the input field is set to ''", function() {
        const callback = jest.fn();
        const component = getComponent({
            ordering: {
                position: 3,
                total: 10,
                onReorder: callback,
            },
        });
        const orderingInput = getOrderingInput(component);
        ReactTestUtils.Simulate.change(orderingInput, { target: { value: "" } });
        ReactTestUtils.Simulate.blur(orderingInput);

        expect(callback).not.toBeCalled();
    });
});
