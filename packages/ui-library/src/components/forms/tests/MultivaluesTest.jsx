window.__DEV__ = true;

jest.dontMock("../Multivalues");
jest.dontMock("../FormLabel");

jest.mock("popper.js");
jest.mock("react-portal");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import Utils from "../../../util/Utils";
import TestUtils from "../../../testutil/TestUtils";
import Multivalues from "../Multivalues";
import { KeyCodes } from "../../../util/KeyboardUtils";
import options from "../../../demo/components/forms/data/userOptions";
import { mount } from "enzyme";

describe("Multivalues", function () {

    var callback,
        component,
        entries,
        close,
        input;

    function getWrapper(props) {
        return mount(
            <Multivalues
                title="Sites"
                data-id="multiselect"
                entries={[
                    "Entry 1",
                    "Entry 2",
                    "Entry 3",
                    "Entry 4"
                ]}
                autofocus={false}
                {...props}
            />
        );
    }

    function getComponent(props) {
        return ReactTestUtils.renderIntoDocument(
            <Multivalues
                title="Sites"
                data-id="multiselect"
                entries={[
                    "Entry 1",
                    "Entry 2",
                    "Entry 3",
                    "Entry 4"
                ]}
                autofocus={false}
                {...props}
            />
        );
    }

    beforeEach(function () {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        callback = jest.fn();
        component = getComponent({ onValueChange: callback });
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
        ReactTestUtils.Simulate.change(input, { target: { value: "a" } } );
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
        ReactTestUtils.Simulate.change(input, { target: { value: "Entry 5" } });
        ReactTestUtils.Simulate.blur(input);

        expect(callback).toHaveBeenCalledWith([
            "Entry 1",
            "Entry 2",
            "Entry 3",
            "Entry 4",
            "Entry 5"
        ]);
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

    it("displays error message when error prop is passed in", function () {
        const multivalues = ReactTestUtils.renderIntoDocument(
            <Multivalues
                title="Sites"
                data-id="multivalues"
                autoFocus={true}
                errorMessage="I'm an error message"
            />
        );

        const error = TestUtils.findRenderedDOMNodeWithClass(multivalues, "input-multivalues__error");

        expect(error.textContent).toEqual("I'm an error message");
    });

    it("focuses the input on mouse down", function() {
        ReactTestUtils.Simulate.mouseDown(input);

        expect(document.activeElement.getAttribute("data-id")).toBe("value-entry");
    });

    it("renders an icon", function() {
        const iconComponent = ReactTestUtils.renderIntoDocument(
            <Multivalues title="Sites" data-id="multiselect"
                entries={[
                    {
                        icon: "globe",
                        label: "Globe",
                    }
                ]}
                onValueChange={callback}
                autofocus={false}
            />
        );

        const iconElement = TestUtils.findRenderedDOMNodeWithDataId(iconComponent, "icon-graphic");

        expect(iconElement).toBeTruthy();
    });

    it("adds entries for every key that's supposed to do that and not others", function() {
        expect(callback.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.change(input, { target: { value: "word" } });
        ReactTestUtils.Simulate.keyDown(input, { keyCode: KeyCodes.COMMA });
        expect(callback.mock.calls.length).toBe(1);

        ReactTestUtils.Simulate.change(input, { target: { value: "word" } });
        ReactTestUtils.Simulate.keyDown(input, { keyCode: KeyCodes.TAB });
        expect(callback.mock.calls.length).toBe(2);

        ReactTestUtils.Simulate.change(input, { target: { value: "word" } });
        ReactTestUtils.Simulate.keyDown(input, { keyCode: KeyCodes.SPACE });
        expect(callback.mock.calls.length).toBe(3);

        ReactTestUtils.Simulate.change(input, { target: { value: "word" } });
        ReactTestUtils.Simulate.keyDown(input, { keyCode: KeyCodes.ESC });
        expect(callback.mock.calls.length).toBe(3);
    });

    it("opens dropdown list when text is entered", function() {
        const wrapper = getWrapper({ options });

        expect(wrapper.state().listOpen).toBeFalsy();

        const dropdownInput = wrapper.find("[data-id='value-entry']");
        dropdownInput.simulate("change", { target: { value: "stuff" } });

        expect(wrapper.state().listOpen).toBeTruthy();
    });

    it("doesn't add value if there no draft text", function() {
        ReactTestUtils.Simulate.blur(input);
        expect(callback.mock.calls.length).toBe(0);
    });

    it("adds and removes a focus class", function() {
        ReactTestUtils.Simulate.focus(input);

        let focused = TestUtils.findRenderedDOMNodeWithClass(component, "input-multivalues--focused");
        expect(focused).toBeTruthy();

        ReactTestUtils.Simulate.blur(input);

        focused = TestUtils.findRenderedDOMNodeWithClass(component, "input-multivalues--focused");
        expect(focused).toBeFalsy();
    });

    it("opens dropdown list then moves the highlight up and down", function() {
        const wrapper = getWrapper({ options });

        const dropdownInput = wrapper.find("[data-id='value-entry']");
        dropdownInput.simulate("change", { target: { value: "gen" } });

        expect(wrapper.state().highlightedOption).toBe(0);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_DOWN });
        expect(wrapper.state().highlightedOption).toBe(1);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_DOWN });
        expect(wrapper.state().highlightedOption).toBe(1);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_UP });
        expect(wrapper.state().highlightedOption).toBe(0);
    });

    it("activates previous entries and deletes the first one", function() {
        const changeCallback = jest.fn();
        const wrapper = getWrapper({ onValueChange: changeCallback });
        const dropdownInput = wrapper.find("[data-id='value-entry']");

        expect(wrapper.state().activeEntry).toBe(-1);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_LEFT });
        expect(wrapper.state().activeEntry).toBe(3);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_LEFT });
        expect(wrapper.state().activeEntry).toBe(2);
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_RIGHT });
        expect(wrapper.state().activeEntry).toBe(3);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_LEFT });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_LEFT });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_LEFT });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_LEFT });
        expect(wrapper.state().activeEntry).toBe(0);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.BACK_SPACE });
        expect(changeCallback).toHaveBeenCalledWith([
            "Entry 2",
            "Entry 3",
            "Entry 4"
        ]);
    });

    it("selects no active entry when pressing right at the end", function() {
        const wrapper = getWrapper();
        const dropdownInput = wrapper.find("[data-id='value-entry']");

        expect(wrapper.state().activeEntry).toBe(-1);
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_RIGHT });
        expect(wrapper.state().activeEntry).toBe(-1);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_LEFT });
        expect(wrapper.state().activeEntry).toBe(3);
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_RIGHT });
        expect(wrapper.state().activeEntry).toBe(-1);
    });

    it("resets active entry when deleting the last", function() {
        const wrapper = getWrapper();
        const dropdownInput = wrapper.find("[data-id='value-entry']");

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_LEFT });
        expect(wrapper.state().activeEntry).toBe(3);
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.BACK_SPACE });
        expect(wrapper.state().activeEntry).toBe(-1);
    });

    it("closes the list on escape", function() {
        const wrapper = getWrapper({ options });
        const dropdownInput = wrapper.find("[data-id='value-entry']");

        expect(wrapper.state().listOpen).toBeFalsy();

        dropdownInput.simulate("click");
        expect(wrapper.state().listOpen).toBeTruthy();

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ESC });
        expect(wrapper.state().listOpen).toBeFalsy();
    });

    it("closes the list on up arrow", function() {
        const wrapper = getWrapper({ options });
        const dropdownInput = wrapper.find("[data-id='value-entry']");

        expect(wrapper.state().listOpen).toBeFalsy();

        dropdownInput.simulate("click");
        expect(wrapper.state().listOpen).toBeTruthy();

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_UP });
        expect(wrapper.state().listOpen).toBeFalsy();
    });

    it("adds an option from list with all the right keys", function() {
        const changeCallback = jest.fn();
        const wrapper = getWrapper({ options, onValueChange: changeCallback });
        const dropdownInput = wrapper.find("[data-id='value-entry']");

        expect(changeCallback.mock.calls.length).toBe(0);

        dropdownInput.simulate("change", { target: { value: "genn" } });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ENTER });
        expect(changeCallback.mock.calls.length).toBe(1);

        dropdownInput.simulate("change", { target: { value: "genn" } });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.COMMA });
        expect(changeCallback.mock.calls.length).toBe(2);

        dropdownInput.simulate("change", { target: { value: "genn" } });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.TAB });
        expect(changeCallback.mock.calls.length).toBe(3);

        dropdownInput.simulate("change", { target: { value: "genn" } });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.LEFT_ALT });
        expect(changeCallback.mock.calls.length).toBe(3);
    });

    it("toggles the list on space when there is no value", function() {
        const wrapper = getWrapper({ options });
        const dropdownInput = wrapper.find("[data-id='value-entry']");

        expect(wrapper.state().listOpen).toBeFalsy();

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.SPACE });
        expect(wrapper.state().listOpen).toBeTruthy();

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.SPACE });
        expect(wrapper.state().listOpen).toBeFalsy();
    });

    it("opens the list on down arrow", function() {
        const wrapper = getWrapper({ options });
        const dropdownInput = wrapper.find("[data-id='value-entry']");

        expect(wrapper.state().listOpen).toBeFalsy();

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_DOWN });
        expect(wrapper.state().listOpen).toBeTruthy();
    });

    it("supports a list of options without labels", function() {
        const wrapper = getWrapper({
            options: [
                { value: "uno" },
                { value: "two" },
            ]
        });

        wrapper.setState({ listOpen: true });

        expect(wrapper.find("li[data-id='option-item']").children().length).toBe(2);
    });

    it("doesn't show selected entries as options", function() {
        const wrapper = getWrapper({
            options: [
                {
                    value: "first",
                    label: "First",
                },
                {
                    value: "second",
                    label: "Second",
                },
                {
                    value: "third",
                    label: "Third",
                },
            ],
            entries: ["second"],
        });

        wrapper.setState({ listOpen: true });

        expect(wrapper.find("li[data-id='option-item']").children().length).toBe(2);
    });

    it("calls onValueChange when editing the draft if the includeDraftInEntries prop is set", function() {
        const valueChangeCallback = jest.fn();
        const wrapper = getWrapper({ options, onValueChange: valueChangeCallback, includeDraftInEntries: true });

        expect(valueChangeCallback).not.toHaveBeenCalled();
        const dropdownInput = wrapper.find("[data-id='value-entry']");
        dropdownInput.simulate("change", { target: { value: "genn" } });
        expect(valueChangeCallback).toHaveBeenCalled();
    });

    it("does not call onValueChange when committing the draft if the includeDraftInEntries prop is set", function() {
        const valueChangeCallback = jest.fn();
        const wrapper = getWrapper({ options, onValueChange: valueChangeCallback, includeDraftInEntries: true });

        const dropdownInput = wrapper.find("[data-id='value-entry']");
        dropdownInput.simulate("change", { target: { value: "genn" } });
        expect(valueChangeCallback.mock.calls.length).toBe(1);
        dropdownInput.simulate("blur");
        expect(valueChangeCallback.mock.calls.length).toBe(1);
    });

});
