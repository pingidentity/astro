jest.mock("popper.js");
jest.mock("react-portal");

jest.dontMock("../Modal");
jest.dontMock("../If");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../tooltips/CancelTooltip");
jest.dontMock("../../tooltips/DetailsTooltip");
jest.dontMock("../../../util/Utils");

import React from "react";
import ReactDOM from "react-dom";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import Modal, { BodyTitle } from "../Modal";
import { shallow } from "enzyme";
import _ from "underscore";
const Wrapper = TestUtils.UpdatePropsWrapper;

describe("ModalTest v4", function () {

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    window.setTimeout = jest.fn();
    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
        window.setTimeout.mockClear();
    });

    function getComponent (opts) {
        const modalDefaults = _.defaults(opts || {}, {
            onOpen: jest.fn(),
            onClose: jest.fn().mockReturnValue(true),
        });

        return ReactTestUtils.renderIntoDocument(<Modal {...modalDefaults} />);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <Modal
                expanded
            />
        );
    });

    it("detaches event listeners and calls close event on unmount", function () {
        const component = getComponent({ expanded: true });
        const handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];
        const close = jest.fn();
        document.body.addEventListener("ui-library-modal-close", close);

        expect(window.addEventListener).toBeCalled();

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(window.removeEventListener).toBeCalledWith("keydown", handler);
        expect(close).toBeCalled();
    });

    it("no close event on unmount when component was never opened", function () {
        const component = getComponent({ expanded: false });
        const close = jest.fn();
        const open = jest.fn();
        document.body.addEventListener("ui-library-modal-open", open);
        document.body.addEventListener("ui-library-modal-close", close);

        expect(open).not.toBeCalled();
        component.componentWillUnmount();
        expect(close).not.toBeCalled();
    });

    it("keydown event listener does not trigger when modal is closed", function () {
        const component = getComponent(); //eslint-disable-line
        const handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];
        const e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        };

        //expect that the collapsed modal does not process keypress events
        handler(e);
        expect(e.stopPropagation).not.toBeCalled();
    });

    it("keydown event listener triggers when modal is expanded", function () {
        const component = getComponent({ expanded: true }); //eslint-disable-line
        const handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];
        const e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        };


        //expect that the collapsed modal does not process keypress events
        handler(e);
        expect(e.stopPropagation).toBeCalled();
    });

    it("emits open and close events", function () {
        const
            openListenerCallback = jest.fn(),
            closeListenerCallback = jest.fn(),
            component = ReactTestUtils.renderIntoDocument(
                <Wrapper
                    type={Modal}
                    expanded={false}
                    onOpen={jest.fn()}
                    onClose={jest.fn()}
                />
            );

        document.body.addEventListener("ui-library-modal-open", openListenerCallback);
        document.body.addEventListener("ui-library-modal-close", closeListenerCallback);

        component._setProps({ expanded: true });
        expect(openListenerCallback).toBeCalled();
        expect(closeListenerCallback).not.toBeCalled();

        component._setProps({ expanded: false });
        expect(closeListenerCallback).toBeCalled();
    });

    it("emits open and close events in IE", function () {
        const UtilsMock = require("../../../util/Utils");
        UtilsMock.isIE = () => { return true; };

        const
            openListenerCallback = jest.fn(),
            closeListenerCallback = jest.fn(),
            component = ReactTestUtils.renderIntoDocument(
                <Wrapper
                    type={Modal}
                    expanded={false}
                    onOpen={jest.fn()}
                    onClose={jest.fn()}
                />
            );

        document.body.addEventListener("ui-library-modal-open", openListenerCallback);
        document.body.addEventListener("ui-library-modal-close", closeListenerCallback);

        component._setProps({ expanded: true });
        expect(openListenerCallback).toBeCalled();
        expect(closeListenerCallback).not.toBeCalled();

        component._setProps({ expanded: false });
        expect(closeListenerCallback).toBeCalled();
    });

    it("Doesn't render body until expanded", function () {
        const htmlDid = "my-content";
        const children = (<div data-id={htmlDid}></div>);
        let component = getComponent({ children: children });
        let content = TestUtils.findRenderedDOMNodeWithDataId(component, htmlDid);

        expect(content).toBeFalsy();

        component = getComponent({ children: children, expanded: true });
        content = TestUtils.findRenderedDOMNodeWithDataId(component, htmlDid);

        expect(content).toBeTruthy();
    });

    it("Test default render", function () {
        const component = getComponent();

        // Expect no modal to be rendered.
        const modals = TestUtils.scryRenderedDOMNodesWithClass(component, "modal");
        expect(modals.length).toEqual(0);
    });

    it("Modal render default data-ids if not provided", function () {
        const component = getComponent({ expanded: true }),
            modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");

        expect(modal.getAttribute("data-id")).toEqual("modal-button");
    });

    it("Modal render data-ids if provided", function () {
        const did = "myid",
            component = getComponent({ "data-id": did, expanded: true }),
            modal = TestUtils.findRenderedDOMNodeWithDataId(component, did);

        expect(ReactTestUtils.isDOMComponent(modal)).toBeTruthy();
    });

    /*
     * Ensure that a modal set to be initially open
     * via: expanded=true
     * is rendered as such.
     *
     */
    it("Modal initially open", function () {
        const component = getComponent({ initiallyExpanded: true });

        // Expect a single button to be rendered.
        TestUtils.findRenderedDOMNodeWithClass(component, "buttonClass");

        // Expect a single shown modal to be rendered.
        const modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");
        TestUtils.findRenderedDOMNodeWithClass(modal, "show");
    });

    it("renders in headerless mode", function () {
        const component = getComponent({ expanded: true, showHeader: false });

        // Expect a single button to be rendered.
        TestUtils.findRenderedDOMNodeWithClass(component, "buttonClass");

        // Expect a single shown modal to be rendered.
        const modal = TestUtils.findRenderedDOMNodeWithClass(component, "modal");
        TestUtils.findRenderedDOMNodeWithClass(modal, "show");
        const header = TestUtils.scryRenderedDOMNodesWithClass(modal, "modal-header");

        //no header
        expect(header.length).toBe(0);

        //but close link is here
        TestUtils.findRenderedDOMNodeWithClass(modal, "close-modal");
    });

    it("Cancel tooltip renders and triggers callbacks.", function () {
        const cancelConfirm = jest.fn();
        const cancelDeny = jest.fn();
        const modalParams = {
            expanded: true,
            cancelTooltip: {
                title: "Cancel Confirmation",
                open: false,
                onConfirm: cancelConfirm,
                onCancel: cancelDeny,
                messageText: "Are you sure?",
                confirmButtonText: "Yes",
                cancelButtonText: "No"
            }
        };
        let component = getComponent(modalParams);
        let cancelTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-tooltip");
        let cancelTooltipContent = TestUtils.findRenderedDOMNodeWithDataId(cancelTooltip, "details-content");

        expect(cancelTooltipContent).toBeFalsy();

        modalParams.cancelTooltip.open = true;
        component = getComponent(modalParams);
        cancelTooltip = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-tooltip");
        cancelTooltipContent = TestUtils.findRenderedDOMNodeWithDataId(cancelTooltip, "details-content");
        expect(cancelTooltip).toBeTruthy();

        const tooltipConfirmBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-confirm-btn"),
            tooltipDenyBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-deny-btn"),
            tooltipTitle = TestUtils.findRenderedDOMNodeWithDataId(component, "details-title"),
            tooltipText = TestUtils.findRenderedDOMNodeWithDataId(component, "modal-button-cancel-tooltip-text");

        ReactTestUtils.Simulate.click(tooltipConfirmBtn);
        expect(cancelConfirm).toBeCalled();
        expect(cancelDeny).not.toBeCalled();

        ReactTestUtils.Simulate.click(tooltipDenyBtn);
        expect(cancelDeny).toBeCalled();

        expect(tooltipConfirmBtn.textContent).toBe(modalParams.cancelTooltip.confirmButtonText);
        expect(tooltipDenyBtn.textContent).toBe(modalParams.cancelTooltip.cancelButtonText);
        expect(tooltipTitle.textContent).toBe(modalParams.cancelTooltip.title);
        expect(tooltipText.textContent).toBe(modalParams.cancelTooltip.messageText);
    });

    it("BodyTitle test", function () {
        const titleText = "This is my title";
        const component =
            shallow(
                <BodyTitle>
                    {titleText}
                </BodyTitle>
            );

        const TitleNode = component.find(".body-title");

        expect(TitleNode.text()).toEqual(titleText);
    });

    it("should render an Unsaved Changes warning popup with ALERT type", function() {
        const component = shallow(<Modal.UnsavedWarningPopup />);

        expect(component.find(Modal).first().props().type).toBe(Modal.Type.ALERT);
    });
});
