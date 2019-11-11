import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';

import PopoverMenu from '../shared/PopoverMenu';
import Anchor from '../shared/Anchor';
import popsOver from '../../util/behaviors/popsOver';

const getIconClassName = (props, options = {}) => {
    const icon = props.iconClassName || props.iconName || props.icon || (options.useId && props.id);
    if (!icon || typeof icon !== 'string') {
        return null;
    }
    if (props.iconClassName) {
        return icon;
    }
    return `pingicon-${icon}`;
};

const PopoverMenuBase = PopoverMenu.Base;

class PopoverNavMenuBase extends PopoverMenuBase {

    static defaultProps = _.extend(PopoverMenuBase.defaultProps,
        {
            'data-id': 'popover-nav-menu',
        });

    _getIcon = item => {
        if (item.iconSrc) {
            return <img src={item.iconSrc} className='icon nav-menu__icon' />;
        } else {
            const iconClassName = getIconClassName(item);
            if (iconClassName) {
                return <span className={classnames('icon', 'nav-menu__icon', iconClassName)} />;
            }
        }
    };

    _anyIcons = () => {
        return (
            this.props.items.reduce((result, item) => {
                if (result || getIconClassName(item)) {
                    return true;
                } else {
                    return false;
                }
            }, false)
        );
    }

    renderItem = (item, handleClick, index) => {
        const {
            url,
            href = url,
            label,
            target,
            'data-id': dataId = `${this.props['data-id']}-link-${label ? label.toString() : index}`
        } = item;

        return (
            <Anchor
                data-id={dataId}
                href={href}
                key={label}
                className={classnames('nav-menu__link', { 'nav-menu__link--w-icon': this._anyIcons() })}
                onClick={handleClick}
                target={target}
            >
                {this._getIcon(item)}
                {label}
            </Anchor>
        );
    };
}

const PopoverNavMenu = popsOver(PopoverNavMenuBase);

module.exports = PopoverNavMenu;
