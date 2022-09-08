import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FocusRing, FocusScope } from '@react-aria/focus';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import PopOverNavMenu from '../Tooltip/PopoverNavMenu';
import Anchor from './Anchor';
import { UserInfo } from './UserNav';
import pingLogo from "../../images/ping-logo.png";

const MENU_OPEN_CLASSNAME = 'menu-open';

const SelfServeNav = ({
    logo,
    onSelectNav,
    onSignOut,
    navs,
    selectedNav,
    signOutLabel,
    user
}) => {
    const bodyNode = typeof document !== "undefined" ? document.body : {};
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ renderMobileMenu, setRenderMobileMenu ] = useState(false);
    const [ windowSize, setWindowSize ] = useState(0);

    const windowBreakPoint = 1119;

    const setMenuOpen = (menuOpen) => {
        if (menuOpen !== isMenuOpen) {
            setIsMenuOpen(menuOpen);
            menuOpen ? bodyNode.classList.add(MENU_OPEN_CLASSNAME) : bodyNode.classList.remove(MENU_OPEN_CLASSNAME);
        }
    };

    const handleNavSelection = (index) => {
        setMenuOpen(false);
        onSelectNav(index);
    }

    const  menuOnAnimationEnd = () => {
        if(!isMenuOpen) setRenderMobileMenu(false);
    }

    const toggleMobileMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    const handleSignOut = () => {
        setMenuOpen(false);
        onSignOut();
    }

    useEffect(() => {
        if (isMenuOpen) setRenderMobileMenu(true);
    }, [isMenuOpen]);

    useLayoutEffect(()=>{
        const updateSize = () =>{
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return ()=>window.removeEventListener('resize', updateSize);
    },[]);

    const navigationLinks = (
        <div className="navs">
            <ul>
                {navs.map((nav,index)=>(
                    <li className={index===selectedNav ? 'active' : null} key={index}>
                        <Anchor role="button" onClick={() => handleNavSelection(index)}>{nav}</Anchor>
                    </li>
                ))}
            </ul>
        </div>
    );

    const dekstopNav = (
        <FocusScope>
            <div className="user-nav__collapsible-menu">
                {navigationLinks}

                <PopOverNavMenu
                    focusable
                    flags={["use-portal"]}
                    className="user-nav__dropdown-menu"
                    label={<UserInfo className="user-nav__info" {...user} />}
                    items={[
                        {
                            label: signOutLabel,
                            onClick: handleSignOut,
                        }
                    ]}
                />
            </div>
        </FocusScope>
    );

    const triggerButton = (
        <FocusRing focusRingClass="is-focused" >
            <button
                className={classnames(
                    "user-nav__collapsible-trigger_v2",
                    { "user-nav__collapsible-trigger_v2--open": isMenuOpen }
                )}
                data-id="collapsible-trigger"
                onClick={toggleMobileMenu}
            >
                <span />
            </button>
        </FocusRing>
    );

    const mobileNav = (
        <>
            {triggerButton}
            {renderMobileMenu &&
                <FocusScope contain autoFocus restoreFocus>
                    <div
                        className="modal show user-nav__modal-bg"
                        data-id="show-modal"
                        onClick={toggleMobileMenu}
                    >
                    <div className="modal-bg" /></div>
                    <div 
                        className="user-nav__collapsible-menu_v2 user-nav__collapsible-menu_v2--open" 
                        style={{
                            animation: `${isMenuOpen ? "menuFadeIn" : "menuFadeOut" } 0.25s`
                        }}
                        onAnimationEnd={menuOnAnimationEnd}
                    >
                        {triggerButton}
                        <UserInfo className="user-nav__info" {...user} />
                        <Anchor className="user-nav__mobile-sign-out" onClick={handleSignOut}>{signOutLabel}</Anchor>
                        <hr />
                        {navigationLinks}
                    </div>
                </FocusScope>
            } 
        </>
    );

    return (
        <nav className="user-nav">
            { logo &&
                <div className="user-nav__logo">
                    {logo === true ?
                        <img
                            src={pingLogo}
                            style={{ width: 50, height: 50 }}
                        /> :
                        <img src={logo}/>
                    }
                </div>
            }
            { windowSize > windowBreakPoint ? dekstopNav : mobileNav }
        </nav>
    );
}

SelfServeNav.propTypes = {
    logo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    signOutLabel: PropTypes.string,
    onSignOut: PropTypes.func,
    navs: PropTypes.arrayOf(PropTypes.string),
    onSelectNav: PropTypes.func,
    user: PropTypes.shape({}),
    selectedNav: PropTypes.number,
};

SelfServeNav.defaultProps = {
    logo: false,
    signOutLabel: "Sign Out",
    onSignOut: () => { },
    navs: [],
    onSelectNav: () => { },
    user: {},
    selectedNav: null,
};

export default SelfServeNav;

