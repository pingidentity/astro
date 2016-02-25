window.__DEV__ = true;

jest.dontMock("../Multivalues.jsx");

describe("FormTextField", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Multivalues = require("../Multivalues.jsx"),
        callback,
        component,
        entries,
        close,
        input;
    beforeEach(function () {
        callback = jest.genMockFunction();
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" id="multiselect"
                entries={[
                    "Entry 1",
                    "Entry 2",
                    "Entry 3",
                    "Entry 4"
                ]}
                onChange={callback} />
        );
        entries = TestUtils.scryRenderedDOMNodesWithClass(component, "entry");
        input = TestUtils.findRenderedDOMNodeWithDataId(component,"value-entry");

        // make sure that the field is not required by default
        var elements = TestUtils.scryRenderedDOMNodesWithClass(component, "required");
        expect(elements.length).toBe(0);
    });
    
    it("shows field as required", function () {
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" id="multiselect"
                entries={[
                    "Entry 1",
                    "Entry 2",
                    "Entry 3",
                    "Entry 4"
                ]}
                isRequired={true}
                onChange={callback} />
        );
        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
    });

    it ("rendered with all 4 strings", function () {

        expect(entries.length).toBe(4);
        //expect properly named rendered element
        expect(entries[2].firstChild.textContent).toBe("Entry 3");

    });
    
    it ("trigger basic change callback", function () {

        //simulate typing a letter
        input.value = "a";
        ReactTestUtils.Simulate.keyDown(input, { key: "a" } );
        //expect no callback called
        expect(callback.mock.calls.length).toBe(0);
        expect(input.value).toBe("a");

        //enter key for callback
        ReactTestUtils.Simulate.keyDown(input, { key: "enter", keyCode: 13, which: 13 } );
        expect(callback.mock.calls.length).toBe(1);

        //expect reset of input value
        expect(input.value).toBe("");

        //expect no callback when input has no value
        ReactTestUtils.Simulate.keyDown(input, { key: "enter", keyCode: 13, which: 13 } );
        expect(callback.mock.calls.length).toBe(1);

    });

    it ("trigger callback with comma", function () {

        //simulate typing a letter
        input.value = "a";
        ReactTestUtils.Simulate.keyDown(input, { key: "a" } );
        //expect no callback called
        expect(callback.mock.calls.length).toBe(0);

        //comma key for callback
        ReactTestUtils.Simulate.keyDown(input, { key: "comma", keyCode: 188, which: 188 } );
        expect(callback.mock.calls.length).toBe(1);

    });

    it ("callback on delete and x click", function () {
        //delete key for callback
        ReactTestUtils.Simulate.keyDown(input, { key: "backspace", keyCode: 8, which: 8 } );
        expect(callback.mock.calls.length).toBe(1);

        //callback from clicking x
        close = TestUtils.scryRenderedDOMNodesWithDataId(component,"delete");
        expect(close.length).toBe(4);
        ReactTestUtils.Simulate.click(close[1]);
        expect(callback.mock.calls.length).toBe(2);

    });


});
