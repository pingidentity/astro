import React from "react";
import { shallow } from "enzyme";
import TileGroup, { selectorTypes } from "../TileGroup";

describe("TileGroup", () => {
    it("renders the component", () => {
        const component = shallow(
            <TileGroup />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders correct classes when using stacked type", () => {
        const component = shallow(
            <TileGroup
                type={selectorTypes.STACKED}
            />
        );

        const stackedGroup = component.find(".tile-selector__group--stacked");

        expect(stackedGroup.exists()).toEqual(true);

        const stackedTiles = component.find(".tile-selector__group-tiles--stacked");

        expect(stackedTiles.exists()).toEqual(true);
    });

    it("renders correct class when using square type", () => {
        const component = shallow(
            <TileGroup
                type={selectorTypes.SQUARE}
            />
        );

        const squareGroup = component.find(".tile-selector__group--square");

        expect(squareGroup.exists()).toEqual(true);
    });

    it("does not render with square or stacked classes when using row type", () => {
        const component = shallow(
            <TileGroup
                type={selectorTypes.ROW}
            />
        );

        const stackedGroup = component.find(".tile-selector__group--stacked");

        expect(stackedGroup.exists()).toEqual(false);

        const stackedTiles = component.find(".tile-selector__group-tiles--stacked");

        expect(stackedTiles.exists()).toEqual(false);

        const squareGroup = component.find(".tile-selector__group--square");

        expect(squareGroup.exists()).toEqual(false);
    });

    it("renders with correct flex-grow class for its number of children in row mode", () => {
        const component = shallow(
            <TileGroup
                type={selectorTypes.ROW}
            >
                <div />
                <div />
            </TileGroup>
        );

        const growTwo = component.find(".tile-selector__group--grow-2");

        expect(growTwo.exists()).toEqual(true);
    });
});
