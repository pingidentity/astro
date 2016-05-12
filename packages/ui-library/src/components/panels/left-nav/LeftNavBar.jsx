var React = require("../../../util/ReactWithDefaultMethods"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    Copyright = require("./Copyright.jsx"),
    _ = require("underscore");

/**
 * @class LeftNavBar
 * @param {object[]} tree - A prop which describes the structure of the nav tree.
 * @param {object} [openNode] = A hash map of ids and their open state
 * @param {function} [onSectionClick] - A callback which will be excuted when any section node is clicked.
 * The callback will be given 1 parameter equal to the id of the item clicked.
 * @param {function} [onItemClick] - A callback which will be executed when any leaf node is clicked.
 * The callback will be given 1 parameter equal to the id of the item clicked.
 * @example
 * <LeftNavBar tree={[{ label: "Group 1", children: [{ label: "Item 1" }] }]} />
 */
var LeftNavBar = React.createClass({
    propTypes: {
        tree: React.PropTypes.array.isRequired.affectsRendering,
        selectedNode: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).affectsRendering,
        openNode: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).affectsRendering,
        onSectionClick: React.PropTypes.func,
        onItemClick: React.PropTypes.func
    },

    _rerender: function () {
        this.componentDidUpdate();
        this._getItemSelector().removeEventListener("animationend", this._rerender);
    },

    _getItemSelector: function () {
        return ReactDOM.findDOMNode(this.refs.itemSelector);
    },

    _renderSection: function (section) {
        return (
            <LeftNavSection {...section} key={section.id} data-id={section.id}
                selectedNode={this.props.selectedNode}
                onItemClick={this.props.onItemClick}
                onSectionClick={this.props.onSectionClick}
                open={this.props.openNode === section.id} />);
    },

    componentDidMount: function () {
        //Occasionally the first calculation of the position of the selector is wrong because there are still animations
        //happening on the page.  Recalculate after the initialRender
        this._getItemSelector().addEventListener("transitionend", this._rerender, false);

        this.componentDidUpdate();
    },

    componentWillUnmount: function () {
        this._getItemSelector().removeEventListener("animationend", this._rerender);
    },

    getInitialState: function () {
        return {
            selectorStyle: { top: 0, height: 0 }
        };
    },

    /**
     * @method
     * @name LeftNavBar#componentDidUpdate
     * @param {object} prevProps - Previous props
     * @desc After each render, we need to check if the NavBar highlter needs to be slid over a new item
     */
    componentDidUpdate: function (prevProps) {
        //it is generally bad practice to touch the dom after rendering and also bad practice to set state within
        //componentDidUpdate because how easily you can get into an infinite loop of
        //setState -> componentDidUpdate -> setState.  This is why we make sure the specific props have changed
        //before calling setState.  There's no way around this as the section has to be expanded first before it
        //can be known where to move the itemSelector.

        if (!prevProps ||
            prevProps.selectedNode !== this.props.selectedNode ||
            prevProps.openNode !== this.props.openNode)
        {
            var parent = ReactDOM.findDOMNode(this.refs.container);
            var itemSelectors = parent.getElementsByClassName("highlighted");
            var style = { height: 0, top: 0 };


            if (itemSelectors.length > 0) {
                var dims = itemSelectors[0].getBoundingClientRect();
                var copyrightDims = ReactDOM.findDOMNode(this.refs.container).getElementsByClassName("copyright")[0]
                    .getBoundingClientRect();
                var parentDims = parent.getBoundingClientRect();

                style = {
                    top: parseInt(dims.top - parentDims.top + parent.scrollTop),
                    height: this.props.openNode ? parseInt(dims.height) : 0,
                    opacity: this.props.openNode ? 1 : 0
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

            //since the old menu will be collapsing, we need to calculate how much height is going to disappear so that the selector
            //ends up in the right place.
            if (prevProps && this.props.openNode && prevProps.openNode && this.props.openNode !== prevProps.openNode) {
                var oldIndex = _.findIndex(this.props.tree, { id: prevProps.openNode });
                var newIndex = _.findIndex(this.props.tree, { id: this.props.openNode });

                if (newIndex > oldIndex) {
                    var oldUl = ReactDOM.findDOMNode(this.refs.container).getElementsByClassName("menu")[oldIndex];
                    style.top -= oldUl.getBoundingClientRect().height;
                }
            }

            /* eslint-disable react/no-did-update-set-state */
            if (!_.isEqual(this.state.selectorStyle, style)) {
                this.setState({ selectorStyle: style });
            }
            /* eslint-enable react/no-did-update-set-state */
        }
    },

    render: function () {
        return (
            <div id="nav">
                <div className="nav-menus" ref="container">
                    <div ref="itemSelector" className="selected-item" style={this.state.selectorStyle}></div>

                    { this.props.tree.map(this._renderSection) }

                    <Copyright ref="copyright" />
                </div>
            </div>);
    }
});

/**
 * @class LeftNavSection
 * @private
 * @desc Internal class which renders a section of the LeftNavBar
 * @param {function} onItemClick - The callback for when an leaf is clicked.  Will be passed back the
 * id of the clicked item
 * @param {function} onSectionClick - The callback for when a section label is clicked.  Will be passed
 * back the id of the clicked section
 * @param {bool} open - indicates if the section is open
 * @param {string} id - The id of the component (this is what will be passed back to the onSectionClick handler
 * @param {string} data-id - This may or may not be the same as the id.
 */
var LeftNavSection = React.createClass({
    propTypes: {
        onItemClick: React.PropTypes.func,
        onSectionClick: React.PropTypes.func,
        open: React.PropTypes.bool,
        id: React.PropTypes.string,
        "data-id": React.PropTypes.string
    },

    /*
     * Instead of using bind to create a partial after ever render, just use the data-id to pass the
     * right id back to the click handler.
     */
    _handleItemClick: function (e) {
        this.props.onItemClick(e.target.getAttribute("data-id").slice(0, -6));
    },

    _handleSectionClick: function (e) {
        this.props.onSectionClick(e.target.getAttribute("data-id").slice(0, -6));
    },

    render: function () {
        var className = classnames({
            menu: true,
            open: this.props.open
        });

        return (
            <div>
                <div className="title" data-id={this.props["data-id"] + "-label"} onClick={this._handleSectionClick}>
                    {this.props.label}
                </div>
                <ul className={className} data-id={this.props["data-id"] + "-menu"}>
                {
                    this.props.children.map(function (item, i) {
                        return (
                            <li key={i} className={this.props.selectedNode === item.id ? "highlighted" : ""}>
                                <a data-id={item.id + "-label"} onClick={this._handleItemClick}>
                                    {item.label}
                                </a>
                            </li>);
                    }.bind(this))
                }
                </ul>
                <div className="divider"></div>
            </div>
        );
    }
});

module.exports = LeftNavBar;

