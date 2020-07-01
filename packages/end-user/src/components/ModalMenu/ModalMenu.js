import React from 'react';
import PropTypes from 'prop-types';
import TileSelector from '../shared/TileSelector';
import { noop } from "underscore";

/**
 * Types of Icons
 * @alias icons
 */
const icons = {
    sms: 'pingicon-chat',
    email: 'pingicon-email',
    mobile: 'pingicon-mobile',
};

/**
 * Modal-style menu
 */
export const ModalMenu = ({
    options,
    onChange,
    'data-id': dataId,
}) => {
    const itemClicked = (option) => {
        onChange(option);
    };

    return (
        <TileSelector
            type="stacked-small"
            data-id={dataId}
            onValueChange={itemClicked}
            options={options.map(option => (
                {
                    id: option.label,
                    title: option.label,
                    iconName: option.icon,
                    description: option.sublabel,
                }
            ))}
        />
    );
};

ModalMenu.propTypes = {
    /**
     * Sets a data-id property on the ModalMenu to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * The ModalMenu items
     */
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        sublabel: PropTypes.string,
        icon: PropTypes.string,
        selected: PropTypes.bool,
    })),
    /**
     * Called when the ModalMenu selection chnanges
     */
    onChange: PropTypes.func,
};

ModalMenu.defaultProps = {
    onChange: noop,
    options: [],
}

export default ModalMenu;
