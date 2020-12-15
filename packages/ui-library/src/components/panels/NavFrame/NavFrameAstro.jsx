import React, { useMemo, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";
import NavSidebar from "./NavSidebar";
import { generateNavTreePropType, defaultRender } from "../../../util/PropUtils";
import { callIfOutsideOfContainer } from "../../../util/EventUtils";
import classnames from "classnames";
import Icon from "../../general/Icon";

const nonCyclicStringify = (obj) => {
    var seen = [];

    return JSON.stringify(obj, function(key, val) {
        if (val !== null && typeof val === "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    });
};

export const FeaturedItem = (props) =>
    <Environment
        {...props}
        className={classnames("astro-environment-selector__environment--featured", props.className)}
    />;

export const EnvironmentSearchAstro = ({
    inputProps,
    searchString,
    onChange=()=>{},
    onClear=()=>{},
    ...props
}) => {
    const handleClear = (e) => {
        if (onClear) {
            onClear(e);
        }
    };
    return (
        <div {...props}>
            <Icon iconName="search" className="astro-environment-search__icon" />
            <input
                className="astro-environment-search__input"
                autoFocus
                onChange={onChange}
                value={searchString}
                {...inputProps}
            />
            {((inputProps && inputProps.value) || searchString) && onClear &&
            <Icon iconName="clear" className="astro-environment-search__clear" onClick={handleClear} /> }
        </div>);
};

export const Environment = ({
    className,
    onChange,
    children
}) => {return (<li className={className} onClick={onChange}>{children}</li>);};

export const EnvironmentSelectorAstro = ({
    "data-id": dataId,
    label,
    environments,
    renderEnvironment = defaultRender,
    onEnvironmentChange = () => {},
    selectedEnvironment,
    showSearch= true,
    onSearch,
    onSearchClear,
    searchInputProps,
    renderSearch = defaultRender,
    searchString,
    maxListHeight = 340,
    onClose = () => {},
}) => {
    const [open, setOpen] = useState(false);
    const environmentSelector = useRef(null);
    const handleClose = (e) => {
        setOpen(false);
        onClose(e);
    };
    const clickOutsideHandler = (e) => {
        callIfOutsideOfContainer(environmentSelector.current, handleClose, e);
    };
    useEffect(() => {
        window.addEventListener("click", clickOutsideHandler);

        return () => {
            window.removeEventListener("click", clickOutsideHandler);
        };
    }, []);

    const handleEnvironmentChange = environment => (e) => {
        onEnvironmentChange(environment, e);
        handleClose(e);
    };

    const searchBar = useRef();

    const searchBarHeight = searchBar.current ? searchBar.current.offsetHeight : null;
    const listStyles = {
        maxHeight: `${searchBarHeight + maxListHeight}px`
    };

    return (
        <div className="astro-environment-selector" data-id={dataId} ref={environmentSelector}>
            <div className="astro-environment-selector__label">
                {label}
            </div>
            <a
                className={classnames(
                    "astro-environment-selector__trigger",
                    { "astro-environment-selector__trigger--expanded": open }
                )}
                data-id="astro-environment-selector-trigger"
                onClick={() => setOpen(!open)}
            >
                <div className="astro-environment-selector__selected-title">
                    {selectedEnvironment && selectedEnvironment.label}
                </div>

            </a>



            <div
                style={open ? listStyles : null}
                className={classnames(
                    "astro-environment-selector__environment-list-container",
                    {
                        "astro-environment-selector__environment-list-container--expanded": open
                    })
                }
            >
                {showSearch &&
                    <div className="astro-environment-search__container" ref={searchBar}>
                        {renderSearch({
                            onChange: onSearch,
                            onClear: onSearchClear,
                            searchString: searchString,
                            className: "astro-environment-search",
                            inputProps: searchInputProps,
                        }, EnvironmentSearchAstro )}
                    </div>
                }
                <ul
                    className="astro-environment-selector__environment-list"
                    data-id="astro-environment-selector-environment-list"
                >
                    {
                        environments.map(environment => {
                            return renderEnvironment({
                                environment,
                                selected: selectedEnvironment && environment.id === selectedEnvironment.id,
                                onChange: handleEnvironmentChange(environment),
                                children: <a>{environment.label}</a>,
                                className: classnames(
                                    "astro-environment-selector__environment",
                                    {
                                        "astro-environment-selector__environment--selected":
                                            selectedEnvironment && environment.id === selectedEnvironment.id,
                                    },
                                )
                            }, Environment);
                        })
                    }
                </ul>

            </div>
        </div>
    );
};

EnvironmentSelectorAstro.propTypes = {
    "data-id": PropTypes.string,
    label: PropTypes.node,
    onEnvironmentChange: PropTypes.func,
    environments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            label: PropTypes.string
        })
    ),
    selectedEnvironment:
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            label: PropTypes.string
        }),
    renderEnvironment: PropTypes.func,
    renderSearch: PropTypes.func,
};
/**
* @callback NavFrameAstro~onSelectItem
* @param {string|number} id
*     The ID of the selected item.
* @param Object event
*     The event object that triggered the selection.
*/

