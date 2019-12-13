import React from "react";
import { shallow } from "enzyme";
import Legend, { LegendItem } from "../Legend";

describe("Legend", () => {
    it("renders the component", () => {
        const component = shallow(
            <Legend
                data={[
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
                ]}
            />
        );

        expect(component.exists()).toEqual(true);
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
