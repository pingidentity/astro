import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Tabs } from "../general/TabbedSections";
import PopOverNavMenu from "../tooltips/PopoverNavMenu";
import Link from "../general/Link";


const UserInfo = ({
    user
}) => (
    <div className="user-info">
        {
            user.imageSrc
                ? (<div
                    className="user-info__image"
                    style={{ backgroundImage: `url(${user.imageSrc})` }}
                />)
                : <span className="user-info__icon" />
        }
        { user.name }
    </div>
);

class UserNav extends React.Component {
    state = { menuOpen: false };



    _toggleCollapsibleMenu = () => {
        this.setState(({ menuOpen }) => ({ menuOpen: !menuOpen }));
    }

    _handleSignOut = () => {
        const { onSignOut } = this.props;
        this.setState({ menuOpen: false });
        onSignOut();
    }

    _handleTabChange = (tab, e) => {
        const { onTabChange } = this.props;
        this.setState({ menuOpen: false });
        onTabChange(tab, e);
    }

    render() {
        const { tabs, selectedTabIndex, logo, user } = this.props;
        const { menuOpen } = this.state;
        return (
            <div className="user-nav">
                {logo &&
                    <div
                        className="user-nav__logo user-nav__logo--ping"
                    />
                }
                <div className={classnames(
                    "user-nav__collapsible-trigger",
                    { "user-nav__collapsible-trigger--open": menuOpen }
                )} onClick={this._toggleCollapsibleMenu}>
                    <span />
                </div>
                {
                    menuOpen &&
                    <div
                        className="modal show user-nav__modal-bg"
                        onClick={this._toggleCollapsibleMenu}>
                        <div className="modal-bg" />
                    </div>
                }
                <div className={classnames(
                    "user-nav__collapsible-menu",
                    { "user-nav__collapsible-menu--open": menuOpen }
                )}>

                    <Tabs
                        activeTab={selectedTabIndex}
                        onChange={this._handleTabChange}
                        tabs={tabs}
                    />
                    <hr />
                    <Link
                        className="user-nav__mobile-sign-out"
                        title="Sign Out"
                        type="block"
                        onClick={this._handleSignOut}
                    />
                    <PopOverNavMenu
                        flags={["use-portal"]}
                        className="user-nav__dropdown-menu"
                        label={<UserInfo user={user}/> }
                        items={[
                            {
                                label: "Sign Out",
                                onClick: this._handleSignOut,
                            }
                        ]}
                    />
                </div>

            </div>

        );
    }
}

UserNav.propTypes = {
    logo: PropTypes.bool,
    menu: PropTypes.bool,
    tabs: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
        imageSrc: PropTypes.string,
        name: PropTypes.name,
    }),
};

UserNav.defaultProps = {
    logo: false,
    menu: false,
    tabs: [],
    onSignOut: () => {},
    user: {},
};

export default UserNav;
