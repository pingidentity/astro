jest.dontMock("../v2.jsx");

describe("Toggle", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        _ = require("underscore"),
        TestUtils = require("../../../../testutil/TestUtils"),
        Toggle = require("../v2.jsx");

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

    //TODO: remove when controlled no longer supported
    it("produces stateful/stateless components correctly given controlled prop", function () {
        var component = ReactTestUtils.renderIntoDocument(<Toggle controlled={false} />);
        var stateful = component.refs.ToggleStateful;
        var stateless = component.refs.ToggleStateless;

        expect(stateful).toBeTruthy();
        expect(stateless).toBeFalsy();

        component = ReactTestUtils.renderIntoDocument(<Toggle controlled={true} />);
        stateful = component.refs.ToggleStateful;
        stateless = component.refs.ToggleStateless;
        
        expect(stateless).toBeTruthy();
        expect(stateful).toBeFalsy();
    });

    //TODO: remove when controlled no longer supported
    it("logs warning for deprecated controlled prop", function () {
        console.warn = jest.genMockFunction();

        getComponent();

        expect(console.warn).toBeCalledWith(
            "Deprecated: use stateless instead of controlled. " +
            "The default for stateless will be true instead of false. " +
            "Support for controlled will be removed in next version");
    });

    it("logs warning when id prop is given", function () {
        console.warn = jest.genMockFunction();

        getComponent({ id: "myToggle" });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of id. Support for id will be removed in next version");
    });

    it("does not log warning when no id prop is given", function () {
        console.warn = jest.genMockFunction();

        getComponent();

        // Check 2nd call b/c 1st is logging the "controlled" warning
        expect(console.warn.mock.calls[1]).toBeUndefined();
    });

    it("does not log warning for id when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent({ id: "myToggle" });

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

});