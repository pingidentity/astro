import React from "react";
import PropTypes from "prop-types";
import HeaderBar from "./header-bar";
import LeftNav from "./left-nav";

import _ from "underscore";

/**
 * @class AppFrame
 * @desc This component packages the HeaderBar and LeftNav components and coordinates their navs.
 *
 * @param {string} [data-id="app-frame"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {boolean} [autoSelectItemFromRoot=false]
 *          When true, changing the root will auto-select the first nav item under it.
 * @param {boolean} [autoSelectItemFromSection=false]
 *          When true, opening a section will auto-select the first nav item under it.
 * @param {boolean} [autoSelectSectionFromItem=false]
 *          When true, selecting an item will open the section it's in.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {object} headerBarProps
 *     Props that are passed on to the HeaderBar component. See HeaderBar documentation.
 * @param {object} leftNavBarProps
 *     Props that are passed on to the LeftNavBar component
 * @param {boolean} [oneSectionOnly=false]
 *          When true, opening a section will close all other sections.
 * @param {AppFrame~onItemChange} [onItemChange]
 *          Handler for when the current item changes. Accepts (itemId, sectionId)
 * @param {AppFrame~onRootChange} [onRootChange]
 *          Handler for when the root changes. Accepts the id for the root branch.
 * @param {AppFrame~onSectionChange} [onSectionChange]
 *          Handler for when a section is toggled. Accepts the id of the section.
 *
 */

/**
 * @callback AppFrame~onItemChange
 * @param {string|number} id
 *             The id of the item that was clicked
 * @param {string|number} sectionId
 *             The id of the section the item that was clicked belongs to.
 */

/**
 * @callback AppFrame~onRootChange
 * @param {string|number} id
 *             The id of the item that was clicked
 */

/**
 * @callback AppFrame~onSectionChange
 * @param {string|number} id
 *             The id of the item that was clicked
 */

class AppFrame extends React.Component {
    static propTypes = {
        autoSelectItemFromRoot: PropTypes.bool,
        autoSelectItemfromSection: PropTypes.bool,
        autoSelectSectionFromItem: PropTypes.bool,
        className: PropTypes.string,
        headerBarProps: PropTypes.object,
        "data-id": PropTypes.string,
        leftNavBarProps: PropTypes.object,
        oneSectionOnly: PropTypes.bool,
        onItemChange: PropTypes.func,
        onRootChange: PropTypes.func,
        onSectionChange: PropTypes.func,
        navTree: PropTypes.array.isRequired,
        root: PropTypes.string
    };

    static defaultProps = {
        autoSelectItemFromRoot: false,
        autoSelectItemfromSection: false,
        autoSelectSectionFromItem: false,
        "data-id": "app-frame",
        oneSectionOnly: false,
        onItemChange: _.noop,
        onRootChange: _.noop,
        onSectionChange: _.noop,
        openSections: {},
    };

    /**
     * @method
     * @name AppFrame#_getNodeIn
     * @param {string} id
     * @param {string} tree
     * @private
     * @desc Return the node that matches this id within the tree
     */
    _getNodeIn = (id, tree) => {
        return _.reduce(
            tree,
            (result, branch) => {
                if (result) {
                    return result;
                }

                if (branch.id === id) {
                    return branch;
                }

                if (branch.children) {
                    return this._getNodeIn(id, branch.children);
                }

                return null;
            },
            null
        );
    };

    /**
     * @method
     * @name AppFrame#_getNode
     * @param {string} id
     * @private
     * @desc Return the node that matches this id within the main tree
     */
    _getNode = id => this._getNodeIn(id, this.props.navTree);

    /**
     * @method
     * @name AppFrame#_handleItemChange
     * @param {string} id
     * @param {string} sectionId
     * @private
     * @desc Handle when an item is selected. Might open a section based on behavior props.
     */
    _handleItemChange = (id, sectionId) => {
        this.props.onItemChange(id, sectionId);

        if (this.props.autoSelectSectionFromItem) {
            if (id !== sectionId && !this.props.leftNavBarProps.openSections[sectionId]) {
                this._handleSectionChange(sectionId);
            }
        }
    };

    /**
     * @method
     * @name AppFrame#_handleSectionChange
     * @param {string} id
     * @private
     * @desc Handle when a section is toggled. Might select an item based on behavior props.
     */
    _handleSectionChange = id => {
        if (this.props.oneSectionOnly) {
            _.each(this.props.leftNavBarProps.openSections, (value, section) => {
                if (this.props.leftNavBarProps.openSections[section] && section !== id) {
                    this.props.onSectionChange(section);
                }
            });
        }

        var opening = !(this.props.leftNavBarProps.openSections[id] || false);

        this.props.onSectionChange(id);

        if (this.props.autoSelectItemfromSection && opening) {
            const section = this._getNode(id);

            if (!this._isNodeIn(this.props.selectedNode, section.children)) {
                this.props.onItemChange(section.children[0].id, id);
            }
        }
    };

    /**
     * @method
     * @name AppFrame#_handleRootChange
     * @param {string} id
     * @private
     * @desc Handle when the root is changed. Might select an item based on behavior props.
     */
    _handleRootChange = id => {
        this.props.onRootChange(id);
        if (this.props.autoSelectItemFromRoot) {
            const rootBranch = _.find(
                this.props.navTree,
                branch => branch.id === id || branch.label === id
            );
            const section = rootBranch.children[0];
            if (section.children) {
                this._handleItemChange(section.children[0].id, section.id);
            } else {
                this._handleItemChange(section.id, section.id);
            }
        }
    };

    /**
     * @method
     * @name AppFrame#_isNodeIn
     * @param {string} id
     * @param {array} tree
     * @private
     * @desc Is the node with this id in this tree?
     */
    _isNodeIn = (id, tree) => (this._getNodeIn(id, tree) ? true : false);

    render() {
        var navOptions = null,
            tree = this.props.navTree,
            rootBranch = this.props.root
                ? tree.filter(
                      branch =>
                          branch.id === this.props.root ||
                          branch.label === this.props.root
                  )[0]
                : tree;
        if (rootBranch.children) {
            tree = rootBranch.children;
        }
        if (rootBranch !== this.props.navTree) {
            navOptions = _.map(this.props.navTree, section => ({
                value: section.id,
                label: section.label
            }));
        }
        return (
            <div
                className={this.props.className}
                data-id={this.props["data-id"]}
            >
                <HeaderBar
                    {..._.omit(this.props.headerBarProps, "openNode")}
                    navOptions={navOptions}
                    navSelected={this.props.root}
                    onNavChange={this._handleRootChange}
                />
                <LeftNav
                    topContent={rootBranch.label}
                    {...this.props.leftNavBarProps}
                    onSectionValueChange={this._handleSectionChange}
                    onItemValueChange={this._handleItemChange}
                    tree={tree}
                    updated={true}
                />
                {this.props.children}
            </div>
        );
    }
}

export default AppFrame;
