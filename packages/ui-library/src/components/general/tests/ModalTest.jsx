jest.dontMock("../Modal.jsx");
jest.dontMock("../If.jsx");
jest.dontMock("../../../util/EventUtils.js");

describe("ModalTest", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Modal = require("../Modal.jsx"),
        _ = require("underscore");

    beforeEach(function () {
        window.addEventListener = jest.genMockFunction();
        window.removeEventListener = jest.genMockFunction();
        window.setTimeout = jest.genMockFunction();
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
        var handler = window.addEventListener.mock.calls[0][1];

        expect(window.addEventListener).toBeCalled();

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(window.removeEventListener).toBeCalledWith("keydown", handler);
    });

    it("keydown event listener does not trigger when modal is closed", function () {
        var component = getComponent(); //eslint-disable-line
        var handler = window.addEventListener.mock.calls[0][1];
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
        var handler = window.addEventListener.mock.calls[0][1];
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
            component = getComponent({ id: did, expanded: true }),
            modal = TestUtils.findRenderedDOMNodeWithDataId(component, did);

        expect(ReactTestUtils.isDOMComponent(modal)).toBeTruthy();
    });

    it("Modal render id if provided", function () {
        console.warn = jest.genMockFunction();

        var component = getComponent({ expanded: true, id: "myid" }),
            modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");

        expect(console.warn).toBeCalledWith("Deprecated: use data-id instead of id. " +
                                            "Support for id will be removed in next version");
        expect(modal.getAttribute("data-id")).toEqual("myid");
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

    //TODO: remove when id no longer supported
    it("does not log warning for id when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent({ id: "someId", expanded: true });

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

});
