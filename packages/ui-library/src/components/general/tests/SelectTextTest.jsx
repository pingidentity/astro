
jest.dontMock("../SelectText.jsx");


/*
 * Tests for SelectText component.
 *
 * These tests are not overly comprehensive since true
 * text selection cannot actually be tested as it is
 * browser provided functionality.  All we can test here
 * is that the component makes the right calls to the
 * global object at the right times (not that text
 * actually ends up being selected).
 *
 */
describe("SelectText", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var SelectText = require("../SelectText.jsx");
    var Wrapper = TestUtils.UpdatePropsWrapper;

    afterEach(function () {
        global.getSelection = undefined;
        global.document.body.createTextRange = undefined;
    });


    it("renders on browsers supporting getSelection", function () {

        // --- Setup global object ------
        // Node / Jest runtime environment does not
        // have the concept of selecting text, so we
        // cannot directly test the text selection.
        // Instead, we create the appropriate mock functions
        // and see that they are called on the global object.
        var removeAllRanges = jest.genMockFn();
        var addRange = jest.genMockFn();
        var selectNodeContents = jest.genMockFn();

        global.getSelection = jest.genMockFn();
        global.getSelection.mockReturnValue({
            removeAllRanges: removeAllRanges,
            addRange: addRange
        });

        global.document.createRange = function () {
            return {
                selectNodeContents: selectNodeContents
            };
        };

        // --- Render and test component ------
        var someText = "Just some test text";
        var component = ReactTestUtils.renderIntoDocument(
            <SelectText className="testClass">
                {someText}
            </SelectText>
        );

        // Initially expect no calls to the select text functions
        expect(global.getSelection.mock.calls.length).toBe(0);
        expect(removeAllRanges.mock.calls.length).toBe(0);
        expect(addRange.mock.calls.length).toBe(0);

        // Ensure a single rendered element with the expected class.
        var element = TestUtils.findRenderedDOMNodeWithClass(component, "testClass");

        ReactTestUtils.Simulate.click(element);

        expect(global.getSelection.mock.calls.length).toBe(1);
        expect(removeAllRanges.mock.calls.length).toBe(1);
        expect(addRange.mock.calls.length).toBe(1);

        // Ensure the expected text is what was passed to the select function
        expect(selectNodeContents.mock.calls[0][0].childNodes[0].nodeValue).toBe(someText);
    });

    it("renders on browsers supporting createTextRange", function () {

        var moveToElement = jest.genMockFunction();
        var select = jest.genMockFunction();

        global.document.body.createTextRange = function () {
            return {
                moveToElementText: moveToElement,
                select: select
            };
        };

        var component = ReactTestUtils.renderIntoDocument(
            <SelectText className="testClass">
                Just some text
            </SelectText>
        );

        var element = TestUtils.findRenderedDOMNodeWithClass(component, "testClass");

        ReactTestUtils.Simulate.click(element);

        expect(moveToElement).toBeCalled();
        expect(moveToElement.mock.calls[0][0].textContent).toEqual("Just some text");
        expect(select).toBeCalled();
    });

    it("calls _selectText when props change", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <Wrapper type={SelectText} className="testClass" select={false} >
                Just some text
            </Wrapper>
        );
        component.refs.wrapper._selectText = jest.fn();
        component._setProps({ select: false });

        expect(component.refs.wrapper._selectText.mock.calls.length).toBe(0);

        component._setProps({ select: true });

        expect(component.refs.wrapper._selectText.mock.calls.length).toBe(1);
    });


    /*
     * Test to ensure text can be initially selected if so configured.
     *
     */
    it("Render initially selected", function () {
        // --- Setup global object ------
        // Node / Jest runtime environment does not
        // have the concept of selecting text, so we
        // cannot directly test the text selection.
        // Instead, we create the appropriate mock functions
        // and see that they are called on the global object.
        var removeAllRanges = jest.genMockFn();
        var addRange = jest.genMockFn();
        var selectNodeContents = jest.genMockFn();

        global.getSelection = jest.genMockFn();
        global.getSelection.mockReturnValue({
            removeAllRanges: removeAllRanges,
            addRange: addRange
        });

        global.document.createRange = function () {
            return {
                selectNodeContents: selectNodeContents
            };
        };

        // --- Render and test component ------
        var someText = "Just some test text";
        var component = ReactTestUtils.renderIntoDocument(
            <SelectText className="testClass" select={true}>
                {someText}
            </SelectText>
        );

        // Initially expect no calls to the select text functions
        expect(global.getSelection.mock.calls.length).toBe(1);
        expect(removeAllRanges.mock.calls.length).toBe(1);
        expect(addRange.mock.calls.length).toBe(1);

        // Ensure the expected text is what was passed to the select function
        expect(selectNodeContents.mock.calls[0][0].childNodes[0].nodeValue).toBe(someText);

        // Ensure a single rendered element with the expected class.
        TestUtils.findRenderedDOMNodeWithClass(component, "testClass");
    });

    it("is delegates selection to form text field targets", function () {

        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <SelectText className="testClass" select={true}>
                <input value={"some text"} />
            </SelectText>
        );

        // Ensure a single rendered element with the expected class.
        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "select-text");

        ReactTestUtils.Simulate.click(element, {
            target: {
                select: callback
            }
        });

        expect(callback).toBeCalled();
    });

    it("triggers onClick callback", function () {

        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <SelectText data-id="select-text" className="testClass" select={true} onClick={callback}>
                Just some test text
            </SelectText>
        );

        // Ensure a single rendered element with the expected class.
        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "select-text");

        ReactTestUtils.Simulate.click(element);

        expect(callback).toBeCalled();
    });

    // TODO To be removed once "dataId" support is discontnued.
    it("is having deprecated usage warning in console", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <SelectText dataId="select-text" className="testClass" select={true}>
                Just some test text
            </SelectText>
        );

        expect(console.warn.mock.calls[0][0]).toContain(
            "Deprecated: use data-id instead of dataId. Support for dataId will be removed in next version");
    });


    // TODO To be removed once "dataId" support is discontnued.
    it("render component with dataId", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <SelectText dataId="selectTextWithOldDataId" className="testClass" select={true}>
                Just some test text
            </SelectText>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "selectTextWithOldDataId");

        expect(element).toBeDefined();
    });

    it("render component with data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <SelectText data-id="selectTextWithNewDataId" className="testClass" select={true}>
                Just some test text
            </SelectText>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "selectTextWithNewDataId");

        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <SelectText className="testClass" select={true}>
                Just some test text
            </SelectText>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "select-text");

        expect(element).toBeDefined();
    });

    // TODO To be removed once "dataId" support is discontnued.
    it("log warning in console for dataId", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <SelectText dataId="selectTextWithOldDataId" className="testClass" select={true}>
                Just some test text
            </SelectText>
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of dataId. Support for dataId will be removed in next version");
    });

    // TODO To be removed once "dataId" support is discontnued.
    it("does not log warning in console without dataId", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <SelectText className="testClass" select={true}>
                Just some test text
            </SelectText>
        );

        expect(console.warn).not.toBeCalled();
    });

    //TODO: remove when dataId no longer supported
    it("does not log warning for dataId when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <SelectText dataId="selectTextWithOldDataId" className="testClass" select={true}>
                Just some test text
            </SelectText>
        );

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

});
