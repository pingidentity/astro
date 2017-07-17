var React = require("re-react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    Copyright = require("./Copyright.jsx"),
    Utils = require("../../../util/Utils"),
    _ = require("underscore");

/**
 * @typedef {object} LeftNavBar#Node
 * @desc An object describing a leaf in the LeftNav
 * @property {string} label
 *              The label of the node
 * @property {string|number} id
 *              A unique string identifier.  This value will be passed back to the onItemValueChange callback.
 */

/**
 * @typedef {object} LeftNavBar#Section
 * @property {string} label
 *              The label of the section
 * @property {string|number} id
 *              A unique string identifier.  This value will be passed back to the onSectionValueChange callback.
 * @property {string} icon
 *              A string corresponding to an existing icon in the ui-library icon font.
 * @property {string} type
 *              A string that designates wether the section should be rendered as navigation links or a context
 *              drop-down style menu within the sidebar.
 * @property {object} addLink
 *              For sections type=context only.  An object that spefies the text and callback for the context menu add
 *              menu.
 * @property {string} addLink.text
 *              The text to display in the addLink.
 * @property {func} addLink.callback
 *              The callback to trigger when the addLink is clicked.
 * @property {LeftNavBar#Node[]} [children]
 *              An optional array of children under this section.
 */

/**
 * @callback LeftNavBar~onSectionValueChange
 * @param {string|number} id
 *             The id of the item that was clicked
 */

/**
 * @callback LeftNavBar~onItemValueChange
 * @param {string|number} id
 *             The id of the item that was clicked
 * @param {string|number} sectionId
 *             The id of the section the item that was clicked belongs to.
 */

/**
 * @class LeftNavBar
 * @desc This component implements a LeftNav bar.  While on first instinct, it might seem like it would be better to
 * have the tree structure be described by some jsx markup inside the LeftNavBar, there are a couple of problems with that:
 *
 * a) Attaching the click handlers for sections/nodes would involve cloning and re-writing each child and grandchild.
 *    This is cumbersome.
 *
 * b) Most of the time, the left nav bar is dynamic (think of the CDP where the list of categories is determiend at runtime),
 *    so this approach would introduce logic to take some data strucutre, map it to React descriptors, only to be cloned and
 *    re-written.
 *
 * As a result, the approach taken was to pass in a data structure to the LeftNav as a property and leave it up to it to
 * map that data to whatever internal markup it wants.
 *
 * @param {string} [data-id="left-nav-bar"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {LeftNavBar#Section[]} tree
 *          A prop which describes the structure of the nav tree.  This will be an array of
 *          Section objects, each of which may have an array of Node objects as its children.
 *          Please refer to the example below.
 * @param {string|number} [selectedNode]
 *          The id of the selected node.
 * @param {string|number} [selectedSection]
 *          The id of the selected section.
 * @param {object} [openSections={}]
 *          A hash map of ids and their open state. This is used internally by the Reducer to maintain
 *          expand/collapse state.
 * @param {boolean} [collapsible=false]
 *          If false, will have all sections open at once by default and disable the collapse feature.
 * @param {boolean} [autocollapse=false]
 *          Whether or not the sections should autocollapse. Disabled if the collapsible prop is set to false.
 * @param {LeftNavBar~onSectionValueChange} [onSectionValueChange]
 *          A callback which will be excuted when any section node is clicked. The callback will be given 1 parameter
 *          equal to the id of the item clicked.
 * @param {LeftNavBar~onSectionClick} [onSectionClick]
 *          DEPRECATED. Use onSectionValueChange instead.
 * @param {LeftNavBar~onItemValueChange} [onItemValueChange]
 *          A callback which will be executed when any leaf node is clicked. The callback will be given 1 parameter
 *          equal to the id of the item clicked.
 * @param {LeftNavBar~onItemClick} [onItemClick]
 *          DEPRECATED. Use onItemValueChange instead.
 * @param {boolean} [pingoneLogo=false]
 *          Determines whether to show the PingOne Logo.
 * @param {string} [logoSrc]
 *          An optional URL that can be provided for a logo.
 * @param {string|object} [topContent]
 *          String or html content to inject into the top of the sidebar.
 *
 * @example
 * var item1 = {label: "Item 1", id: "item1"};
 * var item2 = {label: "Item 2", id: "item2"};
 * var section1 = {label: "Section 1", id: "section1", children: [item1, item2]};
 * var section2 = {label: "Empty Section", id: "empty"};
 *
 * <LeftNavBar tree={[section1, section2]}
 */
var LeftNavBar = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        tree: React.PropTypes.array.isRequired.affectsRendering,
        selectedNode: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).affectsRendering,
        selectedSection: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).affectsRendering,
        openSections: React.PropTypes.object.affectsRendering,
        collapsible: React.PropTypes.bool.affectsRendering,
        autocollapse: React.PropTypes.bool.affectsRendering,
        onSectionClick: React.PropTypes.func,
        onItemClick: React.PropTypes.func,
        onSectionValueChange: React.PropTypes.func,
        onItemValueChange: React.PropTypes.func,
        pingoneLogo: React.PropTypes.bool.affectsRendering,
        logoSrc: React.PropTypes.string.affectsRendering,
        topContent: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).affectsRendering
    },

    _rerender: function () {
        this.componentDidUpdate();
        this._getItemSelector().removeEventListener("animationend", this._rerender);
    },

    _getItemSelector: function () {
        return ReactDOM.findDOMNode(this.refs.itemSelector);
    },

    _renderItem: function (item) {
        if (item.type === "context") {
            return this._renderContextSelector(item);
        } else {
            return this._renderSection(item);
        }
    },

    _renderSection: function (section) {
        return (
            <LeftNavSection
                {...section}
                key={section.id}
                data-id={section.id}
                selectedNode={this.props.selectedNode}
                onItemValueChange={this._handleItemClick}
                onSectionValueChange={this._handleSectionClick}
                open={this.props.openSections[section.id]}
            />
        );
    },

    _renderContextSelector: function (selector) {
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
    },

    _handleSectionClick: function (sectionId) {
        var onSectionClick = this.props.onSectionClick || this.props.onSectionValueChange;

        onSectionClick(sectionId);
    },

    _handleItemClick: function (sectionId, itemId) {
        var onValueChange = this.props.onItemClick || this.props.onItemValueChange;

        onValueChange(sectionId, itemId);
    },

    _handleResize: function () {
        var nav = ReactDOM.findDOMNode(this.refs.container);
        this.setState({ scrollable: nav.scrollHeight > nav.offsetHeight });
    },

    componentDidMount: function () {
        // Occasionally the first calculation of the position of the selector is wrong because there are still
        // animations happening on the page.  Recalculate after the initialRender
        this._getItemSelector().addEventListener("transitionend", this._rerender, false);

        // store height of copyright to use as bottom of nav-menus
        var copyright = ReactDOM.findDOMNode(this.refs.copyright),
            dims = copyright.getBoundingClientRect();

        /* eslint-disable */
        this.setState({ copyrightHeight: Math.round(dims.height) });
        /* eslint-enable */

        window.addEventListener("resize", this._handleResize);

        this.componentDidUpdate();
    },

    componentWillUnmount: function () {
        this._getItemSelector().removeEventListener("animationend", this._rerender);
        this._getItemSelector().removeEventListener("resize", this._handleResize);
    },

    getInitialState: function () {
        return {
            copyrightHeight: 0,
            selectorStyle: { top: 0, height: 0 },
            selectorArrowStyle: { top: 0 },
            scrollable: false
        };
    },

    getDefaultProps: function () {
        return {
            "data-id": "left-nav-bar",
            openSections: {},
            selectedContexts: {},
            collapsible: false,
            autocollapse: false,
            pingoneLogo: false
        };
    },

    /**
     * @ignore
     * @method
     * @desc After each render, we need to check if the NavBar highlter needs to be slid over a new item
     * @name LeftNavBar~componentDidUpdate
     * @param {object} prevProps
     *          Previous props
     */
    componentDidUpdate: function (prevProps) {
        // it is generally bad practice to touch the dom after rendering and also bad practice to set state within
        // componentDidUpdate because how easily you can get into an infinite loop of
        // setState -> componentDidUpdate -> setState.  This is why we make sure the specific props have changed
        // before calling setState.  There's no way around this as the section has to be expanded first before it
        // can be known where to move the itemSelector.

        if (!prevProps ||
            prevProps.selectedNode !== this.props.selectedNode ||
            prevProps.selectedSection !== this.props.selectedSection ||
            !_.isEqual(prevProps.openSections, this.props.openSections))
        {

            var parent = ReactDOM.findDOMNode(this.refs.container);
            var itemSelectors = parent.getElementsByClassName("highlighted");
            var style = { height: 0, top: 0 };
            var arrowStyle = { top: 0 };

            if (itemSelectors.length > 0) {
                var dims = itemSelectors[0].getBoundingClientRect();
                var parentDims = parent.getBoundingClientRect();
                var sectionOpen = !this.props.collapsible ||
                    (this.props.selectedSection && this.props.openSections[this.props.selectedSection]);

                style = {
                    top: parseInt(dims.top - parentDims.top + parent.scrollTop),
                    height: sectionOpen ? parseInt(dims.height) : 0,
                    opacity: sectionOpen ? 1 : 0
                };

                // if the selected item is outside the visible area of the navbar, scroll up
                if (dims.top < 0) {
                    parent.scrollTop -= parentDims.height;
                }
            }

            // since the old menu will be collapsing, we need to calculate how much height is going to disappear so that
            // the selector ends up in the right place.
            if (prevProps && this.props.selectedSection && prevProps.selectedSection &&
                this.props.selectedSection !== prevProps.selectedSection) {
                var oldIndex = _.findIndex(this.props.tree, { id: prevProps.selectedSection });
                var newIndex = _.findIndex(this.props.tree, { id: this.props.selectedSection });

                if (newIndex > oldIndex) {
                    var oldUl = ReactDOM.findDOMNode(this.refs.container).getElementsByClassName("menu")[oldIndex];
                    style.top -= oldUl.getBoundingClientRect().height;
                }
            }

            // set styles for arrow element based on selected item styles
            arrowStyle = {
                top: style.top + Math.floor((style.height - 52) / 2), // 52 == height of arrow
                opacity: style.opacity
            };

            // set whether nav is tall enough to scroll (toggles class on nav to trigger shadow on copyright)
            this._handleResize();

            /* eslint-disable react/no-did-update-set-state */
            if (!_.isEqual(this.state.selectorStyle, style)) {
                this.setState({ selectorStyle: style, selectorArrowStyle: arrowStyle });
            }
            /* eslint-enable react/no-did-update-set-state */
        }
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            if (this.props.onItemClick) {
                console.warn(Utils.deprecateMessage("onItemClick", "onItemValueChange"));
            }
            if (this.props.onSectionClick) {
                console.warn(Utils.deprecateMessage("onSectionClick", "onSectionValueChange"));
            }
        }
    },

    render: function () {
        var className = classnames({
            scrollable: this.state.scrollable,
            collapsible: this.props.collapsible
        });

        return (
            <div id="nav" ref="nav" className={className}>
                <div className="nav-menus" ref="container" style={{ bottom: this.state.copyrightHeight }}>
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
                />
            </div>
        );
    }
});

