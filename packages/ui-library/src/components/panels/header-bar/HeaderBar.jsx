var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    _ = require("underscore");

var PopoverNavMenu = require("../../tooltips/PopoverNavMenu"),
    HeaderNav = require("./HeaderNav"),
    EnvironmentSelector = require("./EnvironmentSelector"),
    MarketSelector = require("./MarketSelector"),
    Logo = require("./logos/Logo");

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
 * @class HeaderBar
 * @desc HeaderBar provides what you need to show a styled top bar with logos, links, and a menu.
 *
 * @param {string} [data-id="header-bar"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string|object} [additionalContent]
 *          Content to display to the right of the "siteLogo" and "siteTitle"
 * @param {array} [environmentOptions]
 *          Choices for environment in the environment selector
 * @param {string|number} [environmentSelected]
 *          Current environment selected by the environment selector
 * @param {boolean} [inline=false]
 *          When true, the header bar is positioned inline with the content, not at the top of the page
 * @param {array} [navOptions]
 *          Choices in the header nav
 * @param {string|number} [navSelected]
 *          Active item in the header nav
 * @param {HeaderBar~onEnvironmentChange} [onEnvironmentChange]
 *          Callback for when the selected environment changes.
 * @param {HeaderBar~onItemValueChange} [onItemValueChange]
 *          Callback which will be executed when a header link is clicked.  The id
 *          of the nav item will be passed back as the first parameter
 * @param {HeaderBar~onMenuValueChange} [onMenuValueChange]
 *          Callback which will be executed when a menu item is clicked.  The id
 *          of the nav item and the id of the menu item will be passed back as parameters 1 and 2.
 * @param {HeaderBar~onNavChange} [onNavChange]
 *          Callback for when the selected nav item changes.
 * @param {HeaderBar~onMarketChange} [onMarketChange]
 *          Callback for when the selected market changes.
 * @param {string} [openNode]
 *          The id of the currently open node
 * @param {array} [marketOptions]
 *          Choices for market in the market selector
 * @param {string|number} [marketSelected]
 *          Current market selected by the market selector
 * @param {string} [siteLogo]
 *          Site or service specific logo
 * @param {string|object} [siteTitle]
 *          Content to display to the right of the "siteLogo" and to the left of "additionalContent"
 * @param {HeaderBar~navigationLink[]} tree
 *          The data structure of the menus of the headerbar
 * @param {array} [userMenu]
 *          Alternative to the tree prop. If you just want a single user menu, provide the options here
 * @param {string} [userName]
 *          Used as the label for the user menu
 * @param {boolean} [updated]
 *          Flag to explicitly indicate you're using the new style of the header bar. (Without the Ping logo)
 *
 **/

/**
 * @callback HeaderBar~onEnvironmentChange
 * @param {string} environment
 *          Environment id.
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
 * @callback HeaderBar~onNavChange
 * @param {string} currentNav
 *          Nav id.
 */

/**
 * @callback HeaderBar~onMarketChange
 * @param {string} market
 *          Market id.
 */

