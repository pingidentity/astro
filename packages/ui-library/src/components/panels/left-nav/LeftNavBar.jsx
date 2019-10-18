import { cannonballChangeWarning } from "../../../util/DeprecationUtils";

import PropTypes from "prop-types";
import { defaultRender } from "../../../util/PropUtils";
import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import Copyright from "./Copyright";
import Utils from "../../../util/Utils";
import Anchor from "../../general/Anchor";
import _ from "underscore";
import { getIconClassName } from "../../../util/PropUtils";

/**
 * @typedef {object} LeftNavBar#Node
 * @desc An object describing a leaf in the LeftNav
 * @property {string} label
 *     The label of the node
 * @property {string|number} id
 *     A unique string identifier.  This value will be passed back to the onItemValueChange callback.
 */

/**
 * @typedef {object} LeftNavBar#Section
 * @property {string} label
 *     The label of the section
 * @property {string|number} id
 *     A unique string identifier.  This value will be passed back to the onSectionValueChange callback.
 * @property {string} icon
 *     A string corresponding to an existing icon in the ui-library icon font.
 * @property {string} type
 *     A string that designates wether the section should be rendered as navigation links or a context drop-down style
 *     menu within the sidebar.
 * @property {object} addLink
 *     For sections type=context only.  An object that specifies the text and callback for the context menu add menu.
 * @property {string} addLink.text
 *     The text to display in the addLink.
 * @property {func} addLink.callback
 *     The callback to trigger when the addLink is clicked.
 * @property {string} [copyrightYear="2003"]
 *     First year of the copyright message. (The second year is always the current year.)
 * @property {LeftNavBar#Node[]} [children]
 *     An optional array of children under this section.
 */

/**
 * @callback LeftNavBar~onSectionValueChange
 * @param {string|number} id
 *     The id of the item that was clicked
 */

/**
 * @callback LeftNavBar~onItemValueChange
 * @param {string|number} id
 *     The id of the item that was clicked
 * @param {string|number} sectionId
 *     The id of the section the item that was clicked belongs to.
 */

/**
 * @class LeftNavBar
 * @desc This component implements a LeftNav bar.  While on first instinct, it might seem like it would be better to
 * have the tree structure be described by some jsx markup inside the LeftNavBar, there are a couple of problems with that:
 *
 * a) Attaching the click handlers for sections/nodes would involve cloning and re-writing each child and grandchild.
 *    This is cumbersome.
 *
 * b) Most of the time, the left nav bar is dynamic (think of the CDP where the list of categories is determined at runtime),
 *    so this approach would introduce logic to take some data structure, map it to React descriptors, only to be cloned and
 *    re-written.
 *
 * As a result, the approach taken was to pass in a data structure to the LeftNav as a property and leave it up to it to
 * map that data to whatever internal markup it wants.
 *
 * @param {string} [data-id="left-nav-bar"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {LeftNavBar#Section[]} tree
 *     A prop which describes the structure of the nav tree.  This will be an array of Section objects, each of which
 *     may have an array of Node objects as its children. Please refer to the example below.
 * @param {string|number} [selectedNode]
 *     The id of the selected node.
 * @param {string|number} [selectedSection]
 *     The id of the selected section.
 * @param {object} [openSections={}]
 *     A hash map of ids and their open state. This is used internally by the Reducer to maintain expand/collapse state.
 * @param {boolean} [updated=false]
 *      *     Flag to explicitly indicate you're using the old style of the left nav bar.
 *  @param {boolean} [legacy=false]
 *     Flag to explicitly indicate you're using the old style of the left nav bar.
 * @param {boolean} [collapsible=false]
 *     If false, will have all sections open at once by default and disable the collapse feature.
 * @param {boolean} [autocollapse=false]
 *     Whether or not the sections should autocollapse. Disabled if the collapsible prop is set to false.
 * @param {LeftNavBar~onSectionValueChange} [onSectionValueChange]
 *     A callback which will be executed when any section node is clicked. The callback will be given 1 parameter equal
 *     to the id of the item clicked.
 * @param {LeftNavBar~onItemValueChange} [onItemValueChange]
 *     A callback which will be executed when any leaf node is clicked. The callback will be given 1 parameter equal to
 *     the id of the item clicked.
 * @param {boolean} [pingoneLogo=false]
 *     Determines whether to show the PingOne Logo.
 * @param {string} [logoSrc]
 *     An optional URL or object (containing the URL, height (px), and width (px)) that can be provided to override the
 *     default logo.
 * @param {string|object} [topContent]
 *     String or html content to inject into the top of the sidebar.
 *
 * @example
 * var item1 = {label: "Item 1", id: "item1"};
 * var item2 = {label: "Item 2", id: "item2"};
 * var section1 = {label: "Section 1", id: "section1", children: [item1, item2]};
 * var section2 = {label: "Empty Section", id: "empty"};
 *
 * <LeftNavBar tree={[section1, section2]} />
 */
