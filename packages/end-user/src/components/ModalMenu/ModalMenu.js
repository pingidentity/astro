import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from "underscore";

import { inStateContainer } from '../../util/StateContainer';

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
export const StatelessModalMenu = ({
    options,
    onChange,
    onClose,
    expanded,
    'data-id': dataId,
}) => {
    const closeDialog = () => {
        onClose();
    };

    const itemClicked = (option) => {
        onChange(option);
        closeDialog();
    };

    if (!expanded) {
        return null;
    }

    return (
        <div className="modal-overlay" data-id={dataId}>
            <div className="modal-overlay__content">
                <div className="modal-menu">
                    {options.map(option => (
                        <button
                            key={option.label}
                            className={classnames('modal-menu__button', {
                                'modal-menu__button--selected': option.selected,
                            })}
                            onClick={() => itemClicked(option)}
                        >
                            <span className={`modal-menu__icon ${icons[option.icon]}`}></span>
                            <span>
                                <span className="modal-menu__label">{option.label}</span>
                                <span className="modal-menu__sublabel">{option.sublabel}</span>
                            </span>
                        </button>
                    ))}
                    <button
                        className="modal-menu__button modal-menu__button--cancel"
                        onClick={closeDialog}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

StatelessModalMenu.propTypes = {
    /**
     * Sets a data-id property on the ModalMenu to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Expands the ModalMenu if enabled
     */
    expanded: PropTypes.bool,
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
    /**
     * Called when ModalMenu closed
     */
    onClose: PropTypes.func,
};


const PStatefulModalMenu = inStateContainer([
    {
        name: 'expanded',
        initial: true,
        callbacks: [
            {
                name: 'onClose',
                transform: () => false,
            },
        ],
    },
])(StatelessModalMenu);

const ModalMenu = props => <PStatefulModalMenu {...props} initialState={{}} />;

export default ModalMenu;