class HeaderBar extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        additionalContent: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        environmentOptions: PropTypes.arrayOf(PropTypes.object),
        environmentSelected: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        inline: PropTypes.bool,
        navOptions: PropTypes.arrayOf(PropTypes.object),
        navSelected: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        onEnvironmentChange: PropTypes.func,
        onItemValueChange: PropTypes.func,
        onMenuValueChange: PropTypes.func,
        onNavChange: PropTypes.func,
        onMarketChange: PropTypes.func,
        openNode: PropTypes.string,
        marketOptions: PropTypes.arrayOf(PropTypes.object),
        marketSelected: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        siteLogo: PropTypes.string,
        siteTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        tree: PropTypes.arrayOf(PropTypes.object),
        userMenu: PropTypes.arrayOf(PropTypes.object),
        userName: PropTypes.string,
        updated: PropTypes.bool
    };

    static defaultProps = {
        inline: false,
        onEnvironmentChange: _.noop,
        onItemValueChange: _.noop,
        onNavChange: _.noop,
        onMenuValueChange: _.noop,
        onMarketChange: _.noop,
        "data-id": "header",
        updated: false
    };

    /**
     * @method
     * @name HeaderBar#_getNavItem
     * @param {object} item
     * @private
     * @desc Creates the NavItem component based on the item object
     */
    _getNavItem = item => {
        var props = _.defaults(
            {
                key: item.id,
                id: item.id,
                "data-id": item.id,
                onMenuToggle: this
                    ._handleMenuToggle,
                onMenuValueChange: this.props
                    .onMenuValueChange
            },
            item
        );
        if (this.props.openNode !== undefined) {
            props.open =
                item.id === this.props.openNode
                    ? true
                    : false;
        }

        return (
            <NavItem {...props}>
                {item.children}
            </NavItem>
        ); //eslint-disable-line no-use-before-define
    }

    /**
     * @method
     * @name HeaderBar#_handleNavClick
     * @param {event} e - Event
     * @private
     * @desc Instead of creating partials using bind, we have one function which will pass back the id of
     * the clicked on nav item.  There is a performance overhead of creating partials on every render.
     */
    _handleMenuToggle = id => this.props.onItemValueChange(id);

    /**
     * @method
     * @name HeaderBar#_isUpdated
     * @private
     * @desc Is this the updated version of the component or the legacy?
     */
    _isUpdated = () =>
        this.props.environmentOptions ||
        this.props.navOptions ||
        this.props.marketOptions ||
        this.props.updated
            ? true
            : false;

    render() {
        var tree = this.props.tree;
        if (this.props.tree === undefined && this.props.userMenu) {
            tree = [
                {
                    id: "account",
                    label: this.props.userName,
                    children: this.props.userMenu
                }
            ];
        }

        return (
            <div
                className="header-bar"
                id={!this.props.inline ? "header" : ""}
                data-id={this.props["data-id"]}
            >
                <div className="header-bar__left">
                    {!this._isUpdated() && (
                        <div
                            className="header-bar__ping-logo"
                            data-id="header-logo"
                        />
                    )}

                    {this.props.siteLogo &&
                        (_.contains(["pingone", "uilib", "pingaccess"], this.props.siteLogo) ? (
                            <Logo
                                className="header-bar__site-logo"
                                data-id={this.props["data-id"] + "-site-logo"}
                                id={this.props.siteLogo}
                            />
                        ) : (
                            <img
                                alt="Logo"
                                className="header-bar__site-logo"
                                data-id={this.props["data-id"] + "-site-logo"}
                                src={this.props.siteLogo}
                            />
                        ))}
                    {this.props.siteTitle && (
                        <span
                            className="header-bar__site-title"
                            data-id={this.props["data-id"] + "-site-title"}
                        >
                            {this.props.siteTitle}
                        </span>
                    )}
                    {this.props.additionalContent && (
                        <span
                            className="header-bar__additional-content"
                            data-id={
                                this.props["data-id"] + "-additional-content"
                            }
                        >
                            {this.props.additionalContent}
                        </span>
                    )}
                    {this.props.marketOptions && (
                        <MarketSelector
                            options={this.props.marketOptions}
                            market={this.props.marketSelected}
                            onMarketChange={this.props.onMarketChange}
                        />
                    )}
                </div>
                <div className="header-bar__center">
                    {this.props.navOptions && (
                        <HeaderNav
                            options={this.props.navOptions}
                            currentNav={this.props.navSelected}
                            onNavChange={this.props.onNavChange}
                        />
                    )}
                </div>
                <div className="header-bar__right">
                    {this.props.environmentOptions && (
                        <EnvironmentSelector
                            options={this.props.environmentOptions}
                            environment={this.props.environmentSelected}
                            onEnvironmentChange={this.props.onEnvironmentChange}
                        />
                    )}

                    {
                        <ul
                            className="product-nav"
                            data-id={this.props["data-id"] + "-product-nav"}
                        >
                            {_.map(tree, this._getNavItem)}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

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
 * @param {boolean} [open=false]
 *          Menu state while this is defined, if it's not defined, it's managed internally to this component and doesn't
 *          require the developer to do anything when they use the headerbar.
 */
class NavItem extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        "data-id": PropTypes.string,
        label: PropTypes.string,
        title: PropTypes.string,
        target: PropTypes.string,
        url: PropTypes.string,
        iconClassName: PropTypes.string,
        iconSrc: PropTypes.string,
        onClick: PropTypes.func,
        open: PropTypes.bool,
        children: PropTypes.array,
        onMenuToggle: PropTypes.func,
        onMenuValueChange: PropTypes.func
    };

    static defaultProps = {
        target: "_blank",
        "data-id": "nav-item",
        onClick: _.noop,
        onMenuToggle: _.noop,
        onMenuValueChange: _.noop
    };

    /**
     * @method
     * @name NavItem#_handleMenuToggle
     * @private
     * @desc Toggling this menu
     */
    _handleMenuToggle = () => {
        this.props.onMenuToggle(this.props.id);
    };

    /**
     * @method
     * @name NavItem#_handleMenuClick
     * @param {string|number} value
     * @private
     * @desc Handle clicking on a menu item (or on the main item itself if it's not a menu)
     */
    _handleMenuClick = value => {
        this.props.onMenuValueChange(
            value,
            this.props.id
        );
    };

    /**
     * @method
     * @name NavItem#_getIcon
     * @param {object} item
     * @private
     * @desc Provide the appropriate markup for an icon based on the item's props
     */
    _getIcon = item => {
        if (item.iconSrc) {
            return <img src={item.iconSrc} className="product-nav__image icon" />;
        } else {
            let iconClassName = item.iconClassName;
            if (item.icon) {
                iconClassName = "icon-" + item.icon;
            }
            return (
                <span
                    className={classnames(
                        "product-nav__icon",
                        "icon",
                        iconClassName || "icon-"+item.id
                    )}
                />
            );
        }
    };

    /**
     * @method
     * @name NavItem#_getMenuChildren
     * @private
     * @desc Get the options for a menu along with a callback
     */
    _getMenuChildren = () => this.props.children.map(child => _.defaults(child, {
        "data-id": child.id,
        onClick: () => this._handleMenuClick(child.id)
    }));

    render() {
        return (
            <li className="product-nav__item">
                {this.props.children ? (
                    <PopoverNavMenu
                        data-id={this.props["data-id"]}
                        label={this._getIcon(this.props)}
                        title={this.props.label}
                        placement="left"
                        items={this._getMenuChildren()}
                        open={this.props.open}
                        onOpen={this._handleMenuToggle}
                        onClose={this._handleMenuToggle}
                        triggerClassName="product-nav__menu-trigger"
                    />
                ) : (
                    <a
                        className="product-nav__link"
                        onClick={this.props.onClick}
                        href={this.props.url}
                        data-id={this.props["data-id"]}
                        title={this.props.title}
                        target={this.props.target}
                    >
                        {this._getIcon(this.props)}
                    </a>
                )}
            </li>
        );
    }
}

module.exports = HeaderBar;
