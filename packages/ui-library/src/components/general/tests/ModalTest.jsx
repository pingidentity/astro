jest.dontMock("../Modal.jsx");
jest.dontMock("../If.jsx");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../tooltips/CancelTooltip.jsx");
jest.dontMock("../../tooltips/DetailsTooltip.jsx");

describe("ModalTest", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Modal = require("../Modal.jsx"),
        _ = require("underscore");

    window.addEventListener = jest.genMockFunction();
    window.removeEventListener = jest.genMockFunction();
    window.setTimeout = jest.genMockFunction();
    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
        window.setTimeout.mockClear();

    });

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onOpen: jest.genMockFunction(),
            onClose: jest.genMockFunction().mockReturnValue(true)
        });

        return ReactTestUtils.renderIntoDocument(<Modal {...opts} />);
    }

    it("detaches event listeners on unmount", function () {
        var component = getComponent({ expanded: true });
        var handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];

        expect(window.addEventListener).toBeCalled();

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(window.removeEventListener).toBeCalledWith("keydown", handler);
    });

    it("keydown event listener does not trigger when modal is closed", function () {
        var component = getComponent(); //eslint-disable-line
        var handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.genMockFunction(),
            preventDefault: jest.genMockFunction()
        };

        //expect that the collapsed modal does not process keypress events
        handler(e);
        expect(e.stopPropagation).not.toBeCalled();
    });

    it("keydown event listener triggers when modal is expanded", function () {
        var component = getComponent({ expanded: true }); //eslint-disable-line
        var handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.genMockFunction(),
            preventDefault: jest.genMockFunction()
        };

        //expect that the collapsed modal does not process keypress events
        handler(e);
        expect(e.stopPropagation).toBeCalled();
    });

    it("Doesn't render body until expanded", function () {
        var htmlDid = "my-content",
            children = (<div data-id={htmlDid}></div>),
            component = getComponent({ children: children }),
            content = TestUtils.findRenderedDOMNodeWithDataId(component, htmlDid);

        expect(content).toBeFalsy();

        component = getComponent({ children: children, expanded: true });
        content = TestUtils.findRenderedDOMNodeWithDataId(component, htmlDid);

        expect(content).toBeTruthy();
    });

    it("Test default render", function () {
        var component = getComponent();

        // Expect no modal to be rendered.
        var modals = TestUtils.scryRenderedDOMNodesWithClass(component, "modal");
        expect(modals.length).toEqual(0);
    });

    it("Modal render default data-ids if not provided", function () {
        var component = getComponent({ expanded: true }),
            modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");

        expect(modal.getAttribute("data-id")).toEqual("modal-button");
    });

    it("Modal render data-ids if provided", function () {
        var did = "myid",
            component = getComponent({ "data-id": did, expanded: true }),
            modal = TestUtils.findRenderedDOMNodeWithDataId(component, did);

        expect(ReactTestUtils.isDOMComponent(modal)).toBeTruthy();
    });

    /*
     * Ensure that a modal set to be initially open
     * via: expanded=true
     * is rendered as such.
     *
     */
    it("Modal initially open", function () {
        var component = getComponent({ initiallyExpanded: true });

        // Expect a single button to be rendered.
        TestUtils.findRenderedDOMNodeWithClass(component, "buttonClass");

        // Expect a single shown modal to be rendered.
        var modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");
        TestUtils.findRenderedDOMNodeWithClass(modal, "show");
    });

    it("renders in headerless mode", function () {
        var component = getComponent({ expanded: true, showHeader: false });

        // Expect a single button to be rendered.
        TestUtils.findRenderedDOMNodeWithClass(component, "buttonClass");

        // Expect a single shown modal to be rendered.
        var modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");
        TestUtils.findRenderedDOMNodeWithClass(modal, "show");
        var header = TestUtils.scryRenderedDOMNodesWithClass(modal, "modal-header");

        //no header
        expect(header.length).toBe(0);

        //but close link is here
        TestUtils.findRenderedDOMNodeWithClass(modal, "close-modal");
    });

    it("Cancel tooltip renders and triggers callbacks.", function () {
        var cancelConfirm = jest.genMockFunction(),
            cancelDeny = jest.genMockFunction(),
            modalParams = {
                expanded: true,
                cancelTooltip: {
                    title: "Cancel Confirmation",
                    open: false,
                    onConfirm: cancelConfirm,
                    onCancel: cancelDeny,
                    messageText: "Are you sure?",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No"
                }
            },
            component = getComponent(modalParams),
            cancelTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-tooltip"),
            cancelTooltipContent = TestUtils.findRenderedDOMNodeWithDataId(cancelTooltip, "details-content");

        expect(cancelTooltipContent).toBeFalsy();

        modalParams.cancelTooltip.open = true;
        component = getComponent(modalParams);
        cancelTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-tooltip");
        cancelTooltipContent = TestUtils.findRenderedDOMNodeWithDataId(cancelTooltip, "details-content");
        expect(cancelTooltip).toBeTruthy();

        var tooltipConfirmBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-confirm-btn"),
            tooltipDenyBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-deny-btn"),
            tooltipTitle = TestUtils.findRenderedDOMNodeWithDataId(component, "details-title"),
            tooltipText = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-tooltip-text");

        ReactTestUtils.Simulate.click(tooltipConfirmBtn);
        expect(cancelConfirm).toBeCalled();
        expect(cancelDeny).not.toBeCalled();

        ReactTestUtils.Simulate.click(tooltipDenyBtn);
        expect(cancelDeny).toBeCalled();

        expect(tooltipConfirmBtn.textContent).toBe(modalParams.cancelTooltip.confirmButtonText);
        expect(tooltipDenyBtn.textContent).toBe(modalParams.cancelTooltip.cancelButtonText);
        expect(tooltipTitle.textContent).toBe(modalParams.cancelTooltip.title);
        expect(tooltipText.textContent).toBe(modalParams.cancelTooltip.messageText);
    });

});
