import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { noop } from "underscore";

import { getIcon, generateNavTreePropType } from "../../../util/PropUtils";

export const SidebarNode = ({
    id,
    label,
    onClick,
    selected
}) => (
    <div
        className={
            classnames(
                "left-nav__node",
                {
                    "left-nav__node--selected": selected
                }
            )
        }
        data-id={`sidebar-node_${id}`}
        onClick={e => {
            e.stopPropagation();
            onClick(id, e);
        }}
    >
        {label}
        {selected}
    </div>
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
            "left-nav__group",
            {
                // Add divider above groups with this modifier
                "left-nav__group--with-divider": hasDivider
            }
        )}
    >
        <div>
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
    selected
}) => (
    <div
        className={classnames(
            "left-nav__section",
            {
                "left-nav__section--selected": selected
            }
        )}
    >
        <div
            data-id={`sidebar-section_${id}`}
            onClick={e => {
                e.stopPropagation();
                onClick(id, e);
            }}
        >
            {icon &&
                <div className="left-nav__section-icon">
                    {getIcon(icon, { type: "leading" })}
                </div>
            }
            {label}
        </div>
    </div>
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
        copyrightYear,
        "data-id": dataId,
        navTree,
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
                />,
            ],
            isSelected ? children : groupAcc,
            isSelected ? label : labelAcc
        ];
    }, [[]]);

    return (
        <div data-id={dataId}>
            <div>
                {selectedHeaderLabel}
            </div>
            <div
                className="left-nav__sections"
            >
                {renderedSections}
            </div>
            {
                selectedGroup &&
                    <div className="left-nav__group-container">
                        <div
                            className="left-nav__group-container-title"
                        >
                            {selectedLabel}
                        </div>
                        {selectedGroup.map(renderNode(props))}
                    </div>
            }
            <div
                classnames="left-nav__copyright"
            >
                {copyrightYear}
            </div>
        </div>
    );
}

NavSidebar.propTypes = {
    "data-id": PropTypes.string,
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
    navTree: generateNavTreePropType(
        3,
        [null, { icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]) }]
    ).isRequired,
};

NavSidebar.defaultProps = {
    "data-id": "nav-sidebar",
    onSelectItem: noop,
};
