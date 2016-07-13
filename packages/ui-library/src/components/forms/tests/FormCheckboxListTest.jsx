window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../form-text-field/index.js");
jest.dontMock("../form-text-field/v2.jsx");
jest.dontMock("../form-toggle/index.js");
jest.dontMock("../form-toggle/v2.jsx");
jest.dontMock("../../general/If.jsx");
jest.dontMock("../FormCheckboxList.jsx");
jest.dontMock("../FormLabel.jsx");
jest.dontMock("underscore");

describe("FormCheckboxList", function () {
    var _ = require("underscore");
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var FormCheckboxList = require("../FormCheckboxList.jsx");
    var Toggle = require("../form-toggle/v2.jsx");

    var selectAllLabel = function () {
        return "Select All";
    };

    var deselectAllLabel = function () {
        return "Deselect All";
    };

    function getComponent (props) {
        props = _.defaults(props || {}, {
            controlled: true,
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

    it("renders with given id", function () {
        var component = getComponent({ id: "myFormCheckboxListId" }),
            checkboxList = TestUtils.findRenderedDOMNodeWithDataId(component, "myFormCheckboxListId");

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
        expect(checkAllToggle).toBeDefined(1);
        expect(hideUncheckedToggle.length).toBe(1);

        // validate rendered dataobject checkbox values
        expect(checkboxes[0].value).toBe("1");
        expect(checkboxes[1].value).toBe("2");

        // ensure checkboxes selection
        expect(checkboxes[0].checked).toBe(false);
        expect(checkboxes[1].checked).toBe(true);
    });

    //TODO: remove when v1 no longer supported
    it("triggers onSelectionChange callback on checkbox change", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={true}
                labelSelectAll={selectAllLabel}
                labelDeselectAll={deselectAllLabel}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                onQueryChange={_.noop}
                onVisibilityChange={_.noop}
                items={[{ id: 1, name: "Salesforce" },
                        { id: 2, name: "Google Mail" }
                ]}
                selected={[2]}
            />
        );

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        ReactTestUtils.Simulate.change(checkboxes[0]);

        expect(callback).toBeCalledWith([2, 1]);
    });

    it("triggers onValueChange callback on checkbox change", function () {
        var component = getComponent();

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        ReactTestUtils.Simulate.change(checkboxes[0]);

        expect(component.props.onValueChange).toBeCalledWith([2, 1]);
    });

    //TODO: remove when v1 no longer supported
    it("triggers onSelectionChange callback on select all", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={true}
                labelSelectAll={selectAllLabel}
                labelDeselectAll={deselectAllLabel}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                onQueryChange={_.noop}
                onVisibilityChange={_.noop}
                items={[{ id: 1, name: "Salesforce" },
                        { id: 2, name: "Google Mail" }
                ]}
                selected={[2]}
            />
        );

        //click 'Select all' link
        var checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");
        ReactTestUtils.Simulate.click(checkAllToggle);

        expect(callback).toBeCalledWith([2, 1]);
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
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search-input");

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

    //TODO: remove when v1 no longer supported
    it("is calling select label callbacks on render", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={true}
                labelSelectAll={selectLabelCallback}
                labelDeselectAll={unselectLabelCallback}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={_.noop}
                onQueryChange={_.noop}
                onVisibilityChange={_.noop}
                items={[{ id: 1, name: "Salesforce" },
                        { id: 2, name: "Google Mail" }
                ]}
                selected={[2]} />
        );

        expect(selectLabelCallback).toBeCalledWith(2);
        expect(unselectLabelCallback).not.toBeCalled();
    });

    it("is calling select label callbacks on render", function () {
        var component = getComponent();

        expect(component.props.onGetSelectAllLabel).toBeCalledWith(2);
        expect(component.props.onGetDeselectAllLabel).not.toBeCalled();
    });

    //TODO: remove when v1 no longer supported
    it("is calling unselect label callbacks on render", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={true}
                labelSelectAll={selectLabelCallback}
                labelDeselectAll={unselectLabelCallback}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={_.noop}
                onQueryChange={_.noop}
                onVisibilityChange={_.noop}
                items={[{ id: 1, name: "Salesforce" },
                        { id: 2, name: "Google Mail" }
                ]}
                selected={[1,2]} />
        );

        expect(selectLabelCallback).not.toBeCalled();
        expect(unselectLabelCallback).toBeCalledWith(2);
    });

    it("is calling unselect label callbacks on render", function () {
        var component = getComponent({
            selected: [1,2]
        });

        expect(component.props.onGetSelectAllLabel).not.toBeCalled();
        expect(component.props.onGetDeselectAllLabel).toBeCalledWith(2);
    });

    //TODO: remove when v1 no longer supported
    it("is filtering unselected options", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={true}
                labelSelectAll={selectLabelCallback}
                labelDeselectAll={unselectLabelCallback}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={_.noop}
                onQueryChange={_.noop}
                onVisibilityChange={_.noop}
                hideUnchecked={true}
                items={[{ id: 1, name: "Salesforce" },
                        { id: 2, name: "Google Mail" }
                ]}
                selected={[2]} />
        );

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        expect(checkboxes.length).toBe(1);
        expect(checkboxes[0].value).toBe("2");

        // ensure checkboxes selection
        expect(checkboxes[0].checked).toBe(true);

        expect(unselectLabelCallback).toBeCalledWith(1);
        expect(selectLabelCallback).not.toBeCalled();
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

    //TODO: remove when v1 no longer supported
    it("filtering options based on search query", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={true}
                labelSelectAll={selectLabelCallback}
                labelDeselectAll={unselectLabelCallback}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={_.noop}
                onQueryChange={_.noop}
                queryString="Marketing"
                onVisibilityChange={_.noop}
                items={[{ id: 1, name: "Salesforce", group: "Marketing" },
                        { id: 2, name: "Google Mail", group: "Personal" },
                        { id: 3, name: "Concur", group: "Marketing" }
                ]}
                selected={[2]} />
        );

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

        expect(selectLabelCallback).toBeCalledWith(2);
        expect(unselectLabelCallback).not.toBeCalled();

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

    //TODO: remove when v1 no longer supported
    it("filtering options based on search query and toggle", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={true}
                labelSelectAll={selectLabelCallback}
                labelDeselectAll={unselectLabelCallback}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={_.noop}
                onQueryChange={_.noop}
                queryString="Marketing"
                hideUnchecked={true}
                onVisibilityChange={_.noop}
                items={[{ id: 1, name: "Salesforce", group: "Marketing" },
                        { id: 2, name: "Google Mail", group: "Personal" },
                        { id: 3, name: "Concur", group: "Marketing" }
                ]}
                selected={[3]} />
        );

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

        expect(unselectLabelCallback).toBeCalledWith(1);
        expect(selectLabelCallback).not.toBeCalled();
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

    //TODO: remove when v1 no longer supported
    it("Stateful: triggers change", function () {

        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={false}
                labelSelectAll={selectAllLabel}
                labelDeselectAll={deselectAllLabel}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                items={[{ id: 1, name: "Salesforce", group: "Marketing" },
                        { id: 2, name: "Google Mail", group: "Personal" },
                        { id: 3, name: "Concur", group: "Marketing" }
                ]}
                selected={[2]}
            />
        );

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        ReactTestUtils.Simulate.change(checkboxes[0]);

        expect(callback).toBeCalledWith([2, 1]);
    });

    it("Stateful: triggers change", function () {
        var component = getComponent({
            controlled: false,
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

    //TODO: remove when v1 no longer supported
    it("Stateful: triggers select all", function () {

        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={false}
                labelSelectAll={selectAllLabel}
                labelDeselectAll={deselectAllLabel}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                items={[{ id: 1, name: "Salesforce", group: "Marketing" },
                        { id: 2, name: "Google Mail", group: "Personal" },
                        { id: 3, name: "Concur", group: "Marketing" }
                ]}
                selected={[2]}
            />
        );

        var checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");
        ReactTestUtils.Simulate.click(checkAllToggle);

        expect(callback).toBeCalledWith([2, 1, 3]);
    });

    it("Stateful: triggers select all", function () {
        var component = getComponent({
            controlled: false,
            items: [{ id: 1, name: "Salesforce", group: "Marketing" },
                    { id: 2, name: "Google Mail", group: "Personal" },
                    { id: 3, name: "Concur", group: "Marketing" }
            ]
        });

        var checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");
        ReactTestUtils.Simulate.click(checkAllToggle);

        expect(component.props.onValueChange).toBeCalledWith([2, 1, 3]);
    });

    //TODO: remove when v1 no longer supported
    it("Stateful: supports ui mechanics", function () {

        var callback = jest.genMockFunction();
        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxList
                controlled={false}
                labelSelectAll={selectLabelCallback}
                labelDeselectAll={unselectLabelCallback}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                items={[{ id: 1, name: "Salesforce", group: "Marketing" },
                        { id: 2, name: "Google Mail", group: "Personal" },
                        { id: 3, name: "Concur", group: "Marketing" }
                ]}
                selected={[2, 1]}
            />
        );

        expect(selectLabelCallback).toBeCalledWith(3);
        expect(unselectLabelCallback).not.toBeCalled();

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search-input");
        var hideUncheckedToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "hide-unchecked");

        ReactTestUtils.Simulate.click(hideUncheckedToggle);

        expect(unselectLabelCallback).toBeCalledWith(2);
        expect(selectLabelCallback).toBeCalledWith(3);

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

    it("Stateful: supports ui mechanics", function () {
        var component = getComponent({
            controlled: false,
            items: [{ id: 1, name: "Salesforce", group: "Marketing" },
                    { id: 2, name: "Google Mail", group: "Personal" },
                    { id: 3, name: "Concur", group: "Marketing" }
            ],
            selected: [2,1]
        });

        expect(component.props.onGetSelectAllLabel).toBeCalledWith(3);
        expect(component.props.onGetDeselectAllLabel).not.toBeCalled();

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search-input");
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

    //TODO: remove when v1 no longer supported
    it("logs warning when id prop given", function () {
        console.warn = jest.genMockFunction();

        getComponent({ id: "myFormCheckboxListId" });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of id. Support for id will be removed in next version");
    });

    //TODO: remove when v1 no longer supported
    it("logs warning when onSelectionChange prop given", function () {
        console.warn = jest.genMockFunction();

        getComponent({ onSelectionChange: jest.genMockFunction() });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use onValueChange instead of onSelectionChange. " +
            "Support for onSelectionChange will be removed in next version");
    });

    //TODO: remove when v1 no longer supported
    it("logs warning when labelSelectAll prop given", function () {
        console.warn = jest.genMockFunction();

        getComponent({ labelSelectAll: jest.genMockFunction() });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use onGetSelectAllLabel instead of labelSelectAll. " +
            "Support for labelSelectAll will be removed in next version");
    });

    //TODO: remove when v1 no longer supported
    it("logs warning when labelDeselectAll prop given", function () {
        console.warn = jest.genMockFunction();

        getComponent({ labelDeselectAll: jest.genMockFunction() });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use onGetDeselectAllLabel instead of labelDeselectAll. " +
            "Support for labelDeselectAll will be removed in next version");
    });
});
