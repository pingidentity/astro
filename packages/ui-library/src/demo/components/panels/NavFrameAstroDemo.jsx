import React from "react";
import { Logo, NavLink, NavMenu, NavSearch, Copyright } from "ui-library/lib/components/panels/NavFrame";
import
NavFrameAstro,
{ EnvironmentSelectorAstro, FeaturedItem }
    from "ui-library/lib/components/panels/NavFrame/NavFrameAstro";
import GlobalMessage, { messageTypes } from "ui-library/lib/components/general/GlobalMessage";


/**
* @name NavFrameAstroDemo
* @memberof NavFrameAstro
* @desc A demo for NavFrameAstro
*/
export default class NavFrameAstroDemo extends React.Component {

    _allEnvironments =
    [

        { id: 0, label: "My Ping" },
        { id: 1, label: "first" },
        { id: 2, label: "second" },
        { id: 3, label: "third" },
        { id: 4, label: "fourth" },
        { id: 5, label: "fifth" },
        { id: 6, label: "sixth" },
        { id: 7, label: "seventh" },
        { id: 8, label: "8th" },
        { id: 9, label: "9th" },
        { id: 10, label: "sixthsixthsixthsixthsixthsixthsixthsixthsixthsixthsixthsixth" },

    ]
    state = {
        selectedEnvironment: {
            label: "Select an environment"
        },
        searchString: "",
    }




    _tempNavTree = [
        {
            id: "4evenworse",
            icon: "globe",
            label: "Section without children",
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
                },
                {
                    id: 456,
                    label: "Group 2",
                    children: [
                        {
                            id: 556,
                            label: "really really really really really long node"
                        },
                        {
                            id: 4556,
                            label: "End node"
                        },
                        {
                            id: 54556,
                            label: "End node"
                        },
                        {
                            id: 5456,
                            label: "End node"
                        }
                    ]
                }
            ]
        },

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
                            label: "node"
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

    onSearch = (e) => {
        this.setState({ searchString: e.target.value });
    }

    render() {
        return (
            <div style={{ height: "500px" }}>
                <NavFrameAstro
                    autoSelectFirstNode={false}
                    appMessage={
                        <GlobalMessage type={messageTypes.WARNING} buttonLabel="Solve My Problem">
                            I have a problem
                        </GlobalMessage>
                    }
                    menuTop={
                        <>
                            <Logo id="pingfed" />
                            <EnvironmentSelectorAstro
                                searchInputProps={{ placeholder: "Search environments" }}
                                onSearch={this.onSearch}
                                searchString={this.state.searchString}
                                onSearchClear={()=>this.setState({ searchString: "" })}
                                onClose={()=>this.setState({ searchString: "" })}
                                label="Environments"
                                renderEnvironment={
                                    (props, Item) => props.environment.id === 0
                                        ? <FeaturedItem {...props} />
                                        : <Item {...props} />
                                }
                                environments={
                                    this._allEnvironments.filter(
                                        ({ label }) => !label.indexOf(this.state.searchString)
                                    )
                                }
                                selectedEnvironment={this.state.selectedEnvironment}
                                onEnvironmentChange={
                                    (environment) => this.setState({ selectedEnvironment: environment })
                                }
                            />
                        </>
                    }
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
                    renderNode= {(props, Node) => {
                        return <Node {...props} />;
                    }}
                >
                    Selected ID: {this.state.selectedNode}
                </NavFrameAstro>
                <p>Using the provided reducer:</p>
            </div>
        );
    }
}
