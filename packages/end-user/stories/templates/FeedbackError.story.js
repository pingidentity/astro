import React from 'react';

import Card from '../../src/components/Card';
import Logo from '../../src/components/Logo';
import IconFeedback from '../../src/components/IconFeedback';
import TextBlock from '../../src/components/TextBlock';
import TextStyle from '../../src/components/TextStyle';
import Heading from '../../src/components/Heading';
import StepLink from '../../src/components/StepLink';
import SerializedData from '../../src/components/SerializedData';
import TwoSidedDemo from '../../src/components/stateful/TwoSidedDemo';

import '../../src/css/styles.scss';

export default {
    title: 'Templates/Feedback/Error',
};

export const Basic = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <IconFeedback type="error">Error</IconFeedback>
        <TextBlock size="small">
            <p>The actor attempting to perform the request is not authorized.</p>
            <p>
                <TextStyle muted>
                    id: 2e0b1d51-3409-46dd-ac5e-d49cf5213de4<br />
                    code: ACCESS_FAILED
                </TextStyle>
            </p>
        </TextBlock>
    </Card>
);

export const InvalidURL = () => (
    <Card width="large">
        <Logo src="/ping-logo.svg" />
        <Heading> Invalid Sign-on URL </Heading>
        <TextBlock>
            <p>
                The URL you entered isn&apos;t specific to signing on to your domain console.
                Make sure to enter a valid sign-on URL that includes your environment ID.
                like this: <a href="#">https://console.pingone.com/index.html?env=&lt;ENV ID&gt;</a>
            </p>
            <p>
                If you need help, contact your administrator of Ping Identity.
            </p>
        </TextBlock>
    </Card>
);

export const WithDetails = () => (
    <TwoSidedDemo
        renderSides={onFlip => ([
            <Card key="front">
                <Logo src="/ping-logo.svg" />
                <IconFeedback type="error">Error</IconFeedback>
                <StepLink onClick={onFlip}>View Details</StepLink>
            </Card>,
            <Card key="back">
                <SerializedData data={{
                    id: '6c796712-0f16-4062-815a-e0a92f4a2143',
                    code: 'INVALID_DATA',
                    details: [
                        {
                            code: 'EMPTY_VALUE',
                            target: 'givenName',
                            message: 'Given name cannot be empty.',
                        },
                        {
                            code: 'OUT_OF_RANGE',
                            target: 'age',
                            message: 'Age must be between 1 and 150',
                            innerError: {
                                rangeMinimumValue: '1',
                                rangeMaximumValue: '150',
                            }
                        },
                    ]
                }} />
                <StepLink type="back" onClick={onFlip}>Back</StepLink>
            </Card>,
        ])}
    />
);