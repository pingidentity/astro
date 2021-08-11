import React from "react";
import NavHomeButton from "../NavHomeButton";
import { render, screen } from "@testing-library/react";

describe("NavHomeButton", () => {
    const defaultProps = {
        hoverSrc: "hoverSrc",
        src: "src",
    };

    const getComponent = (props = {}) => render(<NavHomeButton {...defaultProps} {...props} />);

    it("renders the component", () => {
        getComponent();
        const container = screen.getByRole("link");
        expect(container).toBeInTheDocument();
    });
    
    it("img class name changes if href is not provided", () => {
        getComponent();
        const image = screen.getAllByRole("img");
        expect(image[0]).toHaveClass("pingHomeLogoNoHover");
    });
    
    it("img class name changes if href is provided", () => {
        getComponent({ href: "https://www.pingidentity.com" });
        const image = screen.getAllByRole("img");
        expect(image[0]).toHaveClass("pingHomeLogo");
    });

});