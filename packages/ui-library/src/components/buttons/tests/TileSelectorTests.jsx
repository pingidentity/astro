window.__DEV__ = true;

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { mount } from "enzyme";
import _ from "underscore";
import TestUtils from "../../../testutil/TestUtils";
import TileSelector, { selectorTypes } from "../TileSelector";
import TileButton from "../TileButton";

describe("TileSelector", function() {
    function getComponent(opts) {
        opts = _.defaults(opts || {}, {
            selected: "webapp",
            options: [
                {
                    id: "webapp",
                    title: "Web App",
                    iconName: "network",
                    description: "Cloud-based apps that are accessed within a browser.",
                    link: { text: "read more" },
                    note: "a note",
                },
                {
                    id: "native",
                    title: "Native App",
                    iconName: "device",
                    description: "Applications that are stored and run from a device or desktop."
                },
                {
                    id: "spa",
                    title: "Single Page App",
                    iconName: "apps",
                    description: "Just a bit of text."
                },
                {
                    id: "noninteractive",
                    title: "Non-Interactive",
                    iconName: "server",
                    description: "Cloud-based apps that are accessed within a browser."
                },
            ]
        });

        return ReactTestUtils.renderIntoDocument(<div><TileSelector {...opts} /></div>);
    }

    const mountComponent = props => mount(
        <TileSelector
            {...props}
        >
            <TileButton title="WHY AM I HERE WHAT DO I MEAN" />
        </TileSelector>
    );

    it("clicks trigger correct callback", function() {
        const callback = jest.fn();
        const onValueChange = value => callback(value);
        const component = getComponent({
            onValueChange
        });

        var newOption = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "tile-selector-button-spa"
        );

        ReactTestUtils.Simulate.click(newOption);
        expect(callback).lastCalledWith("spa");
    });

    it("does not error with default callback", function() {
        const component = getComponent();

        var newOption = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "tile-selector-button-spa"
        );

        ReactTestUtils.Simulate.click(newOption);
        expect(component).toBeTruthy();
    });

    it("renders panel with left position correctly", () => {
        const component = getComponent({
            options: [
                {
                    id: "webapp",
                    title: "Web App",
                    iconName: "network",
                    description: "Cloud-based apps that are accessed within a browser.",
                    panel: {
                        label: "CHOOSE CONNECTION TYPE",
                        options: [
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
                        ]
                    }
                },
                {
                    id: "native",
                    title: "Native App",
                    iconName: "device",
                    description: "Applications that are stored and run from a device or desktop."
                },
                {
                    id: "spa",
                    title: "Single Page App",
                    iconName: "apps",
                    description: "Just a bit of text."
                },
                {
                    id: "noninteractive",
                    title: "Non-Interactive",
                    iconName: "server",
                    description: "Cloud-based apps that are accessed within a browser."
                },
            ]
        });
        const panel = TestUtils.findRenderedDOMNodeWithClass(component, "tile-panel--left");

        expect(panel).toBeTruthy();
    });

    it("renders panel with right position correctly", () => {
        const component = getComponent({
            options: [
                {
                    id: "webapp",
                    title: "Web App",
                    iconName: "network",
                    description: "Cloud-based apps that are accessed within a browser."
                },
                {
                    id: "native",
                    title: "Native App",
                    iconName: "device",
                    description: "Applications that are stored and run from a device or desktop."
                },
                {
                    id: "noninteractive",
                    title: "Non-Interactive",
                    iconName: "server",
                    description: "Cloud-based apps that are accessed within a browser.",
                    panel: {
                        label: "CHOOSE CONNECTION TYPE",
                        options: [
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
                        ]
                    }
                },
            ],
            selected: "noninteractive"
        });

        const panel = TestUtils.findRenderedDOMNodeWithClass(component, "tile-panel--right");

        expect(panel).toBeTruthy();
    });

    it("renders a link in a stacked tile button", function() {
        const component = getComponent({ type: "stacked" });

        const note = TestUtils.findRenderedDOMNodeWithDataId(component, "tile-selector-button-webapp-link");

        expect(note).toBeTruthy();
    });

    it("renders correct number of groups and groups options correctly", () => {
        const component = getComponent({
            groups: [
                {
                    id: "one",
                    title: "One"
                },
                {
                    id: "two",
                    title: "Two"
                }
            ],
            options: [
                {
                    id: "webapp",
                    title: "Web App",
                    iconName: "network",
                    description: "Cloud-based apps that are accessed within a browser.",
                    group: "one"
                },
                {
                    id: "native",
                    title: "Native App",
                    iconName: "device",
                    description: "Applications that are stored and run from a device or desktop.",
                    group: "two"
                },
                {
                    id: "noninteractive",
                    title: "Non-Interactive",
                    iconName: "server",
                    description: "Cloud-based apps that are accessed within a browser.",
                    panel: {
                        label: "CHOOSE CONNECTION TYPE",
                        options: [
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
                        ]
                    },
                    group: "two"
                },
            ],
        });

        const groups = TestUtils.scryRenderedDOMNodesWithDataId(component, "tile-group");

        expect(groups.length).toEqual(2);

        const webapp = TestUtils.findRenderedDOMNodeWithDataId(groups[0], "tile-selector-button-webapp");

        expect(webapp).toBeTruthy();

        const noninteractive = TestUtils.findRenderedDOMNodeWithDataId(
            groups[1],
            "tile-selector-button-noninteractive"
        );

        expect(noninteractive).toBeTruthy();
    });

    it("renders non-grouped options in a group container when overall component has groups", () => {
        const component = getComponent({
            groups: [
                {
                    id: "one",
                    title: "One"
                },
                {
                    id: "two",
                    title: "Two"
                }
            ],
            options: [
                {
                    id: "webapp",
                    title: "Web App",
                    iconName: "network",
                    description: "Cloud-based apps that are accessed within a browser.",
                    group: "one"
                },
                {
                    id: "native",
                    title: "Native App",
                    iconName: "device",
                    description: "Applications that are stored and run from a device or desktop.",
                    group: "two"
                },
                {
                    id: "noninteractive",
                    title: "Non-Interactive",
                    iconName: "server",
                    description: "Cloud-based apps that are accessed within a browser.",
                    panel: {
                        label: "CHOOSE CONNECTION TYPE",
                        options: [
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
                        ]
                    },
                },
            ],
        });

        const groups = TestUtils.scryRenderedDOMNodesWithDataId(component, "tile-group");

        expect(groups.length).toEqual(3);

        const webapp = TestUtils.findRenderedDOMNodeWithDataId(groups[0], "tile-selector-button-webapp");

        expect(webapp).toBeTruthy();

        const noninteractive = TestUtils.findRenderedDOMNodeWithDataId(
            groups[2],
            "tile-selector-button-noninteractive"
        );

        expect(noninteractive).toBeTruthy();
    });

    it("applies row context to TileButton", () => {
        const component = mountComponent({
            type: selectorTypes.ROW
        });

        expect(component.find("RowButton").exists()).toEqual(true);
    });

    it("applies stacked context to TileButton", () => {
        const component = mountComponent({
            type: selectorTypes.STACKED
        });

        expect(component.find("StackedButton").exists()).toEqual(true);
    });

    it("applies square context to TileButton", () => {
        const component = mountComponent({
            type: selectorTypes.SQUARE
        });

        expect(component.find("SquareButton").exists()).toEqual(true);
    });

    it("applies action context to TileButton", () => {
        const component = mountComponent({
            type: selectorTypes.ACTION
        });

        expect(component.find("ActionButton").exists()).toEqual(true);
    });
});