class LeftNavBar extends React.Component {

    static propTypes = {
        "data-id": PropTypes.string,
        tree: PropTypes.array.isRequired,
        selectedNode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        selectedSection: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        openSections: PropTypes.object,
        collapsible: PropTypes.bool,
        updated: PropTypes.bool,
        legacy: PropTypes.bool,
        autocollapse: PropTypes.bool,
        onSectionValueChange: PropTypes.func,
        onItemValueChange: PropTypes.func,
        pingoneLogo: PropTypes.bool,
        logoSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        topContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        copyrightYear: PropTypes.string,
        renderTopNavItem: PropTypes.func,
        renderNavItem: PropTypes.func,
    };

    static defaultProps = {
        "data-id": "left-nav-bar",
        openSections: {},
        selectedContexts: {},
        collapsible: false,
        autocollapse: false,
        pingoneLogo: false,
        updated: false,
        legacy: false
    };

    constructor(props) {
        super(props);
        if (!Utils.isProduction()) {
            if (props.onItemClick) {
                throw new Error(Utils.deprecatePropError("onItemClick", "onItemValueChange"));
            }
            if (props.onSectionClick) {
                throw new Error(Utils.deprecatePropError("onSectionClick", "onSectionValueChange"));
            }
        }
    }

    state = {
        selectorStyle: { top: 0, height: 0 },
        scrollable: false
    };

    _rerender = () => {
        this.componentDidUpdate();
        this._getItemSelector().removeEventListener("transitionend", this._rerender);
    };

    _getItemSelector = () => {
        return ReactDOM.findDOMNode(this.refs.itemSelector);
    };

    _renderItem = (item) => {
        if (item.type === "context") {
            return this._renderContextSelector(item);
        } else {
            return this._renderSection(item);
        }
    };

    _renderSection = (section) => {
        return (
            <LeftNavSection
                {...section}
                key={section.id}
                data-id={section.id}
                icon={section.icon}
                selectedNode={this.props.selectedNode}
                selectedNav={this.props.selectedSection === section.id}
                onItemValueChange={this._handleItemClick}
                onSectionValueChange={this._handleSectionClick}
                open={this.props.openSections[section.id]}
                renderTopNavItem={this.props.renderTopNavItem}
                renderNavItem={this.props.renderNavItem}
            />
        );
    };

    _renderContextSelector = (selector) => {
        return (
            <LeftNavContextSelector
                {...selector}
                key={selector.id}
                data-id={selector.id}
                icon={selector.icon}
                open={this.props.openSections[selector.id]}
                selectedNode={this.props.selectedContexts[selector.id]}
                onItemValueChange={this._handleItemClick}
                onSectionValueChange={this._handleSectionClick}
            />
        );
    };

    _handleSectionClick = (sectionId) => {
        this.props.onSectionValueChange(sectionId);
    };

    _handleItemClick = (sectionId, itemId) => {
        this.props.onItemValueChange(sectionId, itemId);
    };

    _handleResize = () => {
        var nav = ReactDOM.findDOMNode(this.refs.container);
        this.setState({ scrollable: nav.scrollHeight > nav.offsetHeight });
    };

    componentDidMount() {
        // Occasionally the first calculation of the position of the selector is wrong because there are still
        // animations happening on the page.  Recalculate after the initialRender
        this._getItemSelector().addEventListener("transitionend", this._rerender, false);

        window.addEventListener("resize", this._handleResize);

        this.componentDidUpdate();
    }

    componentWillUnmount() {
        this._getItemSelector().removeEventListener("transitionend", this._rerender);
        window.removeEventListener("resize", this._handleResize);
    }

