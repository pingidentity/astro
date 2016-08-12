window.__DEV__ = true;

jest.dontMock("../Multivalues.jsx");
jest.dontMock("../FormLabel.jsx");

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
                onValueChange={callback} />
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

    //TODO: remove when v1 no longer supported
    it("renders with given id", function () {
        component = ReactTestUtils.renderIntoDocument(<Multivalues id="myMultivalues" entries={["one", "two"]} />);

        var multivalues = TestUtils.findRenderedDOMNodeWithDataId(component, "myMultivalues");

        expect(multivalues).toBeDefined();
    });
    
    //TODO: remove when v1 no longer supported
    it("shows field as required if isRequired set", function () {
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" id="multiselect"
                entries={[
                    "Entry 1",
                    "Entry 2",
                    "Entry 3",
                    "Entry 4"
                ]}
                isRequired={true}
                onValueChange={callback} />
        );
        // verify that the component is rendered
        var field = TestUtils.findRenderedDOMNodeWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(field)).toBeTruthy();
    });

    it("shows field as required if required set", function () {
        component = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" id="multiselect"
                entries={[
                    "Entry 1",
                    "Entry 2",
                    "Entry 3",
                    "Entry 4"
                ]}
                required={true}
                onValueChange={callback} />
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

    //TODO: remove when v1 no longer supported
    it("triggers basic onChange callback", function () {
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
        input = TestUtils.findRenderedDOMNodeWithDataId(component,"value-entry");

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

    //TODO: remove when v1 no longer supported
    it("triggers onChange callback with comma", function () {
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
        input = TestUtils.findRenderedDOMNodeWithDataId(component,"value-entry");

        //simulate typing a letter
        input.value = "a";
        ReactTestUtils.Simulate.keyDown(input, { key: "a" } );
        //expect no callback called
        expect(callback.mock.calls.length).toBe(0);

        //comma key for callback
        ReactTestUtils.Simulate.keyDown(input, { key: "comma", keyCode: 188, which: 188 } );
        expect(callback.mock.calls.length).toBe(1);
    });

    it ("trigger onValuechange callback with comma", function () {

        //simulate typing a letter
        input.value = "a";
        ReactTestUtils.Simulate.keyDown(input, { key: "a" } );
        //expect no callback called
        expect(callback.mock.calls.length).toBe(0);

        //comma key for callback
        ReactTestUtils.Simulate.keyDown(input, { key: "comma", keyCode: 188, which: 188 } );
        expect(callback.mock.calls.length).toBe(1);

    });

    //TODO: remove when v1 no longer supported
    it("triggers onChange callback on delete and x click", function () {
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
        input = TestUtils.findRenderedDOMNodeWithDataId(component,"value-entry");

        //delete key for callback
        ReactTestUtils.Simulate.keyDown(input, { key: "backspace", keyCode: 8, which: 8 } );
        expect(callback.mock.calls.length).toBe(1);

        //callback from clicking x
        close = TestUtils.scryRenderedDOMNodesWithDataId(component,"delete");
        expect(close.length).toBe(4);
        ReactTestUtils.Simulate.click(close[1]);
        expect(callback.mock.calls.length).toBe(2);
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

    //TODO: remove when v1 no longer supported
    it("logs warning when given id prop", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Multivalues id="myMultivalues" />
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of id. " +
            "Support for id will be removed in next version");

    });

    //TODO: remove when v1 no longer supported
    it("logs warning when given onChange prop", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Multivalues onChange={callback} />
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use onValueChange instead of onChange. " +
            "Support for onChange will be removed in next version");
    });

    //TODO: remove when v1 no longer supported
    it("logs warning when given isRequired prop", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Multivalues isRequired={true} />
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use required instead of isRequired. " +
            "Support for isRequired will be removed in next version");
    });
});
