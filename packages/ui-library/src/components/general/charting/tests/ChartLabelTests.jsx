import React from "react";
import { shallow } from "enzyme";
import ChartLabel from "../ChartLabel";

describe("ChartLabel", () => {
    const defaultProps = {
        color: "#000000",
        label: "something",
        x: 0,
        y: 0,
    };

    it("renders the component", () => {
        const component = shallow(
            <ChartLabel
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });
});
