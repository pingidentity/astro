var React = require("react");
var HeaderBar = require("../../../components/panels/header-bar");

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

/**
* @name HeaderBarDemo
* @memberof HeaderBar
* @desc A demo for HeaderBar
*/
class HeaderBarDemo extends React.Component {
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
            ]
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
                    onNavChange={this._handleNav}
                    onMarketChange={this._handleMarket}
                    marketOptions={markets}
                />
                <hr className="hr" />
                <HeaderBar
                    inline={true}
                    siteLogo="pingone"
                    environmentOptions={environments}
                    environmentSelected="production"
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
                <hr className="hr" />
                <p>With the PingAccess logo</p>
                <HeaderBar
                    inline={true}
                    siteLogo="pingaccess"
                    marketOptions={markets}
                    marketSelected="customers"

                    userMenu={userMenuItems}
                />
                <hr className="hr" />
                <HeaderBar
                    inline={true}
                    environmentOptions={environments}
                    environmentSelected="production"
                    navOptions={navItems}
                    navSelected="connections"
                    marketOptions={markets}
                    marketSelected="customers"

                    siteTitle="UI Library" />
                <hr className="hr" />
                <HeaderBar
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
                <hr className="hr" />
                <HeaderBar
                    inline={true}
                    siteLogo="pingone"

                    additionalContent="Additional Content" />
            </div>
        );
    }
}

module.exports = HeaderBarDemo;
