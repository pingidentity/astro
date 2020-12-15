import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
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
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            { name: 'arrow', options: { element: arrowElement } },
            { name: 'offset', options: { offset: [0, 5] } },
        ],
        placement,
    });

    const buttonClick = (e, cb) => {
        setPopperOpen(false);
        cb(e);
    };

    return (
        <>
            <Button
                className="popover-menu__control"
                ref={setReferenceElement}
                onClick={() => setPopperOpen(!popperOpen)}
            >
                <Icon path={mdiDotsVertical} size="26px" color="#686f77" />
            </Button>

            {popperOpen &&
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
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
                    <div ref={setArrowElement} style={styles.arrow} id="arrow" />
                </div>
            }
        </>
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