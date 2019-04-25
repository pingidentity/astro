import React from "react";
import HeaderBar from "../../../components/panels/header-bar";
import DetailsTooltip from "ui-library/lib/components/tooltips/DetailsTooltip";
import HR from "ui-library/lib/components/general/HR";

const environments = [
    {
        label: "Production",
        id: "production"
    },
    {
        label: "Sandbox",
        id: "sandbox"
    },
    {
        label: "Larry's Sandbox",
        id: "larry"
    }
];
const navItems = [
    {
        label: "Main",
        id: "main"
    },
    {
        label: "Users",
        id: "users"
    },
    {
        label: "Connections",
        id: "connections"
    },
    {
        label: "Settings",
        id: "settings"
    }
];

const markets = [
    {
        label: "Customers",
        id: "customers"
    },
    {
        label: "Workforce",
        id: "workforce"
    }
];

const userMenuItems = [
    {
        id: "documentation",
        label: "Documentation",
        icon: "help"
    },
    {
        id: "signout",
        label: "Sign Out",
        icon: "close"
    }
];

const customMenuPopup = ({ triggerClassName, ...props }) => (
    <DetailsTooltip
        {...props}
        title="Custom Popover"
        stateless={false}
        placement="bottom left"
        labelClassName={triggerClassName}
    >
        Hello
    </DetailsTooltip>
);

const customRenderNavItem = (props, DefaultItem) => (
    <DefaultItem {...props} renderMenu={customMenuPopup} />
);

const customRenderProductNav = (props, DefaultNav) => (
    <DefaultNav {...props} renderNavItem={customRenderNavItem} />
);

/**
* @name HeaderBarDemo
* @memberof HeaderBar
* @desc A demo for HeaderBar
*/
class HeaderBarDemo extends React.Component {
    static flags = [ "use-portal" ];

    constructor(props) {
        super(props);
        this.state = {
            environmentSelected: "production",
            navSelected: "main",
            marketSelected: "customers",
            tree: [
                { id: "help", title: "Help" },
                {
                    id: "account",
                    label: "John Doe",
                    children: [{
                        id: "globe",
                        iconClassName: "icon-globe",
                        title: "Internet",
                        label: "Internet" }
                    ]
                }
            ],
            newEnvironment: false,
        };

    }

    _handleItemClick = (id) => {
        this.setState(HeaderBar.Reducer(this.state, HeaderBar.Actions.toggleItem(id)));
    };

    _handleEnvironment = environment => {
        this.setState(HeaderBar.Reducer(this.state, HeaderBar.Actions.setEnvironment(environment)));
    }

    _handleNav = nav => {
        this.setState(HeaderBar.Reducer(this.state, HeaderBar.Actions.setNav(nav)));
    }

    _handleMarket = market => {
        this.setState(HeaderBar.Reducer(this.state, HeaderBar.Actions.setMarket(market)));
    }

    _handleNewEnvironment = () => {
        this.setState({ newEnvironment: true });
    }

    render() {
        return (
            <div>
                <p>Using the provided reducer:</p>
                <HeaderBar {...this.state}
                    onItemValueChange={this._handleItemClick}
                    inline={true}
                    siteLogo="pingone"
                    environmentOptions={environments}
                    navOptions={navItems}
                    onEnvironmentChange={this._handleEnvironment}
                    onNewEnvironment={this._handleNewEnvironment}
                    onNavChange={this._handleNav}
                    onMarketChange={this._handleMarket}
                    marketOptions={markets}
                />
                {this.state.newEnvironment && <p>Clicked +New Environment</p>}
                <HR />
                <HeaderBar
                    inline={true}
                    siteLogo="pingone"
                    environmentOptions={environments}
                    environmentSelected="production"
                    onNewEnvironment={this._handleNewEnvironment}
                    newEnvironmentLabel="Custom label"
                    navOptions={navItems}
                    navSelected="connections"
                    marketOptions={markets}
                    marketSelected="customers"

                    tree={[{
                        id: "account",
                        label: "John Doe",
                        children: [{
                            id: "globe",
                            iconClassName: "icon-globe",
                            title: "Internet",
                            label: "Internet" }
                        ]
                    }]}
                />
                <HR />
                <p>With the PingAccess logo</p>
                <HeaderBar
                    inline={true}
                    siteLogo="pingaccess"
                    marketOptions={markets}
                    marketSelected="customers"

                    userMenu={userMenuItems}
                />
                <HR />
                <HeaderBar
                    inline={true}
                    environmentOptions={environments}
                    environmentSelected="production"
                    navOptions={navItems}
                    navSelected="connections"
                    marketOptions={markets}
                    marketSelected="customers"

                    siteTitle="UI Library" />
                <HR />
                <p> With Mode signifier </p>
                <HeaderBar
                    mode="Sandbox"
                    inline={true}
                    environmentOptions={environments}
                    environmentSelected="production"
                    navOptions={navItems}
                    navSelected="connections"
                    marketOptions={markets}
                    marketSelected="customers"
                    userMenu={userMenuItems}
                    userName="The User's Name"

                    additionalContent="Additional Content"

                    siteTitle="UI Library" />
                <HR />
                <HeaderBar
                    inline={true}
                    siteLogo="pingone"

                    tree={[{
                        id: "account",
                        label: "John Doe",
                        children: [{
                            id: "globe",
                            iconClassName: "icon-globe",
                            title: "Internet",
                            label: "Internet" }
                        ]
                    }]}

                    additionalContent="Additional Content"
                    renderProductNav={customRenderProductNav}
                    legacy
                />
                <HR />
                <p>With the Mode signifier</p>
                <HeaderBar
                    mode="Sandbox"
                    inline={true}
                    siteLogo="pingone"

                    tree={[{
                        id: "account",
                        label: "John Doe",
                        children: [{
                            id: "globe",
                            iconClassName: "icon-globe",
                            title: "Internet",
                            label: "Internet" }
                        ]
                    }]}

                    additionalContent="Additional Content"
                    renderProductNav={customRenderProductNav}
                    legacy
                />
            </div>
        );
    }
}

module.exports = HeaderBarDemo;
