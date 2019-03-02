window.__DEV__ = true;

jest.dontMock("../TileSelector");
jest.dontMock("../TileButton");

describe("TileSelector", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        TileSelector = require("../TileSelector"),
        _ = require("underscore");

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
});