    /**
     * @ignore
     * @method
     * @desc After each render, we need to check if the NavBar highlighter needs to be slid over a new item
     * @name LeftNavBar~componentDidUpdate
     * @param {object} prevProps
     *     Previous props
     */
    componentDidUpdate(prevProps) {
        // it is generally bad practice to touch the dom after rendering and also bad practice to set state within
        // componentDidUpdate because how easily you can get into an infinite loop of
        // setState -> componentDidUpdate -> setState.  This is why we make sure the specific props have changed
        // before calling setState.  There's no way around this as the section has to be expanded first before it
        // can be known where to move the itemSelector.
        if (!prevProps ||
            prevProps.selectedNode !== this.props.selectedNode ||
            prevProps.selectedSection !== this.props.selectedSection ||
            !_.isEqual(prevProps.openSections, this.props.openSections)) {

            var navNode = ReactDOM.findDOMNode(this.refs.container),
                itemSelectors = navNode.getElementsByClassName("highlighted"),
                style = { height: 0, top: 0 };

            // if a nav item is currently selected then calulate the position of the selected item within the nav
            // the selected item contains the "highlighted" css class
            if (itemSelectors.length > 0) {

                var selectedDims = itemSelectors[0].getBoundingClientRect(),
                    navDims = navNode.getBoundingClientRect(),
                    sectionOpen = !this.props.collapsible ||
                        (this.props.selectedSection && this.props.openSections[this.props.selectedSection]);

                style = {
                    top: parseInt(selectedDims.top - navDims.top + navNode.scrollTop),
                    height: sectionOpen ? parseInt(selectedDims.height) : 0,
                    opacity: sectionOpen ? 1 : 0
                };
            }

            // if a section is selected...
            /* istanbul ignore if  */
            if (prevProps && prevProps.selectedSection && this.props.selectedSection) {
                var oldSectionIndex = _.findIndex(this.props.tree, { id: prevProps.selectedSection }),
                    newSectionIndex = _.findIndex(this.props.tree, { id: this.props.selectedSection }),
                    closedSectionId,
                    closedSectionIndex,
                    oldOpenSections,
                    newOpenSections;

                // if autocollapse is TRUE, then account for the closing section height only if the newly selected
                // section is lower in the nav than the previously selected section
                if (this.props.autocollapse && prevProps.selectedSection !== this.props.selectedSection &&
                    newSectionIndex > oldSectionIndex) {
                    closedSectionIndex = oldSectionIndex;
                }

                // if autocollapse is FALSE, then check if a section has been closed above the selected section
                // ONLY if the selected section stays the same
                if (!this.props.autocollapse && prevProps.selectedSection === this.props.selectedSection) {

                    oldOpenSections = _.filter( _.keys(prevProps.openSections), function (key) {
                        return prevProps.openSections.hasOwnProperty(key) && prevProps.openSections[key] === true;
                    });
                    newOpenSections = _.filter( _.keys(this.props.openSections), function (key) {
                        return this.props.openSections.hasOwnProperty(key) && this.props.openSections[key] === true;
                    }.bind(this));

                    closedSectionId = _.difference(oldOpenSections, newOpenSections);

                    if (closedSectionId.length) {
                        closedSectionIndex = _.findIndex(this.props.tree, { id: closedSectionId[0] });
                    }
                }

                // subtract the height of the closed section from the top of the nav highlighter
                // ONLY if the closed section is above the current one
                if (closedSectionIndex > -1 && closedSectionIndex < newSectionIndex) {
                    const closedSectionNode = ReactDOM.findDOMNode(this.refs.container)
                        .getElementsByClassName("nav-section")[closedSectionIndex];

                    // check whether the
                    const closedNode = ReactDOM.findDOMNode(closedSectionNode)
                        .getElementsByClassName("context-selector-menu")[0] || closedSectionNode;

                    style.top -= closedNode.getBoundingClientRect().height;
                }

            }

            // set whether nav is tall enough to scroll (toggles class on nav to trigger shadow on copyright)
            this._handleResize();

            /* eslint-disable react/no-did-update-set-state */
            if (!_.isEqual(this.state.selectorStyle, style)) {
                this.setState({ selectorStyle: style });
            }
            /* eslint-enable react/no-did-update-set-state */
        }
    }

    componentDidMount() {
        if (!this.props.legacy && !this.props.updated ) {
            cannonballChangeWarning({
                message: `The Header Bar and Left Nav will default to the update style ` +
                `unless the prop "legacy" is set to true.`,
            });
        }
    }

