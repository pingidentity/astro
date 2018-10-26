window.__DEV__ = true;

jest.dontMock("underscore");
jest.dontMock("../FormCheckboxList");
jest.dontMock("../FormLabel");
jest.dontMock("../FormError");
jest.dontMock("../FormSearchBox");
jest.dontMock("../form-text-field/index.js");
jest.dontMock("../form-text-field/v2");
jest.dontMock("../form-toggle/index.js");
jest.dontMock("../form-toggle/v2");
jest.dontMock("../../general/If");
jest.dontMock("../../../testutil/TestUtils");

describe("FormCheckboxList", function () {
    var _ = require("underscore");
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var Utils = require("../../../util/Utils");
    var FormCheckboxList = require("../FormCheckboxList");
    var Toggle = require("../form-toggle/v2");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            stateless: true,
            labelHideUnselected: "Hide Unselected",
            labelSearchPlaceholder: "Search",
            onGetSelectAllLabel: jest.genMockFunction(),
            onGetDeselectAllLabel: jest.genMockFunction(),
            onValueChange: jest.genMockFunction(),
            onQueryChange: jest.genMockFunction(),
            onVisibilityChange: jest.genMockFunction(),
            items: [{ id: 1, name: "Salesforce" },
                    { id: 2, name: "Google Mail" }
            ],
            selected: [2]
        });

        return ReactTestUtils.renderIntoDocument(<FormCheckboxList {...props} />);
    }

    it("renders with default data-id", function () {
        var component = getComponent(),
            checkboxList = TestUtils.findRenderedDOMNodeWithDataId(component, "form-checkbox-list");

        expect(checkboxList).toBeDefined();
    });

    it("renders with given data-id", function () {
        var component = getComponent({ "data-id": "myFormCheckboxList" }),
            checkboxList = TestUtils.findRenderedDOMNodeWithDataId(component, "myFormCheckboxList");

        expect(checkboxList).toBeDefined();
    });

    it("renders ungrouped data", function () {
        var component = getComponent();

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search");
        var checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");
        var hideUncheckedToggle = ReactTestUtils.scryRenderedComponentsWithType(component, Toggle);

        // Check for rendered elements
        expect(checkboxes.length).toBe(2);
        expect(searchInput).toBeDefined();
        expect(checkAllToggle).toBeDefined();
        expect(hideUncheckedToggle.length).toBe(1);

        // validate rendered dataobject checkbox values
        expect(checkboxes[0].value).toBe("1");
        expect(checkboxes[1].value).toBe("2");

        // ensure checkboxes selection
        expect(checkboxes[0].checked).toBe(false);
        expect(checkboxes[1].checked).toBe(true);
    });

    it("triggers onValueChange callback on checkbox change", function () {
        var component = getComponent();

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        ReactTestUtils.Simulate.change(checkboxes[0]);

        expect(component.props.onValueChange).toBeCalledWith([2, 1]);
    });

    it("triggers onValueChange callback on select all", function () {
        var component = getComponent();

        //click 'Select all' link
        var checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");
        ReactTestUtils.Simulate.click(checkAllToggle);

        expect(component.props.onValueChange).toBeCalledWith([2, 1]);
    });

    it("triggers onVisibilityChange callback on hide unchecked", function () {
        var component = getComponent();

        //click 'Hide uncheck' toggle link
        var toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "hide-unchecked");

        ReactTestUtils.Simulate.click(toggle);

        expect(component.props.onVisibilityChange).toBeCalledWith(false);
    });

    it("triggers onQueryChange callback on query string change", function () {
        var component = getComponent();

        //enter something in query field
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "searchBox-input");

        ReactTestUtils.Simulate.change(searchInput, {
            target: {
                value: "Salesforce"
            }
        });

        expect(component.props.onQueryChange).toBeCalledWith("Salesforce");
    });

    it("renders grouped data", function () {
        var component = getComponent({
            items: [{ id: 1, name: "Salesforce", group: "Marketing" },
                    { id: 2, name: "Google Mail", group: "Personal" },
                    { id: 3, name: "Concur", group: "Marketing" }
            ]
        });

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        var group1Label = TestUtils.findRenderedDOMNodeWithDataId(component, "data-label-Marketing");
        var group2Label = TestUtils.findRenderedDOMNodeWithDataId(component, "data-label-Personal");

        expect(checkboxes.length).toBe(3);
        expect(group1Label.textContent).toBe("Marketing");
        expect(group2Label.textContent).toBe("Personal");
        expect(checkboxes[0].value).toBe("1");
        expect(checkboxes[1].value).toBe("3");
        expect(checkboxes[2].value).toBe("2");
    });

    it("triggers onQueryChange query update when clicking on group label", function () {
        var component = getComponent({
            items: [{ id: 1, name: "Salesforce", group: "Marketing" },
                    { id: 2, name: "Google Mail", group: "Personal" },
                    { id: 3, name: "Concur", group: "Marketing" }
            ]
        });

        var group2Label = TestUtils.findRenderedDOMNodeWithDataId(component, "data-label-Marketing");

        //click on group label
        ReactTestUtils.Simulate.click(group2Label);

        //ensure query callback executed with group name
        expect(component.props.onQueryChange).toBeCalled();
        expect(component.props.onQueryChange.mock.calls[0][0]).toEqual("Marketing"); //hack around failing .toBeCalledWith(...)
    });

    it("is calling select label callbacks on render", function () {
        var component = getComponent();

        expect(component.props.onGetSelectAllLabel).toBeCalledWith(2);
        expect(component.props.onGetDeselectAllLabel).not.toBeCalled();
    });

    it("is calling unselect label callbacks on render", function () {
        var component = getComponent({
            selected: [1,2]
        });

        expect(component.props.onGetSelectAllLabel).not.toBeCalled();
        expect(component.props.onGetDeselectAllLabel).toBeCalledWith(2);
    });

    it("is filtering unselected options", function () {
        var component = getComponent({
            hideUnchecked: true
        });

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        expect(checkboxes.length).toBe(1);
        expect(checkboxes[0].value).toBe("2");

        // ensure checkboxes selection
        expect(checkboxes[0].checked).toBe(true);

        expect(component.props.onGetDeselectAllLabel).toBeCalledWith(1);
        expect(component.props.onGetSelectAllLabel).not.toBeCalled();
    });

    it("filtering options based on search query", function () {
        var component = getComponent({
            queryString: "Marketing",
            items: [{ id: 1, name: "Salesforce", group: "Marketing" },
                    { id: 2, name: "Google Mail", group: "Personal" },
                    { id: 3, name: "Concur", group: "Marketing" }
            ]
        });

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        var group1Label = TestUtils.scryRenderedDOMNodesWithDataId(component, "data-label-Personal");
        var group2Label = TestUtils.scryRenderedDOMNodesWithDataId(component, "data-label-Marketing");

        //ensure we have only one group label
        expect(group1Label.length).toEqual(0);
        expect(group2Label.length).toEqual(1);

        expect(checkboxes.length).toBe(2);
        expect(checkboxes[0].value).toBe("1");
        expect(checkboxes[1].value).toBe("3");

        // ensure checkboxes selection
        expect(checkboxes[0].checked).toBe(false);
        expect(checkboxes[1].checked).toBe(false);

        expect(component.props.onGetSelectAllLabel).toBeCalledWith(2);
        expect(component.props.onGetDeselectAllLabel).not.toBeCalled();

    });

    it("filtering options based on search query and toggle", function () {
        var component = getComponent({
            queryString: "Marketing",
            hideUnchecked: true,
            items: [{ id: 1, name: "Salesforce", group: "Marketing" },
                    { id: 2, name: "Google Mail", group: "Personal" },
                    { id: 3, name: "Concur", group: "Marketing" }
            ],
            selected: [3]
        });

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        var group1Label = TestUtils.scryRenderedDOMNodesWithDataId(component, "data-label-Personal");
        var group2Label = TestUtils.scryRenderedDOMNodesWithDataId(component, "data-label-Marketing");

        //ensure we have only one group label
        expect(group1Label.length).toEqual(0);
        expect(group2Label.length).toEqual(1);

        expect(checkboxes.length).toBe(1);
        expect(checkboxes[0].value).toBe("3");

        // ensure checkboxes selection
        expect(checkboxes[0].checked).toBe(true);

        expect(component.props.onGetDeselectAllLabel).toBeCalledWith(1);
        expect(component.props.onGetSelectAllLabel).not.toBeCalled();
    });

    it("Stateful: triggers change", function () {
        var component = getComponent({
            stateless: false,
            items: [{ id: 1, name: "Salesforce", group: "Marketing" },
                    { id: 2, name: "Google Mail", group: "Personal" },
                    { id: 3, name: "Concur", group: "Marketing" }
            ]
        });

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        ReactTestUtils.Simulate.change(checkboxes[0]);

        expect(component.props.onValueChange).toBeCalledWith([2, 1]);
    });

    it("Stateful: triggers select all", function () {
        var component = getComponent({
            stateless: false,
            items: [{ id: 1, name: "Salesforce", group: "Marketing" },
                    { id: 2, name: "Google Mail", group: "Personal" },
                    { id: 3, name: "Concur", group: "Marketing" }
            ]
        });

        var checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");
        ReactTestUtils.Simulate.click(checkAllToggle);

        expect(component.props.onValueChange).toBeCalledWith([2, 1, 3]);
    });

    it("Stateful: supports ui mechanics", function () {
        var component = getComponent({
            stateless: false,
            items: [{ id: 1, name: "Salesforce", group: "Marketing" },
                    { id: 2, name: "Google Mail", group: "Personal" },
                    { id: 3, name: "Concur", group: "Marketing" }
            ],
            selected: [2,1]
        });

        expect(component.props.onGetSelectAllLabel).toBeCalledWith(3);
        expect(component.props.onGetDeselectAllLabel).not.toBeCalled();

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "searchBox-input");
        var hideUncheckedToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "hide-unchecked");

        ReactTestUtils.Simulate.click(hideUncheckedToggle);

        expect(component.props.onGetDeselectAllLabel).toBeCalledWith(2);
        expect(component.props.onGetSelectAllLabel).toBeCalledWith(3);

        //ensure only checked checkboxes are here
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        expect(checkboxes.length).toEqual(2);
        expect(checkboxes[0].value).toBe("1");
        expect(checkboxes[0].checked).toBe(true);
        expect(checkboxes[1].value).toBe("2");
        expect(checkboxes[1].checked).toBe(true);

        ReactTestUtils.Simulate.change(searchInput, {
            target: {
                value: "Personal"
            }
        });

        checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        expect(checkboxes.length).toEqual(1);
        expect(checkboxes[0].value).toBe("2");
        expect(checkboxes[0].checked).toBe(true);
    });

    it("_handleSearchUndo fires onQueryChange callback", function () {
        var component = getComponent();

        component.refs.FormCheckboxListStateless._handleSearchUndo();
        expect(component.props.onQueryChange).toBeCalled();
    });

    it("_searchOnType fires onQueryChange callback", function () {
        var component = getComponent();

        component.refs.FormCheckboxListStateless._searchOnType();
        expect(component.props.onQueryChange).toBeCalled();
    });

    it("_handleQueryChange updates queryString state", function () {
        var component = getComponent({ stateless: false }),
            queryString = "test";

        expect(component.refs.FormCheckboxListStateful.state.queryString).toBe("");
        component.refs.FormCheckboxListStateful._handleQueryChange(queryString);
        expect(component.refs.FormCheckboxListStateful.state.queryString).toBe(queryString);
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            getComponent({ id: "foo" });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onSelectionChange' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("onSelectionChange", "onValueChange"));

        expect(function () {
            getComponent({ onSelectionChange: jest.genMockFunction() });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'labelSelectAll' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("labelSelectAll", "onGetSelectAllLabel"));

        expect(function () {
            getComponent({ labelSelectAll: "foo" });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'labelDeselectAll' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("labelDeselectAll", "onGetDeselectAllLabel"));

        expect(function () {
            getComponent({ labelDeselectAll: "foo" });
        }).toThrow(expectedError);
    });

});
