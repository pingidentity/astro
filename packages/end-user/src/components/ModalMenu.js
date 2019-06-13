import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { inStateContainer } from '../util/StateContainer';

import smsIcon from '../icons/sms.svg';
import emailIcon from '../icons/email.svg';

const icons = {
    sms: smsIcon,
    email: emailIcon,
};

const StatelessModalMenu = ({
    options, onChange, onClose, expanded, 'data-id': dataId,
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
                            <img className="modal-menu__icon" src={icons[option.icon]} alt="" />
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
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        sublabel: PropTypes.string,
        icon: PropTypes.string,
        selected: PropTypes.bool,
    })),
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    expanded: PropTypes.bool,
    'data-id': PropTypes.string,
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

/**
 * @class ModalMenu
 * @desc Display a menu with a list of selections
 *
 * @param {string} [options]
 *      A list of the objects to display
 * @param {ModalMenu~onChange} [onChange]
 *      Called after a selection is made in the menu
 *
 */
const ModalMenu = (props) => <PStatefulModalMenu {...props} initialState={{}} />;

ModalMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        sublabel: PropTypes.string,
        icon: PropTypes.string,
        selected: PropTypes.bool,
    })),
    onChange: PropTypes.func,
};

ModalMenu.defaultProps = {
    onChange: () => { },
};

export default ModalMenu;