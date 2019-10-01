"use strict";

import { mount } from "enzyme";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import StateContainer from "../../utils/StateContainer";
import { allFlags } from "../../../util/FlagUtils";

jest.mock("react-portal");

jest.dontMock("../ModalButton");
jest.dontMock("../Modal");
jest.dontMock("../If");
jest.dontMock("../../../util/EventUtils.js");

describe("ModalButtonTest v4", function () {
    var React = require("react"),
        ModalButton = require("../ModalButton"),
        _ = require("underscore");

    require("../Modal"); // just so Jest include the code coverage on Modal.jsx in the report

    var linkCallback = function () {
        return (<span className="someCallbackClass">Link</span>);
    };

    beforeEach(function () {
        window.setTimeout = jest.fn();
    });

    const getButton = component => component.find("button.buttonClass");
    const getModal = component => component.find("div.modal");
    const getCloseLink = component => component.find("span.close-modal");

    function getComponentWithoutDefaults (opts) {
        return mount(<ModalButton {...opts} flags={allFlags} />);
    }
    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            activatorButtonLabel: "My Button",
            activatorButtonClassName: "buttonClass",
            onOpen: jest.fn(),
            onClose: jest.fn().mockReturnValue(true),
        });

        return getComponentWithoutDefaults(opts);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <ModalButton
                activatorButtonLabel={"My Button"}
                activatorButtonClassName={"buttonClass"}
                onOpen={jest.fn()}
                onClose={jest.fn().mockReturnValue(true)}
            />
        );
    });

    it("Doesn't render body until expanded", function () {
        const component = getComponent({ modalBody: jest.fn() });

        expect(component.props().modalBody).not.toBeCalled();

        component.find(StateContainer).first().instance().callbacks.onOpen();
        expect(component.props().modalBody).toBeCalled();
    });

    it("Test default render", function () {
        const component = getComponent();

        // Expect a single button to be rendered.
        const button = getButton(component);
        expect(button.first().text()).toBe("My Button");

        // Expect no modal to be rendered.
        const modals = getModal(component);
        expect(modals.length).toEqual(0);
    });

    it("Button and modal render default data-ids if not provided", function () {
        const component = getComponent({ expanded: true });
        const button = component.find("button[data-id='modal-button-button']");
        const modal = component.find(".modal[data-id='modal-button-modal']");

        expect(button.length).toBe(1);
        expect(modal.length).toBe(1);
    });

    it("Button and modal render data-ids if provided", function () {
        const did = "myid";
        const component = getComponent({ "data-id": did, expanded: true });
        const button = component.find(`button[data-id='${did}-button']`);
        const modal = component.find(`div[data-id='${did}-modal']`);

        expect(button.length).toBe(1);
        expect(modal.length).toBe(1);
    });

    /*
     * Ensure that a modal set to be initially open
     * via: expanded=true
     * is rendered as such.
     *
     */
    it("Modal initially open", function () {
        const component = getComponent({ initialState: { expanded: true } });

        // Expect a single button to be rendered.
        expect(getButton(component).length).toBe(1);

        // Expect a single shown modal to be rendered.
        expect(getModal(component).find(".show").length).toBe(1);
    });

    /*
     * Ensure that a modal can be opened by clicking the button,
     * and that the appropriate callback is called when the modal
     * is opened.
     *
     * Happy path modal functionality.
     */
    it("Initially closed modal opened on click", function () {
        const component = getComponent();

        // Expect a single button to be rendered.
        const button = getButton(component);

        // Expect no modal to be rendered.
        const modals = getModal(component);
        expect(modals.length).toEqual(0);

        // Callback should not have been called yet
        expect(component.props().onOpen.mock.calls.length).toBe(0);

        button.simulate("click");

        // Expect a single shown modal to be rendered after click.
        const modal = getModal(component);
        expect(modal.find(".show").length).toBe(1);

        // Callback should have been called one time for the one click
        expect(component.props().onOpen.mock.calls.length).toBe(1);
    });

    /*
     * Ensure that the modal keeps working for repeated use,
     * i.e. their are no state issues etc, by opening and
     * closing it a couple of times.
     *
     */
    it("Open, close, open, close again", function () {
        const component = getComponent();

        // Expect a single button to be rendered.
        const button = getButton(component);

        // Expect no modal to be rendered.
        expect(getModal(component).length).toBe(0);

        // Callback should not have been called yet
        expect(component.props().onOpen.mock.calls.length).toBe(0);
        expect(component.props().onClose.mock.calls.length).toBe(0);


        // --- Open Modal
        button.simulate("click");

        // Expect a single shown modal to be rendered after click.
        const modal = getModal(component);
        expect(modal.find(".show").length).toBe(1);

        // Open callback should have been called one time for the one click
        expect(component.props().onOpen.mock.calls.length).toBe(1);
        expect(component.props().onClose.mock.calls.length).toBe(0);

        // --- Close modal
        const closeLink = getCloseLink(component);
        closeLink.simulate("click");

        // Expect no modal to be rendered
        expect(getModal(component).length).toBe(0);

        // Should be a single call to each callback now
        expect(component.props().onOpen.mock.calls.length).toBe(1);
        expect(component.props().onClose.mock.calls.length).toBe(1);


        // --- Open the modal again
        button.simulate("click");

        // Expect a single shown modal to be rendered after click.
        expect(getModal(component).find(".show").length).toBe(1);

        // Open callback should have been called one time for the one click
        expect(component.props().onOpen.mock.calls.length).toBe(2);
        expect(component.props().onClose.mock.calls.length).toBe(1);


        // --- Close modal again
        closeLink.simulate("click");

        // Expect no modal to be rendered
        expect(getModal(component).length).toBe(0);

        // Should be two calls to each callback now
        expect(component.props().onOpen.mock.calls.length).toBe(2);
        expect(component.props().onClose.mock.calls.length).toBe(2);
    });

    it("Test alternative link render as text", function () {
        const component = getComponentWithoutDefaults({
            activatorContent: "some text",
            activatorContentClassName: "someStyle",
            onOpen: jest.fn(),
            onClose: jest.fn().mockReturnValue(true)
        });

        // Expect a single button to be rendered.
        const button = component.find(".someStyle");
        expect(button.text()).toBe("some text");

        // Expect no modal to be rendered.
        const modals = getModal(component);
        expect(modals.length).toEqual(0);

        button.simulate("click");

        // Expect a single shown modal to be rendered after click.
        getModal(component);
    });

    it("Test alternative link render as callback", function () {
        const component = getComponentWithoutDefaults({
            activatorContent: linkCallback,
            activatorContentClassName: "someStyle",
            onOpen: jest.fn(),
            onClose: jest.fn().mockReturnValue(true)
        });

        // Expect a single button to be rendered.
        const button = component.find(".someStyle");
        expect(button.text()).toBe("Link");

        // Ensure callback returned span rendered as expected.
        const span = component.find(".someCallbackClass");
        expect(span.text()).toBe("Link");

        // Expect no modal to be rendered.
        var modals = getModal(component);
        expect(modals.length).toEqual(0);

        button.simulate("click");

        // Expect a single shown modal to be rendered after click.
        expect(getModal(component).length).toBe(1);
    });

    it("Test activator container enablement through prop", function () {
        const component = getComponent({
            activatorContainerClassName: "activatorContainerClassName"
        });

        const container = component.find("div[data-id='modal-button-button-container']");

        expect(container.length).toBe(1);
    });

    it("Test warning on providing both the activator label and the content", function () {
        console.warn = jest.fn();

        getComponentWithoutDefaults({
            activatorButtonLabel: "button label",
            activatorContent: "some text",
            onOpen: jest.fn(),
            onClose: jest.fn().mockReturnValue(true)
        });

        expect(console.warn).toBeCalledWith("Only one of ('content', 'buttonLabel') is required");
    });

    it("Renders the content inline when told so through props", function () {
        // inline render
        const component = getComponent({ inline: true });
        expect(component.find("span[data-id='modal-button']").length).toBe(1);

        // not inline
        const blockComponent = getComponent({});
        expect(blockComponent.find("div[data-id='modal-button']").length).toBe(1);
    });

    it("Open/close stateful modal button", function () {
        const component = getComponentWithoutDefaults({
            activatorButtonLabel: "some text"
        });
        console.log(component.html());

        // Expect a single button to be rendered.
        const button = component.find("button[data-id='modal-button-button']");

        // Expect no modal to be rendered.
        const modals = getModal(component);
        expect(modals.length).toBe(0);


        // --- Open Modal
        button.simulate("click");

        // Expect a single shown modal to be rendered after click.
        const modal = getModal(component);
        expect(modal.find(".show").length).toBe(1);

        // --- Close modal
        const closeLink = getCloseLink(component);
        closeLink.simulate("click");

        // Expect no modal to be rendered
        expect(getModal(component).length).toBe(0);
    });

    it("Open/close stateless modal button", function () {
        const component = getComponentWithoutDefaults({
            activatorContent: "some text",
            onOpen: jest.fn().mockReturnValue(true),
            onClose: jest.fn().mockReturnValue(true),
        });

        expect(component.find(ModalButton._statelessComponent).length).toBe(1);

    });

    it("does not call onClose callback when bg is clicked and closeOnBgClick prop is false", function () {
        const component = getComponentWithoutDefaults({
            activatorContent: linkCallback,
            onOpen: jest.fn(),
            onClose: jest.fn().mockReturnValue(true),
            stateless: true,
            expanded: true,
            closeOnBgClick: false
        });
        const modalBg = component.find("[data-id='modal-bg']");

        modalBg.simulate("click");
        expect(component.props().onClose.mock.calls.length).toBe(0);
    });

    it("calls onClose callback when bg is clicked and closeOnBgClick prop is true", function () {
        var component = getComponentWithoutDefaults({
            activatorContent: linkCallback,
            onOpen: jest.fn(),
            onClose: jest.fn().mockReturnValue(true),
            stateless: true,
            expanded: true,
            closeOnBgClick: true
        });
        const modalBg = component.find("[data-id='modal-bg']");

        modalBg.simulate("click");
        expect(component.props().onClose.mock.calls.length).toBe(1);
    });

    it("renders component", () => {
        const modal = mount(
            <ModalButton
                activatorButtonLabel="Open Default Modal"
            />
        );
        expect(modal.find(StateContainer).exists()).toBeTruthy();

    });

    it("opened on click", function () {
        const component = getComponent();

        // Expect a single button to be rendered.
        const button = getButton(component);

        // Expect no modal to be rendered.
        const modals = getModal(component);
        expect(modals.length).toEqual(0);

        // Callback should not have been called yet
        expect(component.props().onOpen.mock.calls.length).toBe(0);

        button.simulate("click");

        // Expect a single shown modal to be rendered after click.
        const modal = getModal(component);
        expect(modal.find(".show").length).toBe(1);

        // Callback should have been called one time for the one click
        expect(component.props().onOpen.mock.calls.length).toBe(1);
    });

    it("open and closes modal", function () {
        const component = getComponent();

        const button = getButton(component);

        // Expect no modal to be rendered.
        let modals = getModal(component);
        expect(modals.length).toBe(0);

        // Callback should not have been called yet
        expect(component.props().onOpen.mock.calls.length).toBe(0);
        expect(component.props().onClose.mock.calls.length).toBe(0);


        // --- Open Modal
        button.simulate("click");

        // Expect a single shown modal to be rendered after click.
        const modal = getModal(component);
        expect(modal.find(".show").length).toBe(1);

        // Open callback should have been called one time for the one click
        expect(component.props().onOpen.mock.calls.length).toBe(1);
        expect(component.props().onClose.mock.calls.length).toBe(0);

        // --- Close modal
        const closeLink = getCloseLink(component);
        closeLink.simulate("click");

        // Expect no modal to be rendered
        modals = getModal(component);
        expect(modals.length).toBe(0);

        // Should be a single call to each callback now
        expect(component.props().onOpen.mock.calls.length).toBe(1);
        expect(component.props().onClose.mock.calls.length).toBe(1);
    });

});