/**
* @typedef NavFrameAstro~navTreeNode
* @property {string|Object} icon
*     If provided, shows an icon beside the node. Only works for nodes shown in the
*     sidebar.
* @property {string|number} id
*     The id of the node; used to distinguish it in callbacks and for selecting it.
* @property {string} label
*     The label for the node, shown in the sidebar or header.
* @property {NavFrameAstro~navTreeNode[]}
*     The children of a node; for example, the sidebar nodes that correspond to a
*     given header.
*/

/**
* @class NavFrameAstro
* @desc The navigation frame for an application, created based on a nav tree.
*
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {string} [data-id="rocker-button"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {boolean} autoSelectFirstNode=true
*     If true, the NavFrameAstro will automatically show the first node in the navTree.
*     Passing in selectedNode overrides this.
* @param {Object} [copyright]
*     If provided, shows a copyright
* @param {Object} [headerLeft]
*     The React nodes to show on the left side of the header.
* @param {Object[]} [headerRight]
*     An array of React nodes shown on the right side of the header.
* @param {boolean} isFullscreen=false
*     If set to true, hides the left nav bar.
* @param {NavFrameAstro~navTreeNode[]} navTree
*     The nav tree object use to generate the navigation nodes of the NavFrameAstro.
* @param {string|number} [selectedNode]
*     The currently selected node of the NavFrameAstro, specified by the ID of that node.
* @param {NavFrameAstro~onSelectItem} [onSelectItem]
*     Callback triggered when any item is selected. Passes back the ID of the selection
*     and the event that triggered it.
*
* @example
*    <NavFrameAstro
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
*    </NavFrameAstro>
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

export default function NavFrameAstro({
    appMessage,
    autoSelectFirstNode,
    children: componentChildren,
    copyright,
    "data-id": dataId,
    menuTop,
    navHeader,
    isFullscreen,
    navTree,
    onSelectItem,
    renderNode,
    renderIcon,
    selectedNode
}) {
    // Memoize because this is an expensive operation that really only needs to run if the navTree changes. JSON.stringify
    // suggested by Dan Abramov - https://github.com/facebook/react/issues/14476
    const indexedTree = useMemo(
        () => navTree.reduce(getNodeDetails(), {}),
        [nonCyclicStringify(navTree)]
    );
    const { firstNode } = indexedTree;

    const selected = getSelectedNode(firstNode, selectedNode, autoSelectFirstNode);

    const {
        header: selectedHeader,
    } = indexedTree[selected] || {};


    const [collapsedState, setCollapsed] = useState(true);
    useEffect(() => selectedNode && setCollapsed(false), [selectedNode]);

    return (
        <div className="nav-frame nav-frame--astro" data-id={dataId}>
            {appMessage}

            <div className="nav-frame__main">
                {!isFullscreen &&
                    <NavSidebar
                        menuTop={menuTop}
                        collapsed={collapsedState}
                        copyright={copyright}
                        onCollapse={() => setCollapsed(true)}
                        onSelectItem={(id, e) => {
                            setCollapsed(false);
                            onSelectItem(id, e);
                        }}
                        selectedNode={selected}
                        selectedSection={selectedHeader}
                        navTree={navTree}
                        renderNode={renderNode}
                        renderIcon={renderIcon}
                    />
                }
                <div className="nav-frame__right">
                    {navHeader}
                    <div className="nav-content">
                        {componentChildren}
                    </div>
                </div>
            </div>
        </div>
    );
}


NavFrameAstro.propTypes = {
    autoSelectFirstNode: PropTypes.bool,
    copyright: PropTypes.node,
    "data-id": PropTypes.string,
    headerLeft: PropTypes.node,
    headerRight: PropTypes.node,
    isFullscreen: PropTypes.bool,
    navTree: generateNavTreePropType(4),
    onSelectItem: PropTypes.func,
    renderNode: PropTypes.func,
    renderIcon: PropTypes.func,
    selectedNode: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

NavFrameAstro.defaultProps = {
    autoSelectFirstNode: true,
    "data-id": "nav-frame",
    isFullscreen: false,
    navTree: [],
    onSelectItem: noop
};