    render() {
        var className = classnames({
            scrollable: this.state.scrollable,
            collapsible: this.props.collapsible,
            updated: this.props.updated,
        });

        return (
            <div id="nav" data-id={this.props["data-id"]} ref="nav" className={className} >
                <div className="nav-menus" ref="container">
                    <div ref="itemSelector" className="selected-item" style={this.state.selectorStyle} />
                    <div ref="itemSelectorArrow" className="selected-item-arrow" style={this.state.selectorStyle}>
                        <svg version="1.1" width="10px" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polyline points="0,0 100,50 0,100" className="arrow" />
                        </svg>
                    </div>
                    { this.props.topContent && (
                        <div className="top-content" data-id="nav-top-content">{this.props.topContent}</div>
                    ) }
                    { this.props.tree.map(this._renderItem) }
                </div>
                <Copyright
                    ref="copyright"
                    pingoneLogo={this.props.pingoneLogo}
                    logoSrc={this.props.logoSrc}
                    updated={this.props.updated}
                    renderFooterContent={this.props.renderFooterContent}
                    copyrightYear={this.props.copyrightYear}
                />
            </div>
        );
    }
}

/**
 * @class LeftNavSection
 * @private
 * @desc Internal class which renders a navigation section of the LeftNavBar
 * @param {string} data-id
 *     This may or may not be the same as the id.
 * @param {string} id
 *     The id of the component (this is what will be passed back to the onSectionValueChange handler)
 * @param {string} [icon]
 *     Optional icon to display next to the section label
 * @param {boolean} open
 *     Indicates if the section is open
 * @param {boolean} selectedNav
 *     Indicates if the section has a selected nav item
 * @param {function} onItemValueChange
 *     The callback for when an leaf is clicked.  Will be passed back the id of the clicked item.
 * @param {function} onSectionValueChange
 *     The callback for when a section label is clicked.  Will be passed back the id of the clicked section.
 */
class LeftNavSection extends React.Component {

    static propTypes = {
        onItemValueChange: PropTypes.func,
        onSectionValueChange: PropTypes.func,
        open: PropTypes.bool,
        selectedNav: PropTypes.bool,
        id: PropTypes.string,
        "data-id": PropTypes.string,
        selectedNode: PropTypes.string,
        children: PropTypes.array,
        icon: PropTypes.string,
        renderTopNavItem: PropTypes.func,
        renderNavItem: PropTypes.func,
    };

    static defaultProps = {
        renderTopNavItem: (props, Elem) => { const { item, ...defaults } = props; return <Elem {...defaults} />; },
        renderNavItem: (props, Elem) => { const { item, ...defaults } = props; return <Elem {...defaults} />; },
    };

    constructor(props) {
        super(props);
        this._handleItemClicks = [];

        if (props.children) {
            // bind the click functions for each item here instead of in the render
            props.children.map(function (item) {
                this._handleItemClicks.push(
                    this._handleItemClick.bind(null, item.id, props.id)
                );
            }.bind(this));
        }

    }

    /*
     * Instead of using bind to create a partial after ever render, just use the data-id to pass the
     * right id back to the click handler.
     */
    _handleItemClick = (id, sectionId) => {
        this.props.onItemValueChange(id, sectionId);
    };

    _handleSectionClick = (e) => {
        var dataId = e.target.getAttribute("data-id");

        // react adds DOM when the icon is present, and clicking on the autogenerated spans will yield a data-id=null
        // if the data-id is not found look on the parent
        if (!dataId) {
            dataId = e.target.parentNode.getAttribute("data-id");
        }

        if (this.props.children) {
            this.props.onSectionValueChange(dataId.slice(0, -6));
        } else {
            this.props.onItemValueChange(dataId.slice(0, -6), dataId.slice(0, -6));
        }
    };

    _getItems = () => {
        var items = [],
            item,
            itemClassName;

        for (var i = 0; i < this.props.children.length; i+=1) {
            item = this.props.children[i];
            itemClassName = {
                highlighted: this.props.selectedNode === item.id,
                "has-icon": !!item.icon
            };

            const iconClassName = getIconClassName(item);
            const tabIndex = this._isOpen() ? "0" : "-1"; // remove nav items from tab order when not visible

            items.push(
                <li key={i} className={classnames(itemClassName)}>
                    {
                        this.props.renderNavItem({
                            "data-id": item.id + "-label",
                            onClick: this._handleItemClicks[i],
                            onMouseDown: this.preventDefault,
                            item,
                            tabIndex,
                            children: <span>
                                {iconClassName?(<span className = { iconClassName } ></span>) : null}{item.label}
                            </span>
                        }, Anchor)
                    }
                </li>
            );
        }
        return items;
    };

    _isOpen() {
        return !this.props.label || this.props.open;
    }

