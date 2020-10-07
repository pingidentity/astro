import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { noop } from 'underscore';
import FocusTrap from 'focus-trap-react';
import { missingDependencyMessage } from '../../utils/DependencyUtils';
import { useClickOutsideHandler } from '../../utils/MouseUtils';
import { useEscapeKeyHandler } from '../../utils/KeyboardUtils';

missingDependencyMessage(Portal, 'react-portal', 'React Portal');

const Modal = ({
    onOutsideClick,
    onEscapeKey,
    ...props
}) => {
    const modalRef = useRef(null);
    useClickOutsideHandler([modalRef], onOutsideClick);
    useEscapeKeyHandler(onEscapeKey);

    return (
        <Portal>
            <FocusTrap
                focusTrapOptions={{
                    escapeDeactivates: false,
                    fallbackFocus: () => modalRef.current,
                }}
            >
                <div><div tabIndex="-1" {...props} ref={modalRef} /></div>
            </FocusTrap>
        </Portal>
    );
    // there are two divs because FocusTrap and useClickOutsideHandler don't play together otherwise
};

Modal.propTypes = {
    /** Event that is fired when a click is detected outside of the modal */
    onOutsideClick: PropTypes.func,
    /** Event that is fired when the escape key is pressed */
    onEscapeKey: PropTypes.func,
};

Modal.defaulProps = {
    onOutsideClick: noop,
};

export default Modal;
