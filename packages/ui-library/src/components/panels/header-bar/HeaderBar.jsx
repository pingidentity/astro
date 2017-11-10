var PropTypes = require("prop-types");
var React = require("react"),
    ReactDOM = require("react-dom"),
    EventUtils = require("../../../util/EventUtils.js"),
    Utils = require("../../../util/Utils.js"),
    classnames = require("classnames"),
    _ = require("underscore");

/**
 * @typedef HeaderBar~navigationLink
 * @desc Look at HeaderBar#NavItem to understand what can be passed.
 * @property {string} [data-id]
 *          To define the base "data-id" value for the top-level HTML container.
 * @property {string} id
 *          Identifier of the link, as well as for the icon. It is formatted "icon-"+id for the icon class.
 * @property {string} [title]
 *          Link title.
 * @property {string} [label]
 *          Display label for the header link. Typically only used by dropdown links, defined in children.
 * @property {string} [url]
 *          Url for link to direct to
 * @property {string} [target="_blank"]
 *          Target window for url, which will default to a new window/tab.
 * @property {HeaderBar~navigationLink[]} [children]
 *          The array of navigationLinks are links display in a dropdown menu, which can contain all of the
 *          same properties defined in a regular link, excluding children, as we only support one level deep.
 */

/**
 * @callback HeaderBar~onItemValueChange
 * @desc The id of the nav item will be passed back as the first parameter
 * @param {string} id
 *          Nav item identifier.
 */

/**
 * @callback HeaderBar~onMenuValueChange
 * @desc The id of the nav item and the id of the menu item will be passed back as parameters 1 and 2.
 * @param {string} navItemId
 *          Nav item identifier.
 * @param {string} navItemId
 *          Menu item identifier.
 */

