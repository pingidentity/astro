window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../FormTextField.jsx");
jest.dontMock("../Toggle.jsx");
jest.dontMock("../../general/If.jsx");
jest.dontMock("../FormCheckboxList.jsx");
jest.dontMock("underscore");

describe("FormCheckboxListStateless", function () {
    var _ = require("underscore");
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var FormCheckboxListStateless = require("../FormCheckboxList.jsx");
    var Toggle = require("../Toggle.jsx");

    var selectAllLabel = function () {
        return "Select All";
    };

    var deselectAllLabel = function () {
        return "Deselect All";
    };

    it("renders ungrouped data", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                controlled={true}
                labelSelectAll={selectAllLabel}
                labelDeselectAll={deselectAllLabel}
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

    it("triggers callback on checkbox change", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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

    it("triggers callback on select all", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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

    it("triggers callback on hide unchecked", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                controlled={true}
                labelSelectAll={selectAllLabel}
                labelDeselectAll={deselectAllLabel}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={_.noop}
                onQueryChange={_.noop}
                onVisibilityChange={callback}
                items={[{ id: 1, name: "Salesforce" },
                        { id: 2, name: "Google Mail" }
                ]}
                selected={[2]}
            />
        );

        //click 'Hide uncheck' toggle link
        var toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "hide-unchecked");

        ReactTestUtils.Simulate.click(toggle);

        expect(callback).toBeCalledWith(false);
    });

    it("triggers callback on query string change", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                controlled={true}
                labelSelectAll={selectAllLabel}
                labelDeselectAll={deselectAllLabel}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={_.noop}
                onQueryChange={callback}
                onVisibilityChange={_.noop}
                items={[{ id: 1, name: "Salesforce" },
                        { id: 2, name: "Google Mail" }
                ]}
                selected={[2]}
            />
        );

        //enter something in query field
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search");

        ReactTestUtils.Simulate.change(searchInput, {
            target: {
                value: "Salesforce"
            }
        });

        expect(callback).toBeCalledWith("Salesforce");
    });

    it("renders grouped data", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                controlled={true}
                labelSelectAll={selectAllLabel}
                labelDeselectAll={deselectAllLabel}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={_.noop}
                onQueryChange={_.noop}
                onVisibilityChange={_.noop}
                items={[{ id: 1, name: "Salesforce", group: "Marketing" },
                        { id: 2, name: "Google Mail", group: "Personal" },
                        { id: 3, name: "Concur", group: "Marketing" }
                ]}
                selected={[2]} />
        );

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

    it("triggers query update when clicking on group label", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                controlled={true}
                labelSelectAll={selectAllLabel}
                labelDeselectAll={deselectAllLabel}
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={_.noop}
                onQueryChange={callback}
                onVisibilityChange={_.noop}
                items={[{ id: 1, name: "Salesforce", group: "Marketing" },
                        { id: 2, name: "Google Mail", group: "Personal" },
                        { id: 3, name: "Concur", group: "Marketing" }
                ]}
                selected={[2]} />
        );

        var group2Label = TestUtils.findRenderedDOMNodeWithDataId(component, "data-label-Marketing");

        //click on group label
        ReactTestUtils.Simulate.click(group2Label);

        //ensure query callback executed with group name
        expect(callback).toBeCalled();
        expect(callback.mock.calls[0][0]).toEqual("Marketing"); //hack around failing .toBeCalledWith(...)
    });

    it("is calling select label callbacks on render", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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

    it("is calling unselect label callbacks on render", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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

    it("is filtering unselected options", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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

    it("filtering options based on search query", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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

    it("filtering options based on search query and toggle", function () {

        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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

    it("triggers change with stateful version", function () {

        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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

    it("triggers select all with stateful version", function () {

        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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

    it("supports stateful ui mechanics", function () {

        var callback = jest.genMockFunction();
        var selectLabelCallback = jest.genMockFunction();
        var unselectLabelCallback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
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
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search");
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
});
