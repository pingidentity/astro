import React, { useState, useCallback } from 'react';
import CaretDownSVG from '@mdi/svg/svg/chevron-down-circle-outline.svg';
import CaretUpSVG from '@mdi/svg/svg/chevron-up-circle-outline.svg';
import ProductIcon from '../components/ProductIcon';
import ProductButton from '../components/ProductButton';
import Box from '../components/Box';
import Text from '../components/Text';
import DividedBox from '../components/DividedBox';
import Link from '../components/Link';
import Pipe from '../components/Pipe';
import Chip from '../components/Chip';
import Button from '../components/Button';
import Icon from '../components/Icon';
import SaveableTextInput from '../components/SaveableTextInput';

export default {
    title: 'Layouts/Details Panel',
};

export const SimpleProductLine = () => (
    <Box isRow hGap="md">
        <ProductIcon product="pingfederate" />
        <Box vGap="xs">
            <Text type="title-item">PingFederate</Text>
            <DividedBox
                divider={<Pipe color="line.regular" height={10} />}
                gap="sm"
                isRow
            >
                <Link href="/nowhere" fontSize="sm" color="text.secondary">Documentation</Link>
                <Link href="/nowhere" fontSize="sm" color="text.secondary">APIs</Link>
                <Link href="/nowhere" fontSize="sm" color="text.secondary">Code Examples</Link>
            </DividedBox>
        </Box>
    </Box>
);

export const NotSetupProductLine = () => {
    const [hasLinkField, setHasLinkField] = useState(false);
    const showLinkField = useCallback(() => setHasLinkField(true), [setHasLinkField]);
    const hideLinkField = useCallback(() => setHasLinkField(false), [setHasLinkField]);

    const [adminLink, setAdminLink] = useState('');
    const [adminLinkDraft, setAdminLinkDraft] = useState(adminLink);
    const handleLinkCancel = useCallback(
        () => {
            setAdminLinkDraft('');
            hideLinkField();
        },
        [setAdminLinkDraft, hideLinkField],
    );
    const handleLinkSave = useCallback(
        () => setAdminLink(adminLinkDraft),
        [setAdminLink, adminLinkDraft],
    );

    const [hasDetails, setHasDetails] = useState(false);
    const toggleDetails = useCallback(
        () => {
            setHasDetails(!hasDetails);
            setHasLinkField(false);
        },
        [hasDetails, setHasDetails, setHasLinkField],
    );

    const addLinkContent = hasLinkField
        ? (
            <Box isRow>
                <SaveableTextInput
                    hasSave={adminLinkDraft !== adminLink}
                    hasCancel
                    label="Admin UI Link"
                    onCancel={handleLinkCancel}
                    onSave={handleLinkSave}
                    onValueChange={setAdminLinkDraft}
                    value={adminLinkDraft}
                    width="100%"
                    maxWidth="column"
                />
            </Box>
        )
        : (
            <Box isRow>
                <Button isInline onClick={showLinkField}>Add Admin UI Link</Button>
            </Box>
        );

    return (
        <Box gap="md">
            <Box isRow hGap="md">
                <Box flexShrink={0}>
                    <ProductIcon product="pingfederate" />
                </Box>
                <Box vGap="sm">
                    <Box isRow hGap="xs">
                        <Text type="title-item">PingFederate</Text>
                        <Chip type="warning">Not Setup</Chip>
                    </Box>
                    <DividedBox
                        divider={<Pipe color="line.regular" height={25} />}
                        gap="sm"
                        isRow
                    >
                        <Link onClick={toggleDetails}>
                            <Icon
                                component={hasDetails ? CaretUpSVG : CaretDownSVG}
                                mr="xs"
                                my={-5}
                                size={20}
                            />
                            <span>View Setup Instructions</span>
                        </Link>
                        <Link href="/nowhere">Docker</Link>
                        <Link href="/nowhere">Download</Link>
                    </DividedBox>
                    {!hasDetails && addLinkContent}
                </Box>
            </Box>
            {hasDetails && (
                <Box gap="sm">
                    <Text type="title-item" fontWeight={500}>PingFederate Setup Instructions</Text>
                    <Text type="body-weak">
                        Use the docker or download links to deploy PingFederate
                        according to the provided instructions.
                        Or contact Ping to deploy PingFederate for you in PingCloud.
                        Once you have deployed PingFederate, add the link to the admin UI
                        here so that you and your team can easily access it.
                    </Text>
                    {addLinkContent}
                </Box>
            )}
        </Box>
    );
};

export const ServiceList = () => (
    <Box>
        <Text type="caps-label" mb="lg">Services</Text>
        <DividedBox gap="lg">
            <NotSetupProductLine />
            <Box isRow hGap="md">
                <ProductButton product="pingid" />
                <Box vGap="xs">
                    <Text type="title-item">PingID</Text>
                    <DividedBox
                        divider={<Pipe color="line.regular" height={10} />}
                        gap="sm"
                        isRow
                    >
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">Documentation</Link>
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">APIs</Link>
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">Code Examples</Link>
                    </DividedBox>
                </Box>
            </Box>
            <Box isRow hGap="md">
                <ProductIcon product="pingdirectory" />
                <Box vGap="xs">
                    <Text type="title-item">PingDirectory</Text>
                    <DividedBox
                        divider={<Pipe color="line.regular" height={10} />}
                        gap="sm"
                        isRow
                    >
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">Documentation</Link>
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">APIs</Link>
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">Code Examples</Link>
                    </DividedBox>
                </Box>
            </Box>
            <Box isRow hGap="md">
                <ProductIcon product="p14e" />
                <Box vGap="xs">
                    <Text type="title-item">PingOne for Enterprise</Text>
                    <DividedBox
                        divider={<Pipe color="line.regular" height={10} />}
                        gap="sm"
                        isRow
                    >
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">Documentation</Link>
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">APIs</Link>
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">Code Examples</Link>
                    </DividedBox>
                </Box>
            </Box>
            <Box isRow hGap="md">
                <ProductButton product="pingcentral" />
                <Box vGap="xs">
                    <Text type="title-item">PingCentral</Text>
                    <DividedBox
                        divider={<Pipe color="line.regular" height={10} />}
                        gap="sm"
                        isRow
                    >
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">Documentation</Link>
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">APIs</Link>
                        <Link href="/nowhere" fontSize="sm" color="text.secondary">Code Examples</Link>
                    </DividedBox>
                </Box>
            </Box>
        </DividedBox>
    </Box>
);
