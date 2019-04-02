import React from "react";
import HR from "../../../components/general/HR";
import TileSelector, { TileButton, tileButtonTypes } from "../../../components/buttons/TileSelector";
import LibraryLogo from "../../core/LibraryLogo";

/**
 * @name TileSelectorDemo
 * @memberof TileSelector
 * @desc A demo for TileSelector
 */
class TileSelectorDemo extends React.Component {
    state = { selected: "webapp" };

    logArguments = (buttonId, panelId, e) => {
        console.log("Button id: ", buttonId);
        console.log("Panel id: ", panelId);
        console.log("Event: ", e);
    }

    render() {
        const onValueChange = value => this.setState({ selected: value });

        return (
            <div>
                <TileSelector>
                    <TileButton
                        details={[
                            "Cloud-based",
                            "Easily accessible"
                        ]}
                        iconName="network"
                        title="Web App"
                    >
                        Cloud-based apps that are accessed within a browser.
                    </TileButton>
                    <TileButton title="Native App" iconName="device" selected >
                        Applications that are stored and run from a device or desktop.
                    </TileButton>
                    <TileButton title="Single Page App" iconName="apps" details={[
                        "Cloud-based",
                        "Easily accessible"
                    ]}>
                        Just a bit of text.
                    </TileButton>
                    <TileButton title="Non-Interactive" icon={<LibraryLogo variant="dark" />}>
                        Cloud-based apps that are accessed within a browser.
                    </TileButton>
                </TileSelector>
                <HR />
                <TileSelector
                    data-id="second-one"
                    onValueChange={onValueChange}
                    selected={this.state.selected}
                    options={[
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
                                        id: "SAML",
                                        label: "SAML",
                                        onButtonClick: this.logArguments
                                    },
                                    {
                                        buttonLabel: "Configure",
                                        content: "Employs Universal Login and whatnot",
                                        id: "OIDC",
                                        label: "OIDC",
                                        onButtonClick: this.logArguments
                                    }
                                ]
                            }
                        },
                        {
                            id: "native",
                            title: "Native App",
                            iconName: "device",
                            description: "Applications that are stored and run from a device or desktop.",
                            details: [
                                "Cloud-based",
                                "Easily accessible"
                            ],
                            panel: {
                                label: "CHOOSE CONNECTION TYPE",
                                options: [
                                    {
                                        buttonLabel: "Configure",
                                        content: "Apps that utilize whatever",
                                        id: "SAML",
                                        label: "SAML",
                                        onButtonClick: this.logArguments
                                    },
                                    {
                                        buttonLabel: "Configure",
                                        content: "Employs Universal Login and whatnot",
                                        id: "OIDC",
                                        label: "OIDC",
                                        onButtonClick: this.logArguments
                                    }
                                ]
                            }
                        },
                        {
                            id: "spa",
                            title: "Single Page App",
                            iconName: "apps",
                            description: "Just a bit of text.",
                            panel: {
                                label: "CHOOSE CONNECTION TYPE",
                                options: [
                                    {
                                        buttonLabel: "Configure",
                                        content: "Apps that utilize whatever",
                                        id: "SAML",
                                        label: "SAML",
                                        onButtonClick: this.logArguments
                                    },
                                    {
                                        buttonLabel: "Configure",
                                        content: "Employs Universal Login and whatnot",
                                        id: "OIDC",
                                        label: "OIDC",
                                        onButtonClick: this.logArguments
                                    }
                                ]
                            }
                        },
                        {
                            id: "noninteractive",
                            title: "Non-Interactive",
                            icon: <img src="./images/src/images/logo-pingidentity.png" />,
                            description: "Cloud-based apps that are accessed within a browser.",
                            panel: {
                                label: "CHOOSE CONNECTION TYPE",
                                options: [
                                    {
                                        buttonLabel: "Configure",
                                        content: "Apps that utilize whatever",
                                        id: "SAML",
                                        label: "SAML",
                                        onButtonClick: this.logArguments
                                    },
                                    {
                                        buttonLabel: "Configure",
                                        content: "Employs Universal Login and whatnot",
                                        id: "OIDC",
                                        label: "OIDC",
                                        onButtonClick: this.logArguments
                                    }
                                ]
                            }
                        }
                    ]}
                />
                <HR />
                <TileSelector
                    type="stacked"
                    options={[
                        {
                            id: "webapp",
                            title: "Web App",
                            iconName: "network",
                            description: "Cloud-based apps that are accessed within a browser.",
                            link: { text: "Read More" },
                            note: "A Good Tile",
                        },
                        {
                            id: "native",
                            title: "Native App",
                            iconName: "device",
                            description: "Applications that are stored and run from a device or desktop.",
                            details: [
                                "Cloud-based",
                                "Easily accessible"
                            ],
                            note: "A Good Tile",
                        },
                        {
                            id: "spa",
                            title: "Single Page App",
                            iconName: "apps",
                            description: "Just a bit of text.",
                            note: "A Bad Tile",
                        },
                        {
                            id: "noninteractive",
                            title: "Non-Interactive",
                            icon: <img src="./images/src/images/logo-pingidentity.png" />,
                            description: "Cloud-based apps that are accessed within a browser.",
                            note: "A Good Tile",
                        }
                    ]}
                />
                <HR />
                <TileSelector>
                    <TileButton
                        title="Facebook"
                        iconName="facebook"
                        type={tileButtonTypes.SQUARE}
                    />
                    <TileButton
                        title="Twitter"
                        iconName="twitter"
                        type={tileButtonTypes.SQUARE}
                    />
                    <TileButton
                        title="LinkedIn"
                        iconName="linkedin"
                        type={tileButtonTypes.SQUARE}
                    />
                </TileSelector>
            </div>
        );
    }
}

export default TileSelectorDemo;
