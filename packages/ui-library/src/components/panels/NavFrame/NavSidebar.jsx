import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { noop } from "underscore";

import { getIcon, generateNavTreePropType } from "../../../util/PropUtils";

export const SidebarNode = ({
    id,
    label,
    onClick,
    selected,
}) => (
    <li
        className={
            classnames(
                "nav-sidebar__node",
                {
                    "nav-sidebar__node--selected": selected,
                }
            )
        }
        data-id={`sidebar-node_${id}`}
        onClick={e => {
            e.stopPropagation();
            onClick(id, e);
        }}
    >
        <div className="nav-sidebar__node-label">{label}</div>
        {selected}
    </li>
);

SidebarNode.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
};

SidebarNode.defaultProps = {
    onClick: noop,
    selected: false,
};

export const SidebarGroup = ({
    children,
    hasDivider,
    label
}) => (
    <div
        className={classnames(
            "nav-sidebar__group",
            {
                // Add divider above groups with this modifier
                "nav-sidebar__group--with-divider": hasDivider
            }
        )}
    >
        <div className="nav-sidebar__group-title">
            {label}
        </div>
        {children}
    </div>
);

SidebarGroup.propTypes = {
    hasDivider: PropTypes.bool,
    label: PropTypes.string,
};

export const SidebarSection = ({
    icon,
    id,
    label,
    onClick,
    selected,
    collapsed,
}) => (
    <li
        className={classnames(
            "nav-sidebar__section",
            {
                "nav-sidebar__section--selected": selected,
                "nav-sidebar__section--collapsed": collapsed,
            }
        )}
        data-id={`sidebar-section_${id}`}
        onClick={e => {
            e.stopPropagation();
            onClick(id, e);
        }}
    >
        {icon &&
            <div className="nav-sidebar__section-icon">
                {getIcon(icon, { type: "inline" })}
            </div>
        }
        <div className="nav-sidebar__section-label">
            {label}
        </div>
    </li>
);

SidebarSection.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string
    ]),
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
};

SidebarSection.defaultProps = {
    onClick: noop,
    selected: false
};

// Recursively render the groups and nodes
const renderNode = props => ({
    children,
    id,
    label,
    group = id
}, idx) => {
    const {
        onSelectItem,
        selectedNode,
    } = props;
    const isGroup = children !== undefined;

    const Tag = isGroup ? SidebarGroup : SidebarNode;

    return (
        <Tag
            data-id={`sidebar-${isGroup ? "group" : "node"}_${id}`}
            id={id}
            key={id}
            hasDivider={idx > 0}
            label={label}
            onClick={onSelectItem}
            selected={id === selectedNode}
        >
            {children && children.map(child => renderNode(props)({
                ...child,
                group
            }))}
        </Tag>
    );
};

const containsSelectedNode = (tree, selectedNode) => {
    if (selectedNode === undefined || tree === undefined) {
        return false;
    }

    return tree.some(
        ({ id, children }) => id === selectedNode || containsSelectedNode(children, selectedNode)
    );
};

export default function NavSidebar(props) {
    const {
        collapsed,
        copyright,
        "data-id": dataId,
        navTree,
        onCollapse,
        onSelectItem,
        selectedHeaderLabel,
        selectedNode,
        selectedSection,
    } = props;
    const [renderedSections, selectedGroup, selectedLabel] = navTree.reduce((
        [
            sectionsAcc,
            groupAcc,
            labelAcc
        ],
        {
            icon,
            id,
            label,
            children
        }
    ) => {
        const isSelected = id === selectedSection || containsSelectedNode(children, selectedNode);

        // Create nodes for all of the LeftNav's sections and, while looking at
        // those, find the selected section's label and its children.
        return [
            [
                ...sectionsAcc,
                <SidebarSection
                    data-id={`sidebar_section_${id}`}
                    id={id}
                    key={id}
                    icon={icon}
                    label={label}
                    onClick={onSelectItem}
                    selected={isSelected}
                    collapsed={isSelected && children && collapsed}
                />,
            ],
            isSelected ? children : groupAcc,
            isSelected ? label : labelAcc
        ];
    }, [[]]);

    return (
        <nav data-id={dataId} className="nav-sidebar">

            <ul
                className={classnames(
                    "nav-sidebar__sections",
                    {
                        // Add divider above groups with this modifier
                        "nav-sidebar__sections--group-visible": selectedGroup && !collapsed,
                    }
                )}
            >
                <div className="nav-sidebar__section-title">
                    {selectedHeaderLabel}
                </div>
                {renderedSections}
                <div
                    className="nav-sidebar__copyright"
                >
                    {copyright}
                </div>
            </ul>
            {
                selectedGroup && !collapsed &&
                        <ul className="nav-sidebar__group-container">
                            <div
                                className="nav-sidebar__group-container-title"
                            >
                                <a className="nav-sidebar__group-collapse" onClick={onCollapse} />
                                {selectedLabel}
                            </div>
                            {selectedGroup.map(renderNode(props))}
                        </ul>
            }

        </nav>
    );
}

NavSidebar.propTypes = {
    "data-id": PropTypes.string,
    collapsed: PropTypes.bool,
    navTree: generateNavTreePropType(
        3,
        [null, { icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]) }]
    ),
    onCollapse: PropTypes.func,
    onSelectItem: PropTypes.func,
    selectedHeaderLabel: PropTypes.node,
    selectedNode: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    selectedSection: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
};

NavSidebar.defaultProps = {
    collapsed: true,
    "data-id": "nav-sidebar",
    navTree: [],
    onCollapse: noop,
    onSelectItem: noop,
};
