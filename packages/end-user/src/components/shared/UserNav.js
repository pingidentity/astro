import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Tabs } from './TabbedSections';
import PopOverNavMenu from '../Tooltip/PopoverNavMenu';
import Link from './Link';


const MENU_OPEN_CLASSNAME = 'menu-open';

export const imageSizes = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
};

export const UserInfo = ({
    imageSize,
    imageSrc,
    name,
    className,
}) => {
    const size = classnames({
        'user-info__image--small': imageSize === imageSizes.SMALL,
        'user-info__image--medium': imageSize === imageSizes.MEDIUM,
        'user-info__image--large': imageSize === imageSizes.LARGE,
    });

    return(
        <div className={classnames("user-info", className)}>
            {
                imageSrc
                    ? (<div
                        className={classnames("user-info__image", size)}
                        style={{ backgroundImage: `url(${imageSrc})` }}
                    />)
                    : <span className="user-info__icon" className={classnames("user-info__icon", size)} />  
            }
            <span className="truncate">{name}</span>
        </div>
    );
};

class UserNav extends React.Component {
    bodyNode = typeof document !== "undefined" ? document.body : {};
    state = { menuOpen: false };

    initialBodyClassNames = `${this.bodyNode.className}`;

    _setMenuOpen = (menuOpen) => {
        if (menuOpen !== this.state.menuOpen) {
            this.setState({ menuOpen }, () => {
                this.bodyNode.className = classnames(this.initialBodyClassNames, {
                    [MENU_OPEN_CLASSNAME]: menuOpen
                });
            });
        }
    };

    _toggleCollapsibleMenu = () => {
        this._setMenuOpen(!this.state.menuOpen);
    }

    _handleSignOut = () => {
        const { onSignOut } = this.props;
        this._setMenuOpen(false);
        onSignOut();
    }

    _handleTabChange = (tab, e) => {
        const { onTabChange } = this.props;
        this._setMenuOpen(false);
        onTabChange(tab, e);
    }

    componentWillUnmount() {
        this.bodyNode.className = this.initialBodyClassNames;
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
                <div
                    className={classnames(
                        "user-nav__collapsible-trigger",
                        { "user-nav__collapsible-trigger--open": menuOpen }
                    )}
                    data-id="collapsible-trigger"
                    onClick={this._toggleCollapsibleMenu}
                >
                    <span />
                </div>
                {
                    menuOpen &&
                    <div
                        className="modal show user-nav__modal-bg"
                        data-id="show-modal"
                        onClick={this._toggleCollapsibleMenu}
                    >
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
                        label={<UserInfo className="user-nav__info" {...user} />}
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
    user: PropTypes.shape({}),
};

UserNav.defaultProps = {
    logo: false,
    menu: false,
    tabs: [],
    onSignOut: () => { },
    user: {},
};

UserInfo.propTypes = {
    imageSrc: PropTypes.string,
    imageSize:PropTypes.oneOf(Object.values(imageSizes)),
    name: PropTypes.string,
    className: PropTypes.string,
}

UserInfo.defaultProps = {
    imageSize: imageSizes.SMALL,
    name: "",
    imageSrc: null,
}

export default UserNav;

