import FlexRow, { justifyOptions, alignments } from "../FlexRow";
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
});