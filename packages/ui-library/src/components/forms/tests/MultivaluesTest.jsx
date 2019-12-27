window.__DEV__ = true;

jest.dontMock("../Multivalues");
jest.dontMock("../FormLabel");

jest.mock("popper.js");
jest.mock("react-portal");

import React from "react";
import { snapshotDataIds } from "../../../devUtil/EnzymeUtils";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import { MultivaluesBase as Multivalues } from "../Multivalues";
import { KeyCodes } from "../../../util/KeyboardUtils";
import options from "../../../demo/components/forms/data/userOptions";
import { mount, shallow } from "enzyme";

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

    it("data-id's don't change", () => {
        const multival = mount(
            <Multivalues
                entries={[
                    "Entry 1",
                    "Entry 2",
                    "Entry 3",
                    "Entry 4"
                ]}
                options={options}
            />
        );

        const dropdownInput = multival.find("[data-id='value-entry']");
        dropdownInput.simulate("click");

        snapshotDataIds(multival);
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

    describe("edit mode", function () {
        const editButtonClassName = "entry__edit-icon";
        function getEntries(parent) {
            return TestUtils.scryRenderedDOMNodesWithClass(parent, "entry");
        }

        function initEdit(parent, index) {
            const entry = getEntries(parent)[index];
            ReactTestUtils.Simulate.mouseEnter(entry);
            const editButton = TestUtils.findRenderedDOMNodeWithClass(entry, editButtonClassName);
            if (editButton) {
                ReactTestUtils.Simulate.click(editButton);
            }
        }

        it("displays edit button for entry on mouse enter", () => {
            expect(TestUtils.findRenderedDOMNodeWithClass(component, editButtonClassName)).toBeFalsy();
            const secondEntry = getEntries(component)[1];
            ReactTestUtils.Simulate.mouseEnter(secondEntry);
            expect(TestUtils.scryRenderedDOMNodesWithClass(component, editButtonClassName)).toHaveLength(1);
            expect(TestUtils.scryRenderedDOMNodesWithClass(secondEntry, editButtonClassName)).toHaveLength(1);
        });

        it("hides edit button for entry on mouse leave", () => {
            const secondEntry = getEntries(component)[1];
            ReactTestUtils.Simulate.mouseEnter(secondEntry);
            ReactTestUtils.Simulate.mouseLeave(secondEntry);
            expect(TestUtils.scryRenderedDOMNodesWithClass(component, editButtonClassName)).toHaveLength(0);
        });

        it("excludes entry under edit if includeDraftInEntries is false", () => {
            initEdit(component, 1);
            expect(callback).toHaveBeenCalledWith(["Entry 1", "Entry 3", "Entry 4"]);
        });

        it("commits current draft prior editing entry", () => {
            ReactTestUtils.Simulate.change(input, { target: { value: "draft" } });
            initEdit(component, 1);
            expect(callback).toHaveBeenCalledWith(["Entry 1", "Entry 3", "Entry 4", "draft"]);
        });

        it("allows edit entries provided as objects", () => {
            component = getComponent({
                onValueChange: callback,
                entries: [
                    { value: "1", label: "A", icon: "A" },
                    { value: "2", label: "B", icon: "B" },
                    { value: "3", label: "C", icon: "C" }
                ]
            });
            /*
             this test fails on re-rendering if includeDraftInEntries is truthy;
             Root cause is `props.entries` are not updated(so it's still array with 3 objects)
             but `state.draft` is not empty(set to string value);
             on re-render `_getDraft()` takes last `entries`'s member instead of `state.draft`;
             so React render fails with message "object {label, value} is not valid React children"
             it works fine in real app(since parent component provides up-to-date `props.entries`)
             */
            initEdit(component, 1);
            expect(callback).toHaveBeenCalledWith([
                { value: "1", label: "A", icon: "A" },
                { value: "3", label: "C", icon: "C" }
            ]);
        });

        it("provides entry under editing if includeDraftInEntries", () => {
            component = getComponent({ includeDraftInEntries: true, onValueChange: callback });
            initEdit(component, 1);
            expect(callback).toHaveBeenCalledWith(["Entry 1", "Entry 3", "Entry 4", "Entry 2"]);
        });

        it("does not allow editing entries if options provided", () => {
            component = getComponent({
                entries: ["A","B"],
                options: [
                    { label: "A", value: "A" },
                    { label: "B", value: "B" },
                    { label: "C", value: "C" }
                ],
                includeDraftInEntries: true,
                onValueChange: callback
            });
            initEdit(component, 1);
            expect(callback).not.toHaveBeenCalledWith();
        });
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

    it("calls the onFocus callback", function () {
        const onFocusCallback = jest.fn();
        const wrapper = getWrapper({ onFocus: onFocusCallback });
        const wrapperInput = wrapper.find("[data-id='value-entry']");

        wrapperInput.simulate("focus");

        expect(onFocusCallback).toHaveBeenCalled();
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

    it("deletes current active entry(with both Delete and Backspace keys)", function() {
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
        expect(changeCallback).toHaveBeenLastCalledWith([
            "Entry 2",
            "Entry 3",
            "Entry 4"
        ]);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.DELETE });
        expect(changeCallback).toHaveBeenLastCalledWith([
            "Entry 2",
            "Entry 3",
            "Entry 4"
        ]);

        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_RIGHT });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.DELETE });
        expect(changeCallback).toHaveBeenLastCalledWith([
            "Entry 1",
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
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ARROW_LEFT });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.DELETE });
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

        expect(wrapper.find("li[data-id='option-item_uno']").exists()).toEqual(true);
        expect(wrapper.find("li[data-id='option-item_two']").exists()).toEqual(true);
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

        expect(wrapper.find("li[data-id='option-item_first']").exists()).toEqual(true);
        expect(wrapper.find("li[data-id='option-item_third']").exists()).toEqual(true);
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

    it("doesn't add a blank entry when pressing escape with includeDraftInEntries", function() {
        const valueChangeCallback = jest.fn();
        const wrapper = getWrapper({
            entries: ["one", "two", ""],
            onValueChange: valueChangeCallback,
            includeDraftInEntries: true
        });
        const textInput = wrapper.find("[data-id='value-entry']");
        textInput.simulate("keyDown", { keyCode: KeyCodes.ESC });

        expect(valueChangeCallback.mock.calls[0][0].length).toBe(3);
    });

    it("doesn't add a blank entry when clearing draft with includeDraftInEntries", function() {
        const valueChangeCallback = jest.fn();
        const wrapper = getWrapper({
            entries: ["one", "two", ""],
            onValueChange: valueChangeCallback,
            includeDraftInEntries: true
        });
        wrapper.setState({ draft: "" });
        const textInput = wrapper.find("[data-id='value-entry']");
        textInput.simulate("change", { target: { value: "three" } });

        expect(valueChangeCallback.mock.calls[0][0].length).toBe(3);
    });

    it("adds an invalid entry when supplied with options", function() {
        const valueChangeCallback = jest.fn();
        const wrapper = getWrapper({
            entries: ["one", "two", "three"],
            onValueChange: valueChangeCallback,
            options,
            optionsStrict: false,
        });

        const dropdownInput = wrapper.find("[data-id='value-entry']");

        expect(valueChangeCallback).not.toBeCalled();
        dropdownInput.simulate("change", { target: { value: "not a valid entry" } });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ENTER });
        expect(valueChangeCallback).toBeCalled();
    });

    it("doesn't add an invalid entry in optionsStrict mode", function() {
        const valueChangeCallback = jest.fn();
        const wrapper = getWrapper({
            entries: ["one", "two", "three"],
            onValueChange: valueChangeCallback,
            options,
        });

        const dropdownInput = wrapper.find("[data-id='value-entry']");

        dropdownInput.simulate("change", { target: { value: "not a valid entry" } });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ENTER });
        expect(valueChangeCallback).not.toBeCalled();
    });

    it("renders placeholder classname when there is a placeholder prop", function() {
        const placeholderTest = shallow(
            <Multivalues placeholder="placeholder text" />
        );
        expect(placeholderTest.find(".value-input__placeholder").exists()).toBeTruthy();
    });

    it("doesn't render placeholder classname when there is no placeholder prop", function() {
        const placeholderTest = shallow(
            <Multivalues />
        );
        expect(placeholderTest.find(".value-input__placeholder").exists()).toBeFalsy();
    });
});

