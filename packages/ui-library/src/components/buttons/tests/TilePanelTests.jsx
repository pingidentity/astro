import React from "react";
import { isDOMComponent, renderIntoDocument } from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import TilePanel from "../TilePanel";

describe("Tile Panel", () => {
    const defaultOptions = [
        {
            buttonLabel: "Configure",
            content: "Apps that utilize whatever",
            label: "SAML"
        },
        {
            buttonLabel: "Configure",
            content: "Employs Universal Login and whatnot",
            label: "OIDC",
        }
    ];

    function getComponent({
        options = defaultOptions,
        ...props
    } = {}) {
        return renderIntoDocument(
            <div>
                <TilePanel options={options} {...props} />
            </div>
        );
    }

    it("successfully renders the component", () => {
        const component = getComponent();

        expect(isDOMComponent(component)).toEqual(true);
    });

    it("successfully renders component with label", () => {
        const component = getComponent({ label: "label" });
        const label = TestUtils.findRenderedDOMNodeWithClass(component, "tile-panel__label");

        expect(isDOMComponent(label)).toEqual(true);
    });

    it("successfully renders the component when given a node for options", () => {
        const component = getComponent({ options: <div/> });

        expect(isDOMComponent(component)).toEqual(true);
    });

    it("renders correct number of options", () => {
        const component = getComponent();
        const options = TestUtils.scryRenderedDOMNodesWithClass(component, "tile-panel__option");

        expect(options.length).toEqual(2);
    });
});
