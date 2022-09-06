import React, { useEffect, useMemo, useRef, useState } from 'react';
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
    const popoverRef = useRef();
    const didMount = useRef(false);
    const uniqueId = useMemo(() => _.uniqueId("popoverMenu-"), []);

    const buttonClick = (e, cb) => {
        setPopperOpen(false);
        cb(e);
    };

    const triggerKeyDownHandler = (e) => {
        if (e.key === 'Enter' || e.key === " ") {
            setPopperOpen(!popperOpen)
        }
    }

    useEffect(() => {
        if (popoverRef && didMount.current && !popperOpen) {
            popoverRef.current.component.reference.focus();
        }
        didMount.current = true;
    }, [popperOpen]);

    return (
        <Popover
            label={
                <Icon path={mdiDotsVertical} size="26px" color="#686f77" />
            }
            focusable
            triggerClassName="button popover-menu__control"
            open={popperOpen}
            onClose={() => setPopperOpen(false)}
            onToggle={() => setPopperOpen(!popperOpen)}
            onKeyDown={triggerKeyDownHandler}
            placement="left"
            ref={popoverRef}
            id={uniqueId}
        >
            <FocusScope contain autoFocus>
                <div
                    className="popover-menu__dialog"
                    data-id={dataId}
                    aria-labelledby={uniqueId}
                >
                    {buttons.map(({
                        id, onClick, label, ...rest
                    }) => (
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