window.__DEV__ = true;

jest.dontMock("../Spinner");

describe("Spinner", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Spinner = require("../Spinner"),
        _ = require("underscore"),
        defaultTextValue = "Loading...";

    function getComponent (opts) {
        var attrs = _.defaults(opts || {}, {
            show: true,
            defaultText: defaultTextValue
        });

        return ReactTestUtils.renderIntoDocument(
            <Spinner {...attrs}>
                <div className="loader-content">whatever</div>
            </Spinner>
        );
    }

    it("is rendering spinning animation", function () {
        var component = getComponent();

        var content = TestUtils.scryRenderedDOMNodesWithClass(component, "loader-content");
        expect(content.length).toBe(0);

        var spinner = TestUtils.findRenderedDOMNodeWithClass(component, "loader");
        expect(spinner.textContent).toBe(defaultTextValue);
    });

    it("is rendering child content", function () {
        var component = getComponent(
            { show: false }
        );

        var content = TestUtils.findRenderedDOMNodeWithClass(component, "loader-content");
        expect(content.textContent).toBe("whatever");

        var spinner = TestUtils.scryRenderedDOMNodesWithClass(component, "loader");
        expect(spinner.length).toBe(0);
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

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "loader");

        expect(element).toBeDefined();
    });

});
