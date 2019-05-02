window.__DEV__ = true;

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import MessageButton, { statuses } from "../MessageButton";

describe("MessageButton", function () {

    const myDataId = "señor-mssg-button";

    const defaultProps = {
        "data-id": myDataId
    };

    const getComponent = (props) => {
        return ReactTestUtils.renderIntoDocument(<div><MessageButton {...defaultProps} {...props} /></div>);
    };

    it("renders the component in the default state", function () {
        const component = getComponent();
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        const icon = TestUtils.findRenderedDOMNodeWithDataId(component, "icon");
        const loader = TestUtils.findRenderedDOMNodeWithDataId(component, "ellipsis-loader");

        expect(button).toBeTruthy();
        expect(button.className).toBe("button message-button message-button--default");
        expect(icon).toBeFalsy();
        expect(loader).toBeFalsy();
    });

    it("renders the component in the inline form", function () {
        const component = getComponent({ inline: true });
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        const icon = TestUtils.findRenderedDOMNodeWithDataId(component, "icon");
        const loader = TestUtils.findRenderedDOMNodeWithDataId(component, "ellipsis-loader");

        expect(button).toBeTruthy();
        expect(button.className).toBe("button message-button message-button--default inline");
        expect(icon).toBeFalsy();
        expect(loader).toBeFalsy();
    });

    it("renders the loading state", function () {
        const component = getComponent({ status: statuses.LOADING });
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        const icon = TestUtils.findRenderedDOMNodeWithDataId(component, "icon");
        const loader = TestUtils.findRenderedDOMNodeWithDataId(component, "ellipsis-loader");

        expect(button.className).toContain("message-button--loading");
        expect(icon).toBeFalsy();
        expect(loader).toBeTruthy();
    });

    it("renders the success state", function () {
        const component = getComponent({ status: statuses.SUCCESS });
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        const iconGraphic = TestUtils.findRenderedDOMNodeWithDataId(component, "icon-graphic");
        const loader = TestUtils.findRenderedDOMNodeWithDataId(component, "ellipsis-loader");

        expect(button.className).toContain("message-button--success");
        expect(iconGraphic.className).toContain("icon-success-round");
        expect(loader).toBeFalsy();
    });

    it("renders the error state", function () {
        const component = getComponent({ status: statuses.ERROR });
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        const iconGraphic = TestUtils.findRenderedDOMNodeWithDataId(component, "icon-graphic");
        const loader = TestUtils.findRenderedDOMNodeWithDataId(component, "ellipsis-loader");

        expect(button.className).toContain("message-button--error");
        expect(iconGraphic.className).toContain("icon-alert-solid");
        expect(loader).toBeFalsy();
    });

    it("triggers the onClick", function () {
        const onClick = jest.fn();
        const component = getComponent({
            onClick: onClick
        });

        expect(onClick).not.toHaveBeenCalled();
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        ReactTestUtils.Simulate.click(button);
        expect(onClick).toHaveBeenCalled();
    });

    it("does not trigger the onClick", function () {
        const onClick = jest.fn();

        let component = getComponent({
            onClick: onClick,
            status: statuses.LOADING,
        });
        expect(onClick).not.toHaveBeenCalled();
        let button = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        ReactTestUtils.Simulate.click(button);
        expect(onClick).not.toHaveBeenCalled();

        component = getComponent({
            onClick: onClick,
            status: statuses.SUCCESS,
        });
        expect(onClick).not.toHaveBeenCalled();
        button = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        ReactTestUtils.Simulate.click(button);
        expect(onClick).not.toHaveBeenCalled();

        component = getComponent({
            onClick: onClick,
            status: statuses.ERROR,
        });
        expect(onClick).not.toHaveBeenCalled();
        button = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        ReactTestUtils.Simulate.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });
});
