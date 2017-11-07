module.exports = function (getComponent) {
    var TestUtils = require("../../../../testutil/TestUtils"),
        ReactTestUtils = require("react-dom/test-utils"),
        HelpHint = require("../../../tooltips/HelpHint.jsx");

    it("renders the component with a data array", function () {
        var component = getComponent({
            options: [
                { value: 1, label: "one" },
                { value: 2, label: "two" }
            ],
            value: "2"
        });

        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");

        expect(options.length).toBe(2);
        expect(options[0].getAttribute("value")).toBe("1");
        expect(options[0].textContent).toBe("one");
        expect(options[1].getAttribute("value")).toBe("2");
        expect(options[1].textContent).toBe("two");
    });

    it("shows the error message when it is specified", function () {
        var errorMessage = "help!";

        var component = getComponent({
            errorMessage: errorMessage
        });

        var errorDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "form-select-field-errorMessage") ||
                       TestUtils.findRenderedDOMNodeWithDataId(component, "form-select-field_errormessage");
        expect(errorDiv.textContent).toBe(errorMessage);
    });

    it("renders component with additional CSS classes as specified in className prop", function () {
        var component = getComponent({
            className: "mySelect"
        });

        var label = TestUtils.findRenderedDOMNodeWithClass(component, "mySelect");

        expect(label).toBeTruthy();
    });

    it("renders HelpHint when specified", function () {
        var component = getComponent({
            label: "myLabel",
            labelHelpText: "helpMe"
        });

        var help = TestUtils.findRenderedComponentWithType(component, HelpHint);
        expect(help).toBeTruthy();
    });

    it("is not disabled when not specified", function () {
        var component = getComponent();

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        expect(ReactTestUtils.isDOMComponent(select)).toBeTruthy();
        expect(select.disabled).toBeFalsy();
    });

    it("does not render HelpHint when not specified", function () {
        var component = getComponent({
            label: "myLabel"
        });

        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon-help");
        expect(icon).toBeFalsy();
    });
};
