import React, { useState, useReducer } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import {
    Box,
    Button,
    Messages,
    MessagesProvider,
    Message,
    useMessagesContext,
    messagesReducer,
    multiMessagesReducer,
} from '../../index';

export default {
    title: 'Messages',
    component: Messages,
    subcomponents: { Message },
    decorators: [withKnobs],
};

const messageText = [
    'WINDMILLS DO NOT WORK THAT WAY! GOOD NIGHT! Oh yeah, good luck with that.',
    "Oh no! The professor will hit me! But if Zoidberg 'fixes' it… then perhaps gifts! You've killed me! Oh, you've killed me!",
    'Does anybody else feel jealous and aroused and worried?',
    "Stop it, stop it. It's fine. I will 'destroy' you! Um, is this the boring, peaceful kind of taking to the streets?",
    "She also liked to shut up! Fry! Stay back! He's too powerful!",
    "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
];

export const MessagesContext = () => {
    const MessagesInside = () => {
        const {
            showSuccessMessage,
            showCriticalMessage,
            showWarningMessage,
        } = useMessagesContext();

        const showAMessage = () => {
            const actionFn = [
                showSuccessMessage,
                showCriticalMessage,
                showWarningMessage,
            ][Math.floor(Math.random() * 3)];
            const message = messageText[Math.floor(Math.random() * 6)];

            actionFn(message);
        };

        return (
            <Box gap="lg">
                <Messages
                    hasNoPortal={boolean('unfixed', true)}
                    position={boolean('unfixed', true) ? 'static' : 'absolute'}
                />
                <div>
                    <Button onClick={showAMessage}>Add Message</Button>
                </div>
            </Box>
        );
    };

    return (
        <MessagesProvider><MessagesInside /></MessagesProvider>
    );
};

export const UseReducer = () => {
    const [messages, dispatch] = useReducer(messagesReducer);

    const showAMessage = () => {
        const actionFn = [
            messagesReducer.actions.showSuccessMessage,
            messagesReducer.actions.showCriticalMessage,
            messagesReducer.actions.showWarningMessage,
        ][Math.floor(Math.random() * 3)];
        const message = messageText[Math.floor(Math.random() * 6)];
        actionFn(message)(dispatch);
    };

    return (
        <Box gap="lg">
            <Messages
                hasNoPortal={boolean('unfixed', true)}
                messages={messages}
                onClose={message => dispatch(messagesReducer.actions.removeMessage(message))}
                position={boolean('unfixed', true) ? 'static' : 'absolute'}
            />
            <div>
                <Button onClick={showAMessage}>Add Message</Button>
            </div>
        </Box>
    );
};

export const UseReducerWithMultipleContainers = () => {
    const [messages, dispatch] = useReducer(multiMessagesReducer, {
        'container-one': [], 'container-two': [],
    });

    const showAMessage = (container) => {
        const actionFn = [
            multiMessagesReducer.actions.showSuccessMessage,
            multiMessagesReducer.actions.showCriticalMessage,
            multiMessagesReducer.actions.showWarningMessage,
        ][Math.floor(Math.random() * 3)];
        const message = messageText[Math.floor(Math.random() * 6)];
        actionFn(container, message)(dispatch);
    };

    return (
        <Box gap="xx" isRow>
            <Box gap="lg">
                <Messages
                    hasNoPortal={boolean('unfixed', true)}
                    messages={messages['container-one']}
                    onClose={message => dispatch(multiMessagesReducer.actions.removeMessage('container-one', message))}
                    position={boolean('unfixed', true) ? 'static' : 'absolute'}
                />
                <div>
                    <Button onClick={() => showAMessage('container-one')}>Add Message</Button>
                </div>
            </Box>
            <Box gap="lg">
                <Messages
                    hasNoPortal={boolean('unfixed', true)}
                    messages={messages['container-two']}
                    onClose={message => dispatch(multiMessagesReducer.actions.removeMessage('container-two', message))}
                    position={boolean('unfixed', true) ? 'static' : 'absolute'}
                />
                <div>
                    <Button onClick={() => showAMessage('container-two')}>Add Message</Button>
                </div>
            </Box>
        </Box>
    );
};

export const MultipleMessagesContexts = () => {
    const MessagesInside = () => {
        const messagesProps = useMessagesContext();

        const showAMessage = () => {
            const actionFn = [
                messagesProps.showSuccessMessage,
                messagesProps.showCriticalMessage,
                messagesProps.showWarningMessage,
            ][Math.floor(Math.random() * 3)];
            const message = messageText[Math.floor(Math.random() * 6)];

            actionFn(message);
        };

        return (
            <Box gap="lg">
                <Messages
                    hasNoPortal={boolean('unfixed', true)}
                    position={boolean('unfixed', true) ? 'static' : 'absolute'}
                />
                <div>
                    <Button onClick={showAMessage}>Add Message</Button>
                </div>
            </Box>
        );
    };

    return (
        <Box gap="xx" isRow>
            <MessagesProvider><MessagesInside /></MessagesProvider>
            <MessagesProvider><MessagesInside /></MessagesProvider>
        </Box>
    );
};

export const SeveralMessages = () => {
    const [isMessage, setMessage] = useState(true);
    const [isSuccess, setSuccess] = useState(true);
    const [isCritical, setCritical] = useState(true);
    const [isWarning, setWarning] = useState(true);
    const makeHide = setShowing => () => setShowing(false);

    const reset = () => {
        setMessage(true);
        setSuccess(true);
        setCritical(true);
        setWarning(true);
    };

    return (
        <Box gap="lg">
            <Messages
                hasNoPortal={boolean('unfixed', true)}
                position={boolean('unfixed', true) ? 'static' : 'absolute'}
            >
                <Message onClose={makeHide(setMessage)} isHidden={!isMessage}>
                    Hello, it&apos;s me. A message.
                </Message>
                <Message variant="success" onClose={makeHide(setSuccess)} isHidden={!isSuccess}>
                    Hooray, it worked! What worked? Something worked!
                </Message>
                <Message variant="critical" onClose={makeHide(setCritical)} isHidden={!isCritical}>
                    Unable to save. You have validation errors.
                </Message>
                <Message variant="warning" onClose={makeHide(setWarning)} isHidden={!isWarning}>
                    Uh oh. I did what you asked, but something&apos;s... weird.
                </Message>
            </Messages>
            <div>
                <Button onClick={reset}>Reset</Button>
            </div>
        </Box>
    );
};

export const DefaultMessage = () => (
    <Message onClose={action('close-button')}>Hello, it&apos;s me. A message.</Message>
);

export const Success = () => (
    <Message variant="success" onClose={action('close-button')}>Hooray, it worked! What worked? Something worked!</Message>
);

export const Critical = () => (
    <Message variant="critical" onClose={action('close-button')}>Unable to save. You have validation errors.</Message>
);

export const Warning = () => (
    <Message variant="warning" onClose={action('close-button')}>Uh oh. I did what you asked, but something&apos;s... weird.</Message>
);
