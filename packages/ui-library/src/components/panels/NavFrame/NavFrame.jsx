import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";
import NavHeader from "./NavHeader";
import NavSidebar from "./NavSidebar";
import { generateNavTreePropType } from "../../../util/PropUtils";

/**
* @callback NavFrame~onSelectItem
* @param {string|number} id
*     The ID of the selected item.
* @param Object event
*     The event object that triggered the selection.
*/

/**
* @typedef NavFrame~navTreeNode
* @property {string|Object} icon
*     If provided, shows an icon beside the node. Only works for nodes shown in the
*     sidebar.
* @property {string|number} id
*     The id of the node; used to distinguish it in callbacks and for selecting it.
* @property {string} label
*     The label for the node, shown in the sidebar or header.
* @property {NavFrame~navTreeNode[]}
*     The children of a node; for example, the sidebar nodes that correspond to a
*     given header.
*/

/**
* @class NavFrame
* @desc The navigation frame for an application, created based on a nav tree.
*
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {string} [data-id="rocker-button"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {boolean} autoSelectFirstNode=true
*     If true, the NavFrame will automatically show the first node in the navTree.
*     Passing in selectedNode overrides this.
* @param {Object} [copyright]
*     If provided, shows a copyright
* @param {Object} [headerLeft]
*     The React nodes to show on the left side of the header.
* @param {Object[]} [headerRight]
*     An array of React nodes shown on the right side of the header.
* @param {NavFrame~navTreeNode[]} navTree
*     The nav tree object use to generate the navigation nodes of the NavFrame.
* @param {string|number} [selectedNode]
*     The currently selected node of the NavFrame, specified by the ID of that node.
* @param {NavFrame~onSelectItem} [onSelectItem]
*     Callback triggered when any item is selected. Passes back the ID of the selection
*     and the event that triggered it.
*
* @example
*    <NavFrame
*        autoSelectFirstNode={false}
*        appMessage={
*            <GlobalMessage type={messageTypes.WARNING} buttonLabel="Solve My Problem">
*                I have a problem
*            </GlobalMessage>
*        }
*        headerLeft={<Logo id="pingfed" />}
*        headerRight={[
*            <NavLink iconName="help" href="whatevertheheck" target="_blank" />,
*            <NavMenu
*                iconName="account"
*                items={[
*                    {
*                        icon: "globe",
*                        id: "id",
*                        label: "About"
*                    },
*                    {
*                        icon: "on-off",
*                        id: "signout",
*                        label: "Sign Out"
*                    },
*                ]}
*                onItemClick={(item) => console.log(item)}
*            />
*        ]}
*        copyright={<Copyright copyrightYear={2003} />}
*        navTree={[
*           {
*                id: "1",
*                label: "Header 2",
*                children: [
*                    {
*                        icon: "globe",
*                        id: 12,
*                        label: "Connections",
*                        children: [
*                            {
*                                id: 14,
*                                label: "Group",
*                                children: [
*                                    {
*                                        id: 15,
*                                        label: "really really really really really long node"
*                                    },
*                                    {
*                                        id: 145,
*                                        label: "End node"
*                                    },
*                                    {
*                                        id: 1545,
*                                        label: "End node"
*                                    },
*                                    {
*                                        id: 154,
*                                        label: "End node"
*                                    }
*                                ]
*                            }
*                        ]
*                    },
*                }
*            }
*        ]
*        onSelectItem={id => this.setState({ selectedNode: id })}
*        selectedNode={154}
*    >
*        Selected ID: {this.state.selectedNode}
*    </NavFrame>
*/

// Build an id-based index of all nodes in the tree.
const getNodeDetails = ({
    group,
    header,
    section
} = {}) => (index, {
    children = [],
    id,
    label,
}) => {
    const childIndexes = children.reduce(getNodeDetails({
        header: !header ? id : header,
        section: header && !section ? id : section,
        group: header && section && !group ? id : group
    }), index);
    const { firstNode } = childIndexes;
    return {
        ...childIndexes,
        [id]: {
            group,
            header: header || id,
            label,
            section: section || id,
        },
        // Find first node so that it can be used as a default selection
        firstNode: !firstNode && children.length === 0 ? id : firstNode
    };
};

const getSelectedNode = (firstNode, selectedNode, autoSelectFirstNode) => {
    if (selectedNode !== undefined) {
        return selectedNode;
    } else {
        return autoSelectFirstNode ? firstNode : undefined;
    }
};

export default function NavFrame({
    autoSelectFirstNode,
    children: componentChildren,
    copyright,
    "data-id": dataId,
    headerLeft,
    headerRight,
    appMessage,
    navTree,
    onSelectItem,
    selectedNode
}) {
    // Memoize because this is an expensive operation that really only needs to run if the navTree changes. JSON.stringify
    // suggested by Dan Abramov - https://github.com/facebook/react/issues/14476
    const indexedTree = useMemo(
        () => navTree.reduce(getNodeDetails(), {}),
        [JSON.stringify(navTree)]
    );
    const { firstNode } = indexedTree;

    const selected = getSelectedNode(firstNode, selectedNode, autoSelectFirstNode);

    const {
        header: selectedHeader,
        section: selectedSection
    } = indexedTree[selectedNode !== undefined ? selectedNode : firstNode];

    const {
        children: sectionNodes,
        label: selectedHeaderLabel
    } = navTree.find(({ id }) => id === selectedHeader);

    const [collapsedState, setCollapsed] = useState(true);

    return (
        <div className="nav-frame" data-id={dataId}>
            {appMessage}
            <NavHeader
                left={headerLeft}
                navTree={navTree}
                onSelectItem={id => {
                    setCollapsed(true);
                    onSelectItem(id);
                }}
                right={headerRight}
                selectedHeader={selectedHeader}
            />
            <div className="nav-frame__bottom">
                <NavSidebar
                    collapsed={collapsedState}
                    copyright={copyright}
                    onCollapse={() => setCollapsed(true)}
                    onSelectItem={(id, e) => {
                        setCollapsed(false);
                        onSelectItem(id, e);
                    }}
                    selectedHeaderLabel={selectedHeaderLabel}
                    selectedNode={selected}
                    selectedSection={selected ? selectedSection : undefined}
                    navTree={sectionNodes}
                />
                <div className="nav-content">
                    {componentChildren}
                </div>
            </div>
        </div>
    );
}


NavFrame.propTypes = {
    autoSelectFirstNode: PropTypes.bool,
    copyright: PropTypes.node,
    "data-id": PropTypes.string,
    headerLeft: PropTypes.node,
    headerRight: PropTypes.node,
    navTree: generateNavTreePropType(4),
    onSelectItem: PropTypes.func,
    selectedNode: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

NavFrame.defaultProps = {
    autoSelectFirstNode: true,
    "data-id": "nav-frame",
    onSelectItem: noop
};
