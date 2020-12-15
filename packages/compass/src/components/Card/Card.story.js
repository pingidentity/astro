import React from 'react';
import { Card } from '../../.';

export default {
    title: 'Card',
    component: Card,
};

export const Default = () => (
    <Card>
        This is some content!
    </Card>
);

export const WithHeader = () => (
    <Card
        header="Header"
    >
        This is some content!
    </Card>
);

export const ComponentProps = () => {
    const CardContent = () => <div>This is a content component!</div>;
    const CardHeader = () => <div>This is a header component!</div>;

    return (
        <Card
            header={<CardHeader />}
        >
            <CardContent />
        </Card>
    );
};

