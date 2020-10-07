import React, { Fragment, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import Popper from '../Popper';
import { useClickOutsideHandler } from '../../utils/MouseUtils';
import Button from '../Button';
import { defaultRender } from '../../utils/PropUtils';
import { useProgStateful } from '../../utils/StateUtils';

const PopoverBox = ({
    'data-parent': dataParent, reference, popperRef, children, onClose, ...other
}) => {
    useClickOutsideHandler([reference, popperRef], onClose);

    return (
        <Popper getReference={reference} ref={popperRef} data-parent={dataParent} {...other}>
            {children}
        </Popper>
    );
};

PopoverBox.propTypes = {
    /** Defines the "data-parent" for top-level HTML container. */
    'data-parent': PropTypes.string,
    reference: PropTypes.shape({}),
    popperRef: PropTypes.shape({}),
    onClose: PropTypes.func,
};

const Popover = ({
    children,
    'data-id': dataId,
    isOpen: isOpenProp,
    label,
    renderReference,
    onOpen,
    onClose,
    ...other
}) => {
    const reference = useRef(null);
    const popper = useRef(null);
    const [isOpen, setIsOpen] = useProgStateful(isOpenProp, false);
    const onToggle = useCallback(() => {
        if (isOpen) {
            setIsOpen(false);
            onClose();
        } else {
            setIsOpen(true);
            onOpen();
        }
    }, [setIsOpen, isOpen]);
    const handleClose = useCallback(() => {
        setIsOpen(false);
        onClose();
    }, [setIsOpen]);

    return (
        <Fragment>
            {renderReference({
                ref: reference,
                onClick: onToggle,
                children: label,
                'data-id': dataId,
            }, Button)}
            {isOpen && (
                <PopoverBox
                    reference={reference}
                    popperRef={popper}
                    onClose={handleClose}
                    data-parent={dataId}
                    {...other}
                >
                    {typeof children === 'function' ? children({ onClose: handleClose }) : children}
                </PopoverBox>
            )}
        </Fragment>
    );
};

Popover.propTypes = {
    /** Defines the "data-id" for top-level HTML container. */
    'data-id': PropTypes.string,
    /** Whether the popover is open or not, used for externally managed state */
    isOpen: PropTypes.bool,
    /** Text label of the default button */
    label: PropTypes.string,
    /** Callback for closing the popover */
    onClose: PropTypes.func,
    /** Callback for opening the popover */
    onOpen: PropTypes.func,
    /** Function that renders the element that the popover is attached to.
     * @param {object} props
     */
    renderReference: PropTypes.func,
};

Popover.defaultProps = {
    renderReference: defaultRender,
    onOpen: noop,
    onClose: noop,
};

export default Popover;
