window.__DEV__ = true;

jest.dontMock('../../../testutil/TestUtils');
jest.dontMock('../FormTextField.jsx');
jest.dontMock('../Toggle.jsx');

jest.dontMock('../FormCheckboxList.jsx');
jest.dontMock('../../general/FragmentRenderer.jsx');

jest.dontMock('underscore');

describe('FormCheckboxList', function () {
    var React = require('react/addons');
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require('../../../testutil/TestUtils');
    var FormCheckboxList = require('../FormCheckboxList.jsx');
    var callback = jest.genMockFunction();
    var Toggle = require('../Toggle.jsx');

    var items = [
        { id: 1, name: 'Salesforce' },
        { id: 2, name: 'Google Mail' }
    ];
    var itemsInGroups = [
        { id: 1, name: 'Salesforce', group: 'group1' },
        { id: 2, name: 'Google Mail', group: 'group2' }
    ];

    it('test default render state of form with minimal parameters', function () {

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormCheckboxList
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                onChange={callback}
                items={items}/>
            /* jshint ignore: end */
        );

        var checkboxContainer = TestUtils.findRenderedDOMComponentWithDataId(component, 'dataobjects');
        var checkboxes = ReactTestUtils.scryRenderedDOMComponentsWithTag(checkboxContainer, 'input');
        var searchInput = TestUtils.findRenderedDOMComponentWithDataId(component, 'dataobject-search');
        var checkAllToggle = TestUtils.findRenderedDOMComponentWithDataId(component, 'check-all');
        var hideUncheckedToggle = ReactTestUtils.scryRenderedComponentsWithType(component, Toggle);

        // Check for rendered elements
        expect(checkboxes.length).toBe(2);
        expect(searchInput).toBeDefined();
        expect(checkAllToggle).toBeDefined(1);
        expect(hideUncheckedToggle.length).toBe(1);

        // validate rendered dataobject checkbox values
        expect(checkboxes[0].getDOMNode().value).toBe('1');
        expect(checkboxes[1].getDOMNode().value).toBe('2');
    });

    it('test no default selected item', function () {

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormCheckboxList
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={items}/>
            /* jshint ignore: end */
        );

        var checkboxContainer = TestUtils.findRenderedDOMComponentWithDataId(component, 'dataobjects');
        var checkboxes = ReactTestUtils.scryRenderedDOMComponentsWithTag(checkboxContainer, 'input');

        // make sure no checkboxes are checked since we didn't provide a default
        expect(checkboxes.length).toBe(2);
        expect(checkboxes[0].getDOMNode().checked).toBe(false);
        expect(checkboxes[1].getDOMNode().checked).toBe(false);
    });

    it('will trigger callback on select all hyperlink change event', function () {

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormCheckboxList
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                onSelectionChange={jest.genMockFunction()}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={items} />
            /* jshint ignore: end */
        );

        var checkboxes = TestUtils.scryRenderedDOMComponentsWithDataId(component, 'checkbox');
        var checkAllToggle = TestUtils.findRenderedDOMComponentWithDataId(component, 'check-all');

        expect(checkboxes[0].getDOMNode().checked).toBe(false);
        expect(checkboxes[1].getDOMNode().checked).toBe(false);

        ReactTestUtils.Simulate.click(checkAllToggle);

        var calls = component.props.onSelectionChange.mock.calls;
        expect(calls.length).toBe(1);

        component.setProps({ selected: calls[0][0] });

        // make sure all items in the list were 'checked'
        expect(checkboxes[0].getDOMNode().checked).toBe(true);
        expect(checkboxes[1].getDOMNode().checked).toBe(true);
    });

    it('will trigger callback on checkbox dataobject selection change', function () {

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormCheckboxList
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                selected={[1, 2]}
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={items}/>
            /* jshint ignore: end */
        );

        var checkboxContainer = TestUtils.findRenderedDOMComponentWithDataId(component, 'dataobjects');
        var checkboxes = ReactTestUtils.scryRenderedDOMComponentsWithTag(checkboxContainer, 'input');

        // make sure second checkbox is checked by default
        expect(checkboxes[0].getDOMNode().checked).toBe(true);
        expect(checkboxes[1].getDOMNode().checked).toBe(true);

        ReactTestUtils.Simulate.change(checkboxes[1], { target: { checked: false } });
        //make sure callback was triggered
        expect(callback).toBeCalled();
    });

    it('will trigger search filter', function () {
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormCheckboxList
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                onSelectionChange={callback}
                onQueryChange={jest.genMockFunction()}
                onVisibilityChange={callback}
                items={items}/>
            /* jshint ignore: end */
        );

        var searchInput = TestUtils.findRenderedDOMComponentWithDataId(component, 'dataobject-search');

        ReactTestUtils.Simulate.change(searchInput, { target: { value: 'Sa' } } );

        var calls = component.props.onQueryChange.mock.calls;
        expect(calls.length).toBe(1);

        component.setProps({ queryString: calls[0][0] });

        // get the updated DOM
        var checkboxContainer = TestUtils.findRenderedDOMComponentWithDataId(component, 'dataobjects');
        var checkboxes = ReactTestUtils.scryRenderedDOMComponentsWithTag(checkboxContainer, 'input');

        // there should now be 1 checkbox since Google Mail was filtered out
        expect(checkboxes.length).toBe(1);
        expect(checkboxes[0].getDOMNode().value).toBe('1');
    });

    it('will trigger hide unchecked toggle', function () {

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormCheckboxList
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                selected={[2]}
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={items}/>
            /* jshint ignore: end */
        );

        var hideUncheckedToggle = ReactTestUtils.scryRenderedComponentsWithType(component, Toggle);

        ReactTestUtils.Simulate.click(hideUncheckedToggle);

        //make sure callback was triggered
        expect(callback).toBeCalled();
    });

    it('will render grouped datasets, validate group labels shows up', function () {

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormCheckboxList
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={itemsInGroups} />
            /* jshint ignore: end */
        );

        var checkboxContainer = TestUtils.findRenderedDOMComponentWithDataId(component, 'dataobjects');
        var checkboxes = ReactTestUtils.scryRenderedDOMComponentsWithTag(checkboxContainer, 'input');
        var searchInput = TestUtils.findRenderedDOMComponentWithDataId(component, 'dataobject-search');
        var checkAllToggle = TestUtils.findRenderedDOMComponentWithDataId(component, 'check-all');
        var hideUncheckedToggle = ReactTestUtils.scryRenderedComponentsWithType(component, Toggle);
        var group1Label = TestUtils.findRenderedDOMComponentWithDataId(component, 'data-label-group1');
        var group2Label = TestUtils.findRenderedDOMComponentWithDataId(component, 'data-label-group2');

        // Check for rendered elements
        expect(checkboxes.length).toBe(2);
        expect(searchInput).toBeDefined();
        expect(checkAllToggle).toBeDefined(1);
        expect(hideUncheckedToggle.length).toBe(1);
        expect(group1Label.props.children).toBe('group1');
        expect(group2Label.props.children).toBe('group2');

        // validate rendered dataobject checkbox values
        expect(checkboxes[0].getDOMNode().value).toBe('1');
        expect(checkboxes[1].getDOMNode().value).toBe('2');
    });

    it('will trigger group label filtering', function () {

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormCheckboxList
                groupName="test_checkbox_list"
                labelSelectAll="Select All"
                labelDeselectAll="Deselect All"
                labelHideUnselected="Hide Unselected"
                onSelectionChange={callback}
                onQueryChange={callback}
                onVisibilityChange={callback}
                items={itemsInGroups} />
            /* jshint ignore: end */
        );

        var group2Label = TestUtils.findRenderedDOMComponentWithDataId(component, 'data-label-group2');
        var checkboxes = TestUtils.scryRenderedDOMComponentsWithDataId(component, 'checkbox');

        expect(checkboxes.length).toBe(2);

        // Check for rendered elements
        ReactTestUtils.Simulate.click(group2Label);

        var calls = component.props.onQueryChange.mock.calls;

        component.setProps({ queryString: calls[1][0] });
        component.setProps({ selected: calls[0][0] });

        expect(calls.length).toBe(2);

        // validate rendered dataobject checkbox values
        // expect(checkboxes.length).toBe(1);
        // expect(checkboxes[0].getDOMNode().value).toBe('2');
    });
});
