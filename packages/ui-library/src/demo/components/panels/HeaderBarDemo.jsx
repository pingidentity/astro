import React from "react";
import HeaderBar from "../../../components/panels/header-bar";
import DetailsTooltip from "ui-library/lib/components/tooltips/DetailsTooltip";
import HR from "ui-library/lib/components/general/HR";
import Text, { textTypes } from "ui-library/lib/components/general/Text";
import pingCentralDark from "../../images/PingCentral.svg";
import { AboutModal, AboutLogo, AboutVersion } from "ui-library/lib/components/general/About";

const { BODY } = textTypes;

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
    constructor(props) {
        super(props);
        this.state = {
            environmentSearch: "",
            environmentSelected: "production",
            navSelected: "main",
            marketSelected: "customers",
            tree: [
                {
                    id: "help",
                    title: "Help",
                    children: [
                        {
                            id: "docs",
                            icon: "help",
                            label: "Documentation",
                        },
                        {
                            id: "about",
                            icon: "info",
                            label: "About",
                        }
                    ]
                },
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
            about: false,
        };

    }

    _handleEnvironmentSearch = value => this.setState({ environmentSearch: value });

    _handleItemClick = (id) => {
        this.setState(state => HeaderBar.Reducer(state, HeaderBar.Actions.toggleItem(id)));
    };

    _handleEnvironment = environment => {
        this.setState(state => HeaderBar.Reducer(state, HeaderBar.Actions.setEnvironment(environment)));
    }

    _handleNav = nav => {
        this.setState(state => HeaderBar.Reducer(state, HeaderBar.Actions.setNav(nav)));
    }

    _handleMarket = market => {
        this.setState(state => HeaderBar.Reducer(state, HeaderBar.Actions.setMarket(market)));
    }

    _handleNewEnvironment = () => {
        this.setState({ newEnvironment: true });
    }

    _filterEnvironments = (options, search, selected) => (
        options.filter(({ id, label = "" }) => (
            label.toLowerCase().search(search.toLowerCase()) >= 0) || id === selected
        )
    );

    _handleMenuValueChange = (id) => {
        if (id === "about") {
            this.setState({ about: true });
        }
    }

    _handleCloseAbout = () => this.setState({ about: false });

    render() {
        return (
            <div>
                <HR />
                <p>Using the provided reducer:</p>
                <HeaderBar {...this.state}
                    data-id="first-header-bar"
                    onItemValueChange={this._handleItemClick}
                    inline={true}
                    siteLogo="pingone"
                    environmentOptions={this._filterEnvironments(
                        environments, this.state.environmentSearch, this.state.environmentSelected)
                    }
                    environmentSearch={this.state.environmentSearch}
                    navOptions={navItems}
                    onEnvironmentChange={this._handleEnvironment}
                    onEnvironmentSearch={this._handleEnvironmentSearch}
                    onNewEnvironment={this._handleNewEnvironment}
                    onNavChange={this._handleNav}
                    onMarketChange={this._handleMarket}
                    marketOptions={markets}
                    onMenuValueChange={this._handleMenuValueChange}
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
                    siteLogo="pingfed"

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
                <AboutModal
                    modalTitle="About PingCentral"
                    expanded={this.state.about}
                    onClose={this._handleCloseAbout}
                >
                    <AboutLogo src={pingCentralDark} />
                    <AboutVersion>Version 1.5.1</AboutVersion>
                    <Text type={BODY}>Copyright © 2013-2020 Ping Identity Corporation. All rights reserved.</Text>
                </AboutModal>
            </div>
        );
    }
}

module.exports = HeaderBarDemo;
