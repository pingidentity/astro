import React from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";
import { v4 as uuidv4 } from "uuid";
import { defaultRender, generateNavTreePropType } from "../../../util/PropUtils";
import FlexRow, { alignments, justifyOptions } from "../../layout/FlexRow";
import HeaderNav from "../header-bar/HeaderNav";
import Icon from "../../general/Icon";
import Link from "../../general/Link";
import PopoverNavMenu from "../../tooltips/PopoverNavMenu";

export { default as EnvironmentSelector } from "../header-bar/EnvironmentSelector";
export { default as MarketSelector } from "../header-bar/MarketSelector";

const NavIcon = ({
    name
}) => <Icon className="header-bar__nav-icon" iconName={name} type="leading" />;

export const NavLink = ({
    "data-id": dataId,
    iconName,
    href,
    target
}) => (
    <Link
        className="product-nav__link"
        data-id={dataId}
        target={target}
        url={href}
    >
        <NavIcon name={iconName} />
    </Link>
);

NavLink.propTypes = {
    iconName: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.string,
};

NavLink.defaultProps = {
    "data-id": "nav-icon"
};

export const NavMenu = ({
    "data-id": dataId,
    iconName,
    items,
    onClose,
    onClickItem,
    onOpen,
    open,
    renderMenu,
    title
}) => {
    return renderMenu((
        {
            "data-id": dataId,
            label: <NavIcon name={iconName} />,
            placement: "left",
            items: items.map(item => ({ ...item, onClick: e => onClickItem(item.id, e) })),
            open: open,
            onOpen: onOpen,
            onClose: onClose,
            triggerClassName: "product-nav__menu-trigger",
            title: title,
            flags: ["use-portal"],
        }
    ), PopoverNavMenu);
};

NavMenu.propTypes = {
    "data-id": PropTypes.string,
    iconName: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            "data-id": PropTypes.string,
            icon: PropTypes.string,
            id: PropTypes.string,
            label: PropTypes.string
        })
    ).isRequired,
    onClose: PropTypes.func,
    onClickItem: PropTypes.func,
    onOpen: PropTypes.func,
    open: PropTypes.bool,
    renderMenu: PropTypes.func,
    title: PropTypes.string
};

NavMenu.defaultProps = {
    onClose: noop,
    onClickItem: noop,
    onOpen: noop,
    open: false,
    renderMenu: defaultRender
};

export default function NavHeader({
    selectedHeader,
    left,
    navTree,
    onSelectItem,
    right
}) {
    return (
        <FlexRow
            alignment={alignments.STRETCH}
            className="header-bar"
            justify={justifyOptions.SPACEBETWEEN}
        >
            <FlexRow>
                {left}
            </FlexRow>
            <HeaderNav
                currentNav={selectedHeader}
                onNavChange={onSelectItem}
                options={navTree}
            />
            <FlexRow
                alignment={alignments.STRETCH}
                justify={justifyOptions.END}
            >
                {right.flatMap(({ key = uuidv4(), ...node }, idx) => [
                    ...idx > 0 ? [<div className="nav-divider" key={uuidv4()} />] : [],
                    {
                        key,
                        ...node
                    }
                ])}
            </FlexRow>
        </FlexRow>
    );
}

NavHeader.propTypes = {
    selectedHeader: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    left: PropTypes.node,
    navTree: generateNavTreePropType(1),
    onSelectItem: PropTypes.func,
    right: PropTypes.arrayOf(
        PropTypes.node
    )
};

NavHeader.defaultProps = {
    onSelectItem: noop,
    right: []
};
