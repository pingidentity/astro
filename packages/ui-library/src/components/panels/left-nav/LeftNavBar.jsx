var React = require("../../../util/ReactWithDefaultMethods.js"),
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

    _handleSectionClick: function (id) {
        this.props.onSectionClick(id);
    },

    _handleItemClick: function (id) {
        this.props.onItemClick(id);
    },

    _renderSection: function (section, index) {
        var sectionClass = classnames({
            menu: true,
            open: this.props.openNode === section.id
        });

        return (
            <div key={index}>
                <div className="title" data-id={section.id + "-label"}
                        onClick={this._handleSectionClick.bind(this, section.id)}>
                    {section.label}
                </div>
                <ul className={sectionClass} data-id={section.id + "-menu"}>
                {
                    section.children.map(function (item, i) {
                        return (
                            <li key={i} className={this.props.selectedNode === item.id ? "highlighted" : ""}>
                                <a data-id={item.id + "-label"} onClick={this._handleItemClick.bind(this, item.id)}>
                                    {item.label}
                                </a>
                            </li>);
                    }.bind(this))
                }
                </ul>
                <div className="divider"></div>
            </div>
        );
    },

    _rerender: function () {
        this.componentDidUpdate();
        this._getItemSelector().removeEventListener("animationend", this._rerender);
    },

    _getItemSelector: function () {
        return ReactDOM.findDOMNode(this.refs.itemSelector);
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

                    <Copyright />
                </div>
            </div>);
    }
});

module.exports = LeftNavBar;
