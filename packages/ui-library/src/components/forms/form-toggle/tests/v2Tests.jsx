jest.dontMock("../v2");

describe("Toggle", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        _ = require("underscore"),
        TestUtils = require("../../../../testutil/TestUtils"),
        Utils = require("../../../../util/Utils"),
        Toggle = require("../v2");

    function getComponent (props) {
        var props = _.defaults(props || {}, {
            stateless: true,
            onToggle: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<Toggle {...props} />);
    }

    it("stateless: renders the component with default data-id", function () {
        var component = getComponent();

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "toggle")).toBeTruthy();
    });

    it("stateful: renders the component with default data-id", function () {
        var component = getComponent({ stateless: false });

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "toggle")).toBeTruthy();
    });

    it("stateless: renders additional CSS classes from className prop", function () {
        var component = getComponent({ className: "someClass" }),
            toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle"),
            toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "someClass")).toBe(true);
    });

    it("stateless: defaults to toggled false", function () {
        var component = getComponent(),
            toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle"),
            toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "selected")).toBe(false);
    });

    it("stateful: defaluts to toggled false", function () {
        var component = getComponent({ stateless: false }),
            toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle"),
            toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "selected")).toBe(false);
    });

    it("stateless: accepts default toggled state", function () {
        var component = getComponent({ toggled: true }),
            toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle"),
            toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "selected")).toBe(true);
    });

    it("stateful: accepts default toggled state", function () {
        var component = getComponent({
                stateless: false,
                toggled: true
            }),
            toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle"),
            toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "selected")).toBe(true);
    });

    it("stateless: triggers onToggle callback when clicked", function () {
        var component = getComponent(),
            toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");

        ReactTestUtils.Simulate.click(toggle);

        expect(component.props.onToggle).toBeCalled();
    });

    it("stateful: _handleToggle callback changes toggled state when clicked", function () {
        var component = getComponent({ stateless: false }),
            componentRef = component.refs.ToggleStateful,
            toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");

        expect(componentRef.state.toggled).toBe(false);

        ReactTestUtils.Simulate.click(toggle);

        expect(componentRef.state.toggled).toBe(true);
    });

    it("stateless: does not trigger onToggle callback when disabled", function () {
        var component = getComponent({ disabled: true }),
            toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");

        ReactTestUtils.Simulate.click(toggle);

        expect(component.props.onToggle).not.toBeCalled();
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            getComponent({ id: "foo" });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

});
