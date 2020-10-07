import React, { useState } from 'react';
import DeleteSVG from '@mdi/svg/svg/delete.svg';

import Box from '../components/Box';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import HR from '../components/HR';
import IconButton from '../components/IconButton';
import PopOutMenu from '../components/PopOutMenu';
import Text from '../components/Text';


export default {
    title: 'Layouts/Delete Environment',
};

export const DeleteEnvironment = () => {
    const [isChecked, setIsChecked] = useState(false);
    const Title = () => (
        <Box padding="10px">
            <IconButton aria-label="delete">
                <DeleteSVG />
            </IconButton>
        </Box>
    );

    const popOutContent = popoverProps => (
        <Box padding="20px" vGap="md" maxWidth="300px">
            <Text type="title">
                Delete Environment
            </Text>
            <HR />
            <Text>
                Deleting an environment will remove access to products associated with it from the
                Ping portal. You will not lose licensing or traditional access.
            </Text>
            <Checkbox label="I understand" isChecked={isChecked} onChange={setIsChecked} />
            <Box vGap="sm" alignItems="center">
                <Button isDisabled={!isChecked} onClick={popoverProps.onClose}>Remove</Button>
                <Button isInline type="text" onClick={popoverProps.onClose}>Cancel</Button>
            </Box>
        </Box>
    );

    return (
        <Box isRow hGap="md">
            <PopOutMenu
                title={<Title />}
            >
                {popOutContent}
            </PopOutMenu>
        </Box>
    );
};
