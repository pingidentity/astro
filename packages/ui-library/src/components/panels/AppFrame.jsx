import React from "react";
import PropTypes from "prop-types";
import HeaderBar from "./header-bar";
import LeftNav from "./left-nav";
import KeywordSearch from "../forms/KeywordSearch";
import Modal from "../general/Modal";
import { deprecatedProp } from "../../util/DeprecationUtils";

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
 * @property {string} [copyrightYear="2003"]
 *     First year of the copyright message. (The second year is always the current year.)
 * @param {LeftNavBar#Section[]} navTree
 *          A prop which describes the structure of the nav tree.  This will be an array of
 *          Section objects, each of which may have an array of Node objects as its children.
 * @param {boolean} [oneSectionOnly=false]
 *          When true, opening a section will close all other sections.
 * @param {AppFrame~onItemChange} [onItemChange]
 *          Handler for when the current item changes. Accepts (itemId, sectionId)
 * @param {AppFrame~onRootChange} [onRootChange]
 *          Handler for when the root changes. Accepts the id for the root branch.
 * @param {AppFrame~onSectionChange} [onSectionChange]
 *          Handler for when a section is toggled. Accepts the id of the section.
 * @param {bool} [searchable]
 *          This is an experimental prop that is not ready for production.
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
        autoSelectItemFromSection: PropTypes.bool,
        autoSelectItemfromSection: deprecatedProp(
            { message: "There was a typo. Please capitalize the F." }
        ),
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
        root: PropTypes.string,
        searchable: PropTypes.bool,
        copyrightYear: PropTypes.string,
    };

    static defaultProps = {
        autoSelectItemFromRoot: false,
        autoSelectItemFromSection: false,
        autoSelectSectionFromItem: false,
        "data-id": "app-frame",
        oneSectionOnly: false,
        onItemChange: _.noop,
        onRootChange: _.noop,
        onSectionChange: _.noop,
        openSections: {},
        searchable: false
    };

    state = {
        searchOpen: false
    }

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
     * @name AppFrame#_isNodeIn
     * @param {string} id
     * @param {array} tree
     * @private
     * @desc Is the node with this id in this tree?
     */
    _isNodeIn = (id, tree) => (this._getNodeIn(id, tree) ? true : false);

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
    _handleSectionChange = (id) => {
        if (this.props.oneSectionOnly) {
            _.each(this.props.leftNavBarProps.openSections, (value, section) => {
                if (this.props.leftNavBarProps.openSections[section] && section !== id) {
                    this.props.onSectionChange(section);
                }
            });
        }

        const opening = !(this.props.leftNavBarProps.openSections[id] || false);

        this.props.onSectionChange(id);

        if ((this.props.autoSelectItemfromSection || this.props.autoSelectItemFromSection) && opening) {
            const { children } = this._getNode(id);

            if (!this._isNodeIn(this.props.selectedNode, children)) {
                this.props.onItemChange(children[0].id, id);
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

    _onSearchClick = ({
        id,
        root,
        section
    }) => {
        const {
            leftNavBarProps: {
                openSections
            },
            onItemChange,
            onRootChange,
            onSectionChange
        } = this.props;
        const openSection = (sec) => {
            // Close all other open sections except for the selected one
            Object.keys(openSections).forEach(key => {
                const { [key]: sectionOpen } = openSections;
                if (sectionOpen && key !== sec) {
                    onSectionChange(key);
                }
            });
            const { [sec]: isOpen } = openSections;
            if (!isOpen) {
                onSectionChange(sec);
            }
        };

        onRootChange(root || id);

        if (section) {
            openSection(section);
        }
        onItemChange(id);

        this.setState({
            searchOpen: false
        });
    };

    _renderSearchModal = () => {
        if (this.props.searchable && this.state.searchOpen) {
            const closeModal = () => this.setState({ searchOpen: false });
            return (
                <Modal
                    closeOnBgClick={true}
                    expanded={true}
                    modalTitle="Search"
                    type="dialog"
                    onClose={closeModal}
                >
                    <KeywordSearch
                        data-id="app-frame-search"
                        onResultClick={this._onSearchClick}
                        tree={this.props.navTree}
                    />
                </Modal>
            );
        } else {
            return null;
        }
    }

    _buildHeaderProps = () => {
        const {
            headerBarProps = {},
            searchable
        } = this.props;

        if (searchable) {
            const { tree = {} } = headerBarProps;
            const searchNode = {
                id: "search",
                iconClassName: "icon-search",
                onClick: () => this.setState({
                    searchOpen: true
                })
            };
            return {
                ..._.omit(headerBarProps, "openNode"),
                tree: [
                    searchNode,
                    ...tree
                ]
            };
        } else {
            return _.omit(this.props.headerBarProps, "openNode");
        }
    }

    render() {
        const {
            copyrightYear,
            leftNavBarProps,
            navTree,
            root
        } = this.props;

        const
            rootBranch =
                root
                    ? navTree.filter(
                        ({ id, label }) =>
                            id === root ||
                        label === root
                    )[0]
                    : navTree,
            tree = rootBranch.children || navTree,
            navOptions =
                rootBranch !== navTree
                    ? _.map(
                        navTree, ({ id, label }) => ({
                            id,
                            label
                        }))
                    : null;

        return (
            <div
                className={this.props.className}
                data-id={this.props["data-id"]}
            >
                <HeaderBar
                    {...this._buildHeaderProps()}
                    navOptions={navOptions}
                    navSelected={this.props.root}
                    onNavChange={this._handleRootChange}
                />
                <LeftNav
                    topContent={rootBranch.label}
                    copyrightYear={copyrightYear}
                    {...leftNavBarProps}
                    onSectionValueChange={this._handleSectionChange}
                    onItemValueChange={this._handleItemChange}
                    tree={tree}
                />
                {this.props.children}
                {this._renderSearchModal()}
            </div>
        );
    }
}

export default AppFrame;
