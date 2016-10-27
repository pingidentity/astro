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
 * @property {LeftNavBar#Node[]} [children]
 *              An optional array of children under this section
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
        collapsible: React.PropTypes.bool,
        autocollapse: React.PropTypes.bool,
        onSectionClick: React.PropTypes.func,
        onItemClick: React.PropTypes.func,
        onSectionValueChange: React.PropTypes.func,
        onItemValueChange: React.PropTypes.func
    },

    _rerender: function () {
        this.componentDidUpdate();
        this._getItemSelector().removeEventListener("animationend", this._rerender);
    },

    _getItemSelector: function () {
        return ReactDOM.findDOMNode(this.refs.itemSelector);
    },

    _renderSection: function (section) {
        var itemclick = this.props.onItemClick || this.props.onItemValueChange;
        var sectionclick = this.props.onSectionClick || this.props.onSectionValueChange;

        return (
            <LeftNavSection {...section} key={section.id} data-id={section.id}
                    selectedNode={this.props.selectedNode}
                    onItemValueChange={itemclick}
                    onSectionValueChange={sectionclick}
                    open={this.props.openSections[section.id]} />);
    },

    _handleResize: function () {
        var nav = ReactDOM.findDOMNode(this.refs.container);
        this.setState({ scrollable: nav.scrollHeight > nav.offsetHeight });
    },

    componentDidMount: function () {
        //Occasionally the first calculation of the position of the selector is wrong because there are still animations
        //happening on the page.  Recalculate after the initialRender
        this._getItemSelector().addEventListener("transitionend", this._rerender, false);

        // store height of copyright to use as bottom of nav-menus
        var copyright = ReactDOM.findDOMNode(this.refs.copyright),
            dims = copyright.getBoundingClientRect();

        /* eslint-disable */
        this.setState({ copyrightHeight: Math.round(dims.height) });
        /* eslint-enable */

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
            collapsible: false,
            autocollapse: false
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
        //it is generally bad practice to touch the dom after rendering and also bad practice to set state within
        //componentDidUpdate because how easily you can get into an infinite loop of
        //setState -> componentDidUpdate -> setState.  This is why we make sure the specific props have changed
        //before calling setState.  There's no way around this as the section has to be expanded first before it
        //can be known where to move the itemSelector.

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
                var copyrightDims = ReactDOM.findDOMNode(this.refs.nav).getElementsByClassName("copyright")[0]
                    .getBoundingClientRect();
                var parentDims = parent.getBoundingClientRect();
                var sectionOpen = !this.props.collapsible ||
                    (this.props.selectedSection && this.props.openSections[this.props.selectedSection]);

                style = {
                    top: parseInt(dims.top - parentDims.top + parent.scrollTop),
                    height: sectionOpen ? parseInt(dims.height) : 0,
                    opacity: sectionOpen ? 1 : 0
                };

                //if the selected item is outside the visible area of the navbar, page down
                if (dims.bottom > copyrightDims.top) {
                    parent.scrollTop += parentDims.height;
                }
                //if the selected item is outside the visible area of the navbar, page up
                if (dims.top < 0) {
                    parent.scrollTop -= parentDims.height;
                }
            }

            //since the old menu will be collapsing, we need to calculate how much height is going to disappear so that
            //the selector ends up in the right place.
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
            window.addEventListener("resize", this._handleResize);
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
                <div className="nav-menus" ref="container"
                        style={{ bottom: this.state.copyrightHeight }}>
                    <div ref="itemSelector" className="selected-item" style={this.state.selectorStyle}></div>
                    <div ref="itemSelectorArrow" className="selected-item-arrow" style={this.state.selectorArrowStyle}>
                        <div></div>
                    </div>
                    { this.props.tree.map(this._renderSection) }
                </div>
                <Copyright ref="copyright" />
            </div>);
    }
});

/**
 * @class LeftNavSection
 * @private
 * @desc Internal class which renders a section of the LeftNavBar
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
        open: React.PropTypes.bool,
        id: React.PropTypes.string,
        "data-id": React.PropTypes.string
    },

    /*
     * Instead of using bind to create a partial after ever render, just use the data-id to pass the
     * right id back to the click handler.
     */
    _handleItemClick: function (id, sectionId) {
        this.props.onItemValueChange(id, sectionId);
    },

    _handleSectionClick: function (e) {
        this.props.onSectionValueChange(e.target.getAttribute("data-id").slice(0, -6));
    },

    render: function () {
        var className = classnames({
                "nav-section": true,
                open: !this.props.label || this.props.open,
                closed: this.props.label && !this.props.open
            }),
            itemClassName;

        return (
            <div className={className}>
                {this.props.label && (
                    <div className="title" data-id={this.props["data-id"] + "-label"}
                            onClick={this._handleSectionClick}>
                        {this.props.label}
                    </div>
                )}
                <ul className="menu" data-id={this.props["data-id"] + "-menu"}>
                {
                    this.props.children.map(function (item, i) {
                        itemClassName = {
                            highlighted: this.props.selectedNode === item.id,
                            "has-icon": !!item.icon
                        };
                        return (
                            <li key={i} className={classnames(itemClassName)}>
                                <a data-id={item.id + "-label"}
                                        onClick={this._handleItemClick.bind(null, item.id, this.props.id)}>
                                    {item.icon ? (<span className={"icon-" + item.icon}></span>) : null}{item.label}
                                </a>
                            </li>);
                    }.bind(this))
                }
                </ul>
            </div>
        );
    }
});

module.exports = LeftNavBar;
