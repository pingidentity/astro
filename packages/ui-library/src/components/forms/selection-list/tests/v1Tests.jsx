window.__DEV__ = true;

jest.dontMock("../v1.jsx");
jest.dontMock("../FormSearchBox.jsx");
jest.dontMock("../../form-text-field/index.js");
jest.dontMock("../../form-text-field/v2.jsx");
jest.dontMock("../../FormCheckbox.jsx");
jest.dontMock("../../FormError.jsx");
jest.dontMock("../../FormLabel.jsx");
jest.dontMock("../../FormRadioGroup.jsx");
jest.dontMock("../../../general/If.jsx");
jest.dontMock("../../../../util/FilterUtils.js");
jest.dontMock("../../../../util/KeyboardUtils.js");

describe("SelectionList-v1", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var _ = require("underscore");
    var _s = require("underscore.string");
    var TestUtils = require("../../../../testutil/TestUtils");
    var SelectionList = require("../v1.jsx");
    var FormCheckbox = require("../../FormCheckbox.jsx");
    var FormRadioGroup = require("../../FormRadioGroup.jsx");
    var FormLabel = require("../../FormLabel.jsx");
    var KeyboardUtils = require("../../../../util/KeyboardUtils.js");

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
            "data-id": "selection-list",
            onChange: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<SelectionList {...opts} />);
    }

    it("should render the component as single selection list by default", function () {
        var component = getComponent();

        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list");
        expect(ReactTestUtils.isDOMComponent(list)).toBeTruthy();

        var options = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        expect(options).toBeTruthy();
    });

    it("should render the component as a single selection list when specified", function () {
        var component = getComponent({
            "data-id": "single-selection-list",
            type: SelectionList.types.SINGLE
        });

        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "single-selection-list");
        expect(ReactTestUtils.isDOMComponent(list)).toBeTruthy();

        var singleOptions = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        expect(singleOptions).toBeTruthy();
    });

    it("should render the component as a multi selection list when specified", function () {
        var component = getComponent({
            "data-id": "multi-selection-list",
            type: SelectionList.types.MULTI
        });

        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "multi-selection-list");
        expect(ReactTestUtils.isDOMComponent(list)).toBeTruthy();

        var multiOptions = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);
        expect(multiOptions).toBeTruthy();
    });

    it("should render the component without searchbox", function () {
        var component = getComponent({
            showSearchBox: false
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box");
        expect(searchBoxDiv).toBeNull();
    });

    it("should render the component with searchbox and placeholder", function () {
        var component = getComponent({
            searchPlaceholder: "search..."
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box");
        var searchBox = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");

        expect(searchBox.getAttribute("placeholder")).toEqual("search...");
    });

    it("should render the component with a checked radio", function () {
        var component = getComponent({
            selectedItemIds: 1,
            type: SelectionList.types.SINGLE
        });

        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        var radios = TestUtils.scryRenderedDOMNodesWithTag(formRadioGroup, "input");

        expect(radios[0].checked).toBeTruthy();
    });

    it("triggers callback on radio change", function () {
        var component = getComponent({
            type: SelectionList.types.SINGLE
        });

        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        var radios = TestUtils.scryRenderedDOMNodesWithTag(formRadioGroup, "input");

        ReactTestUtils.Simulate.change(radios[0]);
        expect(component.props.onChange).toBeCalled();
    });

    it("should check one radio", function () {
        var component = getComponent({
            type: SelectionList.types.SINGLE
        });

        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        var radios = TestUtils.scryRenderedDOMNodesWithTag(formRadioGroup, "input");

        ReactTestUtils.Simulate.change(radios[0]);
        expect(component.props.onChange).toBeCalledWith("1");
    });

    it("should render with few checked checkboxes", function () {
        var component = getComponent({
            selectedItemIds: [1, 2],
            type: SelectionList.types.MULTI
        });

        var formCheckboxes = TestUtils.scryRenderedComponentsWithType(component, FormCheckbox);

        var formLabel1 = TestUtils.findRenderedComponentWithType(formCheckboxes[0], FormLabel);
        var checkbox1 = TestUtils.findRenderedDOMNodeWithTag(formLabel1, "input");

        var formLabel2 = TestUtils.findRenderedComponentWithType(formCheckboxes[1], FormLabel);
        var checkbox2 = TestUtils.findRenderedDOMNodeWithTag(formLabel2, "input");

        expect(checkbox1.checked).toBeTruthy();
        expect(checkbox2.checked).toBeTruthy();
    });

    it("triggers callback on checkbox change", function () {
        var component = getComponent({
            selectedItemIds: [2],
            type: SelectionList.types.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[0]);

        expect(component.props.onChange).toBeCalled();
    });

    it("should check one checkbox", function () {
        var component = getComponent({
            selectedItemIds: [],
            type: SelectionList.types.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[3]);

        expect(component.props.onChange).toBeCalledWith([4]);
    });

    it("should check few checkboxes", function () {
        var component = getComponent({
            selectedItemIds: [1, 2],
            type: SelectionList.types.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[4]);

        expect(component.props.onChange).toBeCalledWith([1, 2, 5]);
    });

    it("should check all checkboxes", function () {
        var component = getComponent({
            selectedItemIds: [1, 2, 3, 4, 5, 6, 7, 8],
            type: SelectionList.types.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[8]);

        expect(component.props.onChange).toBeCalledWith([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should uncheck one checkbox", function () {
        var component = getComponent({
            selectedItemIds: [1, 3],
            type: SelectionList.types.MULTI
        });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        ReactTestUtils.Simulate.change(checkboxes[2]);
        expect(component.props.onChange).toBeCalledWith([1]);
    });

    it("should do a start search with 2 chars keyword", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Na" } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(2);
    });

    it("should do a start search with 3 chars keyword", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Chi" } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(1);
    });

    it("should do a contain search with 4 chars keyword", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Tran" } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(2);
    });

    it("should do a custom search and return an expected result", function () {
        var customSearchFunc = function (items, queryString) {
            var matchedItems = _.filter(items, function (item) {
                return _s.endsWith(item.name.toLowerCase(), queryString.toLowerCase());
            });

            return matchedItems;
        };

        var component = getComponent({
            showSearchBox: true,
            customSearchFunc: customSearchFunc
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Cao" } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(1);
    });

    it("should trim space before performing a start search", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: " Chi  " } });

        var selectionList = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-options");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(selectionList, "input");

        expect(checkboxes.length).toEqual(1);
    });

    it("clears search on ESC", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var queryString = "Nam",
            searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box"),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: queryString } });

        expect(component.state.queryString).toBe(queryString);
        expect(component.state.matchedItems).toEqual([
            { name: "Nam Tu", id: 2 },
            { name: "Nam Duong", id: 7 }
        ]);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "esc",
            keyCode: KeyboardUtils.KeyCodes.ESC,
            which: KeyboardUtils.KeyCodes.ESC
        });

        expect(component.state.queryString).toBe("");
        expect(component.state.matchedItems).toEqual(listItems);
    });

    it("does not clear search when not ESC", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var queryString = "Tran",
            searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box"),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: queryString } });

        expect(component.state.queryString).toBe(queryString);
        expect(component.state.matchedItems).toEqual([
            { name: "Long Tran", id: 1 },
            { name: "Thai Tran", id: 8 }
        ]);

        ReactTestUtils.Simulate.keyDown(searchInput, {
            key: "enter",
            keyCode: KeyboardUtils.KeyCodes.ENTER,
            which: KeyboardUtils.KeyCodes.ENTER
        });

        expect(component.state.queryString).toBe(queryString);
        expect(component.state.matchedItems).toEqual([
            { name: "Long Tran", id: 1 },
            { name: "Thai Tran", id: 8 }
        ]);
    });

    it("clears search on (X) button click", function () {
        var component = getComponent({
            showSearchBox: true
        });

        var queryString = "Chi",
            searchBoxDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "selection-list-search-box"),
            searchInput = TestUtils.findRenderedDOMNodeWithTag(searchBoxDiv, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: queryString } });

        expect(component.state.queryString).toBe(queryString);
        expect(component.state.matchedItems).toEqual([
            { name: "Chien Cao", id: 4 }
        ]);

        var clearButton = TestUtils.findRenderedDOMNodeWithDataId(searchBoxDiv, "clear");
        ReactTestUtils.Simulate.click(clearButton);

        expect(component.state.queryString).toBe("");
        expect(component.state.matchedItems).toEqual(listItems);
    });

    it("log warning in console for deprecated component", function () {
        console.warn = jest.genMockFunction();

        getComponent();
        expect(console.warn).toBeCalledWith(
            "** This version of the SelectionList is deprecated and will be removed in the next release"
        );
    });

    it("does not log deprecation message when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent();

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
