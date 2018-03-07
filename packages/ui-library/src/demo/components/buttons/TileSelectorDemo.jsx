import React from "react";
import TileButton from "../../../components/buttons/TileButton";
import TileSelector from "../../../components/buttons/TileSelector";

/**
 * @name TileButtonDemo
 * @memberof TileButton
 * @desc A demo for TileButton
 */
class TileSelectorDemo extends React.Component {
    state = { selected: "webapp" };

    render() {
        const onValueChange = value => this.setState({ selected: value });

        return (
            <div>
                <TileSelector>
                    <TileButton title="Web App" iconName="network">
                        Cloud-based apps that are accessed within a browser.
                    </TileButton>
                    <TileButton title="Native App" iconName="device" selected>
                        Applications that are stored and run from a device or desktop.
                    </TileButton>
                    <TileButton title="Single Page App" iconName="apps">
                        Just a bit of text.
                    </TileButton>
                    <TileButton title="Non-Interactive" iconName="server">
                        Cloud-based apps that are accessed within a browser.
                    </TileButton>
                </TileSelector>
                <hr className="hr" />
                <TileSelector
                    onValueChange={onValueChange}
                    selected={this.state.selected}
                    options={[
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
                        }
                    ]}
                />
            </div>
        );
    }
}

export default TileSelectorDemo;
