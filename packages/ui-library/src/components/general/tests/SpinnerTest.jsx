window.__DEV__ = true;

jest.dontMock("../Spinner.jsx");

describe("Spinner", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Spinner = require("../Spinner.jsx"),
        _ = require("underscore"),
        defaultTextValue = "Loading...";

    function getComponent (opts) {
        var attrs = _.defaults(opts || {}, {
            show: true,
            defaultText: defaultTextValue
        });

        return ReactTestUtils.renderIntoDocument(
            <Spinner {...attrs}>
                <div className="spinner-content">whatever</div>
            </Spinner>
        );
    }

    it("is rendering spinning animation", function () {
        var component = getComponent();

        var content = TestUtils.scryRenderedDOMNodesWithClass(component, "spinner-content");
        expect(content.length).toBe(0);

        var spinner = TestUtils.findRenderedDOMNodeWithClass(component, "spinner");
        expect(spinner.textContent).toBe(defaultTextValue);
    });

    it("is rendering child content", function () {
        var component = getComponent(
            { show: false }
        );

        var content = TestUtils.findRenderedDOMNodeWithClass(component, "spinner-content");
        expect(content.textContent).toBe("whatever");

        var spinner = TestUtils.scryRenderedDOMNodesWithClass(component, "spinner");
        expect(spinner.length).toBe(0);
    });

    // TODO To be removed once "id" support is discontnued.
    it("render component with id", function () {
        var component = getComponent(
            { id: "spinnerWithId" }
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "spinnerWithId");

        expect(element).toBeDefined();
    });

    it("render component with data-id", function () {
        var component = getComponent(
            { "data-id": "spinnerWithDataId" }
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "spinnerWithDataId");

        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = getComponent();

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "spinner");

        expect(element).toBeDefined();
    });

    // TODO To be removed once "id" support is discontnued.
    it("log warning in console for id", function () {
        console.warn = jest.genMockFunction();
        getComponent(
            { id: "spinnerWithId" }
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of id. Support for id will be removed in next version");
    });

    // TODO To be removed once "id" support is discontnued.
    it("does not log warning in console without id", function () {
        console.warn = jest.genMockFunction();
        getComponent();

        expect(console.warn).not.toBeCalled();
    });

    //TODO: remove when id no longer supported
    it("does not log warning for id when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent(
            { id: "spinnerWithId" }
        );

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
