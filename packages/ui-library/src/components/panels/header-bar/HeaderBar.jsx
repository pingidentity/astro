var React = require("../../../util/ReactWithDefaultMethods.js"),
    ReactDOM = require("react-dom"),
    EventUtils = require("../../../util/EventUtils.js"),
    _ = require("underscore");

/** @class HeaderBar
 * @desc HeaderBar provides what you need to show a styled top bar with logos, links, and a menu.
 *
 * @param {object[]} tree - The data structure of the menus of the headerbar
 * @param {string} [data-id] - used as data-id on top HTML element.
 * @param {string} [logo] - leftmost generic company logo or branded logo
 * @param {string} [siteLogo] - site or service specific logo
 * @param {function} [onItemClick] - Callback which will be executed when a header link is clicked.  The id
 * of the nav item will be passed back as the first parameter
 * @param {function} [onMenuClick] - Callback which will be executed when a menu item is clicked.  The id
 * of the nav item and the id of the menu item will be passed back as parameters 1 and 2.
 * @param {string} [openNode] - The id of the currently open node
 **/
module.exports = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string.affectsRendering,
        logo: React.PropTypes.string.affectsRendering,
        siteLogo: React.PropTypes.string.affectsRendering,
        tree: React.PropTypes.arrayOf(React.PropTypes.object).affectsRendering,
        openNode: React.PropTypes.string.affectsRendering,
        label: React.PropTypes.string.affectsRendering
    },

    getDefaultProps: function () {
        return {
            logo: "",
            siteLogo: "",
            onItemClick: _.noop,
            onMenuClick: _.noop,
            "data-id": "header-bar"
        };
    },

    /**
     * @method
     * @name HeaderBar#componentDidMount
     * @desc Upon mounting, register a callback for global click events to be used to hide any visible menu items when
     * the user clicks outside of it
     */
    componentDidMount: function () {
        window.addEventListener("click", this._handleGlobalClick);
    },

    /**
     * @method
     * @name HeaderBar#componentWillUnmount
     * @desc Before unmounting, unregister the global click listener
     */
    componentWillUnmount: function () {
        window.removeEventListener("click", this._handleGlobalClick);
    },

    /**
     * @method
     * @name HeaderBar#_handleGlobalClick
     * @param {event} e - Event
     * @private
     * @desc The function which gets called on window clicks to determine if the menu should be hidden
     */
    _handleGlobalClick: function (e) {
        //if no menus are open, do nothing
        if (!this.props.openNode) {
            return;
        }

        //if there is a menu open and we receive a click from outside of the nav container, then close it
        EventUtils.callIfOutsideOfContainer(
            ReactDOM.findDOMNode(this.refs.navContainer),
            this.props.onItemClick.bind(null, ""),
            e);
    },

    /**
     * @method
     * @name HeaderBar#_handleNavClick
     * @param {event} e - Event
     * @private
     * @desc Instead of creating partials using bind, we have one function which will pass back the id of
     * the clicked on nav item.  There is a performance overhead of creating partials on every render.
     */
    _handleNavClick: function (e) {
        this.props.onItemClick(e.target.getAttribute("data-id"));
    },

    render: function () {
        return (
            <div id="header" data-id={this.props["data-id"]}>
                <div className="logo" data-id="header-logo" />

                {this.props.siteLogo &&
                    <img className="site-logo" data-id="header-site-logo" src={this.props.siteLogo} />
                }

                <span className="title">{this.props.label}</span>

                <ul className="product-nav" ref="navContainer">
                {
                    this.props.tree.map(function (item) {
                        return (
                            <NavItem {...item} key={item.id} data-id={item.id}
                                onClick={this._handleNavClick}
                                onMenuClick={this.props.onMenuClick}
                                showMenu={item.id === this.props.openNode} />);
                    }.bind(this))
                }
                </ul>
            </div>);
    }
});

/** @class NavItem
 * @private
 * @memberOf HeaderBar
 * @param {string} id - The id of the component.  Determines the icon
 * @param {string} data-id - The data-id of the component
 * @param {string} [title] - Sets the title attribute of the label (tooltip)
 * @param {string} [target=_blank] - This may be "" or "_blank"
 * @param {string} [url] - If provided the NavItem will be a clickable link instead of executing a callback
 * @param {showMenu} [bool=false] - Menu state
 * @desc Internal component type which will render a product-nav item and optionall a corresponding menu
 */
var NavItem = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        target: React.PropTypes.string,
        id: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        url: React.PropTypes.string,
        showMenu: React.PropTypes.bool
    },

    _handleMenuClick: function (e) {
        this.props.onMenuClick(e.target.getAttribute("data-id"), this.props.id);
    },

    getDefaultProps: function () {
        return {
            target: "_blank"
        };
    },

    render: function () {
        return (
            <li>
                 <a onClick={this.props.onClick} href={this.props.url}
                        title={this.props.title}
                        target={this.props.target}>
                     <span data-id={this.props["data-id"]} className={"icon-" + this.props.id}></span>
                 </a>
                 { this.props.children && this.props.showMenu &&
                     <ul className="product-menu show">
                     {
                        this.props.children.map(function (item) {
                            return (
                                <li key={item.id} onClick={this._handleMenuClick} data-id={item.id}>
                                    <a href={item.url}><span className={"icon-" + item.id} />{item.label}</a>
                                </li>);
                        }.bind(this))
                     }
                     </ul>
                 }
            </li>);
    }
});
