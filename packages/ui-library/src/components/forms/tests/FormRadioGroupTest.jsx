window.__DEV__ = true;

jest.dontMock('../../../testutil/TestUtils');
jest.dontMock('../FormRadioGroup.jsx');
jest.dontMock('underscore');


describe('FormRadioGroup', function () {
    var React = require('react/addons'),
        ReactTestUtils = React.addons.TestUtils,
        FormRadioGroup = require('../FormRadioGroup.jsx'),
        callback = jest.genMockFunction(),
        items = [
            { id: '1', name: 'name 1' },
            { id: '2', name: 'name 2' }
        ];

    it('test no default selected item', function () {
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormRadioGroup
                id="test-radio-group"
                groupName="test_radio_group"
                onChange={callback}
                items={items}/>
            /* jshint ignore: end */
        );

        var radios = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input');

        // make sure there are 2 radios
        expect(radios.length).toBe(2);

        // make sure no radios are checked since we didn't provide a default
        expect(radios[0].getDOMNode().checked).toBe(false);
        expect(radios[1].getDOMNode().checked).toBe(false);
    });

    it('will trigger callback on radio selection change', function () {
        var selectedItem = '2';

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormRadioGroup
                groupName="test_radio_group"
                selected={selectedItem}
                onChange={callback}
                items={items}/>
            /* jshint ignore: end */
        );

        var radios = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input');

        // make sure there are 2 radios
        expect(radios.length).toBe(2);

        // make sure second radio button is checked by default
        expect(radios[0].getDOMNode().checked).toBe(false);
        expect(radios[0].getDOMNode().value).toBe('1');
        expect(radios[1].getDOMNode().checked).toBe(true);
        expect(radios[1].getDOMNode().value).toBe('2');

        ReactTestUtils.Simulate.change(radios[0], { target: { checked: true } });
        //make sure callback was triggered
        expect(callback).toBeCalled();
    });

    it('contains the proper css classes', function () {
        var customClass = 'my-test-class';

        var stackedComponent = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormRadioGroup
                groupName="test_radio_group"
                className={customClass}
                onChange={callback}
                items={items}/>
            /* jshint ignore: end */
        );

        var horizontalComponent = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <FormRadioGroup
                stacked={false}
                groupName="test_radio_group"
                onChange={callback}
                items={items}/>
            /* jshint ignore: end */
        );

        // test presence of custom class (className prop)
        var labelsCustom = ReactTestUtils.scryRenderedDOMComponentsWithClass(stackedComponent, customClass);
        expect(labelsCustom.length).toBe(items.length);

        // test presence of "stacked" class (default behavior)
        var labelsStacked = ReactTestUtils.scryRenderedDOMComponentsWithClass(stackedComponent, 'stacked');
        expect(labelsStacked.length).toBe(items.length);

        // test that "stacked" class is not present
        var labelsHorizontal = ReactTestUtils.scryRenderedDOMComponentsWithClass(horizontalComponent, 'stacked');
        expect(labelsHorizontal.length).toBe(0);
    });
});
