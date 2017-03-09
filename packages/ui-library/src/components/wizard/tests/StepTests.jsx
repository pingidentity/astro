window.__DEV__ = true;

jest.dontMock("../Step.jsx");
jest.dontMock("../Progress.jsx");
jest.dontMock("../../../util/format.js");
jest.dontMock("../../general/EllipsisLoaderButton.jsx");
jest.dontMock("../../general/context-close-button/v2.jsx");
jest.dontMock("../../tooltips/CancelTooltip.jsx");
jest.dontMock("../../tooltips/DetailsTooltip.jsx");

describe("Step", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Step = require("../Step.jsx"),
        assign = require("object-assign");

    beforeEach(function () {
    });

    function getRenderedComponent (opts) {
        var defaults = {
            active: true,
            number: 1,
            total: 2,
            onNext: jest.genMockFunction(),
            onEdit: jest.genMockFunction(),
            onDone: jest.genMockFunction(),
            labelNext: "xxxnext",
            labelCancel: "xxxcancel",
            labelEdit: "xxxedit",
            labelDone: "xxxdone",
            titleSelection: "title selection",
            hintText: "hint"
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
            onNext: jest.genMockFunction(),
            onEdit: jest.genMockFunction(),
            onDone: jest.genMockFunction(),
            labelDone: "xxxdone",
            titleSelection: "title selection",
            hintText: "hint"
        };

        return ReactTestUtils.renderIntoDocument(
            <Step {...assign(defaults, opts)}>
                <div className="childNode"><span>Hello</span><span>World</span></div>
            </Step>
        );
    }

    it("Specifies button labels", function () {
        var component = getRenderedComponent({ isModal: false });

        expect(ReactDOM.findDOMNode(component.refs.nextButton).textContent).toBe("xxxnext");
        expect(ReactDOM.findDOMNode(component.refs.cancelButton).value).toBe("xxxcancel");

        component = getRenderedComponent({ active: false });
        expect(ReactDOM.findDOMNode(component.refs.editButton).textContent).toBe("xxxedit");
    });

    it("Next button executes callback", function () {
        var component = getRenderedComponent({ canProceed: true });

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.nextButton));

        expect(component.props.onNext.mock.calls.length).toBe(1);
        expect(component.props.onEdit.mock.calls.length).toBe(0);
    });

    it("Edit button executes callback", function () {
        var component = getRenderedComponent({ active: false, canProceed: true });

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.editButton));

        expect(component.props.onNext.mock.calls.length).toBe(0);
        expect(component.props.onEdit.mock.calls.length).toBe(1);
    });

    it("Inactive step is collapsed", function () {
        var component = getRenderedComponent({ active: false , number: 2 });

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

    it("Verify setting id causes warning", function () {
        console.warn = jest.genMockFunction();
        getRenderedComponent({ active: false, showEdit: false, id: "myid" });
        expect(console.warn).toBeCalledWith("Deprecated: use data-id instead of id. " +
            "Support for id will be removed in next version");
    });

    it("Verify default data-id set.", function () {
        console.warn = jest.genMockFunction();
        var component = getRenderedComponent();
        var test = TestUtils.findRenderedDOMNodeWithDataId(component, "step");
        expect(test).toBeTruthy();
        expect(console.warn).not.toBeCalled();
    });

    it("Verify warning on nextButtonStyle.", function () {
        console.warn = jest.genMockFunction();
        getRenderedComponent({ nextButtonStyle: "somestyle" });
        expect(console.warn).toBeCalledWith("Deprecated: use nextButtonClassName instead of nextButtonStyle. " +
            "Support for nextButtonStyle will be removed in next version");
    });

    it("Verify the component should render correctly when uses translation.", function () {
        console.warn = jest.genMockFunction();
        var component = getRenderedComponentForTranslation();
        var step = TestUtils.findRenderedDOMNodeWithDataId(component, "step");
        expect(ReactTestUtils.isDOMComponent(step)).toBeTruthy();
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
