window.__DEV__ = true;

jest.dontMock("../../../util/KeyboardUtils.js");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../FormDropDownList.jsx");
jest.dontMock("../FormLabel.jsx");
jest.dontMock("../FormError.jsx");

describe("FormDropDownList", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        _ = require("underscore"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        KeyBoardUtils = require("../../../util/KeyboardUtils.js"),
        FormDropDownList = require("../FormDropDownList.jsx");

    var options = [
        { label: "One", value: 1 },
        { label: "Two", value: 2 },
        { label: "Three", value: 3 },
        { label: "Four", value: 4 },
        { label: "Five", value: 5 }
    ];

    function getComponent (props) {
        props = _.defaults(props || {}, {
            stateless: true,
            options: options,
            selectedOption: options[0],
            onToggle: jest.genMockFunction(),
            onSearch: jest.genMockFunction(),
            onValueChange: jest.genMockFunction()
        });
        return ReactTestUtils.renderIntoDocument(<FormDropDownList {...props} />);
    }

    window.addEventListener = jest.genMockFunction();
    window.removeEventListener = jest.genMockFunction();

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("renders the component with default data-id", function () {
        var component = getComponent();
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "form-drop-down-list")).toBeTruthy();
    });

    it("accepts custom data-id", function () {
        var component = getComponent({ "data-id": "my-custom-select" });
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "my-custom-select")).toBeTruthy();
    });

    it("accepts classsname", function () {
        var component = getComponent({ className: "custom-container-class" });
        expect(TestUtils.findRenderedDOMNodeWithClass(component, "custom-container-class")).toBeTruthy();
    });

    it("default not required", function () {
        var component = getComponent();
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "form-drop-down-list");
        var classes = select.className.split(" ");

        expect(_.contains(classes, "required")).toEqual(false);
    });

    it("supports required when set", function () {
        var component = getComponent({ required: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "form-drop-down-list");
        var classes = select.className.split(" ");

        expect(_.contains(classes, "required")).toEqual(true);
    });

    it("default not disabled", function () {
        var component = getComponent();
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "form-drop-down-list");
        var classes = select.className.split(" ");

        expect(_.contains(classes, "disabled")).toEqual(false);
    });

    it("supports disabled when set", function () {
        var component = getComponent({ disabled: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "form-drop-down-list");
        var classes = select.className.split(" ");

        expect(_.contains(classes, "disabled")).toEqual(true);
    });

    it("default not autofocus", function () {
        getComponent();

        expect(document.activeElement).toBeUndefined();
    });

    it("supports autofocus when set", function () {
        var component = getComponent({ autofocus: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        expect(document.activeElement).toEqual(select);
    });

    it("opens list on arrow up when focused", function () {
        var component = getComponent({ autofocus: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        expect(document.activeElement).toEqual(select);

        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ARROW_UP });

        expect(component.props.onToggle).toBeCalled();
    });

    it("opens list on arrow down when focused", function () {
        var component = getComponent({ autofocus: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        expect(document.activeElement).toEqual(select);
        
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ARROW_DOWN });

        expect(component.props.onToggle).toBeCalled();
    });

    it("closes open list on tab when focused", function () {
        var component = getComponent({ open: true, autofocus: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        expect(document.activeElement).toEqual(select);
        
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.TAB });

        expect(component.props.onToggle).toBeCalled();
    });

    it("renders with option list closed by default", function () {
        var component = getComponent();
        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "form-drop-down-list");
        var listClasses = list.className.split(" ");

        expect(_.contains(listClasses, "open")).toEqual(false);
    });

    it("can be set to render with list open", function () {
        var component = getComponent({
            open: true
        });

        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "form-drop-down-list");
        var listClasses = list.className.split(" ");

        expect(_.contains(listClasses, "open")).toEqual(true);
    });

    it("opens option list on list button click", function () {
        var component = getComponent();
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        expect(component.props.onToggle.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(select);

        expect(component.props.onToggle.mock.calls.length).toBe(1);
    });

    it("stateful: onToggle callback updates open state", function () {
        var component = getComponent({ stateless: false });
        var componentRef = component.refs.FormDropDownListStateful;

        expect(componentRef.state.open).toBe(false);
        expect(componentRef.state.searchIndex).toBe(-1);
        expect(componentRef.state.searchString).toBe("");
        expect(componentRef.state.searchTime).toBe(0);

        componentRef._handleToggle();

        expect(componentRef.state.open).toBe(true);
        expect(componentRef.state.searchIndex).toBe(-1);
        expect(componentRef.state.searchString).toBe("");
        expect(componentRef.state.searchTime).toBe(0);
    });

    it("stateful: onSearch callback updates search state", function () {
        var component = getComponent({ stateless: false });
        var componentRef = component.refs.FormDropDownListStateful;

        expect(componentRef.state.open).toBe(false);
        expect(componentRef.state.searchIndex).toBe(-1);
        expect(componentRef.state.searchString).toBe("");
        expect(componentRef.state.searchTime).toBe(0);

        componentRef._handleSearch("newSearch", 1, 3);

        expect(componentRef.state.open).toBe(false);
        expect(componentRef.state.searchIndex).toBe(3);
        expect(componentRef.state.searchString).toBe("newSearch");
        expect(componentRef.state.searchTime).toBe(1);
    });

    it("renders list of options", function () {
        var component = getComponent({ open: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");

        expect(select.children.length).toEqual(5);
        expect(select.children[0].textContent).toEqual("One");
        expect(select.children[1].textContent).toEqual("Two");
        expect(select.children[2].textContent).toEqual("Three");
        expect(select.children[3].textContent).toEqual("Four");
        expect(select.children[4].textContent).toEqual("Five");
    });

    it("renders none option when specified", function () {
        var component = getComponent({ open: true, noneOption: { label: "none" } });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");

        expect(select.children.length).toEqual(6);
        expect(select.children[0].textContent).toEqual("none");
        expect(select.children[1].textContent).toEqual("One");
        expect(select.children[2].textContent).toEqual("Two");
        expect(select.children[3].textContent).toEqual("Three");
        expect(select.children[4].textContent).toEqual("Four");
        expect(select.children[5].textContent).toEqual("Five");
    });

    it("renders with selected option", function () {
        var component = getComponent();
        var selected = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        expect(selected.textContent).toEqual("One");
    });

    it("list option triggers onValueChange callback on item click", function () {
        var component = getComponent({ open: true });
        var option1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option-1");

        ReactTestUtils.Simulate.click(option1);

        expect(component.props.onValueChange).toBeCalled();
    });

    it("global click handler closes open list when click outside of component", function () {
        var component = getComponent({ open: true });
        var handler = component.refs.FormDropDownListStateless._handleGlobalClick;

        expect(component.props.onToggle).not.toBeCalled();

        // click outside
        handler({ target: document.body });

        expect(component.props.onToggle).toBeCalled();
    });

    it("skips the global click handler if not open and click on component", function () {
        var component = getComponent();
        var handler = window.addEventListener.mock.calls[0][1];

        // click on component
        handler({ target: { dataset: component } });

        expect(component.props.onToggle).not.toBeCalled();
    });

    it("detaches global listeners on unmount", function () {
        var component = getComponent();
        var componentRef = component.refs.FormDropDownListStateless;

        expect(window.addEventListener).toBeCalledWith("click", componentRef._handleGlobalClick);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
        expect(window.removeEventListener).toBeCalledWith("click", componentRef._handleGlobalClick);
    });

    it("calls function for list placement on componentDidUpdate", function () {
        var component = getComponent({
            open: true,
            searchIndex: 1,
            searchString: "o",
            searchTime: (Date.now() - 2000)
        });
        var componentRef = component.refs.FormDropDownListStateless;

        componentRef._setSearchListPosition = jest.genMockFunction();
        componentRef.componentDidUpdate();
        expect(componentRef._setSearchListPosition).toBeCalled();
    });

    it("does not search on keydown and list is not open", function () {
        var component = getComponent();
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        ReactTestUtils.Simulate.keyDown(select, { keyCode: 70 }); // f
        expect(component.props.onSearch).not.toBeCalled();
    });

    it("find by typing", function () {
        var component = getComponent({ open: true });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: 70 }); // f
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("f");

        component = getComponent({ // simulate the change since mock onSearch wouldn't have changed stuff
            open: true,
            searchString: component.props.onSearch.mock.calls[0][0],
            searchTime: component.props.onSearch.mock.calls[0][1]
        });

        select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: 79 }); // o
        expect(component.props.onSearch.mock.calls[0][0]).toBe("fo");
    });

    it("find and select option by hitting enter then close list", function () {
        var component = getComponent({
            open: true,
            searchIndex: 1,
            searchString: "t",
            searchTime: 0
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ENTER });
        expect(component.props.onValueChange).toBeCalled();
        expect(component.props.onValueChange.mock.calls[0][0].label).toBe("Two");
        expect(component.props.onToggle).toBeCalled();
    });

    it("find by typing - clear with esc", function () {
        var component = getComponent({
            open: true,
            searchString: "tw",
            searchTime: 0
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ESC });
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("");
    });

    it("find by typing - clear with delay", function () {
        var component = getComponent({
            open: true,
            searchString: "o",
            searchTime: (Date.now() - 2000)
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: 79 }); // o
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("o");
    });

    it("cycle though options with up/down arrows", function () {
        var component = getComponent({
            open: true,
            searchIndex: 1,
            searchString: "f",
            searchTime: (Date.now() - 2000)
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ARROW_DOWN });
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("");
        expect(component.props.onSearch.mock.calls[0][2]).toBe(2); //added 1 to searchIndex
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ARROW_UP });
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[1][2]).toBe(0); //subtract 1 from searchIndex
    });

    //TODO: remove when controlled no longer supported
    it("produces stateful/stateless components correctly given controlled prop", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormDropDownList controlled={false} options={[]} selectedOption={{}} />);
        var stateful = component.refs.FormDropDownListStateful;
        var stateless = component.refs.FormDropDownListStateless;

        expect(stateful).toBeTruthy();
        expect(stateless).toBeFalsy();

        component = ReactTestUtils.renderIntoDocument(
            <FormDropDownList controlled={true} options={[]} selectedOption={{}} />);
        stateful = component.refs.FormDropDownListStateful;
        stateless = component.refs.FormDropDownListStateless;
        
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
});