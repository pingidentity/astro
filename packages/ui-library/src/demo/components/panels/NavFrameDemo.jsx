import React from "react";
import NavFrame, { Logo, NavLink, NavMenu, NavSearch, Copyright } from "ui-library/lib/components/panels/NavFrame";
import GlobalMessage, { messageTypes } from "ui-library/lib/components/general/GlobalMessage";


/**
* @name NavFrameDemo
* @memberof NavFrame
* @desc A demo for NavFrame
*/
export default class NavFrameDemo extends React.Component {
    state = {

    }

    _tempNavTree = [
        {
            id: "SNAAAARF1",
            label: "Header 1",
            children: [
                {
                    id: "4evenworse",
                    icon: "globe",
                    label: "Section without children",
                    children: [
                        {
                            id: 44,
                            label: "Group",
                            children: [
                                {
                                    id: 645,
                                    label: "really really really really really long node"
                                },
                                {
                                    id: 445,
                                    label: "End node"
                                },
                                {
                                    id: 4545,
                                    label: "End node"
                                },
                                {
                                    id: 454,
                                    label: "End node"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "evenworse5",
                    icon: "globe",
                    label: "Section without children",
                    children: [
                        {
                            id: 45,
                            label: "Group",
                            children: [
                                {
                                    id: 55,
                                    label: "really really really really really long node"
                                },
                                {
                                    id: 455,
                                    label: "End node"
                                },
                                {
                                    id: 5455,
                                    label: "End node"
                                },
                                {
                                    id: 545,
                                    label: "End node"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "1",
            label: "Header 2",
            children: [
                {
                    icon: "globe",
                    id: 12,
                    label: "Connections",
                    children: [
                        {
                            id: 14,
                            label: "Group",
                            children: [
                                {
                                    id: 15,
                                    label: "really really really really really long node"
                                },
                                {
                                    id: 145,
                                    label: "End node"
                                },
                                {
                                    id: 1545,
                                    label: "End node"
                                },
                                {
                                    id: 154,
                                    label: "End node"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 23,
                    icon: "link",
                    label: "Applications",
                    children: [
                        {
                            id: 24,
                            label: "Group",
                            children: [
                                {
                                    id: 25,
                                    label: "really really really really really long node"
                                },
                                {
                                    id: 245,
                                    label: "End node"
                                },
                                {
                                    id: 2545,
                                    label: "End node"
                                },
                                {
                                    id: 254,
                                    label: "End node"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    render() {
        return (
            <div style={{ height: "500px" }}>
                <NavFrame
                    autoSelectFirstNode={false}
                    appMessage={
                        <GlobalMessage type={messageTypes.WARNING} buttonLabel="Solve My Problem">
                            I have a problem
                        </GlobalMessage>
                    }
                    headerLeft={<Logo id="pingfed" />}
                    headerRight={[
                        <NavSearch
                            initialTitle="Previous searches"
                            initialResults={[145, 1545]}
                            navTree={this._tempNavTree}
                            onClose={e => console.log("Closed", e)}
                            onOpen={e => console.log("Opened", e)}
                            onSearchClick={result => this.setState({ selectedNode: result && result.id })}
                            sort={({ startsWith, contains }) => [...startsWith, ...contains]}
                            title="Results"
                        />,
                        <NavLink key="nav-link" iconName="help" href="whatevertheheck" target="_blank" />,
                        <NavMenu
                            iconName="account"
                            items={[
                                {
                                    icon: "globe",
                                    id: "id",
                                    label: "About"
                                },
                                {
                                    icon: "on-off",
                                    id: "signout",
                                    label: "Sign Out"
                                },
                            ]}
                            key="nav-menu"
                            onItemClick={(item) => console.log(item)}
                        />,
                    ]}
                    copyright={<Copyright copyrightYear={2003} />}
                    navTree={this._tempNavTree}
                    onSelectItem={id => this.setState({ selectedNode: id })}
                    selectedNode={this.state.selectedNode}
                >
                    Selected ID: {this.state.selectedNode}
                </NavFrame>
                <p>Using the provided reducer:</p>
            </div>
        );
    }
}
