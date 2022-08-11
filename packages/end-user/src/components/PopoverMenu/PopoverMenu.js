import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Popover from '../shared/Popover';
import Icon from '@mdi/react';
import {
    mdiDotsVertical,
} from '@mdi/js';
import Button from '../Button';
import { FocusScope } from '@react-aria/focus';

const PopoverMenu = ({
    'data-id': dataId,
    buttons,
    isOpen,
}) => {
    const [popperOpen, setPopperOpen] = useState(isOpen);
    const openButtonRef = useRef(null);
    const didMount = useRef(false);
    const uniqeId = _.uniqueId("popoverMenu-");

    const buttonClick = (e, cb) => {
        setPopperOpen(false);
        cb(e);
    };

    useEffect(()=>{
        if(didMount.current && !popperOpen) {
            openButtonRef.current.focus();
        }
        didMount.current = true;
    },[popperOpen]);

    return (
        <Popover
            label={
                <Button
                    className="popover-menu__control"
                    onClick={() => setPopperOpen(!popperOpen)}
                    ref={openButtonRef}
                    aria-expanded={popperOpen}
                    id={uniqeId}
                >
                    <Icon path={mdiDotsVertical} size="26px" color="#686f77" />
                </Button>
            }
            open={popperOpen}
            onClose={() => setPopperOpen(false)}
            placement="left"
        >
            <FocusScope contain autoFocus>
                <div
                    className="popover-menu__dialog"
                    data-id={dataId}
                    aria-labelledby={uniqeId}
                >
                    {buttons.map(({ id, onClick, label, ...rest }) => (
                        <Button
                           className="popover-menu__item"
                            onClick={e => buttonClick(e, onClick)}
                            key={id}
                            {...rest}
                            >
                            {label}
                        </Button>
                    ))}
                </div>
            </FocusScope>
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