import FlexRow, { justifyOptions, alignments, spacingOptions, flexDirectionOptions } from "../FlexRow";
import Padding from "../Padding";
import React from "react";
import { shallow } from "enzyme";

describe("Flex Row", () => {
    it("renders the component", () => {
        const component = shallow(<FlexRow />);

        expect(component.exists()).toBeTruthy();
    });

    it("renders with correct center alignment class", () => {
        const component = shallow(<FlexRow alignment={alignments.CENTER} />);

        expect(component.find(".flex-row--align-center").exists()).toBeTruthy();
    });

    it("renders with correct top alignment class", () => {
        const component = shallow(<FlexRow alignment={alignments.TOP} />);

        expect(component.find(".flex-row--align-top").exists()).toBeTruthy();
    });

    it("renders with correct bottom alignment class", () => {
        const component = shallow(<FlexRow alignment={alignments.BOTTOM} />);

        expect(component.find(".flex-row--align-bottom").exists()).toBeTruthy();
    });

    it("renders with correct center justify class", () => {
        const component = shallow(<FlexRow justify={justifyOptions.CENTER} />);

        expect(component.find(".flex-row--justify-center").exists()).toBeTruthy();
    });

    it("renders with correct end justify class", () => {
        const component = shallow(<FlexRow justify={justifyOptions.END} />);

        expect(component.find(".flex-row--justify-end").exists()).toBeTruthy();
    });

    it("renders with correct space between justify class", () => {
        const component = shallow(<FlexRow justify={justifyOptions.SPACEBETWEEN} />);

        expect(component.find(".flex-row--justify-between").exists()).toBeTruthy();
    });

    it("renders with correct start justify class", () => {
        const component = shallow(<FlexRow justify={justifyOptions.START} />);

        expect(component.find(".flex-row--justify-start").exists()).toBeTruthy();
    });

    it("adds padding components between children with correct spacing", () => {
        const component = shallow(
            <FlexRow
                spacing={spacingOptions.XL}
            >
                <div />
                <div />
                <div />
            </FlexRow>
        );

        const spacing = component.find(Padding);

        expect(spacing.length).toEqual(2);
    });

    it("renders with correct column flex direction class", () => {
        const component = shallow(<FlexRow flexDirection={flexDirectionOptions.COLUMN} />);

        expect(component.find(".flex-row--flex-direction-column").exists()).toBeTruthy();
    });

    it("renders with correct column reverse flex direction class", () => {
        const component = shallow(<FlexRow flexDirection={flexDirectionOptions.COLUMNREVERSE} />);

        expect(component.find(".flex-row--flex-direction-column-reverse").exists()).toBeTruthy();
    });

    it("renders with correct row flex direction class", () => {
        const component = shallow(<FlexRow flexDirection={flexDirectionOptions.ROW} />);

        expect(component.find(".flex-row--flex-direction-row").exists()).toBeTruthy();
    });

    it("renders with correct row reverse flex direction class", () => {
        const component = shallow(<FlexRow flexDirection={flexDirectionOptions.ROWREVERSE} />);

        expect(component.find(".flex-row--flex-direction-row-reverse").exists()).toBeTruthy();
    });
});
