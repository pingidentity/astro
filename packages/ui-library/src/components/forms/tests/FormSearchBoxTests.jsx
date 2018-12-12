window.__DEV__ = true;

jest.dontMock("underscore");
jest.dontMock("../FormSearchBox");
jest.dontMock("../form-text-field/index.js");
jest.dontMock("../form-text-field/v2");
jest.dontMock("../FormError");
jest.dontMock("../../tooltips/HelpHint");
jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../../../util/KeyboardUtils.js");

describe("FormSearchBox", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var _ = require("underscore");
    var TestUtils = require("../../../testutil/TestUtils");
    var FormSearchBox = require("../FormSearchBox");
    var FormTextField = require("../form-text-field/index");
    var KeyboardUtils = require("../../../util/KeyboardUtils.js");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            stateless: false,
            onValueChange: jest.fn(),
            onKeyDown: jest.fn(),
            onFocus: jest.fn(),
            onBlur: jest.fn(),
            onClear: jest.fn()
        });

        return ReactTestUtils.renderIntoDocument(<FormSearchBox {...opts} />);
    }

    it("should render the component", function () {
        var component = getComponent({
            "data-id": "mySearchBox"
        });

        var searchBox = TestUtils.findRenderedDOMNodeWithDataId(component, "mySearchBox");
        expect(ReactTestUtils.isDOMComponent(searchBox)).toBeTruthy();
    });

    it("should render the component with maxLength prop", function () {
        const component = getComponent({
            "data-id": "mySearchBox",
            maxLength: 10
        });

        const formTextField = TestUtils.findRenderedComponentWithType(component, FormTextField);
        expect(formTextField.props.maxLength).toEqual(10);
    });

    it("should render component with className", function () {
        var className = "someClasses",
            component = getComponent({ className: className });

        expect(TestUtils.findRenderedDOMNodeWithClass(component, className)).toBeDefined();
    });

    it("should have default placeholder", function () {
        var component = getComponent();

        var formTextField = TestUtils.findRenderedComponentWithType(component, FormTextField);
        expect(formTextField.props.placeholder).toBeUndefined();
    });

    it("should show placeholder", function () {
        var component = getComponent({
            placeholder: "Search text box"
        });

        var formTextField = TestUtils.findRenderedComponentWithType(component, FormTextField);
        expect(formTextField.props.placeholder).toEqual("Search text box");
    });

    it("should fire onChange when field changes", function () {
        var handleOnChange = jest.fn();
        var component = ReactTestUtils.renderIntoDocument(
            <FormSearchBox onValueChange={handleOnChange} />
        );

        var formTextField = TestUtils.findRenderedDOMNodeWithDataId(component, "FormSearchBox");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(formTextField, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "something" } });
        expect(handleOnChange.mock.calls.length).toBe(1);
    });

    it("should clear query string on ESC key", function () {
        var queryString = "test",
            component = getComponent({ queryString: queryString }),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(searchInput.value).toBe(queryString);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "esc",
            keyCode: KeyboardUtils.KeyCodes.ESC,
            which: KeyboardUtils.KeyCodes.ESC
        });

        expect(component.props.onValueChange).toBeCalledWith("");
    });

    it("should not clear query string when not ESC key", function () {
        var queryString = "test",
            component = getComponent({ queryString: queryString }),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(searchInput.value).toBe(queryString);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "enter",
            keyCode: KeyboardUtils.KeyCodes.ENTER,
            which: KeyboardUtils.KeyCodes.ENTER
        });

        expect(component.props.onValueChange).not.toBeCalled();

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "tab",
            keyCode: KeyboardUtils.KeyCodes.TAB,
            which: KeyboardUtils.KeyCodes.TAB
        });

        expect(component.props.onValueChange).not.toBeCalled();
    });

    it("should fire onKeyDown when key pressed", function () {
        var queryString = "test",
            component = getComponent({ queryString: queryString }),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(searchInput.value).toBe(queryString);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "esc",
            keyCode: KeyboardUtils.KeyCodes.ESC,
            which: KeyboardUtils.KeyCodes.ESC
        });

        expect(component.props.onKeyDown).toBeCalled();

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "enter",
            keyCode: KeyboardUtils.KeyCodes.ENTER,
            which: KeyboardUtils.KeyCodes.ENTER
        });

        expect(component.props.onKeyDown).toBeCalled();

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "tab",
            keyCode: KeyboardUtils.KeyCodes.TAB,
            which: KeyboardUtils.KeyCodes.TAB
        });

        expect(component.props.onKeyDown).toBeCalled();
    });

    it("should fire onFocus when search box is in focus", function () {
        var component = getComponent(),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.focus(searchInput);

        expect(component.props.onFocus).toBeCalled();
    });

    it("should fire onBlur when search box is blurred", function () {
        var component = getComponent(),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.blur(searchInput);

        expect(component.props.onBlur).toBeCalled();
    });

    it("should clear query string on (X) button click", function () {
        var queryString = "test",
            component = getComponent({ queryString: queryString }),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input"),
            clearButton = TestUtils.findRenderedDOMNodeWithDataId(component, "clear");

        expect(searchInput.value).toBe(queryString);

        ReactTestUtils.Simulate.click(clearButton);

        expect(component.props.onValueChange).toBeCalledWith("");
    });

    it("should not render clear icon (X) if queryString is empty-string, undefined, or null", function () {
        // empty-string
        var queryString = "",
            component = getComponent({ queryString: queryString }),
            clearButton = TestUtils.findRenderedDOMNodeWithDataId(component, "clear");

        expect(clearButton).toBeFalsy();

        // undefined
        queryString = undefined;
        component = getComponent({ queryString: queryString });
        clearButton = TestUtils.findRenderedDOMNodeWithDataId(component, "clear");

        expect(clearButton).toBeFalsy();

        // null
        queryString = null;
        component = getComponent({ queryString: queryString });
        clearButton = TestUtils.findRenderedDOMNodeWithDataId(component, "clear");

        expect(clearButton).toBeFalsy();
    });

    it("should render clear icon (X) if queryString is a non-empty string", function () {
        var queryString = "test",
            component = getComponent({ queryString: queryString }),
            clearButton = TestUtils.findRenderedDOMNodeWithDataId(component, "clear");

        expect(clearButton).toBeTruthy();
    });

    it("should fire onClear when search field query string is cleared using ESC key", function () {
        var queryString = "test",
            component = getComponent({ queryString: queryString }),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(searchInput.value).toBe(queryString);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "esc",
            keyCode: KeyboardUtils.KeyCodes.ESC,
            which: KeyboardUtils.KeyCodes.ESC
        });

        expect(component.props.onClear).toBeCalled();
    });

    it("should fire onClear when search field query string is cleared using clear icon (X)", function () {
        var queryString = "test",
            component = getComponent({ queryString: queryString }),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input"),
            clear = TestUtils.findRenderedDOMNodeWithDataId(component, "clear");

        expect(searchInput.value).toBe(queryString);

        ReactTestUtils.Simulate.click(clear);

        expect(component.props.onClear).toBeCalled();
    });

    it("searchBoxFocus should focus search input field", function () {
        var component = getComponent(),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(document.activeElement).toBe(document.body);
        component.searchBoxFocus();
        expect(document.activeElement).toBe(searchInput);
    });

    it("isFocused returns whether or not search input field is currently focused on", function () {
        var component = getComponent(),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        // Blur any previously focused element, so focus changes to document.body
        document.activeElement.blur();
        expect(document.activeElement).toBe(document.body);
        expect(component.isFocused()).toBe(false);

        component.searchBoxFocus();
        expect(document.activeElement).toBe(searchInput);
        expect(component.isFocused()).toBe(true);
    });
});
