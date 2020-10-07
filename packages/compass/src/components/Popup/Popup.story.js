import React, { useState, useCallback } from 'react';
import {
    Popup,
    Button,
    Text,
    Box,
    Link,
    HR,
} from '../../.';

export default {
    title: 'Popup',
    component: Popup,
};

export const Default = () => {
    const [isOpen, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open It</Button>
            <Popup
                isOpen={isOpen}
                onClose={handleClose}
                title="Unsaved Changes"
                buttons={<Button onClick={handleClose}>Discard Changes</Button>}
            >
                You have unsaved changes. Do you want to discard them?
            </Popup>
        </>
    );
};

export const NoButtons = () => {
    const [isOpen, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open It</Button>
            <Popup
                isOpen={isOpen}
                onClose={handleClose}
                title="Just to tell you something..."
            >
                Do you want to hear more?
            </Popup>
        </>
    );
};

export const BuiltFromScratch = () => {
    const [isOpen, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open It</Button>
            <Popup
                isOpen={isOpen}
                onClose={handleClose}
            >
                <Box gap="lg">
                    <Box gap="sm">
                        <Text type="title">Unsaved Changes</Text>
                        <HR />
                        <Text>You have unsaved changes. Do you want to discard them?</Text>
                    </Box>
                    <Box gap="sm" alignItems="center">
                        <Button onClick={handleClose}>Discard Changes</Button>
                        <Link onClick={handleClose}>Cancel</Link>
                    </Box>
                </Box>
            </Popup>
        </>
    );
};

export const StrippedDown = () => {
    const [isOpen, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open It</Button>
            <Popup
                isOpen={isOpen}
                onClose={handleClose}
            >
                This is a very ugly Popup
            </Popup>
        </>
    );
};
