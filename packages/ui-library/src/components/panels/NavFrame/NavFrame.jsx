import React, { Component } from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";

import NavHeader from "./NavHeader";
import NavSidebar from "./NavSidebar";
import { generateNavTreePropType } from "../../../util/PropUtils";

export default class NavFrame extends Component {
    static propTypes = {
        copyrightYear: PropTypes.string,
        "data-id": PropTypes.string,
        headerLeft: PropTypes.node,
        headerRight: PropTypes.node,
        navTree: generateNavTreePropType(4),
        onSelectItem: PropTypes.func,
        selectedNode: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }

    static defaultProps = {
        "data-id": "nav-frame",
        onSelectItem: noop
    }

    // Build an id-based index of all nodes in the tree.
    _getNodeDetails = ({
        group,
        header,
        section
    } = {}) => (index, {
        children = [],
        id,
        label,
    }) => {
        // Find first node so that it can be used as a default selection
        if (!this._firstNode && children.length === 0) {
            this._firstNode = id;
        }
        const childIndexes = children.reduce(this._getNodeDetails({
            header: !header ? id : header,
            section: header && !section ? id : section,
            group: header && section && !group ? id : group
        }), index);
        return {
            ...childIndexes,
            [id]: {
                group,
                header: header || id,
                label,
                section: section || id,
            }
        };
    }

    _indexedTree = this.props.navTree.reduce(this._getNodeDetails(), {})

    render() {
        const {
            copyrightYear,
            "data-id": dataId,
            headerLeft,
            headerRight,
            navTree,
            onSelectItem,
            selectedNode = this._firstNode
        } = this.props;
        const {
            header: selectedHeader,
            section: selectedSection
        } = this._indexedTree[selectedNode];

        const {
            children: sectionNodes,
            label: selectedHeaderLabel
        } = navTree.find(({ id }) => id === selectedHeader);

        return (
            <div className="nav-frame" data-id={dataId}>
                <NavHeader
                    left={headerLeft}
                    navTree={navTree}
                    onSelectItem={onSelectItem}
                    right={headerRight}
                    selectedHeader={selectedHeader}
                />
                <div className="nav-frame__bottom">
                    <NavSidebar
                        copyrightYear={copyrightYear}
                        onSelectItem={onSelectItem}
                        selectedHeaderLabel={selectedHeaderLabel}
                        selectedNode={selectedNode}
                        selectedSection={selectedSection}
                        navTree={sectionNodes}
                    />
                    <div className="nav-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
