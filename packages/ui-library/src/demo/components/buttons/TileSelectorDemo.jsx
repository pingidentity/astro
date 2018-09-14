import React from "react";
import TileSelector from "../../../components/buttons/TileSelector";

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
                    <TileSelector.TileButton title="Web App" iconName="network">
                        Cloud-based apps that are accessed within a browser.
                    </TileSelector.TileButton>
                    <TileSelector.TileButton title="Native App" iconName="device" selected>
                        Applications that are stored and run from a device or desktop.
                    </TileSelector.TileButton>
                    <TileSelector.TileButton title="Single Page App" iconName="apps">
                        Just a bit of text.
                    </TileSelector.TileButton>
                    <TileSelector.TileButton title="Non-Interactive" iconName="server">
                        Cloud-based apps that are accessed within a browser.
                    </TileSelector.TileButton>
                </TileSelector>
                <hr className="hr" />
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
                            iconName: "server",
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
            </div>
        );
    }
}

export default TileSelectorDemo;
