import React from "react";
import HR from "../../../components/general/HR";
import TileSelector, {
    TileButton,
    TileGroup,
    selectorTypes
} from "../../../components/buttons/TileSelector";
import LibraryLogo from "../../core/LibraryLogo";

/**
 * @name TileSelectorDemo
 * @memberof TileSelector
 * @desc A demo for TileSelector
 */
class TileSelectorDemo extends React.Component {
    state = { selected: "webapp" };

    _logArguments = (buttonId, panelId, e) => {
        console.log("Button id: ", buttonId);
        console.log("Panel id: ", panelId);
        console.log("Event: ", e);
    }

    _handleValueChange = value => this.setState({ selected: value });

    render() {
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
                <TileSelector>
                    <TileGroup
                        title="With groups"
                    >
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
                    </TileGroup>
                    <TileGroup
                        title="Another group"
                    >
                        <TileButton title="Single Page App" iconName="apps" details={[
                            "Cloud-based",
                            "Easily accessible"
                        ]}>
                        Just a bit of text.
                        </TileButton>
                        <TileButton title="Non-Interactive" icon={<LibraryLogo variant="dark" />}>
                        Cloud-based apps that are accessed within a browser.
                        </TileButton>
                    </TileGroup>
                </TileSelector>
                <HR />
                <TileSelector
                    data-id="second-one"
                    onValueChange={this._handleValueChange}
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
                                        onButtonClick: this._logArguments
                                    },
                                    {
                                        buttonLabel: "Configure",
                                        content: "Employs Universal Login and whatnot",
                                        id: "OIDC",
                                        label: "OIDC",
                                        onButtonClick: this._logArguments
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
                                        onButtonClick: this._logArguments
                                    },
                                    {
                                        buttonLabel: "Configure",
                                        content: "Employs Universal Login and whatnot",
                                        id: "OIDC",
                                        label: "OIDC",
                                        onButtonClick: this._logArguments
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
                                        onButtonClick: this._logArguments
                                    },
                                    {
                                        buttonLabel: "Configure",
                                        content: "Employs Universal Login and whatnot",
                                        id: "OIDC",
                                        label: "OIDC",
                                        onButtonClick: this._logArguments
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
                                        onButtonClick: this._logArguments
                                    },
                                    {
                                        buttonLabel: "Configure",
                                        content: "Employs Universal Login and whatnot",
                                        id: "OIDC",
                                        label: "OIDC",
                                        onButtonClick: this._logArguments
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
                <TileSelector
                    type="stacked"
                    groups={[
                        {
                            id: "first",
                            title: "Stacked group"
                        },
                        {
                            id: "second",
                            title: "Another stacked group"
                        }
                    ]}
                    options={[
                        {
                            id: "webapp",
                            title: "Web App",
                            iconName: "network",
                            description: "Cloud-based apps that are accessed within a browser.",
                            link: { text: "Read More" },
                            note: "A Good Tile",
                            group: "first"
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
                            group: "second"
                        },
                        {
                            id: "spa",
                            title: "Single Page App",
                            iconName: "apps",
                            description: "Just a bit of text.",
                            note: "A Bad Tile",
                            group: "second"
                        },
                        {
                            id: "noninteractive",
                            title: "Non-Interactive",
                            icon: <img src="./images/src/images/logo-pingidentity.png" />,
                            description: "Cloud-based apps that are accessed within a browser.",
                            note: "A Good Tile",
                            group: "first"
                        }
                    ]}
                />
                <HR />
                <TileSelector
                    type={selectorTypes.SQUARE}
                >
                    <TileButton
                        title="Facebook"
                        iconName="facebook"
                    />
                    <TileButton
                        title="Twitter"
                        iconName="twitter"
                    />
                    <TileButton
                        title="LinkedIn"
                        iconName="linkedin"
                    />
                </TileSelector>
                <HR />
                <TileSelector
                    type={selectorTypes.SQUARE}
                >
                    <TileGroup
                        title="Square group"
                    >
                        <TileButton
                            title="Facebook"
                            iconName="facebook"
                        />
                        <TileButton
                            title="Twitter"
                            iconName="twitter"
                        />
                    </TileGroup>
                    <TileGroup
                        title="Second group"
                    >
                        <TileButton
                            title="LinkedIn"
                            iconName="linkedin"
                        />
                    </TileGroup>
                </TileSelector>
                <HR />
                <TileSelector
                    type={selectorTypes.ACTION}
                >
                    <TileButton
                        title="OAuth Authorization Server Settings"
                        iconName="facebook"
                    >
                        Manage global OAuth settings.
                    </TileButton>
                    <TileButton
                        title="OAuth Scopes"
                        iconName="twitter"
                    >
                        Manage the copes that can be requested by OAuth Clients.
                    </TileButton>
                    <TileButton
                        title="Extended Properties"
                        iconName="linkedin"
                    >
                        Define additional opportunities for Connections and OAuth Clients
                        that can be used in authentication policy decisions.
                    </TileButton>
                    <TileButton
                        title="Data Stores"
                        iconName="cog"
                    >
                        Connect to existing data stores for authentication credential validation and attribute lookup.
                    </TileButton>
                    <TileButton
                        title="Password Credential Validators"
                        iconName="globe"
                    >
                        Manage the way passwords are validated.
                    </TileButton>
                    <TileButton
                        title="Active Directory and Kerberos"
                        iconName="cog"
                    >
                        Manage the integration with Active Directory for Kerberos authentication, such as seamless
                        authentication from a Microsoft Windows desktop session.
                    </TileButton>
                </TileSelector>
            </div>
        );
    }
}

export default TileSelectorDemo;
