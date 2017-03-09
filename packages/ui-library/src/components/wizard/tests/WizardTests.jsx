window.__DEV__ = true;

jest.dontMock("../Step.jsx");
jest.dontMock("../Wizard.jsx");
jest.dontMock("../../general/EllipsisLoaderButton.jsx");
jest.dontMock("../../forms/ButtonBar.jsx");
jest.dontMock("../../../util/format.js");
jest.dontMock("../../tooltips/CancelTooltip.jsx");
jest.dontMock("../../tooltips/DetailsTooltip.jsx");

describe("Step", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        TestUtils = require("../../../testutil/TestUtils"),
        ReactTestUtils = require("react-addons-test-utils"),
        Wizard = require("../Wizard.jsx"),
        Step = Wizard.Step,
        assign = require("object-assign");

    var defaultText = {
        title: "My Wizard",
        labelNext: "next",
        labelCancel: "cancel",
        labelEdit: "edit",
        labelDone: "done"
    };

    function getRenderedComponent (opts) {
        var renderDefaults = {
            title: defaultText.title,
            onNext: jest.genMockFunction(),
            onEdit: jest.genMockFunction(),
            onValueChange: jest.genMockFunction(),
            onCancel: jest.genMockFunction(),
            onDone: jest.genMockFunction(),
            labelNext: defaultText.labelNext,
            labelCancel: defaultText.labelCancel,
            labelEdit: defaultText.labelEdit,
            labelDone: defaultText.labelDone
        };

        return ReactTestUtils.renderIntoDocument(
            <Wizard {...assign(renderDefaults, opts)}>
                <Step title="step 1">Step 1</Step>
                <Step title="step 2">Step 2</Step>
                <Step title="step 3">Step 3</Step>
                <Step title="step 4" when={false}>Step 4</Step>
            </Wizard>
        );
    }

    function getCancelButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "button-bar-cancel");
    }

    function getDoneButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "button-bar-save");
    }

    it("Is the root wizard", function () {
        var component = getRenderedComponent();
        var args = component.props.onValueChange.mock.calls[0];

        //when the root wizard mounts, it should broadcast how many steps it contains to the reducer
        expect(args).toEqual([{ choice: 0, numSteps: 3 }]);
    });

    it("Check for warning onChange", function () {
        console.warn = jest.genMockFunction();
        var component = getRenderedComponent({ onChange: jest.genMockFunction() });
        var args = component.props.onChange.mock.calls[0];

        //when the root wizard mounts, it should broadcast how many steps it contains to the reducer
        expect(args).toEqual([0, 3]);
        expect(console.warn).toBeCalledWith("Deprecated: use onValueChange instead of onChange. " +
            "Support for onChange will be removed in next version");
    });

    it("Calls onNext when next is clicked", function () {
        var component = getRenderedComponent();

        expect(component.props.onNext.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.step1.refs.nextButton));

        expect(component.props.onNext.mock.calls.length).toBe(1);
    });

    it("Calls onEdit when edit is clicked", function () {
        var component = getRenderedComponent({ activeStep: 2 });

        expect(component.props.onNext.mock.calls.length).toBe(0);
        expect(component.props.onEdit.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.step1.refs.editButton));

        expect(component.props.onNext.mock.calls.length).toBe(0);
        expect(component.props.onEdit.mock.calls.length).toBe(1);
    });

    it("Calls onDone when done is clicked", function () {
        var component = getRenderedComponent({ numSteps: 3 , activeStep: 3 });

        expect(component.props.onDone.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(getDoneButton(component));

        expect(component.props.onDone.mock.calls.length).toBe(1);
    });

    it("Calls onCancel when cancel is clicked", function () {
        var component = getRenderedComponent({ numSteps: 3 , activeStep: 3 });

        expect(component.props.onCancel.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(getCancelButton(component));

        expect(component.props.onCancel.mock.calls.length).toBe(1);
    });

    it("Done and cancel buttons are not visible when not on last step", function () {
        var component = getRenderedComponent({ numSteps: 3 , activeStep: 2 });
        expect(getCancelButton(component)).toBeFalsy();
        expect(getDoneButton(component)).toBeFalsy();
    });

    it("Done and cancel buttons are visible when on last step", function () {
        var component = getRenderedComponent({ numSteps: 3 , activeStep: 3 }),
            doneBtn = getDoneButton(component);
        expect(getCancelButton(component)).toBeTruthy();
        expect(doneBtn).toBeTruthy();
        expect(doneBtn.disabled).toBeFalsy();
    });

    it("Done and cancel button texts are correct", function () {
        var component = getRenderedComponent({ numSteps: 3 , activeStep: 3 });
        expect(getCancelButton(component).textContent).toBe(defaultText.labelCancel);
        expect(getDoneButton(component).textContent).toBe(defaultText.labelDone);
    });

    it("Cancel and done button are in proper states when pulsing/saving is false", function () {
        var component = getRenderedComponent({ numSteps: 3 , activeStep: 3, showPulsing: false }),
            doneBtn = getDoneButton(component),
            cancelBtn = getCancelButton(component);

        expect(doneBtn.className).not.toContain("loading");
        expect(cancelBtn.disabled).toBeFalsy();
    });

    it("Cancel and done button are in proper states when pulsing/saving is true", function () {
        var component = getRenderedComponent({ numSteps: 3 , activeStep: 3, showPulsing: true }),
            doneBtn = getDoneButton(component),
            cancelBtn = getCancelButton(component);

        expect(doneBtn.className).toContain("loading");
        expect(cancelBtn.disabled).toBeTruthy();
    });

    it("Verify warning when id set.", function () {
        console.warn = jest.genMockFunction();
        getRenderedComponent({ id: "myid" });
        expect(console.warn).toBeCalledWith("Deprecated: use data-id instead of id. " +
            "Support for id will be removed in next version");
    });

    it("Verify default data-id set.", function () {
        console.warn = jest.genMockFunction();
        var component = getRenderedComponent();
        var test = TestUtils.findRenderedDOMNodeWithDataId(component, "wizard");
        expect(test).toBeTruthy();
        expect(console.warn).not.toBeCalled();
    });

    it("Disables the save/done button when specified", function () {
        var component = getRenderedComponent({ numSteps: 1, saveDisabled: true }),
            doneBtn = getDoneButton(component);

        expect(doneBtn.className).toContain("disabled");
        expect(doneBtn.disabled).toBeTruthy();
    });

    it("Cancel tooltip renders and triggers callbacks.", function () {
        var cancelConfirm = jest.genMockFunction(),
            cancelDeny = jest.genMockFunction(),
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
});
