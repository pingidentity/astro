"use strict";

jest.dontMock("../ModalButton.jsx");
jest.dontMock("../Modal.jsx");
jest.dontMock("../If.jsx");
jest.dontMock("../../../util/EventUtils.js");

describe("ModalButtonTest", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ModalButton = require("../ModalButton.jsx"),
        _ = require("underscore");

    require("../Modal.jsx"); // just so Jest include the code coverage on Modal.jsx in the report

    var linkCallback = function () {
        return (<span className="someCallbackClass">Link</span>);
    };

    beforeEach(function () {
        window.setTimeout = jest.genMockFunction();
    });

    function getComponentWithoutDefaults (opts) {
        return ReactTestUtils.renderIntoDocument(<ModalButton {...opts} />);
    }
    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            activatorButtonLabel: "My Button",
            activatorButtonClassName: "buttonClass",
            onOpen: jest.genMockFunction(),
            onClose: jest.genMockFunction().mockReturnValue(true)
        });

        return getComponentWithoutDefaults(opts);
    }

    it("Doesn't render body until expanded", function () {
        var component = getComponent({ modalBody: jest.genMockFunction() });

        expect(component.props.modalBody).not.toBeCalled();

        component.refs.ModalButtonStateful._handleOpen();
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

    it("Button and modal render default data-ids if not provided", function () {
        var component = getComponent({ expanded: true }),
            button = TestUtils.findRenderedDOMNodeWithTag(component, "button"),
            modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");

        expect(button.getAttribute("data-id")).toEqual("modal-button-button");
        expect(modal.getAttribute("data-id")).toEqual("modal-button-modal");
    });

    it("Button and modal render data-ids if provided", function () {
        var did = "myid",
            component = getComponent({ "data-id": did, expanded: true }),
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
        var component = getComponentWithoutDefaults({
            activatorContent: "some text",
            activatorContentClassName: "someStyle",
            onOpen: jest.genMockFunction(),
            onClose: jest.genMockFunction().mockReturnValue(true)
        });

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
        var component = getComponentWithoutDefaults({
            activatorContent: linkCallback,
            activatorContentClassName: "someStyle",
            onOpen: jest.genMockFunction(),
            onClose: jest.genMockFunction().mockReturnValue(true)
        });

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

    it("Test activator container enablement through prop", function () {
        var component = getComponent({
            activatorContainerClassName: "activatorContainerClassName"
        });

        var container = TestUtils.findRenderedDOMNodeWithDataId(
                component,
                "modal-button-button-container"
            );
        expect(container).toBeDefined();
    });

    it("Test warning on providing both the activator label and the content", function () {
        console.warn = jest.genMockFunction();

        getComponentWithoutDefaults({
            activatorButtonLabel: "button label",
            activatorContent: "some text",
            onOpen: jest.genMockFunction(),
            onClose: jest.genMockFunction().mockReturnValue(true)
        });

        expect(console.warn).toBeCalledWith("Only one of ('content', 'buttonLabel') is required");
    });

    it("Renders the content inline when told so through props", function () {
        // inline render
        var component = getComponent({ inline: true });
        var componentElement = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button");
        expect(componentElement.tagName.toLowerCase()).toEqual("span");

        // not inline
        component = getComponent({});
        componentElement = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button");
        expect(componentElement.tagName.toLowerCase()).toEqual("div");
    });

    it("Open/close stateful modal button", function () {
        var component = getComponentWithoutDefaults({
            activatorButtonLabel: "some text"
        });

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-button");

        // Expect no modal to be rendered.
        var modals = TestUtils.scryRenderedDOMNodesWithDataId(component, "modal-button-modal");
        expect(modals.length).toBe(0);


        // --- Open Modal
        ReactTestUtils.Simulate.click(button);

        // Expect a single shown modal to be rendered after click.
        var modal = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-modal");
        TestUtils.findRenderedDOMNodeWithClass(modal, "show");

        // --- Close modal
        var closeLink = TestUtils.findRenderedDOMNodeWithDataId(modal, "close-button");
        ReactTestUtils.Simulate.click(closeLink);

        // Expect no modal to be rendered
        modals = TestUtils.scryRenderedDOMNodesWithDataId(component, "modal-button-modal");
        expect(modals.length).toBe(0);
    });

    it("Open/close stateless modal button", function () {
        var component = getComponentWithoutDefaults({
            activatorContent: "some text",
            onOpen: jest.genMockFunction().mockReturnValue(true),
            onClose: jest.genMockFunction().mockReturnValue(true),
            stateless: true
        });

        expect(component.refs.ModalButtonStateless).toBeDefined();
    });

    it("does not call onClose callback when bg is clicked and closeOnBgClick prop is false", function () {
        var component = getComponentWithoutDefaults({
                activatorContent: linkCallback,
                onOpen: jest.genMockFunction(),
                onClose: jest.genMockFunction().mockReturnValue(true),
                stateless: true,
                expanded: true,
                closeOnBgClick: false
            }),
            modalBg = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-bg");

        ReactTestUtils.Simulate.click(modalBg);
        expect(component.props.onClose.mock.calls.length).toBe(0);
    });

    it("calls onClose callback when bg is clicked and closeOnBgClick prop is true", function () {
        var component = getComponentWithoutDefaults({
                activatorContent: linkCallback,
                onOpen: jest.genMockFunction(),
                onClose: jest.genMockFunction().mockReturnValue(true),
                stateless: true,
                expanded: true,
                closeOnBgClick: true
            }),
            modalBg = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-bg");

        ReactTestUtils.Simulate.click(modalBg);
        expect(component.props.onClose.mock.calls.length).toBe(1);
    });

    //TODO: remove when controlled no longer supported
    it("produces stateful/stateless components correctly given controlled prop", function () {
        var component = getComponentWithoutDefaults({ controlled: false });
        var stateful = component.refs.ModalButtonStateful;
        var stateless = component.refs.ModalButtonStateless;

        expect(stateful).toBeTruthy();
        expect(stateless).toBeFalsy();

        component = getComponentWithoutDefaults({ controlled: true });
        stateful = component.refs.ModalButtonStateful;
        stateless = component.refs.ModalButtonStateless;
        
        expect(stateless).toBeTruthy();
        expect(stateful).toBeFalsy();
    });

    //TODO: remove when controlled no longer supported
    it("logs warning for deprecated controlled prop", function () {
        console.warn = jest.genMockFunction();

        getComponent();

        expect(console.warn).toBeCalledWith(
            "Deprecated: use stateless instead of controlled. " +
            "Support for controlled will be removed in next version");
    });


    it("Show warnings when using deprecated properties", function () {
        console.warn = jest.genMockFunction();

        getComponent({
            id: "deprecated",
            containerStyle: "deprecated",
            activatorContainerStyle: "deprecated"
        });
        expect(console.warn.mock.calls[1][0]).toEqual(
            "Deprecated: use data-id instead of id. Support for id will be removed in next version"
        );
        expect(console.warn.mock.calls[2][0]).toEqual(
            "Deprecated: use className instead of containerStyle. Support for containerStyle will be removed in next version" // eslint-disable-line max-len
        );
        expect(console.warn.mock.calls[3][0]).toEqual(
            "Deprecated: use activatorContainerClassName instead of activatorContainerStyle. Support for activatorContainerStyle will be removed in next version" // eslint-disable-line max-len
        );

        console.warn.mockClear();
        getComponentWithoutDefaults({
            linkContent: "deprecated",
            linkStyle: "deprecated"
        });
        expect(console.warn.mock.calls[1][0]).toEqual(
            "Deprecated: use activatorContent instead of linkContent. Support for linkContent will be removed in next version" // eslint-disable-line max-len
        );
        expect(console.warn.mock.calls[2][0]).toEqual(
            "Deprecated: use activatorContentClassName instead of linkStyle. Support for linkStyle will be removed in next version" // eslint-disable-line max-len
        );

        console.warn.mockClear();
        getComponentWithoutDefaults({
            value: "deprecated",
            buttonStyle: "deprecated"
        });
        expect(console.warn.mock.calls[1][0]).toEqual(
            "Deprecated: use activatorButtonLabel instead of value. Support for value will be removed in next version" // eslint-disable-line max-len
        );
        expect(console.warn.mock.calls[2][0]).toEqual(
            "Deprecated: use activatorButtonClassName instead of buttonStyle. Support for buttonStyle will be removed in next version" // eslint-disable-line max-len
        );
    });

    //TODO: remove when deprecated props no longer supported
    it("does not log warning for deprecated props when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent({
            id: "deprecated",
            containerStyle: "deprecated",
            activatorContainerStyle: "deprecated",
            linkContent: "deprecated",
            linkStyle: "deprecated",
            value: "deprecated",
            buttonStyle: "deprecated"
        });

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

});
