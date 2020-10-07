import React, { useState, useCallback } from 'react';
import AlertSVG from '@mdi/svg/svg/alert-circle-outline.svg';

import {
    Box,
    Button,
    Icon,
    Popup,
} from '../index';

export default {
    title: 'Layouts/Session Timed Out',
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
                title={
                    <Box gap="md" alignItems="center">
                        <Icon color="warning.bright" component={AlertSVG} size={40} />
                        <span>Session Timed Out</span>
                    </Box>
                }
                buttons={<Button type="primary" onClick={handleClose}>Sign On</Button>}
                hasNoCancel
                hasNoClose
            >
                Your session has timed out and you must sign on again to continue.
            </Popup>
        </>
    );
};
