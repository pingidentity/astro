import React from 'react';

import CoreWrapRow from '@pingux/compass-core/src/components/WrapRow/emotion';
import { WrapRow, Box } from '../../.';

export default {
    title: 'WrapRow',
    component: CoreWrapRow,

};

export const Default = () => (
    <Box bg="neutral.90">
        <WrapRow gap={40}>
            <Box bg="black" width={100} height={100} />
            <Box bg="blue" width={100} height={100} />
            <Box bg="red" width={100} height={100} />
            <Box bg="green" width={100} height={100} />
            <Box bg="purple" width={100} height={100} />
            <Box bg="yellow" width={100} height={100} />
            <Box bg="tan" width={100} height={100} />
            <Box bg="gray" width={100} height={100} />
        </WrapRow>
    </Box>
);

export const HorizontalVertical = () => (
    <Box bg="neutral.90">
        <WrapRow vGap={40} hGap={15}>
            <Box bg="black" width={100} height={100} />
            <Box bg="blue" width={100} height={100} />
            <Box bg="red" width={100} height={100} />
            <Box bg="green" width={100} height={100} />
            <Box bg="purple" width={100} height={100} />
            <Box bg="yellow" width={100} height={100} />
            <Box bg="tan" width={100} height={100} />
            <Box bg="gray" width={100} height={100} />
        </WrapRow>
    </Box>
);

export const RightAligned = () => (
    <Box bg="#ccc">
        <WrapRow gap={40} justifyContent="flex-end">
            <Box bg="black" width={100} height={100} />
            <Box bg="blue" width={100} height={100} />
            <Box bg="red" width={100} height={100} />
            <Box bg="green" width={100} height={100} />
            <Box bg="purple" width={100} height={100} />
            <Box bg="yellow" width={100} height={100} />
            <Box bg="tan" width={100} height={100} />
            <Box bg="gray" width={100} height={100} />
        </WrapRow>
    </Box>
);
