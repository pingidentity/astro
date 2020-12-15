import React from 'react';
import {
    Box,
    CloseButton,
    HelpHint,
    HR,
    InfoPanel,
    Text,
} from '../../.';

export default {
    title: 'Info Panel',
    component: InfoPanel,
};

export const Default = () => (
    <InfoPanel isShowing>
        <Box px="lg" py="xl">
            <CloseButton right="auto" left="xs" />
            <Text type="title-section">Title of the Item</Text>
            <Text type="subtitle">Subtitle of the Item</Text>
            <HR my="lg" />
            <Text>
                Here is more content below.
            </Text>
            <Text>
                <HelpHint content="Here is some help hint text">Help Hint</HelpHint>
            </Text>
        </Box>
    </InfoPanel>
);
