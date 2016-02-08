
jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../ModalButton.jsx");


describe("ModalButtonTest", function () {
    var React = require("react/addons");
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require("../../../testutil/TestUtils");
    var ModalButton = require("../ModalButton.jsx");

    var linkCallback = function () {
        return <span className="someCallbackClass">Link</span>;
    };

    it("Doesnt render body until expanded", function () {
        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton value="My Button" buttonStyle="buttonClass" modalBody={jest.genMockFunction()} />
        );

        expect(modalComponent.props.modalBody).not.toBeCalled();

        modalComponent._open();
        expect(modalComponent.props.modalBody).toBeCalled();
    });

    it("Test default render", function () {
        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton value="My Button" buttonStyle="buttonClass" />
        );

        // Expect a single button to be rendered.
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "buttonClass");
        expect(button.getDOMNode().textContent).toBe("My Button");

        // Expect no modal to be rendered.
        var modals = ReactTestUtils.scryRenderedDOMComponentsWithClass(modalComponent, "modal");
        expect(modals.length).toEqual(0);
    });

    it("Button and modal don't render data-ids if not provided", function () {
        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton value="My Button" buttonStyle="buttonClass" />
        );

        // Try to get the button by data-id. It shouldn't be there.
        var button = TestUtils.findRenderedDOMComponentWithDataId(modalComponent, "-button");
        expect(ReactTestUtils.isDOMComponent(button)).toBeFalsy();

        button = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "buttonClass");
        expect(button.getDOMNode().textContent).toBe("My Button");

        ReactTestUtils.Simulate.click(button);

        // Try to get the modal by data-id. It shouldn't be there.
        var modal = TestUtils.findRenderedDOMComponentWithDataId(modalComponent, "-modal");
        expect(ReactTestUtils.isDOMComponent(modal)).toBeFalsy();
    });

    it("Button and modal render data-ids if provided", function () {
        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton id="my-button" value="My Button" buttonStyle="buttonClass" />
        );

        // Get the button by data-id.
        var button = TestUtils.findRenderedDOMComponentWithDataId(modalComponent, "my-button-button");
        expect(button.getDOMNode().textContent).toBe("My Button");

        ReactTestUtils.Simulate.click(button);

        // Get the modal by data-id.
        var modal = TestUtils.findRenderedDOMComponentWithDataId(modalComponent, "my-button-modal");
        expect(ReactTestUtils.isDOMComponent(modal)).toBeTruthy();
    });

    /*
     * Ensure that a modal set to be initially open
     * via: expanded=true
     * is rendered as such.
     *
     */
    it("Modal initially open", function () {
        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton buttonStyle="buttonClass" initiallyExpanded={true} value="Test Button" />
        );

        // Expect a single button to be rendered.
        ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "buttonClass");

        // Expect a single shown modal to be rendered.
        var modal = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "modal");
        ReactTestUtils.findRenderedDOMComponentWithClass(modal, "show");
    });


    /*
     * Ensure that a modal can be opened by clicking the button,
     * and that the appropriate callback is called when the modal
     * is opened.
     *
     * Happy path modal functionality.
     */
    it("Initially closed modal opened on click", function () {
        var callback = jest.genMockFunction();

        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton buttonStyle="buttonClass" onOpen={callback} value="Test Button" />
        );

        // Expect a single button to be rendered.
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "buttonClass");

        // Expect no modal to be rendered.
        var modals = ReactTestUtils.scryRenderedDOMComponentsWithClass(modalComponent, "modal");
        expect(modals.length).toEqual(0);

        // Callback should not have been called yet
        expect(callback.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        var modal = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "modal");
        ReactTestUtils.findRenderedDOMComponentWithClass(modal, "show");

        // Callback should have been called one time for the one click
        expect(callback.mock.calls.length).toBe(1);
    });

    /*
     * Ensure that the modal keeps working for repeated use,
     * i.e. their are no state issues etc, by opening and
     * closing it a couple of times.
     *
     */
    it("Open, close, open, close again", function () {
        var openCallback = jest.genMockFunction();
        var closeCallback = jest.genMockFunction();
        closeCallback.mockReturnValue(true);

        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton buttonStyle="buttonClass" onOpen={openCallback} onClose={closeCallback} value="Test Button" />
        );

        // Expect a single button to be rendered.
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "buttonClass");

        // Expect no modal to be rendered.
        var modals = ReactTestUtils.scryRenderedDOMComponentsWithClass(modalComponent, "modal");
        expect(modals.length).toBe(0);

        // Callback should not have been called yet
        expect(openCallback.mock.calls.length).toBe(0);
        expect(closeCallback.mock.calls.length).toBe(0);


        // --- Open Modal
        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        var modal = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "modal");
        ReactTestUtils.findRenderedDOMComponentWithClass(modal, "show");

        // Open callback should have been called one time for the one click
        expect(openCallback.mock.calls.length).toBe(1);
        expect(closeCallback.mock.calls.length).toBe(0);


        // --- Close modal
        var closeLink = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "close-modal");
        ReactTestUtils.Simulate.click(closeLink);

        // Expect no modal to be rendered
        modals = ReactTestUtils.scryRenderedDOMComponentsWithClass(modalComponent, "modal");
        expect(modals.length).toBe(0);

        // Should be a single call to each callback now
        expect(openCallback.mock.calls.length).toBe(1);
        expect(closeCallback.mock.calls.length).toBe(1);


        // --- Open the modal again
        button = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "buttonClass");
        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        modal = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "modal");
        ReactTestUtils.findRenderedDOMComponentWithClass(modal, "show");

        // Open callback should have been called one time for the one click
        expect(openCallback.mock.calls.length).toBe(2);
        expect(closeCallback.mock.calls.length).toBe(1);


        // --- Close modal again
        closeLink = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "close-modal");
        ReactTestUtils.Simulate.click(closeLink);

        // Expect no modal to be rendered
        modals = ReactTestUtils.scryRenderedDOMComponentsWithClass(modalComponent, "modal");
        expect(modals.length).toBe(0);

        // Should be two calls to each callback now
        expect(openCallback.mock.calls.length).toBe(2);
        expect(closeCallback.mock.calls.length).toBe(2);
    });

    it("Test alternative link render as text", function () {
        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton linkContent={"some text"} linkStyle="someStyle" />
        );

        // Expect a single button to be rendered.
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "someStyle");
        expect(button.getDOMNode().textContent).toBe("some text");

        // Expect no modal to be rendered.
        var modals = ReactTestUtils.scryRenderedDOMComponentsWithClass(modalComponent, "modal");
        expect(modals.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        var modal = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "modal");
        ReactTestUtils.findRenderedDOMComponentWithClass(modal, "show");
    });

    it("Test alternative link render as callback", function () {
        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton linkContent={linkCallback} linkStyle="someStyle" />
        );

        // Expect a single button to be rendered.
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "someStyle");
        expect(button.getDOMNode().textContent).toBe("Link");

        // Ensure callback returned span rendered as expected.
        var span = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "someCallbackClass");
        expect(span.getDOMNode().textContent).toBe("Link");

        // Expect no modal to be rendered.
        var modals = ReactTestUtils.scryRenderedDOMComponentsWithClass(modalComponent, "modal");
        expect(modals.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        var modal = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "modal");
        ReactTestUtils.findRenderedDOMComponentWithClass(modal, "show");
    });

    it("renders in header less mode", function () {
        var closeCallback = jest.genMockFunction();
        closeCallback.mockReturnValue(true);

        var modalComponent = ReactTestUtils.renderIntoDocument(
            <ModalButton buttonStyle="buttonClass" expanded={true} showHeader={false} value="Test Button" />
        );

        // Expect a single button to be rendered.
        ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "buttonClass");

        // Expect a single shown modal to be rendered.
        var modal = ReactTestUtils.findRenderedDOMComponentWithClass(modalComponent, "modal");
        ReactTestUtils.findRenderedDOMComponentWithClass(modal, "show");
        var header = ReactTestUtils.scryRenderedDOMComponentsWithClass(modal, "modal-header");

        //no header
        expect(header.length).toBe(0);

        //but close link is here
        ReactTestUtils.findRenderedDOMComponentWithClass(modal, "close-modal");
    });


});
