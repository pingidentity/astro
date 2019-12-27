import React from "react";
import { shallow } from "enzyme";
import Legend, { boxAlignments, LegendItem } from "../Legend";

describe("Legend", () => {
    const defaultProps = {
        data: [
            {
                id: "1D",
                helpText: "This is by day",
                data: [
                    {
                        id: "November 11, 2019",
                        data: [
                            60,
                            20,
                        ]
                    },
                    {
                        id: "November 12, 2019",
                        data: [
                            20,
                            30,
                        ]
                    },
                    {
                        id: "November 13, 2019",
                        data: [
                            40,
                            60,
                        ]
                    },
                ]
            }
        ]
    };

    it("renders the component", () => {
        const component = shallow(
            <Legend
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders with correct left boxAlignment class", () => {
        const component = shallow(
            <Legend
                {...defaultProps}
                boxAlignment={boxAlignments.LEFT}
            />
        );

        expect(component.find(".legend--left").exists()).toEqual(true);
    });

    it("renders with correct center boxAlignment class", () => {
        const component = shallow(
            <Legend
                {...defaultProps}
                boxAlignment={boxAlignments.CENTER}
            />
        );

        expect(component.find(".legend--center").exists()).toEqual(true);
    });

    it("renders with correct right boxAlignment class", () => {
        const component = shallow(
            <Legend
                {...defaultProps}
                boxAlignment={boxAlignments.RIGHT}
            />
        );

        expect(component.find(".legend--right").exists()).toEqual(true);
    });

    describe("LegendItem", () => {
        it("renders the component", () => {
            const component = shallow(
                <LegendItem
                    color="#000000"
                    label="BORK BORK"
                    value="<(--<)"
                />
            );

            expect(component.exists()).toEqual(true);
        });

        it("renders with novalue class if there isn't a value", () => {
            const component = shallow(
                <LegendItem
                    color="#000000"
                    label="BORK BORK"
                />
            );

            expect(component.find(".legend__item-novalue").exists()).toEqual(true);
        });

        it("doesn't render with novalue class if there is a value", () => {
            const component = shallow(
                <LegendItem
                    color="#000000"
                    label="BORK BORK"
                    value="<(--<)"
                />
            );

            expect(component.find(".legend__item-novalue").exists()).toEqual(false);
        });
    });
});
