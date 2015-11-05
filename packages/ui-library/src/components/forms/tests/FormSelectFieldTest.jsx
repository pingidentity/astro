window.__DEV__ = true;

jest.dontMock('../FormSelectField.jsx');
jest.dontMock('classnames');
jest.dontMock('underscore');
jest.dontMock('../../../testutil/TestUtils');

describe('FormSelectField', function () {

    var React = require('react/addons'),
        ReactTestUtils = React.addons.TestUtils,
        FormSelectField = require('../FormSelectField.jsx');

    it('renders the component', function () {

        var onChange = function () {};

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormSelectField label="test label" options={{ 1: 'one', 2: 'two' }} onChange={onChange} value={'2'} />
            /* jshint ignore:end */
        );

        var label = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'input-select');
        var select = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'select');
        var options = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'option');

        expect(ReactTestUtils.isDOMComponent(label)).toBeTruthy();

        expect(select.getDOMNode().value).toBe('2');

        expect(options.length).toBe(2);
        expect(options[0].getDOMNode().getAttribute('value')).toBe('1');
        expect(options[0].getDOMNode().textContent).toBe('one');
        expect(options[1].getDOMNode().getAttribute('value')).toBe('2');
        expect(options[1].getDOMNode().textContent).toBe('two');
    });

    it('fires the onChange callback when selection changes', function () {
        var onChange = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormSelectField label="test label" options={{ 1: 'one', 2: 'two' }} onChange={onChange} value={'2'} />
            /* jshint ignore:end */
        );

        var select = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'select');
        ReactTestUtils.Simulate.change(select, { target: { value: '1' } } );

        expect(onChange.mock.calls.length).toBe(1);
    });

    it('adds the none option when it is specified', function () {
        var onChange = function () {};
        var noneOptionText = 'Select an option';
        var noneOptionValue = '0';

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormSelectField label="test label" options={{ 1: 'one', 2: 'two' }} onChange={onChange}
                noneOption={true} noneOptionText={noneOptionText} noneOptionValue={noneOptionValue}
                value={'0'} />
            /* jshint ignore:end */
        );

        var options = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'option');
        expect(options[0].getDOMNode().textContent).toBe(noneOptionText);
        expect(options[0].getDOMNode().getAttribute('value')).toBe(noneOptionValue);
    });

    it('shows the error message when it is specified', function () {
        var onChange = function () {};
        var errorMessage = 'help!';

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <FormSelectField label="test label" options={{ 1: 'one', 2: 'two' }} onChange={onChange}
                             errorMessage={errorMessage} value={'2'} />
            /* jshint ignore:end */
        );

        var errorDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'tooltip-text');
        expect(errorDiv.getDOMNode().textContent).toBe(errorMessage);
    });
});
