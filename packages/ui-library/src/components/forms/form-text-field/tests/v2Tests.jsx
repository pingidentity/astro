window.__DEV__ = true;

jest.dontMock("./common.jsx");
jest.dontMock("../v2.jsx");
jest.dontMock("../index.js");
jest.dontMock("../../FormLabel.jsx");
jest.dontMock("../../../tooltips/HelpHint.jsx");

describe("FormTextinput", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FormTextinput = require("../v2.jsx"),
        CommonTests = require("./common.jsx"),
        _ = require("underscore");

    //Use this function to extract a property by either the new name or the legacy name with precedence give
    //to new name, legacy name, default.
    function legacyProp (opts, name, legacyName, deflt) {
        if (!opts) {
            return false;
        }

        if (typeof(opts[name]) === "undefined") {
            return typeof(opts[legacyName]) === "undefined" ? deflt : opts[legacyName];
        }

        return opts[name];
    }

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            controlled: false,
            labelText: "",
            required: legacyProp(opts, "required", "isRequired", false)
        });

        return ReactTestUtils.renderIntoDocument(<FormTextinput {...opts} />);
    }


    CommonTests(getComponent);

    it("toggles reveal state", function () {
        var component = getComponent({
            showReveal: true
        });
        var reveal = TestUtils.findRenderedDOMNodeWithDataId(component, "reveal");

        expect(reveal.getAttribute("class")).toContain("icon-view");
        expect(reveal.getAttribute("class")).not.toContain("icon-view-hidden");

        ReactTestUtils.Simulate.click(reveal);

        expect(reveal.getAttribute("class")).toContain("icon-view-hidden");
    });

    it("stateless: toggles reveal state", function () {
        var handleReveal = jest.genMockFunction();
        var component = getComponent({
            showReveal: true,
            controlled: true,
            onToggleReveal: handleReveal
        });
        var reveal = TestUtils.findRenderedDOMNodeWithDataId(component, "reveal");

        ReactTestUtils.Simulate.click(reveal);

        expect(handleReveal).toBeCalled();
    });

    it("fires onKeyPress when key is pressed", function () {
        var handleKeyPress = jest.genMockFunction();
        var component = getComponent({
            onKeyPress: handleKeyPress
        });

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.keyPress(input, { keyCode: 13 });

        expect(handleKeyPress.mock.calls[0][0].keyCode).toBe(13);
    });

    it("warns if id prop is used", function () {
        var warn = global.console.warn;
        console.warn = jest.genMockFunction();

        getComponent({ id: "my-id" });
        expect(console.warn).toBeCalled();

        console.warn = warn;
    });

    it("passes back value to onValueChange", function () {
        var callback = jest.genMockFunction();
        var component = getComponent({ onValueChange: callback });
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "abc" } });

        expect(callback).toBeCalledWith("abc");
    });

    it("does not render undo button by default", function () {
        var component = getComponent();
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");

        expect(undo).toBeFalsy();
    });

    it("renders undo if showUndo is true", function () {
        var component = getComponent({ showUndo: true });
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");

        expect(undo).toBeTruthy();
    });

    it("triggers onMouseDown", function () {
        var handleMouseDown = jest.genMockFunction();
        var component = getComponent({
            onMouseDown: handleMouseDown
        });

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.mouseDown(input);

        expect(handleMouseDown).toBeCalled();
    });

    it("triggers onSave when save is clicked", function () {
        var onSave = jest.genMockFunction();
        var component = getComponent({
            showSave: true,
            onSave: onSave
        });
        var save = TestUtils.findRenderedDOMNodeWithDataId(component, "save");

        ReactTestUtils.Simulate.click(save);

        expect(onSave).toBeCalled();
    });

    it("triggers onUndo when undo is clicked", function () {
        var onUndo = jest.genMockFunction();
        var component = getComponent({
            showUndo: true,
            onUndo: onUndo
        });
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");

        ReactTestUtils.Simulate.click(undo);

        expect(onUndo).toBeCalled();
    });

    it("renders custom className", function () {
        var component = getComponent({ className: "extra" });
        var container = ReactDOM.findDOMNode(component);

        expect(container.getAttribute("class")).toContain("extra");
    });

});
