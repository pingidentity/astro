import React from 'react';
import Feedback from './Feedback';

export default {
    title: 'Components/Layout/Feedback',
    component: Feedback,
};

export const Error = () => (
    <Feedback type="error">
        Error feedback
    </Feedback>
);

export const Alert = () => (
    <Feedback type="alert">
        Alert feedback
    </Feedback>
);

export const Success = () => (
    <Feedback type="success">
        Success feedback
    </Feedback>
);