/**
 * @class HeaderBar
 * @desc HeaderBar provides what you need to show a styled top bar with logos, links, and a menu.
 *
 * @param {string} [data-id="header-bar"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [logo]
 *          Leftmost generic company logo or branded logo
 * @param {string|object} [additionalContent]
 *          Content to display to the right of the "siteLogo" and "siteTitle"
 * @param {string} [siteLogo]
 *          Site or service specific logo
 * @param {string|object} [siteTitle]
 *          Content to display to the right of the "siteLogo" and to the left of "additionalContent"
 * @param {HeaderBar~navigationLink[]} tree
 *          The data structure of the menus of the headerbar
 * @param {string} [openNode]
 *          The id of the currently open node
 * @param {HeaderBar~onItemValueChange} [onItemValueChange]
 *          Callback which will be executed when a header link is clicked.  The id
 *          of the nav item will be passed back as the first parameter
 * @param {HeaderBar~onMenuValueChange} [onMenuValueChange]
 *          Callback which will be executed when a menu item is clicked.  The id
 *          of the nav item and the id of the menu item will be passed back as parameters 1 and 2.
 *
 * @example
 * var headerTree = { id: "help", title: "Help" },
 *                  { id: "account", label: "John Doe",
 *                          children: [{ id: "globe", title: "Internet", label: "Internet", url: "http://google.com" }] }
 *
 * <HeaderBar tree={headerTree} label="Basic UI Library App" onItemValueChange={this.headerActions.toggleItem} />
**/
module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        additionalContent: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        logo: PropTypes.string,
        openNode: PropTypes.string,
        siteLogo: PropTypes.string,
        siteTitle: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        tree: PropTypes.arrayOf(PropTypes.object),
        onMenuValueChange: PropTypes.func,
        onItemValueChange: PropTypes.func
    };

    static defaultProps = {
        onItemValueChange: _.noop,
        onMenuValueChange: _.noop,
        "data-id": "header-bar"
    };

    componentWillMount() {
        // TODO: figure out why Jest test was unable to detect the specific error, create tests for throws
        /* istanbul ignore if  */
        if (!Utils.isProduction() && this.props.label) {
            /* istanbul ignore next  */
            throw new Error(Utils.deprecatePropError("label", "siteTitle"));
        }
    }

    /**
     * @method
     * @name HeaderBar#componentDidMount
     * @desc Upon mounting, register a callback for global click events to be used to hide any visible menu items when
     * the user clicks outside of it
     */
    componentDidMount() {
        window.addEventListener("click", this._handleGlobalClick);
    }

    /**
     * @method
     * @name HeaderBar#componentWillUnmount
     * @desc Before unmounting, unregister the global click listener
     */
    componentWillUnmount() {
        window.removeEventListener("click", this._handleGlobalClick);
    }

    /**
     * @method
     * @name HeaderBar#_handleGlobalClick
     * @param {event} e - Event
     * @private
     * @desc The function which gets called on window clicks to determine if the menu should be hidden
     */
    _handleGlobalClick = (e) => {
        //if no menus are open, do nothing
        if (!this.props.openNode) {
            return;
        }

        //if there is a menu open and we receive a click from outside of the nav container, then close it
        EventUtils.callIfOutsideOfContainer(
            ReactDOM.findDOMNode(this.refs.navContainer),
            this.props.onItemValueChange.bind(null, ""),
            e);
    };

    /**
     * @method
     * @name HeaderBar#_handleNavClick
     * @param {event} e - Event
     * @private
     * @desc Instead of creating partials using bind, we have one function which will pass back the id of
     * the clicked on nav item.  There is a performance overhead of creating partials on every render.
     */
    _handleNavClick = (e) => {
        this.props.onItemValueChange(e.currentTarget.getAttribute("data-id"));
    };

    render() {
        return (
            <div id="header" data-id={this.props["data-id"]}>
                <div className="logo" data-id="header-logo" />

                {this.props.siteLogo &&
                    <img className="site-logo" data-id="header-site-logo" src={this.props.siteLogo} />
                }
                {this.props.siteTitle &&
                    <span className="site-title" data-id={this.props["data-id"] + "-site-title"}>
                        {this.props.siteTitle}
                    </span>
                }
                {this.props.additionalContent &&
                    <span className="additional-content" data-id={this.props["data-id"] + "-additional-content"}>
                        {this.props.additionalContent}
                    </span>
                }
                <ul className="product-nav" ref="navContainer">
                    {
                        this.props.tree.map(function (item) {
                            var props = _.defaults({
                                key: item.id,
                                id: item.id,
                                "data-id": item.id,
                                onClick: this._handleNavClick,
                                onMenuValueChange: this.props.onMenuValueChange,
                                showMenu: item.id === this.props.openNode
                            }, item);

                            return (
                                <NavItem {...props}>
                                    {item.children}
                                </NavItem>
                            ); //eslint-disable-line no-use-before-define
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }
};

/**
 * @class NavItem
 * @desc Internal component type which will render a product-nav item and optional a corresponding menu
 * @private
 * @memberOf HeaderBar
 *
 * @param {string} id
 *          The id of the component.  Determines the icon
 * @param {string} [data-id="nav-item"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [title]
 *          Sets the title attribute of the label (tooltip)
 * @param {string} [target=_blank]
 *          This may be "" or "_blank"
 * @param {string} [url]
 *          If provided the NavItem will be a clickable link instead of executing a callback
 * @param {string} [iconClassName]
 *          The className for the menu icon. Takes priority over the iconSrc prop.
 * @param {string} [iconSrc]
 *          Allows the passage of an image url (most likely an svg) for the icon.
 * @param {boolean} [showMenu=false]
 *          Menu state, while this is defined, it's managed internally to this component and doesn't require the
 *          developer to do anything when they use the headerbar.
 */
class NavItem extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        "data-id": PropTypes.string,
        title: PropTypes.string,
        target: PropTypes.string,
        url: PropTypes.string,
        iconClassName: PropTypes.string,
        iconSrc: PropTypes.string,
        showMenu: PropTypes.bool,
        children: PropTypes.array
    };

    static defaultProps = {
        target: "_blank",
        "data-id": "nav-item"
    };

    _handleMenuClick = (e) => {
        this.props.onMenuValueChange(e.currentTarget.getAttribute("data-id"), this.props.id);
    };

    _getIcon = (item) => {
        if (item.iconClassName) {
            return (
                <span className={classnames("icon", item.iconClassName)}/>
            );
        }
        else if (item.iconSrc) {
            return (
                <img src={item.iconSrc} className="icon"/>
            );
        }
    };

    render() {

        return (
            <li>
                 <a onClick={this.props.onClick} href={this.props.url}
                        data-id={this.props["data-id"] || this.props.id}
                        title={this.props.title}
                        target={this.props.target}>
                     {this._getIcon(this.props)}
                 </a>
                 { this.props.children && this.props.showMenu &&
                     <ul className="product-menu show">
                     {
                        this.props.children.map(function (item) {
                            return (
                                <li key={item.id} onClick={this._handleMenuClick} data-id={item.id}>
                                    <a href={item.url}>
                                        {this._getIcon(item)}
                                        <span>{item.label}</span>
                                    </a>
                                </li>);
                        }.bind(this))
                     }
                     </ul>
                 }
            </li>);
    }
}
