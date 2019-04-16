import React from "react";
import { shallow } from "enzyme";
import Image, { imageSizes, imageTypes } from "../Image";

describe("Image", () => {
    it("renders the component", () => {
        const component = shallow(<Image source="" />);
        expect(component.exists()).toEqual(true);
    });

    it("renders with SM size", () => {
        const component = shallow(
            <Image
                size={imageSizes.SM}
                source=""
            />
        );

        expect(component.hasClass("image-component--sm")).toEqual(true);
    });

    it("renders with AUTO size", () => {
        const component = shallow(
            <Image
                size={imageSizes.AUTO}
                source=""
            />
        );

        expect(component.hasClass("image-component--auto")).toEqual(true);
    });

    it("renders with SM size and SQUARE type", () => {
        const component = shallow(
            <Image
                size={imageSizes.SM}
                source=""
                type={imageTypes.SQUARE}
            />
        );

        expect(component.hasClass("image-component--sm-square")).toEqual(true);
    });

    it("renders with AUTO size and SQUARE type", () => {
        const component = shallow(
            <Image
                size={imageSizes.AUTO}
                source=""
                type={imageTypes.SQUARE}
            />
        );

        expect(component.hasClass("image-component--auto-square")).toEqual(true);
    });

    it("renders with no role if it does not have onClick", () => {
        const component = shallow(
            <Image
                size={imageSizes.XL}
                source=""
            />
        );

        expect(component.props().role).toBeUndefined();
    });

    it("renders with role if component has onClick prop", () => {
        const component = shallow(
            <Image
                onClick={jest.fn()}
                size={imageSizes.XL}
                source=""
            />
        );

        expect(component.props().role).toEqual("button");
    });
});
