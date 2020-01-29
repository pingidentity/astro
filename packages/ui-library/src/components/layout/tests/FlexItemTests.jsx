import FlexItem, { flexPositions } from "../FlexItem";
import React from "react";
import { shallow } from "enzyme";

describe("Flex Item", () => {
    it("renders the component", () => {
        const component = shallow(<FlexItem/>);

        expect(component.exists()).toBeTruthy();
    });

    it("renders default classname when component is rendered", () => {
        const component = shallow(<FlexItem />);

        expect(component.find(".flex-item").exists()).toBeTruthy();
    });

    it("renders with correct flexPosition class when flexPosition is set to ForceEnd", () => {
        const component = shallow(<FlexItem flexPosition={flexPositions.FORCEEND} />);

        expect(component.find(".flex-item--force-end").exists()).toBeTruthy();
    });

    it("does not render a flexPosition class when flexPosition prop is not defined", () => {
        const component = shallow(<FlexItem />);

        expect(component.find(".flex-item--force-end" || ".flex-item--force-start"||
        ".flex-item--force-center").exists()).toBeFalsy();
    });

    it("renders with correct flexPosition class when flexPosition is set to ForceStart", () => {
        const component = shallow(<FlexItem flexPosition={flexPositions.FORCESTART} />);

        expect(component.find(".flex-item--force-start").exists()).toBeTruthy();
    });

    it("renders with correct flexPosition class when flexPosition is set to ForceCenter", () => {
        const component = shallow(<FlexItem flexPosition={flexPositions.FORCECENTER} />);

        expect(component.find(".flex-item--force-center").exists()).toBeTruthy();
    });

    it("renders with correct flexPosition class when flexPosition is set to ForceCenter", () => {
        const component = shallow(<FlexItem flexPosition={flexPositions.FORCECENTER} />);

        expect(component.find(".flex-item--force-center").exists()).toBeTruthy();
    });

    it("renders flexGrow inline style when grow prop is used", () => {
        const component = shallow(<FlexItem grow="1" />);

        expect(component.find(".flex-item").prop("style")).toHaveProperty("flexGrow", "1");
    });

    it("renders flexShrink inline style when shrink prop is used", () => {
        const component = shallow(<FlexItem shrink="1" />);

        expect(component.find(".flex-item").prop("style")).toHaveProperty("flexShrink", "1");
    });

    it("renders flexBasis inline style when basis prop is used", () => {
        const component = shallow(<FlexItem basis="40px" />);

        expect(component.find(".flex-item").prop("style")).toHaveProperty("flexBasis", "40px");
    });

});
