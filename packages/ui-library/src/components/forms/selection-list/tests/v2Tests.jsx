window.__DEV__ = true;

jest.dontMock("../v2.jsx");
jest.dontMock("../FormSearchBox.jsx");
jest.dontMock("../v2-constants.js");
jest.dontMock("../v2-reducer.js");
jest.dontMock("../v2-stateless.jsx");
jest.dontMock("../v2-stateful.jsx");
jest.dontMock("../../form-text-field/index.js");
jest.dontMock("../../form-text-field/v2.jsx");
jest.dontMock("../../FormRadioGroup.jsx");
jest.dontMock("../../FormCheckbox.jsx");
jest.dontMock("../../FormError.jsx");
jest.dontMock("../../FormLabel.jsx");
jest.dontMock("../../../general/If.jsx");
jest.dontMock("../../../tooltips/HelpHint.jsx");
jest.dontMock("../../../../util/FilterUtils.js");
jest.dontMock("../../../../util/KeyboardUtils.js");

describe("SelectionList", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var _ = require("underscore");
    var _s = require("underscore.string");
    var TestUtils = require("../../../../testutil/TestUtils");
    var SelectionList = require("../v2.jsx");
    var FormCheckbox = require("../../FormCheckbox.jsx");
    var FormRadioGroup = require("../../FormRadioGroup.jsx");
    var FormLabel = require("../../FormLabel.jsx");
    var KeyboardUtils = require("../../../../util/KeyboardUtils.js");

    // just so that they are included in the coverage report
    require("../v2-stateful.jsx");
    require("../v2-stateless.jsx");

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
            onValueChange: jest.genMockFunction()
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
            type: SelectionList.ListType.SINGLE
        });

        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        var radios = TestUtils.scryRenderedDOMNodesWithTag(formRadioGroup, "input");

        ReactTestUtils.Simulate.change(radios[0]);
        expect(component.props.onValueChange).toBeCalled();
    });

    it("should check one radio", function () {
        var component = getComponent({
            type: SelectionList.ListType.SINGLE
        });

        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        var radios = TestUtils.scryRenderedDOMNodesWithTag(formRadioGroup, "input");

        ReactTestUtils.Simulate.change(radios[0]);
        expect(component.props.onValueChange).toBeCalledWith("1");
    });




    it("should render with few checked checkboxes and uncheck all when selected", function () {
        var callback = jest.genMockFunction();
        var component = getComponent({
            stateless: true,
            selectedItemIds: [1, 2],
            type: SelectionList.ListType.MULTI,
            showSelectionOptions: true,
            labelUnselectAll: "Unselect All",
            labelOnlySelected: "Show Only Selected",
            labelShowAll: "Show All",
            onValueChange: callback,
            onSearch: jest.genMockFunction(),
            showOnlySelected: true
        });

        var formCheckboxes = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);

        var formLabel1 = TestUtils.findRenderedComponentWithType(formCheckboxes[0], FormLabel);
        var checkbox1 = TestUtils.findRenderedDOMNodeWithTag(formLabel1, "input");

        var formLabel2 = TestUtils.findRenderedComponentWithType(formCheckboxes[1], FormLabel);
        var checkbox2 = TestUtils.findRenderedDOMNodeWithTag(formLabel2, "input");

        expect(checkbox1.checked).toBeTruthy();
        expect(checkbox2.checked).toBeTruthy();

        var unselectAll = TestUtils.findRenderedDOMNodeWithDataId(component, "unselect-all");

        ReactTestUtils.Simulate.click(unselectAll);
        expect(callback).toBeCalledWith([]);

        expect(formCheckboxes.length).toBe(2);
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
            showSearchBox: true
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
                return _s.endsWith(item.name.toLowerCase(), queryString.toLowerCase());
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

    it("stateful: triggers onSearch callback when search input changes", function () {
        var component = getComponent({ showSearchBox: true, onSearch: jest.genMockFunction() });
        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");

        ReactTestUtils.Simulate.change(searchInput, { target: { value: "foo" } });
        expect(component.props.onSearch).toBeCalledWith("foo");
    });

    it("stateless: triggers onSearch callback when search input changes", function () {
        var component = getComponent({ showSearchBox: true, stateless: true, onSearch: jest.genMockFunction() });
        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "my-selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");

        ReactTestUtils.Simulate.change(searchInput, { target: { value: "foo" } });
        expect(component.props.onSearch).toBeCalledWith("foo");
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

    it("clears search on ESC", function () {
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

    it("does not clear search when not ESC", function () {
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

    it("clears search on (X) button click", function () {
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

    //TODO: remove when controlled no longer supported
    it("produces stateful/stateless components correctly given controlled prop", function () {
        var component = getComponent({ controlled: false });
        var stateful = component.refs.SelectionListStateful;
        var stateless = component.refs.SelectionListStateless;

        expect(stateful).toBeTruthy();
        expect(stateless).toBeFalsy();

        component = getComponent({ controlled: true });
        stateful = component.refs.SelectionListStateful;
        stateless = component.refs.SelectionListStateless;
        
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
