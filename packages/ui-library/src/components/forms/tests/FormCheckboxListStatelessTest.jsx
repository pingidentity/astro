window.__DEV__ = true;

jest.dontMock("../FormTextField.jsx");
jest.dontMock("../Toggle.jsx");

jest.dontMock("../FormCheckboxListStateless.jsx");
jest.dontMock("../../general/LazyLoader.jsx");

describe("FormCheckboxListStateless", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var FormCheckboxListStateless = require("../FormCheckboxListStateless.jsx");
    var callback = jest.genMockFunction();
    var Toggle = require("../Toggle.jsx");

    var items = [
        { id: 1, name: "Salesforce" },
        { id: 2, name: "Google Mail" }
    ];
    var itemsInGroups = [
        { id: 1, name: "Salesforce", group: "group1" },
        { id: 2, name: "Google Mail", group: "group2" }
    ];

    it("test default render state of form with minimal parameters", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                onChange={callback}
                items={items}/>
        );

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search");
        var checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");
        var hideUncheckedToggle = TestUtils.scryRenderedComponentsWithType(component, Toggle);

        // Check for rendered elements
        expect(checkboxes.length).toBe(2);
        expect(searchInput).toBeDefined();
        expect(checkAllToggle).toBeDefined(1);
        expect(hideUncheckedToggle.length).toBe(1);

        // validate rendered dataobject checkbox values
        expect(checkboxes[0].value).toBe("1");
        expect(checkboxes[1].value).toBe("2");
    });

    it("test no default selected item", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={items}/>
        );

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        // make sure no checkboxes are checked since we didn't provide a default
        expect(checkboxes.length).toBe(2);
        expect(checkboxes[0].checked).toBe(false);
        expect(checkboxes[1].checked).toBe(false);
    });

    it("will trigger callback on select all hyperlink change event", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={jest.genMockFunction()}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={items} />
        );

        var checkboxes = TestUtils.scryRenderedDOMNodesWithDataId(component, "checkbox");
        var checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");

        expect(checkboxes[0].checked).toBe(false);
        expect(checkboxes[1].checked).toBe(false);

        ReactTestUtils.Simulate.click(checkAllToggle);

        var calls = component.props.onSelectionChange.mock.calls;
        expect(calls.length).toBe(1);
        

        // part two follows
        component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={jest.genMockFunction()}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={items}
                selected={calls[0][0]} />
        );

        checkboxes = TestUtils.scryRenderedDOMNodesWithDataId(component, "checkbox");
        checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");

        ReactTestUtils.Simulate.click(checkAllToggle);

        // make sure all items in the list were 'checked'
        expect(checkboxes[0].checked).toBe(true);
        expect(checkboxes[1].checked).toBe(true);
    });

    it("will trigger callback on checkbox dataobject selection change", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                selected={[1, 2]}
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={items}/>
        );

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        // make sure second checkbox is checked by default
        expect(checkboxes[0].checked).toBe(true);
        expect(checkboxes[1].checked).toBe(true);

        ReactTestUtils.Simulate.change(checkboxes[1], { target: { checked: false } });
        //make sure callback was triggered
        expect(callback).toBeCalled();
    });

    it("will trigger search filter", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                onQueryChange={jest.genMockFunction()}
                onVisibilityChange={callback}
                items={items}/>
        );

        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search");

        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Sa" } } );

        var calls = component.props.onQueryChange.mock.calls;
        expect(calls.length).toBe(1);


        // part two follows
        component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                onQueryChange={jest.genMockFunction()}
                onVisibilityChange={callback}
                items={items}
                queryString={calls[0][0]} />
        );

        searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "Sa" } } );

        // get the updated DOM
        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");

        // there should now be 1 checkbox since Google Mail was filtered out
        expect(checkboxes.length).toBe(1);
        expect(checkboxes[0].value).toBe("1");
    });

    it("will trigger hide unchecked toggle", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                selected={[2]}
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={items}/>
        );

        var hideUncheckedToggle = TestUtils.scryRenderedComponentsWithType(component, Toggle);

        ReactTestUtils.Simulate.click(hideUncheckedToggle);

        //make sure callback was triggered
        expect(callback).toBeCalled();
    });

    it("will render grouped datasets, validate group labels shows up", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={itemsInGroups} />
        );

        var checkboxContainer = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobjects");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithTag(checkboxContainer, "input");
        var searchInput = TestUtils.findRenderedDOMNodeWithDataId(component, "dataobject-search");
        var checkAllToggle = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all");
        var hideUncheckedToggle = TestUtils.scryRenderedComponentsWithType(component, Toggle);
        var group1Label = TestUtils.findRenderedDOMNodeWithDataId(component, "data-label-group1");
        var group2Label = TestUtils.findRenderedDOMNodeWithDataId(component, "data-label-group2");

        // Check for rendered elements
        expect(checkboxes.length).toBe(2);
        expect(searchInput).toBeDefined();
        expect(checkAllToggle).toBeDefined(1);
        expect(hideUncheckedToggle.length).toBe(1);
        expect(group1Label.textContent).toEqual("group1");
        expect(group2Label.textContent).toEqual("group2");

        // validate rendered dataobject checkbox values
        expect(checkboxes[0].value).toBe("1");
        expect(checkboxes[1].value).toBe("2");
    });

    it("will trigger group label filtering", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={itemsInGroups} />
        );

        var group2Label = TestUtils.findRenderedDOMNodeWithDataId(component, "data-label-group2");
        var checkboxes = TestUtils.scryRenderedDOMNodesWithDataId(component, "checkbox");

        expect(checkboxes.length).toBe(2);

        // Check for rendered elements
        ReactTestUtils.Simulate.click(group2Label);

        var calls = component.props.onQueryChange.mock.calls;

        component = ReactTestUtils.renderIntoDocument(
            <FormCheckboxListStateless
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                labelSearchPlaceholder="Search"
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={itemsInGroups}
                queryString={calls[1][0]}
                selected={calls[0][0]} />
        );

        expect(calls.length).toBe(2);

        // validate rendered dataobject checkbox values
        // expect(checkboxes.length).toBe(1);
        // expect(checkboxes[0].value).toBe('2');
    });
});
