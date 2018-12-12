window.__DEV__ = true;

jest.dontMock("../Multivalues");
jest.dontMock("../FormLabel");

describe("FormTextField", function () {

    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        Utils = require("../../../util/Utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Multivalues = require("../Multivalues"),
        callback,
        component,
        entries,
        close,
        input;

    beforeEach(function () {
        callback = jest.fn();
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" data-id="multiselect"
                entries={[
                    "Entry 1",
                    "Entry 2",
                    "Entry 3",
                    "Entry 4"
                ]}
                onValueChange={callback}
                autofocus={false}/>
        );
        entries = TestUtils.scryRenderedDOMNodesWithClass(component, "entry");
        input = TestUtils.findRenderedDOMNodeWithDataId(component,"value-entry");

        // make sure that the field is not required by default
        var elements = TestUtils.scryRenderedDOMNodesWithClass(component, "required");
        expect(elements.length).toBe(0);
    });

    it("renders with default data-id", function () {
        component = ReactTestUtils.renderIntoDocument(<Multivalues entries={["one", "two"]} />);

        var multivalues = TestUtils.findRenderedDOMNodeWithDataId(component, "mutlivalues");

        expect(multivalues).toBeDefined();
    });

    it("renders with given data-id", function () {
        component = ReactTestUtils.renderIntoDocument(<Multivalues data-id="myMultivalues" entries={["one", "two"]} />);

        var multivalues = TestUtils.findRenderedDOMNodeWithDataId(component, "myMultivalues");

        expect(multivalues).toBeDefined();
    });

    it("shows field as required if required set", function () {
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" data-id="multiselect"
                required={true}
                onValueChange={callback} />
        );
        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithClass(component, "required");
        expect(field).toBeTruthy();
    });

    it ("rendered with all 4 strings", function () {

        expect(entries.length).toBe(4);
        //expect properly named rendered element
        expect(entries[2].firstChild.textContent).toBe("Entry 3");

    });

    it ("trigger basic onValuechange callback", function () {

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

    it ("trigger onValuechange callback with tab", function () {
        var _onNewValueCallback = function (keyCode) {
            if (keyCode === 9) {
                return true;
            }
            return false;
        };
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" data-id="multiselect"
                 entries={[
                     "Entry 1",
                     "Entry 2",
                     "Entry 3",
                     "Entry 4"
                 ]}
                 onValueChange={callback}
                 onNewValue={_onNewValueCallback} />
        );
        input = TestUtils.findRenderedDOMNodeWithDataId(component,"value-entry");

        //simulate typing a letter
        input.value = "b";
        ReactTestUtils.Simulate.keyDown(input, { key: "enter", keyCode: 13, which: 13 } );
        //expect no callback called
        expect(callback.mock.calls.length).toBe(0);

        //tab key for callback
        ReactTestUtils.Simulate.keyDown(input, { key: "tab", keyCode: 9, which: 9 } );
        expect(callback.mock.calls.length).toBe(1);
    });

    it ("triggers onValuechange callback on blur", function () {
        var _onNewValueCallback = function (keyCode) {
            if (keyCode === 9) {
                return true;
            }
            return false;
        };
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" data-id="multiselect"
                         entries={[
                             "Entry 1",
                             "Entry 2",
                             "Entry 3",
                             "Entry 4"
                         ]}
                         onValueChange={callback}
                         onNewValue={_onNewValueCallback} />
        );
        input = TestUtils.findRenderedDOMNodeWithDataId(component,"value-entry");

        expect(component.props.entries.length).toBe(4);

        //simulate typing a letter
        input.value = "Entry 5";
        ReactTestUtils.Simulate.blur(input);

        expect(callback.mock.calls.length).toBe(1);
        expect(component.props.entries.length).toBe(5);
    });

    it ("trigger onValuechange callback with space", function () {
        var _onNewValueCallback = function (keyCode) {
            if (keyCode === 32) {
                return true;
            }
            return false;
        };
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" data-id="multiselect"
                         entries={[
                             "Entry 1",
                             "Entry 2",
                             "Entry 3",
                             "Entry 4"
                         ]}
                         onValueChange={callback}
                         onNewValue={_onNewValueCallback} />
        );
        input = TestUtils.findRenderedDOMNodeWithDataId(component,"value-entry");

        //simulate typing a letter
        input.value = "c";
        ReactTestUtils.Simulate.keyDown(input, { key: "enter", keyCode: 13, which: 13 } );
        //expect no callback called
        expect(callback.mock.calls.length).toBe(0);

        //space key for callback
        ReactTestUtils.Simulate.keyDown(input, { key: "space", keyCode: 32, which: 32 } );
        expect(callback.mock.calls.length).toBe(1);
    });

    it ("trigger onValuechange callback", function () {
        //delete key for callback
        ReactTestUtils.Simulate.keyDown(input, { key: "backspace", keyCode: 8, which: 8 } );
        expect(callback.mock.calls.length).toBe(1);

        //callback from clicking x
        close = TestUtils.scryRenderedDOMNodesWithDataId(component,"delete");
        expect(close.length).toBe(4);
        ReactTestUtils.Simulate.click(close[1]);
        expect(callback.mock.calls.length).toBe(2);

    });

    it("adjusts input width on input change", function () {
        ReactTestUtils.Simulate.change(input, { target: { value: "" } });

        expect(input.style.width).toBe("20px");
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <Multivalues
                    id="foo"
                    title="bar" entries={[ ]} onValueChange={jest.fn()} onNewValue={jest.fn()}
                />
            );
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onChange' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("onChange", "onValueChange"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <Multivalues
                    onChange={jest.fn()}
                    title="bar" entries={[ ]} onNewValue={jest.fn()}
                />
            );
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'isRequired' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("isRequired", "required"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <Multivalues
                    isRequired={true}
                    title="bar" entries={[ ]} onValueChange={jest.fn()} onNewValue={jest.fn()}
                />
            );
        }).toThrow(expectedError);
    });

    it("renders with autofocus true", function () {
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" data-id="multivalues" autoFocus={true}/>
        );

        const focus = TestUtils.findRenderedDOMNodeWithDataId(component, "value-entry");

        expect(document.activeElement).toEqual(focus);
    });

});
