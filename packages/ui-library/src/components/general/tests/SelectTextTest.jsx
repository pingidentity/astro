
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
    var ReactTestUtils = require("react-addons-test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var SelectText = require("../SelectText.jsx");
    
    it("Render and click", function () {

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
    

});
