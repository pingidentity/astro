
jest.dontMock("../ButtonBar");
jest.dontMock("../../general/EllipsisLoaderButton");
jest.dontMock("../../tooltips/CancelTooltip");
jest.dontMock("../../tooltips/DetailsTooltip");
jest.mock("popper.js");
jest.mock("react-portal");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import ButtonBar from "../ButtonBar";
import _ from "underscore";

describe("ButtonBar", function () {

    const componentId = "buttonbar",
        saveText = "Save",
        cancelText = "Cancel",
        discardText = "Discard";


    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            cancelText: cancelText,
            discardText: discardText,
            onSave: jest.fn(),
            saveText: saveText
        });
        return ReactTestUtils.renderIntoDocument(<ButtonBar {...opts} />);
    }

    function getSaveButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-save");
    }

    function getCancelButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-cancel");
    }

    function getDiscardButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-discard");
    }


    it("Renders all buttons when optional callbacks are provided", function () {
        const component = getComponent({
                onCancel: jest.fn(),
                onDiscard: jest.fn()
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeTruthy();
        expect(discardBtn).toBeTruthy();

        expect(saveBtn.textContent).toEqual(saveText);
        expect(cancelBtn.textContent).toEqual(cancelText);
        expect(discardBtn.textContent).toEqual(discardText);
    });

    it("Renders only save button when the optional button texts and callbacks are not provided", function () {
        const component = getComponent({
                cancelText: null,
                discardText: null
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeFalsy();
        expect(discardBtn).toBeFalsy();
    });

    it("Renders only save button when optional button texts are provided but the callbacks are not", function () {
        const component = getComponent(),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeFalsy();
        expect(discardBtn).toBeFalsy();
    });

    it("Renders only save button when optional callbacks are provided but the text is not", function () {
        const component = getComponent({
                onCancel: jest.fn(),
                onDiscard: jest.fn(),
                cancelText: null,
                discardText: null,
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeFalsy();
        expect(discardBtn).toBeFalsy();
    });

    it("Renders unfixed button bar", function () {
        const component = getComponent({
            onCancel: jest.fn(),
            onDiscard: jest.fn(),
            cancelText: null,
            discardText: null,
            unfixed: true,
        });

        const unfixed = TestUtils.findRenderedDOMNodeWithClass(component, "page-controls-primary--unfixed");
        expect(unfixed).toBeTruthy();
    });

    it("Triggers callbacks when the buttons are clicked", function () {
        const component = getComponent({
                onCancel: jest.fn(),
                onDiscard: jest.fn()
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        ReactTestUtils.Simulate.click(saveBtn);
        expect(component.props.onSave).toBeCalled();

        ReactTestUtils.Simulate.click(cancelBtn);
        expect(component.props.onCancel).toBeCalled();

        ReactTestUtils.Simulate.click(discardBtn);
        expect(component.props.onDiscard).toBeCalled();
    });

    it("Renders custom css classes when provided", function () {
        const className = "container-class",
            saveClassName = "save-class",
            cancelClassName = "cancel-class",
            discardClassName = "discard-class",

            component = getComponent({
                className: className,
                saveClassName: saveClassName,
                cancelClassName: cancelClassName,
                discardClassName: discardClassName,

                onCancel: jest.fn(),
                onDiscard: jest.fn()
            }),

            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn.getAttribute("class")).toContain(saveClassName);
        expect(cancelBtn.getAttribute("class")).toContain(cancelClassName);
        expect(discardBtn.getAttribute("class")).toContain(discardClassName);
    });

    it("Renders saving state properly", function () {
        const component = getComponent({
                onCancel: jest.fn(),
                onDiscard: jest.fn(),
                enableSavingAnimation: true
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn.getAttribute("class")).toContain("loading");

        expect(cancelBtn.getAttribute("class")).toContain("disabled");
        expect(cancelBtn.disabled).toBeTruthy();

        expect(discardBtn.getAttribute("class")).toContain("disabled");
        expect(discardBtn.disabled).toBeTruthy();
    });

    it("Hides and shows button bar properly", function () {
        const shownComponent = getComponent({ visible: true }),
            hiddenComponent = getComponent({ visible: false });

        expect(TestUtils.findRenderedDOMNodeWithDataId(shownComponent, componentId).getAttribute("class"))
            .not.toContain("hidden");
        expect(TestUtils.findRenderedDOMNodeWithDataId(hiddenComponent, componentId).getAttribute("class"))
            .toContain("hidden");
    });

    it("Renders child content properly", function () {
        const childId = "my-child-id",
            childText = "my child text",
            childContent = (<span data-id={childId}>{childText}</span>),
            component = getComponent({ children: childContent }),
            renderedChildContent = TestUtils.findRenderedDOMNodeWithDataId(component, childId);

        expect(renderedChildContent).toBeTruthy();
        expect(renderedChildContent.textContent).toEqual(childText);
    });

    it("Disables save button when specified", function () {
        const component = getComponent({ saveDisabled: true }),
            saveBtn = getSaveButton(component);

        expect(saveBtn).toBeTruthy();
        expect(saveBtn.getAttribute("class")).toContain("disabled");
        expect(saveBtn.disabled).toBeTruthy();
    });

    it("Cancel tooltip renders and triggers callbacks.", function () {
        const cancelConfirm = jest.fn();
        const cancelDeny = jest.fn();
        const buttonBarParams = {
            cancelTooltip: {
                title: "Cancel Confirmation",
                open: false,
                onConfirm: cancelConfirm,
                onCancel: cancelDeny,
                messageText: "Are you sure?",
                confirmButtonText: "Yes",
                cancelButtonText: "No"
            },
            onCancel: jest.fn(),
            visible: true
        };
        let component = getComponent(buttonBarParams);
        let cancelTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "buttonbar-cancel-tooltip");
        let cancelTooltipContent = TestUtils.findRenderedDOMNodeWithDataId(cancelTooltip, "details-content");

        expect(cancelTooltipContent).toBeFalsy();

        buttonBarParams.cancelTooltip.open = true;
        component = getComponent(buttonBarParams);
        cancelTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "buttonbar-cancel-tooltip");
        cancelTooltipContent = TestUtils.findRenderedDOMNodeWithDataId(cancelTooltip, "details-content");
        expect(cancelTooltip).toBeTruthy();

        const tooltipConfirmBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "buttonbar-cancel-confirm-btn"),
            tooltipDenyBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "buttonbar-cancel-deny-btn"),
            tooltipTitle = TestUtils.findRenderedDOMNodeWithDataId(component, "details-title"),
            tooltipText = TestUtils.findRenderedDOMNodeWithDataId(component, "buttonbar-cancel-tooltip-text");

        ReactTestUtils.Simulate.click(tooltipConfirmBtn);
        expect(cancelConfirm).toBeCalled();
        expect(cancelDeny).not.toBeCalled();

        ReactTestUtils.Simulate.click(tooltipDenyBtn);
        expect(cancelDeny).toBeCalled();

        expect(tooltipConfirmBtn.textContent).toBe(buttonBarParams.cancelTooltip.confirmButtonText);
        expect(tooltipDenyBtn.textContent).toBe(buttonBarParams.cancelTooltip.cancelButtonText);
        expect(tooltipTitle.textContent).toBe(buttonBarParams.cancelTooltip.title);
        expect(tooltipText.textContent).toBe(buttonBarParams.cancelTooltip.messageText);
    });

    it("Save tooltip renders and triggers callbacks.", function () {
        const saveConfirm = jest.fn(),
            saveDeny = jest.fn(),
            buttonBarParams = {
                saveTooltip: {
                    title: "Save Confirmation",
                    open: false,
                    onConfirm: saveConfirm,
                    onCancel: saveDeny,
                    messageText: "Are you sure?",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No"
                },
                onCancel: jest.fn(),
                visible: true
            },
            closed = getComponent(buttonBarParams),
            closedSave = TestUtils.findRenderedDOMNodeWithDataId(closed, "buttonbar-save"),
            closedSaveContent = TestUtils.findRenderedDOMNodeWithDataId(closedSave, "details-content");

        expect(closedSaveContent).toBeFalsy();

        const open = getComponent({
            ...buttonBarParams,
            saveTooltip: {
                ...buttonBarParams.saveTooltip,
                open: true
            }
        });
        const saveTooltip = TestUtils.findRenderedDOMNodeWithDataId(open, "buttonbar-save");
        expect(saveTooltip).toBeTruthy();

        const tooltipConfirmBtn = TestUtils.findRenderedDOMNodeWithDataId(open, "buttonbar-save-tooltip-button"),
            tooltipDenyBtn = TestUtils.findRenderedDOMNodeWithDataId(open, "buttonbar-save-tooltip-cancel"),
            tooltipTitle = TestUtils.findRenderedDOMNodeWithDataId(open, "details-title"),
            tooltipText = TestUtils.findRenderedDOMNodeWithDataId(open, "details-body");

        ReactTestUtils.Simulate.click(tooltipConfirmBtn);
        expect(saveConfirm).toBeCalled();
        expect(saveDeny).not.toBeCalled();

        ReactTestUtils.Simulate.click(tooltipDenyBtn);
        expect(saveDeny).toBeCalled();

        expect(tooltipConfirmBtn.textContent).toBe(buttonBarParams.saveTooltip.confirmButtonText);
        expect(tooltipDenyBtn.textContent).toBe(buttonBarParams.saveTooltip.cancelButtonText);
        expect(tooltipTitle.textContent).toBe(buttonBarParams.saveTooltip.title);
        expect(tooltipText.textContent).toContain(buttonBarParams.saveTooltip.messageText);
    });

    it("renders a cancel button in place of a discard button when the flag is set", function() {
        const component = getComponent({ onDiscard: jest.fn() });

        const cancelBtn = TestUtils.findRenderedDOMNodeWithClass(component, "cancel");
        const discardBtn = getDiscardButton(component);

        expect(cancelBtn).toBeTruthy();
        expect(discardBtn).toBeTruthy();
    });

});
