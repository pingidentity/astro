import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import smsIcon from '../icons/sms.svg';
import emailIcon from '../icons/email.svg';

const icons = {
    sms: smsIcon,
    email: emailIcon,
};

const ModalMenu = ({ options }) => (
    <div className="modal-overlay">
        <div className="modal-overlay__content">
            <div className="modal-menu">
                {options.map(option => (
                    <button
                        key={option.label}
                        className={classnames('modal-menu__button', {
                            'modal-menu__button--selected': option.selected,
                        })}
                    >
                        <img className="modal-menu__icon" src={icons[option.icon]} alt="" />
                        <span>
                            <span className="modal-menu__label">{option.label}</span>
                            <span className="modal-menu__sublabel">{option.sublabel}</span>
                        </span>
                    </button>
                ))}
                <button className="modal-menu__button modal-menu__button--cancel">Cancel</button>
            </div>
        </div>
    </div>
);

ModalMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        sublabel: PropTypes.string,
        icon: PropTypes.string,
        selected: PropTypes.bool,
    })),
};

export default ModalMenu;
