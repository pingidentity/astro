import React, { useState, useCallback } from 'react';

import Modal from './Modal';
import ModalWithEmotion, { ModalOverlay } from './emotion/Modal';
import Button from '../Button';

export default {
    title: 'Modal',
    component: Modal,
    subcomponents: { ModalWithEmotion, ModalOverlay },

};

export const Default = () => {
    const [isOpen, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open It</Button>
            {isOpen &&
                <Modal
                    onOutsideClick={handleClose}
                >
                    I am a modal<br />
                    <Button onClick={handleClose}>Close Me</Button>
                </Modal>
            }
        </>
    );
};

export const Emotion = () => {
    const [isOpen, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open It</Button>
            {isOpen &&
                <>
                    <ModalWithEmotion
                        onOutsideClick={handleClose}
                        p={25}
                        bg="white"
                        maxWidth={800}
                    >
                        I am a modal<br />
                        <Button onClick={handleClose}>Close Me</Button>
                    </ModalWithEmotion>
                    <ModalOverlay />
                </>
            }
        </>
    );
};
