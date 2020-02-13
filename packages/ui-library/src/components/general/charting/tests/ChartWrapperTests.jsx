import React from "react";
import { shallow } from "enzyme";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";
import ChartWrapper from "../ChartWrapper";

describe("ChartWrapper", () => {
    const defaultProps = {
        "data-id": "test-wrapper",

    };
    const getComponent = props => shallow(<ChartWrapper {...defaultProps} {...props} />);

    it("renders the component", () => {
        const component = getComponent();
        expect(component.exists()).toEqual(true);
    });

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <ChartWrapper />
        );
    });

    it("shows loading message if loadingMessage prop is passed in", () => {
        const component = getComponent({
            loadingMessage: "loading"
        });

        expect(component.find(".chart-wrapper__loader").exists()).toEqual(true);
    });

    it("does not show loading message if loadingMessage prop is not passed in", () => {
        const component = getComponent();

        expect(component.find(".chart-wrapper__loader").exists()).toEqual(false);
    });

    it("shows message if message prop is passed in", () => {
        const component = getComponent({
            message: "loading"
        });

        expect(component.find(".chart-wrapper__message").exists()).toEqual(true);
    });

    it("does not show loading message if message prop is not passed in", () => {
        const component = getComponent();

        expect(component.find(".chart-wrapper__message").exists()).toEqual(false);
    });
});