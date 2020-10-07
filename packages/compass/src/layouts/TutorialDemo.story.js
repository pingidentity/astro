import React, { useState } from 'react';
import themeGet from '@styled-system/theme-get';
import { linkTo } from '@storybook/addon-links';
import { css } from '@emotion/core';
import useCompassTheme from '../../src/styles/useCompassTheme';
import {
    Button,
    Box,
    CompassWrapper,
    Header,
    ListHeader,
    Text,
    Card,
    Highlight,
    Popup,
    Stepper,
    Chip,
    Link,
} from '../index';
import { stepStatuses } from '../components/Stepper/Stepper.constants';

export default {
    title: 'Layouts/Tutorial Demo',
};

export const TutorialDemo = () => {
    const [isOpen, setOpen] = useState(true);
    const [step, setStep] = useState(0);

    const theme = useCompassTheme();

    const handleClose = () => {
        setOpen(false);
    };

    const steps = [
        {
            index: 0,
            content: (
                <>
                    <Text variant="title" textAlign="center">
                        Welcome to Ping
                    </Text>
                    <Text variant="body-weak">
                        Welcome to your new Ping solutions home. This is a view across all your
                        Ping Products and services.
                    </Text>
                </>
            ),
        },
        {
            index: 1,
            element: 'card',
            content: (
                <>
                    <Text variant="title" textAlign="center">
                        Welcome to Ping 2
                    </Text>
                    <Text variant="body-weak">
                        Welcome to your new Ping solutions home. This is a view across all your
                        Ping Products and services.
                    </Text>
                </>
            ),
        },
        {
            index: 2,
            element: 'button',
            content: (
                <>
                    <Text variant="title" textAlign="center">
                        Welcome to Ping 3
                    </Text>
                    <Text variant="body-weak">
                        Welcome to your new Ping solutions home. This is a view across all your
                        Ping Products and services.
                    </Text>
                    <Box isRow justifyContent="center">
                        <Button
                            variant="primary"
                            isInline
                            icon="plus"
                            onClick={linkTo('Layouts/Wizard')}
                        >
                            Add an Enviroment
                        </Button>
                    </Box>
                </>
            ),
        },
    ];

    const getStep = (index) => {
        return steps.find(s => s.index === index);
    };

    const incrementStep = () => {
        if (step < steps.length) {
            setStep(step + 1);
        }
    };

    const decrementStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <>
            <CompassWrapper>
                <Box isRow flexDirection="column" flexGrow={1}>
                    <Header />
                    <Box isRow height="100%">
                        <Box flexGrow={1} css={css`overflow: hidden;`}>
                            <ListHeader>
                                <Text type="title" inline>Environments</Text>
                                <Box marginLeft="auto">
                                    <Button icon="plus" onClick={linkTo('Layouts/Wizard')} id="button">
                                        Add Environment
                                    </Button>
                                </Box>
                            </ListHeader>
                        </Box>
                    </Box>
                    <Box isRow height="100%">
                        <Card id="card">
                            <Text variant="title-item">
                                Admin Enviroment&nbsp;
                                <Chip variant="success">New</Chip>
                            </Text>
                            <Text variant="subtitle">
                                This is an admin enviroment.
                            </Text>
                        </Card>
                    </Box>
                </Box>
            </CompassWrapper>

            <Popup
                isOpen={isOpen}
                onClose={handleClose}
                hasNoOverlay={!!getStep(step).element}
            >
                <Box gap="md">
                    {getStep(step).content}
                    <Stepper
                        justifyContent="center"
                        numberOfSteps={steps.length}
                        activeStep={step + 1}
                        padding={0}
                        renderStep={({ status }) => (
                            <div
                                css={css`
                                    width: 10px;
                                    height: 10px;
                                    background: ${themeGet('colors.active')({ theme })};
                                    opacity: ${status === stepStatuses.ACTIVE ? 1 : 0.3};
                                    border-radius: 5px;
                                `}
                            />
                        )}
                        renderBetween={() => (
                            <div css={css`width: 20px;`} />
                        )}
                    />
                    <Box isRow alignItems="center" justifyContent="space-between">
                        <div flex="1">
                            {step > 0 && <Link onClick={decrementStep}>Back</Link>}
                        </div>
                        <div flex="1">
                            {step < steps.length - 1 &&
                                <Button isInline onClick={incrementStep}>Next</Button>
                            }
                        </div>
                    </Box>
                </Box>
            </Popup>
            {(getStep(step).element && isOpen) &&
                <Highlight element={() => document.getElementById(getStep(step).element)} />
            }
        </>
    );
};
