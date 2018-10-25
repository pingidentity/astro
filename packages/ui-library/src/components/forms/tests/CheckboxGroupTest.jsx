jest.dontMock("../CheckboxGroup");

describe("CheckboxGroup", function () {

    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        CheckboxGroup = require("../CheckboxGroup"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            options: [
                {
                    value: "one",
                    label: "Uno"
                },
                {
                    value: "two",
                    label: "Dos",
                    conditionalContent: "Sometimes"
                },
                {
                    value: "three",
                    label: "Tres"
                },
            ],
            values: ["one", "two"],
        });
        return ReactTestUtils.renderIntoDocument(<div><CheckboxGroup {...opts} /></div>);
    }

    it("Renders component with default data-id", function () {
        const component = getComponent();
        const cbGroup = TestUtils.findRenderedDOMNodeWithDataId(component, "checkbox-group");

        expect(cbGroup).toBeTruthy();
    });

    it("Renders component from a simple list", function () {
        const component = getComponent({
            options: ["two", "three"]
        });
        const cbGroup = TestUtils.findRenderedDOMNodeWithDataId(component, "checkbox-group");

        expect(cbGroup).toBeTruthy();
    });

    it("Triggers onValueChange when checking something", function () {
        const callback = jest.fn();
        const addCallback = jest.fn();
        const component = getComponent({
            onValueChange: value => callback(value),
            onAdd: addCallback
        });
        const option = TestUtils.findRenderedDOMNodeWithDataId(component, "checkbox-group-2");

        expect(callback).not.toBeCalled();
        expect(addCallback).not.toBeCalled();
        ReactTestUtils.Simulate.change(option, { target: { checked: true } });
        expect(callback).toBeCalledWith(["one", "two", "three"]);
        expect(addCallback).toBeCalledWith("three");
    });

    it("Triggers onValueChange when unchecking something", function () {
        const callback = jest.fn();
        const removeCallback = jest.fn();
        const component = getComponent({
            onValueChange: value => callback(value),
            onRemove: removeCallback
        });
        const option = TestUtils.findRenderedDOMNodeWithDataId(component, "checkbox-group-0");

        expect(callback).not.toBeCalled();
        expect(removeCallback).not.toBeCalled();
        ReactTestUtils.Simulate.change(option, { target: { checked: false } });
        expect(callback).toBeCalledWith(["two"]);
        expect(removeCallback).toBeCalledWith("one");
    });

    it("Only shows conditionalContent when the box is checked", function() {
        let component = getComponent();
        let content = TestUtils.findRenderedDOMNodeWithClass(component, "checkbox-description");
        expect(content).toBeTruthy();

        component = getComponent({ values: ["one", "three"] });
        content = TestUtils.findRenderedDOMNodeWithClass(component, "checkbox-description");
        expect(content).not.toBeTruthy();
    });
});
