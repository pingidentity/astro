import React from "react";
import { shallow } from "enzyme";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import GlobalMessage, { messageTypes } from "../GlobalMessage";
import Button, { buttonTypes } from "../../buttons/Button";
import Icon from "../Icon";

describe("Global Message", () => {
    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <GlobalMessage
                type={messageTypes.WARNING}
            />
        );
    });

    it("renders the component", () => {
        const component = shallow(
            <GlobalMessage />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders a clear icon if the type is not set to ERROR", () => {
        const component = shallow(
            <GlobalMessage
                type={messageTypes.WARNING}
            />
        );

        expect(component.find(Icon).exists()).toEqual(true);
    });

    it("does not render a clear icon if the type is set to ERROR", () => {
        const component = shallow(
            <GlobalMessage
                type={messageTypes.ERROR}
            />
        );

        expect(component.find(Icon).exists()).toEqual(false);
    });

    it("renders a button if buttonLabel is passed in", () => {
        const component = shallow(
            <GlobalMessage
                buttonLabel="Really just an incredible button"
            />
        );

        const button = component.find(Button);

        expect(button.exists()).toEqual(true);
        expect(button.props().type).toBeUndefined();
    });

    it("does not render a button if buttonLabel is not passed in", () => {
        const component = shallow(
            <GlobalMessage />
        );

        expect(component.find(Button).exists()).toEqual(false);
    });

    it("renders button with danger type if message type is error", () => {
        const component = shallow(
            <GlobalMessage
                buttonLabel="VERY DANGEROUS PLEASE RUN"
                type={messageTypes.ERROR}
            />
        );

        const scaryButton = component.find(Button);

        expect(scaryButton.props().type).toEqual(buttonTypes.DANGER);
    });
});
