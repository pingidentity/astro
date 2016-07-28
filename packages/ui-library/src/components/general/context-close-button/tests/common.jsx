module.exports = function (getComponent) {
    var ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils");

    /**
     * Test to ensure that the show property is applied.
     */
    it("reacts correctly to the show state", function () {
        var shown = false;
        var component = getComponent({
            show: shown
        });
        expect(ReactDOM.findDOMNode(component)).toBeNull();

        shown = true;
        component = getComponent({
            show: shown
        });
        var button = TestUtils.findRenderedDOMNodeWithTag(component, "button");
        expect(ReactTestUtils.isDOMComponent(button)).toBeTruthy();
    });

    /*
     * Test to ensure that the disabled property is applied.
     */
    it("disabled state", function () {
        var disabled = false;
        var component = getComponent({
            disabled: disabled
        });
        var button = TestUtils.findRenderedDOMNodeWithTag(component, "button");
        expect(ReactTestUtils.isDOMComponent(button)).toBeTruthy();
        expect(button.disabled).toBeFalsy();

        disabled = true;
        component = getComponent({
            disabled: disabled
        });
        button = TestUtils.findRenderedDOMNodeWithTag(component, "button");
        expect(ReactTestUtils.isDOMComponent(button)).toBeTruthy();
        expect(button.disabled).toBeTruthy();
    });
};