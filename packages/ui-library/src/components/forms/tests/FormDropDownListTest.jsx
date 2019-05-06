window.__DEV__ = true;

jest.dontMock("../../../util/KeyboardUtils.js");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../../util/FilterUtils.js");
jest.dontMock("../FormDropDownList");
jest.dontMock("../FormLabel");
jest.dontMock("../FormError");
jest.dontMock("../form-text-field/index.js");
jest.dontMock("../form-text-field/v2");

jest.mock("popper.js");
jest.mock("react-portal");

describe("FormDropDownList", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        _ = require("underscore"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        KeyBoardUtils = require("../../../util/KeyboardUtils.js"),
        FormDropDownList = require("../FormDropDownList");

    var options = [
        { label: "One", value: 1 },
        { label: "Two", value: 2, group: 3 },
        { label: "Three", value: 3, group: 2 },
        { label: "Four", value: 4, group: 1 },
        { label: "Five", value: 5 },
    ];

    var groups = [
        { label: "Group A", id: 1 },
        { label: "Group B", id: 2 },
        { label: "Group C", id: 3 }
    ];

    function getComponent (props) {
        props = _.defaults(props || {}, {
            stateless: true,
            options: options,
            selectedOption: options[0],
            onToggle: jest.fn(),
            onSearch: jest.fn(),
            onValueChange: jest.fn()
        });
        return ReactTestUtils.renderIntoDocument(<FormDropDownList {...props} />);
    }

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

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

        expect(document.activeElement).toBe(document.body);
    });

    it("supports autofocus when set", function () {
        var component = getComponent({ autofocus: true });
        var selectInput = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        expect(document.activeElement).toEqual(selectInput);
    });

    it("opens list on arrow up when focused", function () {
        var component = getComponent({ autofocus: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        expect(document.activeElement).toEqual(select);

        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ARROW_UP });

        expect(component.props.onToggle).toBeCalled();
    });

    it("opens list on arrow down when focused", function () {
        var component = getComponent({ autofocus: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        expect(document.activeElement).toEqual(select);

        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ARROW_DOWN });

        expect(component.props.onToggle).toBeCalled();
    });

    it("opens list on space when focused", () => {
        const component = getComponent({ autofocus: true });
        const select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        expect(document.activeElement).toEqual(select);

        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.SPACE });

        expect(component.props.onToggle).toBeCalled();
    });

    it("opens list on enter when focused", () => {
        const component = getComponent({ autofocus: true });
        const select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        expect(document.activeElement).toEqual(select);

        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ENTER });

        expect(component.props.onToggle).toBeCalled();
    });

    it("closes open list on tab when focused", function () {
        var component = getComponent({ open: true, autofocus: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

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

    it("does not open list on list button click when disabled", function () {
        var component = getComponent({ disabled: true });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        expect(component.props.onToggle).not.toBeCalled();

        ReactTestUtils.Simulate.click(select);

        expect(component.props.onToggle).not.toBeCalled();
    });

    it("stateful: onToggle callback updates open state", function () {
        var component = getComponent({ stateless: false });
        var componentRef = component.refs.FormDropDownListStateful;

        expect(componentRef.state.open).toBe(false);
        expect(componentRef.state.searchIndex).toBe(null);
        expect(componentRef.state.searchString).toBe("");
        expect(componentRef.state.searchTime).toBe(0);

        componentRef._handleToggle();

        expect(componentRef.state.open).toBe(true);
        expect(componentRef.state.searchIndex).toBe(null);
        expect(componentRef.state.searchString).toBe("");
        expect(componentRef.state.searchTime).toBe(0);
    });

    it("stateful: onSearch callback updates search state", function () {
        var component = getComponent({ stateless: false });
        var componentRef = component.refs.FormDropDownListStateful;

        expect(componentRef.state.open).toBe(false);
        expect(componentRef.state.searchIndex).toBe(null);
        expect(componentRef.state.searchString).toBe("");
        expect(componentRef.state.searchTime).toBe(0);

        componentRef._handleSearch("newSearch", 1, 3);

        expect(componentRef.state.open).toBe(false);
        expect(componentRef.state.searchIndex).toBe(3);
        expect(componentRef.state.searchString).toBe("newSearch");
        expect(componentRef.state.searchTime).toBe(1);
    });

    it("stateful: filters options when BOX search input changes", function () {
        var component = getComponent({ stateless: false, canAdd: true, searchType: FormDropDownList.SearchTypes.BOX });
        var componentRef = component.refs.FormDropDownListStateful;
        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        ReactTestUtils.Simulate.change(input, { target: { value: "f" } });

        expect(componentRef.state.matchedOptions).toEqual([
            { label: "Four", value: 4, group: 1 },
            { label: "Five", value: 5 }
        ]);
    });

    it("stateful: updates filtered options when it receives new options", function () {
        var component = getComponent({ stateless: false });
        var componentRef = component.refs.FormDropDownListStateful;

        expect(componentRef.state.matchedOptions.length).toBe(5);
        componentRef.componentWillReceiveProps({ options: [] });
        expect(componentRef.state.matchedOptions.length).toBe(0);
    });

    it("renders error message icon and message", function () {
        var component = getComponent({ errorMessage: "some error msg" });
        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "form-drop-down-list");
        var errorIcon = TestUtils.findRenderedDOMNodeWithDataId(list, "selected-input-error-message-icon");
        var errorMessage = TestUtils.findRenderedDOMNodeWithDataId(list, "selected-input-error-message");

        expect(errorIcon).toBeTruthy();
        expect(errorMessage).toBeTruthy();
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

    it("renders list of options using portal", function () {
        var component = getComponent({ open: true, flags: [ "use-portal" ] });
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
        var selected = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        expect(selected.value).toEqual("One");
    });

    it("renders with grouped options", function () {
        var component = getComponent({ open: true, groups: groups });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var listOptions = TestUtils.scryRenderedDOMNodesWithTag(select, "li");

        expect(listOptions.length).toEqual(8); // 5 options + 3 groups
        expect(listOptions[0].textContent).toEqual("One");
        expect(listOptions[1].textContent).toEqual("Five");
        expect(listOptions[2].textContent).toEqual("Group A");
        expect(listOptions[3].textContent).toEqual("Four");
        expect(listOptions[4].textContent).toEqual("Group B");
        expect(listOptions[5].textContent).toEqual("Three");
        expect(listOptions[6].textContent).toEqual("Group C");
        expect(listOptions[7].textContent).toEqual("Two");
    });

    it("renders with grouped options and noneOption", function () {
        var component = getComponent({ open: true, groups: groups, noneOption: { label: "none" } });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var listOptions = TestUtils.scryRenderedDOMNodesWithTag(select, "li");

        expect(listOptions.length).toEqual(9); // 5 listOptions + 3 groups + noneOption
        expect(listOptions[0].textContent).toEqual("none");
        expect(listOptions[1].textContent).toEqual("One");
        expect(listOptions[2].textContent).toEqual("Five");
        expect(listOptions[3].textContent).toEqual("Group A");
        expect(listOptions[4].textContent).toEqual("Four");
        expect(listOptions[5].textContent).toEqual("Group B");
        expect(listOptions[6].textContent).toEqual("Three");
        expect(listOptions[7].textContent).toEqual("Group C");
        expect(listOptions[8].textContent).toEqual("Two");
    });

    it("renders search prompt when using BOX search", function () {
        var component = getComponent({ open: true, canAdd: true, labelPrompt: "prompt" });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var prompt = TestUtils.findRenderedDOMNodeWithDataId(select, "search-prompt");

        expect(prompt).toBeTruthy();
    });

    it("renders add prompt when canAdd enabled and searchString does not duplicate existing option", function () {
        var component = getComponent({ open: true, canAdd: true, searchString: "foo", labelAdd: "prompt" });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var prompt = TestUtils.findRenderedDOMNodeWithDataId(select, "add-prompt");

        expect(prompt).toBeTruthy();
    });

    it("does not render add prompt when canAdd enabled and searchString duplicates existing option", function () {
        var component = getComponent({ open: true, canAdd: true, searchString: "One", labelAdd: "prompt" });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var prompt = TestUtils.findRenderedDOMNodeWithDataId(select, "add-prompt");

        expect(prompt).toBeFalsy();
    });

    it("triggers callbacks when add prompt clicked to add, clear seach, and close list", function () {
        var searchString = "bar";
        var component = getComponent({
            open: true,
            canAdd: true,
            searchString: searchString,
            labelAdd: "prompt",
            onAdd: jest.fn()
        });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");
        var prompt = TestUtils.findRenderedDOMNodeWithDataId(select, "add-prompt");

        ReactTestUtils.Simulate.click(prompt);
        expect(component.props.onAdd).toBeCalledWith(searchString);
        expect(component.props.onSearch).toBeCalledWith("", 0 ,0);
        expect(component.props.onToggle).toBeCalled();
    });

    it("triggers onToggle for closed list when typing into input of BOX search", function () {
        var component = getComponent({ open: false, searchType: FormDropDownList.SearchTypes.BOX });
        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        ReactTestUtils.Simulate.change(input, { target: { value: "foo" } });
        expect(component.props.onToggle).toBeCalled();
    });

    it("triggers onSearch callback when input into BOX search", function () {
        var component = getComponent({ open: false, searchType: FormDropDownList.SearchTypes.BOX });
        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        ReactTestUtils.Simulate.change(input, { target: { value: "foo" } });
        expect(component.props.onSearch).toBeCalledWith("foo", 0, 0);
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
        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];

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

        componentRef._setSearchListPosition = jest.fn();
        componentRef.componentDidUpdate();
        expect(componentRef._setSearchListPosition).toBeCalled();
    });

    it("sets up groups and options in constructor", function () {
        const component = getComponent({
            open: true,
            groups: groups
        });
        const componentRef = component.refs.FormDropDownListStateless;
        const groupById = {
            1: { label: "Group A", id: 1 },
            2: { label: "Group B", id: 2 },
            3: { label: "Group C", id: 3 }
        };

        const orderedOptions = [
            { label: "One", value: 1 },
            { label: "Five", value: 5 },
            { label: "Four", value: 4, group: 1 },
            { label: "Three", value: 3, group: 2 },
            { label: "Two", value: 2, group: 3 }
        ];

        expect(componentRef._groupById).toEqual(groupById);
        expect(componentRef._orderedOptions).toEqual(orderedOptions);
    });

    it("sets up groups and options when options change", function () {
        const wrapper = ReactTestUtils.renderIntoDocument(
            <TestUtils.StateWrapper
                initialState={{ options }}
            >
                {({ options: passOptions }) => (
                    <FormDropDownList
                        stateless={true}
                        options={passOptions}
                        selectedOption={options[0]}
                        onToggle={jest.fn()}
                        onSearch={jest.fn()}
                        onValueChange={jest.fn()}
                        open={true}
                        groups={groups}
                    />
                )}
            </TestUtils.StateWrapper>
        );

        const component = ReactTestUtils.findRenderedComponentWithType(wrapper, FormDropDownList);
        const componentRef = component.refs.FormDropDownListStateless;

        componentRef._setupGroups = jest.fn();
        wrapper.setState({ options: [] });
        expect(componentRef._setupGroups).toBeCalled();
    });

    it("sets up groups and options when groups change", function () {
        const wrapper = ReactTestUtils.renderIntoDocument(
            <TestUtils.StateWrapper
                initialState={{ groups }}
            >
                {({ groups: passGroups }) => (
                    <FormDropDownList
                        stateless={true}
                        options={options}
                        selectedOption={options[0]}
                        onToggle={jest.fn()}
                        onSearch={jest.fn()}
                        onValueChange={jest.fn()}
                        open={true}
                        groups={passGroups}
                    />
                )}
            </TestUtils.StateWrapper>
        );

        const component = ReactTestUtils.findRenderedComponentWithType(wrapper, FormDropDownList);
        const componentRef = component.refs.FormDropDownListStateless;

        componentRef._setupGroups = jest.fn();
        wrapper.setState({ groups: [] });
        expect(componentRef._setupGroups).toBeCalled();
    });

    it("filterOptions function correctly filters options", function () {
        var filterOptions = FormDropDownList.filterOptions;

        expect(filterOptions(options, "One")).toEqual([{ label: "One", value: 1 }]);
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

    it("find by typing with grouped options", function () {
        var component = getComponent({ open: true, groups: groups });

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

    it("resets search when no option found", function () {
        var component = getComponent({ open: true });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: "&amp;" });
        expect(component.props.onSearch.mock.calls[0][0]).toBe(""); // search = ""
        expect(component.props.onSearch.mock.calls[0][2]).toBe(-1); // searchIndex = -1
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

    it("calls onValueChange with none option props when enter is pressed and none option is selected", () => {
        const noneOption = { label: "none" };
        const component = getComponent({
            open: true,
            searchIndex: -1,
            searchString: "t",
            searchTime: 0,
            noneOption
        });

        const select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ENTER });
        expect(component.props.onValueChange).toBeCalledWith(noneOption);
    });

    it("find and select with enter on grouped options", function () {
        var component = getComponent({
            open: true,
            groups: groups,
            searchIndex: 4,
            searchString: "two",
            searchTime: 0
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ENTER });
        expect(component.props.onValueChange).toBeCalled();
        expect(component.props.onValueChange.mock.calls[0][0].label).toBe("Two");
        expect(component.props.onToggle).toBeCalled();
    });

    it("find does not select with enter on grouped options when option in disabled group", function () {
        var component = getComponent({
            open: true,
            groups: [
                { label: "Group A", id: 1 },
                { label: "Group B", id: 2 },
                { label: "Group C", id: 3, disabled: true }
            ],
            searchIndex: 4,
            searchString: "two",
            searchTime: 0
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ENTER });
        expect(component.props.onValueChange).not.toBeCalled();
        expect(component.props.onToggle).toBeCalled();
    });

    it("triggers onAdd callback to add new option on enter when no options match filter searchString", function () {
        var component = getComponent({ open: true,
            options: [],
            canAdd: true,
            onAdd: jest.fn(),
            searchString: "foo"
        });
        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ENTER });
        expect(component.props.onAdd).toBeCalledWith("foo");
    });

    it("enter closes list", function () {
        var component = getComponent({
            open: true
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ENTER });
        expect(component.props.onToggle).toBeCalled();
    });

    it("find by typing - KEYBOARD seach clear with esc", function () {
        var component = getComponent({
            open: true,
            searchString: "tw",
            searchTime: 0
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ESC });
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("");
        expect(component.props.onToggle).toHaveBeenCalled();
    });

    it("find by typing - BOX search clear with esc", function () {
        var component = getComponent({
            open: true,
            searchString: "tw",
            searchTime: 0,
            SearchType: FormDropDownList.SearchTypes.BOX
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ESC });
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("");
        expect(component.props.onToggle).toHaveBeenCalled();
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
        expect(component.props.onSearch.mock.calls[0][0]).toBe("f"); // up/down should not clear searchString
        expect(component.props.onSearch.mock.calls[0][2]).toBe(2); //added 1 to searchIndex
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ARROW_UP });
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[1][2]).toBe(0); //subtract 1 from searchIndex
    });

    it("up/down arrows do not call onToggle when list is disabled", function () {
        const component = getComponent({
            open: false,
            disabled: true,
            searchIndex: 1,
            searchString: "f",
            searchTime: 0
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(select, { keyCode: KeyBoardUtils.KeyCodes.ARROW_DOWN });
        expect(component.props.onSearch).not.toBeCalled();
        expect(component.props.onToggle).not.toBeCalled();
    });

    it("shows none option as selected when selected", function () {
        const noneOption = { label: "none" };
        const component = getComponent({
            open: true,
            searchIndex: -1,
            searchString: "t",
            searchTime: 0,
            noneOption,
            selectedOption: noneOption
        });

        const selected = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");

        expect(selected.value).toEqual("none");

    });

    it("shows options with icons", function () {
        const iconOption = { iconName: "globe", label: "one" };
        const component = getComponent({
            autofocus: true,
            open: true,
            searchIndex: 1,
            searchTime: 0,
            options: [...options, iconOption]
        });

        const optionWithIcon = TestUtils.findRenderedDOMNodeWithClass(component, "select-option__icon");

        expect(optionWithIcon).toBeTruthy();

    });

    it("doesnt try to show icon if icon is not passed in", function () {
        const component = getComponent({
            autofocus: true,
            open: true,
            searchIndex: 1,
            searchTime: 0,
        });

        const optionWithIcon = TestUtils.findRenderedDOMNodeWithClass(component, "select-option__icon");

        expect(optionWithIcon).toBeFalsy();

    });

    it("shows selected option with icon, function", function () {
        const iconOption = { iconName: "globe", label: "one" };
        const component = getComponent({
            autofocus: true,
            open: true,
            searchIndex: 1,
            searchTime: 0,
            selectOption: iconOption,
            options: [...options, iconOption]
        });

        const selectedIcon = TestUtils.findRenderedDOMNodeWithClass(component, "icon-globe");

        expect(selectedIcon).toBeTruthy();
    });

    it("shows selected option", function () {
        const selectedOption= { label: "Two", value: 2 };
        const component = getComponent({
            open: true,
            selectedOption
        });

        const selected = TestUtils.findRenderedDOMNodeWithClass(component, "selected");
        const secondOption = TestUtils.findRenderedDOMNodeWithDataId(component, "option-1");

        expect(selected).toEqual(secondOption);
    });

    it("shows selected option that only has a value", function () {
        const valueOption = { value: 6 };
        const component = getComponent({
            open: true,
            selectedOption: valueOption,
            options: [...options, valueOption],
        });

        const selected = TestUtils.findRenderedDOMNodeWithClass(component, "selected");
        const span = TestUtils.findRenderedDOMNodeWithTag( selected, "span");

        expect(span.textContent).toEqual("6");
    });

    it("fires Cannonball warning when use-portal isn't set", function() {
        console.warn = jest.fn();

        getComponent({ flags: ["p-stateful"] });

        expect(console.warn).toBeCalled();
    });

    it("doesn't fire Cannonball warning when use-portal and p-stateful are set", function() {
        console.warn = jest.fn();

        getComponent({ flags: [ "use-portal", "p-stateful" ] });

        expect(console.warn).not.toBeCalled();
    });

    it("fires a cannonball warning when the p-stateful flag is not set", function() {
        console.warn = jest.fn();
        expect(console.warn).not.toBeCalled();
        getComponent({ flags: [ "use-portal" ] });
        expect(console.warn).toBeCalled();
    });

    it("fires no cannonball warning when the p-stateful flag is set", function() {
        console.warn = jest.fn();
        expect(console.warn).not.toBeCalled();
        getComponent({ flags: [ "use-portal", "p-stateful" ] });
        expect(console.warn).not.toBeCalled();
    });
});