    render() {
        var isOpen = this._isOpen(),
            className = classnames("nav-section", {
                open: isOpen && this.props.children,
                selected: this.props.selectedNav,
                highlighted: this.props.selectedNode === this.props.id
            }),
            titleClassName = this.props.children
                ? classnames("title collapsible-link right", {
                    open: isOpen
                })
                : "title";

        const iconClassName = getIconClassName(this.props, { useId: true });

        return (
            <div className={className} data-id={this.props["data-id"]}>
                {this.props.label && (
                    this.props.renderTopNavItem({
                        className: titleClassName,
                        "data-id": this.props["data-id"] + "-label",
                        onClick: this._handleSectionClick,
                        item: this.props,
                        children: [
                            (iconClassName?(<span className = {iconClassName} key="icon"></span>) : null),
                            (this.props.label)
                        ],
                    }, Anchor)
                )}
                {this.props.children &&
                    <ul className="menu" data-id={this.props["data-id"] + "-menu"}>
                        { this._getItems() }
                    </ul>
                }
            </div>
        );
    }
}

/**
 * @class LeftNavContextSelector
 * @private
 * @desc Internal class which renders a navigation section of the LeftNavBar
 * @param {string} data-id
 *          This may or may not be the same as the id.
 * @param {string} id
 *          The id of the component (this is what will be passed back to the onSectionValueChange handler)
 * @param {boolean} open
 *          Indicates if the section is open
 * @param {function} onItemValueChange
 *          The callback for when an leaf is clicked.  Will be passed back the id of the clicked item.
 * @param {function} onSectionValueChange
 *          The callback for when a section label is clicked.  Will be passed back the id of the clicked section.
 */
class LeftNavContextSelector extends React.Component {

    static propTypes = {
        onItemValueChange: PropTypes.func,
        onSectionValueChange: PropTypes.func,
        open: PropTypes.bool,
        id: PropTypes.string,
        "data-id": PropTypes.string,
        selectedNode: PropTypes.string,
        children: PropTypes.array
    };

    constructor(props) {
        super(props);
        this._handleItemClicks = [];

        // bind the click functions for each item here instead of in the render
        props.children.map(function (item) {
            this._handleItemClicks.push(
                this._handleItemClick.bind(null, item.id, props.id)
            );
        }.bind(this));
    }

    _getSelectedChild = () => {
        return _.find(this.props.children, function (item) {
            return this.props.selectedNode === item.id;
        }.bind(this)) || "";
    };

    _getMenuItems = () => {
        var items = [],
            item;

        for (var i=0; i<this.props.children.length; i+=1) {
            item = this.props.children[i];

            items.push(
                <li key={item.id}>
                    <a
                        data-id={this.props["data-id"] + "-option-" + item.id}
                        onClick={this._handleItemClicks[i]}>
                        {item.label}
                    </a>
                </li>
            );
        }

        return items;
    };

    _handleSectionClick = (e) => {
        var dataId = e.target.getAttribute("data-id");

        // react adds DOM when the icon is present, and clicking on the autogenerated spans will yield a data-id=null
        // if the data-id is not found look on the parent
        if (!dataId) {
            dataId = e.target.parentNode.getAttribute("data-id");
        }

        this.props.onSectionValueChange(dataId.slice(0, -6));
    };

    _handleItemClick = (id, sectionId) => {
        this.props.onItemValueChange(id, sectionId);
        this.props.onSectionValueChange(sectionId);
    };

    _handleAddLinkClick = () => {
        this.props.addLink.callback();
        this.props.onSectionValueChange(this.props.id);
    };


    render() {
        var className = {
                "context-selector-open": this.props.open
            },
            linkClassName = {
                open: this.props.open,
                "has-icon": !!this.props.icon
            };

        const iconClassName = getIconClassName(this.props);

        return (
            <div className={classnames("nav-section context-selector", className)} data-id={this.props["data-id"]}>
                <div className="title">
                    {this.props.label}
                </div>
                <ul className="menu">
                    <li>
                        <a
                            data-id={this.props["data-id"] + "-label"}
                            className={classnames("context-selector-value collapsible-link right", linkClassName)}
                            onClick={this._handleSectionClick}>
                            {iconClassName ? (<span className={iconClassName}></span>) : null}
                            {this._getSelectedChild().label}
                        </a>
                        <ul className="context-selector-menu" data-id={this.props["data-id"] + "-menu"}>
                            {this._getMenuItems()}
                            {this.props.addLink &&
                                <li>
                                    <a
                                        data-id={this.props["data-id"] + "-option-add"}
                                        onClick={this._handleAddLinkClick}
                                        className="context-selector-add">
                                        {this.props.addLink.text}
                                    </a>
                                </li>
                            }
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

module.exports = LeftNavBar;


module.exports.defaultRender = defaultRender;
