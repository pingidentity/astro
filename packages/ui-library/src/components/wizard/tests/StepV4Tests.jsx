window.__DEV__ = true;

jest.dontMock("../Step");
jest.dontMock("../Progress");
jest.dontMock("../../../util/format.js");
jest.dontMock("../../general/EllipsisLoaderButton");
jest.dontMock("../../general/context-close-button/v2");
jest.dontMock("../../tooltips/CancelTooltip");
jest.dontMock("../../tooltips/ConfirmTooltip");
jest.dontMock("../../tooltips/DetailsTooltip");
jest.dontMock("../../buttons/Button.jsx");
jest.mock("popper.js");
jest.mock("react-portal");

import { allFlags } from "../../../util/FlagUtils";

describe("Step", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Step = require("../Step"),
        assign = require("object-assign");

    beforeEach(function () {
    });

    function getRenderedComponent (opts) {
        var defaults = {
            active: true,
            number: 1,
            total: 2,
            onNext: jest.fn(),
            onEdit: jest.fn(),
            onDone: jest.fn(),
            labelNext: "xxxnext",
            labelCancel: "xxxcancel",
            labelEdit: "xxxedit",
            labelDone: "xxxdone",
            title: "Test Step",
            titleSelection: "title selection",
            hintText: "hint",
            flags: allFlags,
        };

        return ReactTestUtils.renderIntoDocument(
            <Step {...assign(defaults, opts)}>
                <div className="childNode"><span>Hello</span><span>World</span></div>
            </Step>
        );
    }

    function getRenderedComponentForTranslation (opts) {
        var defaults = {
            active: true,
            number: 1,
            total: 2,
            onNext: jest.fn(),
            onEdit: jest.fn(),
            onDone: jest.fn(),
            labelDone: "xxxdone",
            titleSelection: "title selection",
            hintText: "hint",
            flags: allFlags,
        };

        return ReactTestUtils.renderIntoDocument(
            <Step {...assign(defaults, opts)}>
                <div className="childNode"><span>Hello</span><span>World</span></div>
            </Step>
        );
    }

    it("data-id's don't change", () => {
        TestUtils.mountSnapshotDataIds(
            <Step
                active={true}
                number={1}
                total={2}
                onNext={jest.fn()}
                onEdit={jest.fn()}
                onDone={jest.fn()}
                labelDone="done"
                titleSelection="title selection"
                hintText="hint"
                flags={allFlags}
                showEdit
            />
        );
    });

    it("Specifies button labels", function () {
        var component = getRenderedComponent({ isModal: false });

        expect(ReactDOM.findDOMNode(component.refs.nextButton).textContent).toBe("xxxnext");
        expect(ReactDOM.findDOMNode(component.refs.cancelButton).value).toBe("xxxcancel");

        component = getRenderedComponent({ active: false, showEdit: true });
        expect(ReactDOM.findDOMNode(component.refs.editButton).textContent).toBe("xxxedit");
    });

    it("Specifies default button labels", function () {
        const props = {
            isModal: false,
            labelNext: null,
            labelCancel: null,
            labelEdit: null,
        };
        var component = getRenderedComponent(props);

        expect(ReactDOM.findDOMNode(component.refs.nextButton).textContent).toBe("Next");
        expect(ReactDOM.findDOMNode(component.refs.cancelButton).value).toBe("Cancel");

        component = getRenderedComponent({
            ...props,
            active: false,
            showEdit: true,
        });
        expect(ReactDOM.findDOMNode(component.refs.editButton).textContent).toBe("Edit");
    });

    it("Next button executes callback", function () {
        var component = getRenderedComponent({ canProceed: true });

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.nextButton));

        expect(component.props.onNext.mock.calls.length).toBe(1);
        expect(component.props.onEdit.mock.calls.length).toBe(0);
    });

    it("Edit button executes callback", function () {
        var component = getRenderedComponent({ active: false, canProceed: true, showEdit: true, });

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.editButton));

        expect(component.props.onNext.mock.calls.length).toBe(0);
        expect(component.props.onEdit.mock.calls.length).toBe(1);
    });

    it("Inactive step is collapsed", function () {
        var component = getRenderedComponent({ active: false , number: 2, showEdit: true, });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.doneButton).toBeFalsy();
        expect(component.refs.editButton).toBeTruthy();

        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "childNode").length).toBe(0);
    });

    it("Active step is expanded", function () {
        var component = getRenderedComponent();

        expect(component.refs.nextButton).toBeTruthy();
        expect(component.refs.cancelButton).toBeTruthy();
        expect(component.refs.editButton).toBeFalsy();

        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "childNode").length).toBe(1);

        component = getRenderedComponent({ number: 2 });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeTruthy();
        expect(component.refs.editButton).toBeFalsy();

        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "childNode").length).toBe(1);
    });

    it("Hide cancel button", function () {
        var component = getRenderedComponent({ hideCancel: true });

        expect(component.refs.nextButton).toBeTruthy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.doneButton).toBeFalsy();
        expect(component.refs.editButton).toBeFalsy();

        component = getRenderedComponent({ hideCancel: true, number: 2 });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.editButton).toBeFalsy();
    });

    it("Hide edit link", function () {
        var component = getRenderedComponent({ active: false, showEdit: false });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.editButton).toBeFalsy();
    });

    it("Show edit link", function () {
        var component = getRenderedComponent({ active: false, showEdit: true, renderHidden: true });

        expect(component.refs.editButton).toBeTruthy();
    });

    it("Next, cancel button is disabled and next button changes to loading", function () {
        var component = getRenderedComponent({ active: true, number: 2, showPulsing: true });

        expect(component.refs.cancelButton.props.disabled).toBeTruthy();

        component = getRenderedComponent({ showPulsing: true });

        expect(component.refs.nextButton.props.disabled).toBeTruthy();
        expect(component.refs.nextButton.props.loading).toBeTruthy();
        expect(component.refs.cancelButton.props.disabled).toBeTruthy();
    });

    it("Verify default data-id set.", function () {
        var component = getRenderedComponent();
        var test = TestUtils.findRenderedDOMNodeWithDataId(component, "step");
        expect(test).toBeTruthy();
    });

    it("Verify the component should render correctly when uses translation.", function () {
        var component = getRenderedComponentForTranslation();
        var step = TestUtils.findRenderedDOMNodeWithDataId(component, "step");
        expect(ReactTestUtils.isDOMComponent(step)).toBeTruthy();
    });

    it("Cancel tooltip renders and triggers callbacks.", function () {
        var cancelConfirm = jest.fn(),
            cancelDeny = jest.fn(),
            cancelTooltipParams = {
                title: "Cancel Confirmation",
                open: false,
                onConfirm: cancelConfirm,
                onCancel: cancelDeny,
                messageText: "Are you sure?",
                confirmButtonText: "Yes",
                cancelButtonText: "No"
            },
            component = getRenderedComponent({ cancelTooltip: cancelTooltipParams }),
            cancelTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "step-cancel-tooltip"),
            cancelTooltipContent = TestUtils.findRenderedDOMNodeWithDataId(cancelTooltip, "details-content");

        expect(cancelTooltipContent).toBeFalsy();

        cancelTooltipParams.open = true;
        component = getRenderedComponent({ cancelTooltip: cancelTooltipParams });
        cancelTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "step-cancel-tooltip");
        cancelTooltipContent = TestUtils.findRenderedDOMNodeWithDataId(cancelTooltip, "details-content");
        expect(cancelTooltip).toBeTruthy();

        var tooltipConfirmBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "step-cancel-confirm-btn"),
            tooltipDenyBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "step-cancel-deny-btn"),
            tooltipTitle = TestUtils.findRenderedDOMNodeWithDataId(component, "details-title"),
            tooltipText = TestUtils.findRenderedDOMNodeWithDataId(component, "step-cancel-tooltip-text");

        ReactTestUtils.Simulate.click(tooltipConfirmBtn);
        expect(cancelConfirm).toBeCalled();
        expect(cancelDeny).not.toBeCalled();

        ReactTestUtils.Simulate.click(tooltipDenyBtn);
        expect(cancelDeny).toBeCalled();

        expect(tooltipConfirmBtn.textContent).toBe(cancelTooltipParams.confirmButtonText);
        expect(tooltipDenyBtn.textContent).toBe(cancelTooltipParams.cancelButtonText);
        expect(tooltipTitle.textContent).toBe(cancelTooltipParams.title);
        expect(tooltipText.textContent).toBe(cancelTooltipParams.messageText);
    });

    it("Save tooltip renders and triggers callbacks.", function () {
        const
            saveConfirm = jest.fn(),
            saveDeny = jest.fn(),
            saveTooltipParams = {
                title: "Save Confirmation",
                onConfirm: saveConfirm,
                onCancel: saveDeny,
                messageText: "Are you sure?",
                confirmButtonText: "Yes",
                cancelButtonText: "No"
            };

        let step,
            saveToolipContainer,
            saveTooltip;

        step = getRenderedComponent({
            saveTooltip: {
                open: false,
                ...saveTooltipParams
            }
        });
        saveToolipContainer = TestUtils.findRenderedDOMNodeWithDataId(step, "confirm-tooltip");
        saveTooltip = TestUtils.findRenderedDOMNodeWithDataId(saveToolipContainer, "details-content");
        expect(saveTooltip).toBeFalsy();

        step = getRenderedComponent({
            saveTooltip: {
                open: true,
                ...saveTooltipParams,
            }
        });
        saveToolipContainer = TestUtils.findRenderedDOMNodeWithDataId(step, "confirm-tooltip");
        saveTooltip = TestUtils.findRenderedDOMNodeWithDataId(saveToolipContainer, "details-content");
        expect(saveTooltip).toBeTruthy();

        const
            tooltipConfirmBtn = TestUtils.findRenderedDOMNodeWithDataId(saveTooltip, "confirm-tooltip-button"),
            tooltipDenyBtn = TestUtils.findRenderedDOMNodeWithDataId(saveTooltip, "confirm-tooltip-cancel"),
            tooltipTitle = TestUtils.findRenderedDOMNodeWithDataId(saveTooltip, "details-title"),
            tooltipText = TestUtils.findRenderedDOMNodeWithDataId(saveTooltip, "details-body");

        ReactTestUtils.Simulate.click(tooltipConfirmBtn);
        expect(saveConfirm).toBeCalled();
        expect(saveDeny).not.toBeCalled();

        ReactTestUtils.Simulate.click(tooltipDenyBtn);
        expect(saveDeny).toBeCalled();

        expect(tooltipConfirmBtn.textContent).toBe(saveTooltipParams.confirmButtonText);
        expect(tooltipDenyBtn.textContent).toBe(saveTooltipParams.cancelButtonText);
        expect(tooltipTitle.textContent).toBe(saveTooltipParams.title);
        expect(tooltipText.textContent).toContain(saveTooltipParams.messageText);
    });

});