/**
 * @class LeftNavSection
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
var LeftNavSection = React.createClass({
    propTypes: {
        onItemValueChange: React.PropTypes.func,
        onSectionValueChange: React.PropTypes.func,
        open: React.PropTypes.bool.affectsRendering,
        id: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        selectedNode: React.PropTypes.string.affectsRendering,
        children: React.PropTypes.array.affectsRendering
    },

    /*
     * Instead of using bind to create a partial after ever render, just use the data-id to pass the
     * right id back to the click handler.
     */
    _handleItemClick: function (id, sectionId) {
        this.props.onItemValueChange(id, sectionId);
    },

    _handleSectionClick: function (e) {
        var dataId = e.target.getAttribute("data-id");

        // react adds DOM when the icon is present, and clicking on the autogenerated spans will yeild a data-id=null
        // if the data-id is not found look on the parent
        if (!dataId) {
            dataId = e.target.parentNode.getAttribute("data-id");
        }

        this.props.onSectionValueChange(dataId.slice(0, -6));
    },

    _getItems: function () {
        var items = [],
            item,
            itemClassName;

        for (var i=0; i<this.props.children.length; i+=1) {
            item = this.props.children[i];
            itemClassName = {
                highlighted: this.props.selectedNode === item.id,
                "has-icon": !!item.icon
            };

            items.push(
                <li key={i} className={classnames(itemClassName)}>
                    <a
                        data-id={item.id + "-label"}
                        onClick={this._handleItemClicks[i]}>
                        {item.icon ? (<span className={"icon-" + item.icon}></span>) : null}{item.label}
                    </a>
                </li>
            );
        }

        return items;
    },

    componentWillMount: function () {
        this._handleItemClicks = [];

        // bind the click functions for each item here instead of in the render
        this.props.children.map(function (item) {
            this._handleItemClicks.push(
                this._handleItemClick.bind(null, item.id, this.props.id)
            );
        }.bind(this));
    },

    render: function () {
        var isOpen = !this.props.label || this.props.open,
            className = classnames("nav-section", {
                open: isOpen
            }),
            titleClassName = classnames("title collapsible-link right", {
                open: isOpen
            });

        return (
            <div className={className} data-id={this.props["data-id"]}>
                {this.props.label && (
                    <div
                        className={titleClassName}
                        data-id={this.props["data-id"] + "-label"}
                        onClick={this._handleSectionClick}>
                        {this.props.label}
                    </div>
                )}
                <ul className="menu" data-id={this.props["data-id"] + "-menu"}>
                    { this._getItems() }
                </ul>
            </div>
        );
    }
});

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
var LeftNavContextSelector = React.createClass({
    propTypes: {
        onItemValueChange: React.PropTypes.func,
        onSectionValueChange: React.PropTypes.func,
        open: React.PropTypes.bool.affectsRendering,
        id: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        selectedNode: React.PropTypes.string.affectsRendering,
        children: React.PropTypes.array.affectsRendering
    },

    _getSelectedChild: function () {
        return _.find(this.props.children, function (item) {
            return this.props.selectedNode === item.id;
        }.bind(this)) || "";
    },

    _getMenuItems: function () {
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
    },

    _handleSectionClick: function (e) {
        var dataId = e.target.getAttribute("data-id");

        // react adds DOM when the icon is present, and clicking on the autogenerated spans will yeild a data-id=null
        // if the data-id is not found look on the parent
        if (!dataId) {
            dataId = e.target.parentNode.getAttribute("data-id");
        }

        this.props.onSectionValueChange(dataId.slice(0, -6));
    },

    _handleItemClick: function (id, sectionId) {
        this.props.onItemValueChange(id, sectionId);
        this.props.onSectionValueChange(sectionId);
    },

    _handleAddLinkClick: function () {
        this.props.addLink.callback();
        this.props.onSectionValueChange(this.props.id);
    },

    componentWillMount: function () {
        this._handleItemClicks = [];

        // bind the click functions for each item here instead of in the render
        this.props.children.map(function (item) {
            this._handleItemClicks.push(
                this._handleItemClick.bind(null, item.id, this.props.id)
            );
        }.bind(this));
    },

    render: function () {
        var className = {
                "context-selector-open": this.props.open
            },
            linkClassName = {
                open: this.props.open,
                "has-icon": !!this.props.icon
            };

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
                            {this.props.icon ? (<span className={"icon-" + this.props.icon}></span>) : null}
                            {this._getSelectedChild().label}
                        </a>
                        <ul className="context-selector-menu"data-id={this.props["data-id"] + "-menu"}>
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
});

module.exports = LeftNavBar;
