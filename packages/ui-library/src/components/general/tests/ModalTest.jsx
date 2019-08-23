jest.dontMock("../Modal");
jest.dontMock("../If");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../tooltips/CancelTooltip");
jest.dontMock("../../tooltips/DetailsTooltip");
jest.dontMock("../../../util/Utils");

describe("ModalTest", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Modal = require("../Modal"),
        BodyTitle = require("../Modal").BodyTitle,
        Wrapper = TestUtils.UpdatePropsWrapper,
        shallow = require("enzyme").shallow,
        _ = require("underscore");

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    window.setTimeout = jest.fn();
    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
        window.setTimeout.mockClear();

    });

    function getComponent (opts) {
        const modalDefaults = _.defaults(opts || {}, {
            onOpen: jest.fn(),
            onClose: jest.fn().mockReturnValue(true)
        });

        return ReactTestUtils.renderIntoDocument(<Modal {...modalDefaults} />);
    }

    it("detaches event listeners and calls close event on unmount", function () {
        var component = getComponent({ expanded: true });
        var handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];
        const close = jest.fn();
        document.body.addEventListener("ui-library-modal-close", close);

        expect(window.addEventListener).toBeCalled();

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(window.removeEventListener).toBeCalledWith("keydown", handler);
        expect(close).toBeCalled();
    });

    it("no close event on unmount when component was never opened", function () {
        var component = getComponent({ expanded: false });
        const close = jest.fn();
        const open = jest.fn();
        document.body.addEventListener("ui-library-modal-open", open);
        document.body.addEventListener("ui-library-modal-close", close);

        expect(open).not.toBeCalled();
        component.componentWillUnmount();
        expect(close).not.toBeCalled();
    });

    it("keydown event listener does not trigger when modal is closed", function () {
        var component = getComponent(); //eslint-disable-line
        var handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
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
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        };

        //expect that the collapsed modal does not process keypress events
        handler(e);
        expect(e.stopPropagation).toBeCalled();
    });

    it("emits open and close events", function () {
        const
            openListenerCallback = jest.fn(),
            closeListenerCallback = jest.fn(),
            component = ReactTestUtils.renderIntoDocument(
                <Wrapper
                    type={Modal}
                    expanded={false}
                    onOpen={jest.fn()}
                    onClose={jest.fn()}
                />
            );

        document.body.addEventListener("ui-library-modal-open", openListenerCallback);
        document.body.addEventListener("ui-library-modal-close", closeListenerCallback);

        component._setProps({ expanded: true });
        expect(openListenerCallback).toBeCalled();
        expect(closeListenerCallback).not.toBeCalled();

        component._setProps({ expanded: false });
        expect(closeListenerCallback).toBeCalled();
    });

    it("emits open and close events in IE", function () {
        const UtilsMock = require("../../../util/Utils");
        UtilsMock.isIE = () => { return true; };

        const
            openListenerCallback = jest.fn(),
            closeListenerCallback = jest.fn(),
            component = ReactTestUtils.renderIntoDocument(
                <Wrapper
                    type={Modal}
                    expanded={false}
                    onOpen={jest.fn()}
                    onClose={jest.fn()}
                />
            );

        document.body.addEventListener("ui-library-modal-open", openListenerCallback);
        document.body.addEventListener("ui-library-modal-close", closeListenerCallback);

        component._setProps({ expanded: true });
        expect(openListenerCallback).toBeCalled();
        expect(closeListenerCallback).not.toBeCalled();

        component._setProps({ expanded: false });
        expect(closeListenerCallback).toBeCalled();
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
        var cancelConfirm = jest.fn(),
            cancelDeny = jest.fn(),
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

    it("BodyTitle test", function () {
        const titleText = "This is my title";
        const component =
            shallow(
                <BodyTitle>
                    {titleText}
                </BodyTitle>
            );

        const TitleNode = component.find(".body-title");

        expect(TitleNode.text()).toEqual(titleText);
    });

    it("fires cannonball warning if use-portal isn't set", function() {
        console.warn = jest.fn();
        getComponent({ flags: [] });
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire cannonball warning if use-portal is set", function() {
        console.warn = jest.fn();
        getComponent({ flags: [ "use-portal" ], expanded: true });
        expect(console.warn).not.toBeCalled();
    });

});
