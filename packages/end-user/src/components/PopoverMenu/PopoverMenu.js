import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import Popover from '../shared/Popover';
import Icon from '@mdi/react';
import {
    mdiDotsVertical,
} from '@mdi/js';
import Button from '../Button';

const PopoverMenu = ({
    'data-id': dataId,
    buttons,
    isOpen,
    placement,
}) => {
    const [popperOpen, setPopperOpen] = useState(isOpen);

    const buttonClick = (e, cb) => {
        setPopperOpen(false);
        cb(e);
    };

    return (
        <Popover
            label={
                <Button
                    className="popover-menu__control"
                    onClick={() => setPopperOpen(!popperOpen)}
                >
                    <Icon path={mdiDotsVertical} size="26px" color="#686f77" />
                </Button>
            }
            open={popperOpen}
            onClose={() => setPopperOpen(false)}
            placement="left"
        >
            <div
                className="popover-menu__dialog"
                data-id={dataId}
            >
                {buttons.map(button => (
                    <Button
                        className="popover-menu__item"
                        onClick={e => buttonClick(e, button.onClick)}
                        key={button.id}
                    >
                        {button.label}
                    </Button>
                ))}
            </div>
        </Popover>
    );
};

PopoverMenu.propTypes = {
    'data-id': PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.node,
        onClick: PropTypes.func,
    })),
    isOpen: PropTypes.bool,
    placement: PropTypes.string,
};

PopoverMenu.defaultProps = {
    buttons: [],
    isOpen: false,
    placement: 'bottom-end',
};

export default PopoverMenu;