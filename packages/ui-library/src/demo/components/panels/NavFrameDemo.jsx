import React from "react";
import NavFrame, {
    NavSearch,
    NavLink,
    NavMenu,
    EnvironmentSelector,
    MarketSelector
} from "../../../components/panels/NavFrame";



/**
* @name HeaderBarDemo
* @memberof HeaderBar
* @desc A demo for HeaderBar
*/
class HeaderBarDemo extends React.Component {
    static flags = [ "use-portal" ];

    state = {

    }

    _tempNavTree = [
        {
            id: "SNAAAARF",
            label: "Header 1",
            children: [
                {
                    id: "evenworse",
                    icon: "globe",
                    label: "Section without children"
                }
            ]
        },
        {
            id: "1",
            label: "Header 2",
            children: [
                {
                    icon: "globe",
                    id: 2,
                    label: "Section",
                    children: [
                        {
                            id: 4,
                            label: "Group",
                            children: [
                                {
                                    id: 5,
                                    label: "End node"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    icon: "link",
                    label: "SPLEHRT"
                }
            ]
        }
    ]

    render() {
        return (
            <div style={{ height: "300px" }}>

                <NavFrame
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

module.exports = HeaderBarDemo;
