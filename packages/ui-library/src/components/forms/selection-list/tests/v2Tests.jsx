import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import _ from "underscore";
import Utils from "../../../../util/Utils";
import TestUtils from "../../../../testutil/TestUtils";
import SelectionList from "../v2";
import FormCheckbox from "../../FormCheckbox";
import FormRadioGroup from "../../FormRadioGroup";
import FormLabel from "../../FormLabel";
import KeyboardUtils from "../../../../util/KeyboardUtils.js";
import StateContainer from "../../../utils/StateContainer";

window.__DEV__ = true;

const endsWith = (bigString, littleString) => (bigString.slice(-1 * littleString.length) === littleString);

describe("SelectionList", function () {

    // just so that they are included in the coverage report
    require("../v2-stateful");
    require("../v2-stateless");

    var listItems;

    beforeEach(function () {
        listItems = [
            { name: "Long Tran", id: 1 },
            { name: "Nam Tu", id: 2 },
            { name: "Viem Ong", id: 3 },
            { name: "Chien Cao", id: 4 },
            { name: "Thuy Vu", id: 5 },
            { name: "Quy Bui", id: 6 },
            { name: "Nam Duong", id: 7 },
            { name: "Thai Tran", id: 8 },
            { name: "Phu Le", id: 9 }
        ];
    });

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            items: listItems,
            "data-id": "my-selection-list",
            onValueChange: jest.fn()
        });

        return ReactTestUtils.renderIntoDocument(<SelectionList {...opts} />);
    }

    it("should render the component as single selection list by default", function () {
        var component = getComponent();

        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list");
        expect(ReactTestUtils.isDOMComponent(list)).toBeTruthy();

        var radioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        expect(radioGroup).toBeDefined();

        var radios = TestUtils.scryRenderedDOMNodesWithTag(radioGroup, "input");
        expect(radios.length).toBe(listItems.length);
    });

    it("should render the component as a single selection list when specified", function () {
        var component = getComponent({
            "data-id": "single-selection-list",
            type: SelectionList.ListType.SINGLE
        });

        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "single-selection-list");
        expect(ReactTestUtils.isDOMComponent(list)).toBeTruthy();

        var radioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        expect(radioGroup).toBeDefined();

        var radios = TestUtils.scryRenderedDOMNodesWithTag(radioGroup, "input");
        expect(radios.length).toBe(listItems.length);
    });

    it("should render the component as a multi selection list when specified", function () {
        var component = getComponent({
            "data-id": "multi-selection-list",
            type: SelectionList.ListType.MULTI
        });

        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "multi-selection-list");
        expect(ReactTestUtils.isDOMComponent(list)).toBeTruthy();

        var multiOptions = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);
        expect(multiOptions.length).toBe(listItems.length);
    });

    it("should render the component without searchbox", function () {
        var component = getComponent({
            showSearchBox: false
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        expect(searchBoxDiv).toBeNull();
    });

    it("should render the component with searchbox and placeholder", function () {
        var component = getComponent({
            searchPlaceholder: "search..."
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchBox = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");

        expect(searchBox.getAttribute("placeholder")).toEqual("search...");
    });

    it("should render the component with a checked radio", function () {
        var component = getComponent({
            selectedItemIds: 1,
            type: SelectionList.ListType.SINGLE
        });

        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        var radios = TestUtils.scryRenderedDOMNodesWithTag(formRadioGroup, "input");

        expect(radios[0].checked).toBeTruthy();
    });

    it("triggers callback on radio change", function () {
        var component = getComponent({
            stateless: true,
            type: SelectionList.ListType.SINGLE
        });

        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        var radios = TestUtils.scryRenderedDOMNodesWithTag(formRadioGroup, "input");

        ReactTestUtils.Simulate.change(radios[0]);
        expect(component.props.onValueChange).toBeCalled();
    });

    it("should check one radio", function () {
        var component = getComponent({
            stateless: true,
            type: SelectionList.ListType.SINGLE
        });

        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        var radios = TestUtils.scryRenderedDOMNodesWithTag(formRadioGroup, "input");

        ReactTestUtils.Simulate.change(radios[0]);
        expect(component.props.onValueChange).toBeCalled();
        expect(component.props.onValueChange.mock.calls[0][0]).toBe(1);
    });

    it("should render with few checked checkboxes and uncheck all when selected", function () {
        var callback = jest.fn();
        var props = {
            stateless: true,
            selectedItemIds: [1, 2],
            type: SelectionList.ListType.MULTI,
            showSelectionOptions: true,
            labelSelectAll: "Unselect All",
            labelUnselectAll: "Unselect All",
            labelOnlySelected: "Show Only Selected",
            labelShowAll: "Show All",
            onValueChange: callback,
            onSearch: jest.fn(),
            showOnlySelected: true
        };
        var component = getComponent(props);

        var formCheckboxes = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);

        var formLabel1 = TestUtils.findRenderedComponentWithType(formCheckboxes[0], FormLabel);
        var checkbox1 = TestUtils.findRenderedDOMNodeWithTag(formLabel1, "input");

        var formLabel2 = TestUtils.findRenderedComponentWithType(formCheckboxes[1], FormLabel);
        var checkbox2 = TestUtils.findRenderedDOMNodeWithTag(formLabel2, "input");

        expect(checkbox1.checked).toBeTruthy();
        expect(checkbox2.checked).toBeTruthy();
        expect(formCheckboxes.length).toBe(2);

        var unselectAll = TestUtils.findRenderedDOMNodeWithDataId(component, "unselect-all");
        expect(unselectAll.textContent).toBe(props.labelUnselectAll);

        ReactTestUtils.Simulate.click(unselectAll);
        expect(callback).toBeCalledWith([]);
    });

    it("v3: should render with no checked checkboxes and check all when selected", function () {
        var callback = jest.fn();
        var props = {
            stateless: false,
            selectedItemIds: [],
            type: SelectionList.ListType.MULTI,
            showSelectionOptions: true,
            labelSelectAll: "Select All",
            labelUnselectAll: "Unselect All",
            labelOnlySelected: "Show Only Selected",
            labelShowAll: "Show All",
            onValueChange: jest.fn(),
            onSelectAll: callback,
            onSearch: jest.fn()
        };
        var component = getComponent(props);
        var selectAll = TestUtils.findRenderedDOMNodeWithDataId(component, "select-all");
        var allCheckboxIds = listItems.map(function (item) {
            return item.id;
        });

        expect(selectAll.textContent).toBe(props.labelSelectAll);

        ReactTestUtils.Simulate.click(selectAll);

        expect(callback).toBeCalled();

        var formCheckboxes = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);
        expect(formCheckboxes.length).toBe(allCheckboxIds.length);
    });

    it("v4: should render with no checked checkboxes and check all when selected", function () {
        var callback = jest.fn();
        var props = {
            stateless: false,
            selectedItemIds: [],
            type: SelectionList.ListType.MULTI,
            showSelectionOptions: true,
            labelSelectAll: "Select All",
            labelUnselectAll: "Unselect All",
            labelOnlySelected: "Show Only Selected",
            labelShowAll: "Show All",
            onValueChange: jest.fn(),
            onSelectAll: callback,
            onSearch: jest.fn(),
            flags: [ "p-stateful" ],
            autoSelectAll: true,
        };
        var component = getComponent(props);
        var selectAll = TestUtils.findRenderedDOMNodeWithDataId(component, "select-all");
        var allCheckboxIds = listItems.map(function (item) {
            return item.id;
        });

        expect(selectAll.textContent).toBe(props.labelSelectAll);

        ReactTestUtils.Simulate.click(selectAll);

        expect(callback).toBeCalled();

        var formCheckboxes = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);
        expect(formCheckboxes.length).toBe(allCheckboxIds.length);
    });

    it("toggles showOnlySelected on visibility change", function () {
        var component = getComponent({
            selectedItemIds: [1, 2],
            type: SelectionList.ListType.MULTI,
            showSelectionOptions: true,
            labelUnselectAll: "Unselect All",
            labelOnlySelected: "Show Only Selected",
            labelShowAll: "Show All"
        });

        var formCheckboxes = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);
        expect(formCheckboxes.length).toBe(9);

        var showOnlySelected = TestUtils.findRenderedDOMNodeWithDataId(component, "show-only-or-all");
        ReactTestUtils.Simulate.click(showOnlySelected);
        formCheckboxes = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);
        expect(formCheckboxes.length).toBe(2);
    });

    it("triggers callback on checkbox change", function () {
        var component = getComponent({
            selectedItemIds: [2],
            type: SelectionList.ListType.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[0]);

        expect(component.props.onValueChange).toBeCalled();
    });

    it("should check one checkbox", function () {
        var component = getComponent({
            selectedItemIds: [],
            type: SelectionList.ListType.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[3]);

        expect(component.props.onValueChange).toBeCalledWith([4]);
    });

    it("should check few checkboxes", function () {
        var component = getComponent({
            selectedItemIds: [1, 2],
            type: SelectionList.ListType.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[4]);

        expect(component.props.onValueChange).toBeCalledWith([1, 2, 5]);
    });

    it("should check all checkboxes", function () {
        var component = getComponent({
            selectedItemIds: [1, 2, 3, 4, 5, 6, 7, 8],
            type: SelectionList.ListType.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[8]);

        expect(component.props.onValueChange).toBeCalledWith([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should uncheck one checkbox", function () {
        var component = getComponent({
            selectedItemIds: [1, 3],
            type: SelectionList.ListType.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[2]);
        expect(component.props.onValueChange).toBeCalledWith([1]);
    });

    it("should do a start search with 2 chars keyword", function () {
        var component = getComponent({
            showSearchBox: true,
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Na" } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(2);
    });

    it("should do a start search with 3 chars keyword", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Chi" } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(1);
    });

    it("should do a contain search with 4 chars keyword", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Tran" } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(2);
    });

    it("should do a custom search and return an expected result", function () {
        var customSearchFunc = function (queryString) {
            var matchedItems = _.filter(listItems, function (item) {
                return endsWith(item.name.toLowerCase(), queryString.toLowerCase());
            });

            return matchedItems;
        };

        var component = getComponent({
            onSearch: customSearchFunc
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Cao" } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(1);
    });

    it("displays required text when provided", function () {
        var requiredText = "this is required";

        var component1 = getComponent();
        var component2 = getComponent({ requiredText: requiredText });

        var reqMssg1 = TestUtils.findRenderedDOMNodeWithDataId(component1, "my-selection-list-required-message");
        var reqMssg2 = TestUtils.findRenderedDOMNodeWithDataId(component2, "my-selection-list-required-message");

        expect(reqMssg1).toBeFalsy();
        expect(reqMssg2).toBeTruthy();
        expect(reqMssg2.textContent).toContain(requiredText);
    });

    it("stateful: triggers onSearch callback when search input changes", function () {
        var component = getComponent({ showSearchBox: true, onSearch: jest.fn() });
        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");

        ReactTestUtils.Simulate.change(searchInput, { target: { value: "foo" } });
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("foo");
    });

    it("stateless: triggers onSearch callback when search input changes", function () {
        var component = getComponent({ showSearchBox: true, stateless: true, onSearch: jest.fn() });
        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");

        ReactTestUtils.Simulate.change(searchInput, { target: { value: "foo" } });
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("foo");
    });

    it("should trim space before performing a start search", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: " Chi  " } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(1);
    });

    it("v3: clears search on ESC", function () {
        var component = getComponent({
            showSearchBox: true
        });
        var componentRef = component.refs.SelectionListStateful;

        var queryString = "Nam",
            searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box"),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: queryString } });

        expect(componentRef.state.queryString).toBe(queryString);
        expect(componentRef.state.matchedItems).toEqual([
            { name: "Nam Tu", id: 2 },
            { name: "Nam Duong", id: 7 }
        ]);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "esc",
            keyCode: KeyboardUtils.KeyCodes.ESC,
            which: KeyboardUtils.KeyCodes.ESC
        });

        expect(componentRef.state.queryString).toBe("");
        expect(componentRef.state.matchedItems).toEqual(listItems);
    });

    it("v4: clears search on ESC", function () {
        const component = getComponent({
            showSearchBox: true,
            flags: [ "p-stateful" ],
        });
        const stateful = ReactTestUtils.scryRenderedComponentsWithType(component, StateContainer)[0];

        const queryString = "Nam";
        const searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        const searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: queryString } });

        expect(stateful.state.queryString).toBe(queryString);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "esc",
            keyCode: KeyboardUtils.KeyCodes.ESC,
            which: KeyboardUtils.KeyCodes.ESC
        });

        expect(stateful.state.queryString).toBe("");
    });

    it("v3: does not clear search when not ESC", function () {
        var component = getComponent({
            showSearchBox: true
        });
        var componentRef = component.refs.SelectionListStateful;

        var queryString = "Tran",
            searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box"),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: queryString } });

        expect(componentRef.state.queryString).toBe(queryString);
        expect(componentRef.state.matchedItems).toEqual([
            { name: "Long Tran", id: 1 },
            { name: "Thai Tran", id: 8 }
        ]);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "enter",
            keyCode: KeyboardUtils.KeyCodes.ENTER,
            which: KeyboardUtils.KeyCodes.ENTER
        });

        expect(componentRef.state.queryString).toBe(queryString);
        expect(componentRef.state.matchedItems).toEqual([
            { name: "Long Tran", id: 1 },
            { name: "Thai Tran", id: 8 }
        ]);
    });

    it("v4: does not clear search when not ESC", function () {
        var component = getComponent({
            showSearchBox: true,
            flags: [ "p-stateful" ],
        });
        const stateful = ReactTestUtils.scryRenderedComponentsWithType(component, StateContainer)[0];

        var queryString = "Tran",
            searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box"),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: queryString } });

        expect(stateful.state.queryString).toBe(queryString);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "enter",
            keyCode: KeyboardUtils.KeyCodes.ENTER,
            which: KeyboardUtils.KeyCodes.ENTER
        });

        expect(stateful.state.queryString).toBe(queryString);
    });

    it("v3: clears search on (X) button click", function () {
        var component = getComponent({
            showSearchBox: true
        });
        var componentRef = component.refs.SelectionListStateful;

        var queryString = "Chi",
            searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box"),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: queryString } });

        expect(componentRef.state.queryString).toBe(queryString);
        expect(componentRef.state.matchedItems).toEqual([
            { name: "Chien Cao", id: 4 }
        ]);

        var clearButton = TestUtils.findRenderedDOMNodeWithDataId(searchBoxDiv, "clear");
        ReactTestUtils.Simulate.click(clearButton);

        expect(componentRef.state.queryString).toBe("");
        expect(componentRef.state.matchedItems).toEqual(listItems);
    });

    it("v4: clears search on (X) button click", function () {
        var component = getComponent({
            showSearchBox: true,
            flags: [ "p-stateful" ],
        });
        const stateful = ReactTestUtils.scryRenderedComponentsWithType(component, StateContainer)[0];

        var queryString = "Chi",
            searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box"),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: queryString } });

        expect(stateful.state.queryString).toBe(queryString);

        var clearButton = TestUtils.findRenderedDOMNodeWithDataId(searchBoxDiv, "clear");
        ReactTestUtils.Simulate.click(clearButton);

        expect(stateful.state.queryString).toBe("");
    });

    it("check stateless rendering", function () {
        var component = getComponent({
            stateless: true,
            onSearch: _.noop,
            queryString: "my query"
        });

        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list");
        expect(ReactTestUtils.isDOMComponent(list)).toBeTruthy();

        var radioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        expect(radioGroup).toBeDefined();

        var radios = TestUtils.scryRenderedDOMNodesWithTag(radioGroup, "input");
        expect(radios.length).toBe(listItems.length);

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchBox = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        expect(searchBox.getAttribute("value")).toEqual("my query");
    });

    it("v3: check that rendered items update if changed", function () {
        // no v4 version of this because it doesn't do any sketchy componentDidUpdate biz
        var component = getComponent({
            type: SelectionList.ListType.MULTI
        });
        var componentRef = component.refs.SelectionListStateful;
        var inputs = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);

        expect(inputs.length).toBe(9);

        componentRef.componentDidUpdate(
            { listItems: listItems },
            { listItems: listItems.push({ name: "Juan Moore", id: 10 })
            });

        inputs = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);
        expect(inputs.length).toBe(10);
    });

    it("renders view-only mode", function () {
        var component = getComponent({
            type: SelectionList.ListType.VIEWONLY
        });
        var viewItems = TestUtils.scryRenderedDOMNodesWithClass(component, "view-item");

        expect(viewItems.length).toBe(9);

        listItems.map(function (listItem, index) {
            expect(viewItems[index].textContent).toEqual(listItem.name);
        });
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("renders note when optionsNote prop is passed in", () => {
        const component = getComponent({
            optionsNote: "note"
        });

        const note = TestUtils.findRenderedDOMNodeWithClass(component, "input-selection-list__note");

        expect(ReactTestUtils.isDOMComponent(note)).toEqual(true);
    });

    it("renders add mode", () => {
        const component = getComponent({
            type: SelectionList.ListType.ADD
        });

        const addItems = TestUtils.scryRenderedDOMNodesWithClass(component, "input-selection-list__add-option");

        expect(addItems.length).toBe(9);

        listItems.map(function (listItem, index) {
            expect(addItems[index].textContent).toEqual(listItem.name);
        });
    });

    it("renders multi-add mode and fires callback", () => {
        const callback = jest.fn();
        const component = getComponent({
            type: SelectionList.ListType.MULTIADD,
            onMultiAdd: callback,
        });
        const addButton = TestUtils.findRenderedDOMNodeWithDataId(component, "add-button");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(addButton);
        expect(callback).toBeCalled();
    });

    it("renders help hint in view-only", function() {
        const component = getComponent({
            type: SelectionList.ListType.VIEWONLY,
            items: [ { name: "Long Tran", id: 1, helpHintText: "nothing" } ]
        });

        const helpHint = TestUtils.findRenderedDOMNodeWithDataId(component, "helpHint");
        expect(helpHint).toBeTruthy();
    });

    it("calls onValueChange in add mode", () => {
        const onValueChange = jest.fn();
        const component = getComponent({
            onValueChange,
            type: SelectionList.ListType.ADD
        });

        const [firstItem] = TestUtils.scryRenderedDOMNodesWithClass(component, "input-selection-list__add-option");

        ReactTestUtils.Simulate.click(firstItem);

        expect(onValueChange).toHaveBeenCalled();
    });

    it("fires Cannonball warning when p-stateful flag is not set", function() {
        console.warn = jest.fn();
        expect(console.warn).not.toBeCalled();
        getComponent({});
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire Cannonball warning when p-stateful flag is set", function() {
        console.warn = jest.fn();
        getComponent({ flags: [ "p-stateful" ] });
        expect(console.warn).not.toBeCalled();
    });
});
