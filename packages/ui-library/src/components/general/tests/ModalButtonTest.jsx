
jest.dontMock("../ModalButton.jsx");
jest.dontMock("../Modal.jsx");
jest.dontMock("../../../util/EventUtils.js");

describe("ModalButtonTest", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ModalButton = require("../ModalButton.jsx"),
        _ = require("underscore");

    var linkCallback = function () {
        return <span className="someCallbackClass">Link</span>;
    };

    beforeEach(function () {
        window.setTimeout = jest.genMockFunction();
    });

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            value: "My Button",
            buttonStyle: "buttonClass",
            onOpen: jest.genMockFunction(),
            onClose: jest.genMockFunction().mockReturnValue(true)
        });

        return ReactTestUtils.renderIntoDocument(<ModalButton {...opts} />);
    }

    it("Doesn't render body until expanded", function () {
        var component = getComponent({ modalBody: jest.genMockFunction() });

        expect(component.props.modalBody).not.toBeCalled();

        component._open();
        expect(component.props.modalBody).toBeCalled();
    });

    it("Test default render", function () {
        var component = getComponent();

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithClass(component, "buttonClass");

        expect(button.textContent).toBe("My Button");

        // Expect no modal to be rendered.
        var modals = TestUtils.scryRenderedDOMNodesWithClass(component, "modal");
        expect(modals.length).toEqual(0);
    });

    it("Button and modal do not render data-ids if not provided", function () {
        var component = getComponent({ expanded: true }),
            button = TestUtils.findRenderedDOMNodeWithTag(component, "button"),
            modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");

        expect(button.getAttribute("data-id")).toBeFalsy();
        expect(modal.getAttribute("data-id")).toBeFalsy();
    });

    it("Button and modal render data-ids if provided", function () {
        var did = "myid",
            component = getComponent({ id: did, expanded: true }),
            button = TestUtils.findRenderedDOMNodeWithDataId(component, did + "-button"),
            modal = TestUtils.findRenderedDOMNodeWithDataId(component, did + "-modal");

        expect(ReactTestUtils.isDOMComponent(button)).toBeTruthy();
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

    /*
     * Ensure that a modal can be opened by clicking the button,
     * and that the appropriate callback is called when the modal
     * is opened.
     *
     * Happy path modal functionality.
     */
    it("Initially closed modal opened on click", function () {
        var component = getComponent();

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithClass(component, "buttonClass");

        // Expect no modal to be rendered.
        var modals = TestUtils.scryRenderedDOMNodesWithClass(component, "modal");
        expect(modals.length).toEqual(0);

        // Callback should not have been called yet
        expect(component.props.onOpen.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        var modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");
        TestUtils.findRenderedDOMNodeWithClass(modal, "show");

        // Callback should have been called one time for the one click
        expect(component.props.onOpen.mock.calls.length).toBe(1);
    });

    /*
     * Ensure that the modal keeps working for repeated use,
     * i.e. their are no state issues etc, by opening and
     * closing it a couple of times.
     *
     */
    it("Open, close, open, close again", function () {
        var component = getComponent();

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithClass(component, "buttonClass");

        // Expect no modal to be rendered.
        var modals = TestUtils.scryRenderedDOMNodesWithClass(component, "modal");
        expect(modals.length).toBe(0);

        // Callback should not have been called yet
        expect(component.props.onOpen.mock.calls.length).toBe(0);
        expect(component.props.onClose.mock.calls.length).toBe(0);


        // --- Open Modal
        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        var modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");
        TestUtils.findRenderedDOMNodeWithClass(modal, "show");

        // Open callback should have been called one time for the one click
        expect(component.props.onOpen.mock.calls.length).toBe(1);
        expect(component.props.onClose.mock.calls.length).toBe(0);


        // --- Close modal
        var closeLink = TestUtils.findRenderedDOMNodeWithClass(component, "close-modal");
        ReactTestUtils.Simulate.click(closeLink);

        // Expect no modal to be rendered
        modals = TestUtils.scryRenderedDOMNodesWithClass(component, "modal");
        expect(modals.length).toBe(0);

        // Should be a single call to each callback now
        expect(component.props.onOpen.mock.calls.length).toBe(1);
        expect(component.props.onClose.mock.calls.length).toBe(1);


        // --- Open the modal again
        button = TestUtils.findRenderedDOMNodeWithClass(component, "buttonClass");
        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");
        TestUtils.findRenderedDOMNodeWithClass(modal, "show");

        // Open callback should have been called one time for the one click
        expect(component.props.onOpen.mock.calls.length).toBe(2);
        expect(component.props.onClose.mock.calls.length).toBe(1);


        // --- Close modal again
        closeLink = TestUtils.findRenderedDOMNodeWithClass(component, "close-modal");
        ReactTestUtils.Simulate.click(closeLink);

        // Expect no modal to be rendered
        modals = TestUtils.scryRenderedDOMNodesWithClass(component, "modal");
        expect(modals.length).toBe(0);

        // Should be two calls to each callback now
        expect(component.props.onOpen.mock.calls.length).toBe(2);
        expect(component.props.onClose.mock.calls.length).toBe(2);
    });

    it("Test alternative link render as text", function () {
        var component = getComponent({ linkContent: "some text", linkStyle: "someStyle" });

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithClass(component, "someStyle");
        expect(button.textContent).toBe("some text");

        // Expect no modal to be rendered.
        var modals = TestUtils.scryRenderedDOMNodesWithClass(component, "modal");
        expect(modals.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        TestUtils.findRenderedDOMNodeWithClass(component, "modal");
    });

    it("Test alternative link render as callback", function () {
        var component = getComponent({ linkContent: linkCallback, linkStyle: "someStyle" });

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithClass(component, "someStyle");
        expect(button.textContent).toBe("Link");

        // Ensure callback returned span rendered as expected.
        var span = TestUtils.findRenderedDOMNodeWithClass(component, "someCallbackClass");
        expect(span.textContent).toBe("Link");

        // Expect no modal to be rendered.
        var modals = TestUtils.scryRenderedDOMNodesWithClass(component, "modal");
        expect(modals.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        TestUtils.findRenderedDOMNodeWithClass(component, "modal");
    });

});
