window.__DEV__ = true;

jest.dontMock('../Multiselect.jsx');
jest.dontMock('underscore');
jest.dontMock('underscore.string');
jest.dontMock('../../../testutil/TestUtils');

describe('Multiselect', function () {
    var React = require('react/addons');
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require('../../../testutil/TestUtils');
    var Multiselect = require('../Multiselect.jsx');
    var callback = jest.genMockFunction();
    var component;
    var options;
    var checkboxes;
    var search;
    var clearBtn;

    beforeEach(function () {
        component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <Multiselect title="Sites" id="multiselect"
                options={{
                    'acme.com': '1st',
                    'acme.net': '2nd',
                    'foo.com': '3rd',
                    'foo.net': '4th'
                }}
                onChange={callback} />
            /* jshint ignore:end */
        );
        options = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'options');
        checkboxes = ReactTestUtils.scryRenderedDOMComponentsWithTag(options, 'input');
        search = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input')[0];
        clearBtn = TestUtils.findRenderedDOMComponentWithDataId(component, 'clear');
    });

    it('will trigger callback on selection change.', function () {

        expect(checkboxes.length).toBe(4); //make sure 4 checkboxes

        ReactTestUtils.Simulate.change(checkboxes[2], { target: { checked: true } }) ;
        expect(callback).toBeCalledWith('3rd', true); //make sure callback was triggered for foo.com

        ReactTestUtils.Simulate.change(checkboxes[2], { target: { checked: false } });
        expect(callback).toBeCalledWith('3rd', false); //make sure callback was triggered for foo.com
    });

    it('narrow list on type.', function () {

        ReactTestUtils.Simulate.change(search, { target: { value: 'acm' } });
        var labels = ReactTestUtils.scryRenderedDOMComponentsWithTag(options, 'label');
        expect(labels.length).toBe(2); //make sure we have only 2 options left which matching search
        expect(labels[0].getDOMNode().textContent).toEqual('acme.com');
        expect(labels[1].getDOMNode().textContent).toEqual('acme.net');
    });

    it('clears search on ESC', function () {

        ReactTestUtils.Simulate.change(search, { target: { value: 'acm' } });

        expect(search.getDOMNode().value).toEqual('acm');

        ReactTestUtils.Simulate.keyUp(search, { keyCode: 27 }); //ESC pressed

        expect(search.getDOMNode().value).toEqual(''); //make sure search have been cleared

    });

    it('clears search on X click', function () {

        ReactTestUtils.Simulate.change(search, { target: { value: 'acm' } });
        expect(search.getDOMNode().value).toEqual('acm');

        ReactTestUtils.Simulate.click(clearBtn, {});
        expect(search.getDOMNode().value).toEqual(''); //make sure search have been cleared
    });
});
