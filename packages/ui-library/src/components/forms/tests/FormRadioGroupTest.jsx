window.__DEV__ = true;

jest.dontMock("../FormRadioGroup.jsx");

describe("FormRadioGroup", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        FormRadioGroup = require("../FormRadioGroup.jsx"),
        callback = jest.genMockFunction(),
        items = [
            { id: "1", name: "name 1" },
            { id: "2", name: "name 2" }
        ];

    it("tests onValueChanged", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormRadioGroup
                id="test-radio-group"
                groupName="test_radio_group"
                onValueChange={callback}
                items={items}/>
        );
        var radios = TestUtils.scryRenderedDOMNodesWithTag(component, "input");

        ReactTestUtils.Simulate.change(radios[0], { target: { checked: true } });
        //make sure callback was triggered
        expect(callback).toBeCalled();
    });

    it("test no default selected item", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormRadioGroup
                id="test-radio-group"
                groupName="test_radio_group"
                onChange={callback}
                items={items}/>
        );

        var radios = TestUtils.scryRenderedDOMNodesWithTag(component, "input");

        // make sure there are 2 radios
        expect(radios.length).toBe(2);

        // make sure no radios are checked since we didn't provide a default
        expect(radios[0].checked).toBe(false);
        expect(radios[1].checked).toBe(false);
    });

    it("will trigger callback on radio selection change", function () {
        var selectedItem = "2";

        var component = ReactTestUtils.renderIntoDocument(
            <FormRadioGroup
                groupName="test_radio_group"
                selected={selectedItem}
                onChange={callback}
                items={items}/>
        );

        var radios = TestUtils.scryRenderedDOMNodesWithTag(component, "input");

        // make sure there are 2 radios
        expect(radios.length).toBe(2);

        // make sure second radio button is checked by default
        expect(radios[0].checked).toBe(false);
        expect(radios[0].value).toBe("1");
        expect(radios[1].checked).toBe(true);
        expect(radios[1].value).toBe("2");

        ReactTestUtils.Simulate.change(radios[0], { target: { checked: true } });
        //make sure callback was triggered
        expect(callback).toBeCalled();
    });

    it("contains the proper css classes", function () {
        var customClass = "my-test-class";

        var stackedComponent = ReactTestUtils.renderIntoDocument(
            <FormRadioGroup
                groupName="test_radio_group"
                className={customClass}
                onChange={callback}
                items={items}/>
        );

        var horizontalComponent = ReactTestUtils.renderIntoDocument(
            <FormRadioGroup
                stacked={false}
                groupName="test_radio_group"
                onChange={callback}
                items={items}/>
        );

        // test presence of custom class (className prop)
        var labelsCustom = TestUtils.scryRenderedDOMNodesWithClass(stackedComponent, customClass);
        expect(labelsCustom.length).toBe(items.length);

        // test presence of "stacked" class (default behavior)
        var labelsStacked = TestUtils.scryRenderedDOMNodesWithClass(stackedComponent, "stacked");
        expect(labelsStacked.length).toBe(items.length);

        // test that "stacked" class is not present
        var labelsHorizontal = TestUtils.scryRenderedDOMNodesWithClass(horizontalComponent, "stacked");
        expect(labelsHorizontal.length).toBe(0);
    });

    it("renders disabled state", function () {

        // first test a disabled group
        var viewAllDisabled = ReactTestUtils.renderIntoDocument(
            <FormRadioGroup
                groupName="test_radio_group"
                disabled={true}
                onChange={callback}
                items={items} />
        );

        // test for disabled class on labels
        var labels = TestUtils.scryRenderedDOMNodesWithClass(viewAllDisabled, "disabled");
        expect(labels.length).toBe(items.length);

        // test for disabled attribute on inputs
        var inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(viewAllDisabled, "input");
        expect(inputs[0].disabled).toBeTruthy();
        expect(inputs[1].disabled).toBeTruthy();

        // alter data so that one item has the disabled property
        items[0].disabled = true;

        // then test group with only one disabled
        var viewIndividualDisabled = ReactTestUtils.renderIntoDocument(
            <FormRadioGroup
                groupName="test_radio_group"
                onChange={callback}
                items={items} />
        );

        // test for disabled class on labels
        var labels = TestUtils.scryRenderedDOMNodesWithClass(viewIndividualDisabled, "disabled");
        expect(labels.length).toBe(1);

        // test for disabled attribute on inputs
        var inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(viewIndividualDisabled, "input");
        expect(inputs[0].disabled).toBeTruthy();
        expect(inputs[1].disabled).toBeFalsy();
    });

    it("renders inputs without disabled state", function () {
        // set disabled=false on individual item and for group
        items[0].disabled = false;
        var view = ReactTestUtils.renderIntoDocument(
            <FormRadioGroup
                groupName="test_radio_group"
                disabled={false}
                onChange={callback}
                items={items} />
        );

        // test for disabled class on labels
        var labels = TestUtils.scryRenderedDOMNodesWithClass(view, "disabled");
        expect(labels.length).toBe(0);

        // test for disabled attribute on inputs
        var inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(view, "input");
        expect(inputs[0].disabled).toBeFalsy();
        expect(inputs[1].disabled).toBeFalsy();

    });

    it("adds 'hidden' class to inputs with 'hidden' property", function () {
        // hide first item
        items[0].hidden = true;
        var view = ReactTestUtils.renderIntoDocument(
            <FormRadioGroup
                groupName="test_radio_group"
                onChange={callback}
                items={items} />
        );

        // test for "hidden" class on labels
        var labels = TestUtils.scryRenderedDOMNodesWithClass(view, "hidden");
        expect(labels.length).toBe(1);
    });
});
