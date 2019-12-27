window.__DEV__ = true;

import { shallow } from "enzyme";

jest.dontMock("../FormLabel");
jest.dontMock("../../tooltips/HelpHint");
jest.dontMock("../../general/If");

import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";

import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import FormLabel from "../FormLabel";

describe("FormLabel", function () {
    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <FormLabel
                hint="hint"
                lockText="LOCKED THE HECK UP"
            />
        );
    });

    it("renders if it has children", function () {
        var label = ReactTestUtils.renderIntoDocument(
            <FormLabel><div>some text</div></FormLabel>);
        var node = ReactDOM.findDOMNode(label);

        expect(node).not.toBe(null);
        expect(node.innerHTML).toContain("some text");
    });

    it("doesnt render anything when nothing is passed", function () {
        var label = ReactTestUtils.renderIntoDocument(<FormLabel />);
        var node = ReactDOM.findDOMNode(label);

        expect(node).toBe(null);
    });

    it("renders just label", function () {
        var label = ReactTestUtils.renderIntoDocument(<FormLabel value="hello" />);
        var node = ReactDOM.findDOMNode(label);
        var hint = ReactDOM.findDOMNode(label.refs.hint);

        expect(node.textContent).toBe("hello");
        expect(hint).toBe(null);
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("render label and hint", function () {
        // var label = ReactTestUtils.renderIntoDocument(<FormLabel value="hello" hint="my hint" />);
        // var hint = ReactDOM.findDOMNode(label.refs.hint);

        // expect(hint.textContent.trim()).toBe("my hint");
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("renders label, hint and lock", function () {
        // var label = ReactTestUtils.renderIntoDocument(
        //     <FormLabel value="hello" hint="my hint" lockText="why locked" />),
        //     hint = ReactDOM.findDOMNode(label.refs.hint),
        //     lockText = ReactDOM.findDOMNode(label.refs.lock);

        // expect(hint.textContent).toEqual("my hint");
        // expect(lockText.textContent).toEqual("why locked");
    });

    it("renders classname and data-id", function () {
        var label = ReactTestUtils.renderIntoDocument(
            <FormLabel value="hello" hint="my hint" data-id="my-id" className="my-label" />
        );
        var node = ReactDOM.findDOMNode(label);

        expect(node.getAttribute("data-id")).toBe("my-id");
        expect(node.getAttribute("class")).toBe("my-label");
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormLabel value="foo" />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "formLabel");
        expect(element).toBeDefined();
    });

    it("Renders the formlabel with a description", () => {
        const component = shallow(
            <FormLabel value="hello" description="bar"/>
        );
        expect(component.find(".label-text__description").exists()).toBeTruthy();
    });

    it("Renders the formlabel with an explanation", () => {
        const component = shallow(
            <FormLabel value="hello" explanation="bar"/>
        );
        expect(component.find(".form-label__explanation").exists()).toBeTruthy();
    });

});
