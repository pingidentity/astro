import React from "react";
import { render, screen } from "@testing-library/react";
import { AboutModal, AboutLogo, AboutVersion } from "../About";

test("default About Modal", () => {
    render(
        <AboutModal
            modalTitle="About PingCentral"
            expanded
        >
            <AboutLogo src={null} />
            <AboutVersion>Version 1.5.1</AboutVersion>
        </AboutModal>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Version 1.5.1")).toBeInTheDocument();
});
