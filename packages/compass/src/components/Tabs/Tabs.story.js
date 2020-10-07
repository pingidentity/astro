import React, { useState } from 'react';

import {
    Tabs,
    Tab,
    Text,
} from '../../.';

export default {
    title: 'Tabs',
    component: Tabs,

};

export const Default = () => (
    <Tabs>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
    </Tabs>
);

export const ProvidedState = () => {
    const [selected, setSelected] = useState(0);
    const handleChange = tab => setSelected(tab.value);

    return (
        <Tabs selectedTabValue={selected} onChange={handleChange}>
            <Tab label="One" />
            <Tab label="Two" />
            <Tab label="Three" />
        </Tabs>
    );
};

export const TabChangeCallback = () => {
    const [selected, setSelected] = useState(0);
    const handleChange = tab => setSelected(tab.value);
    return (
        <>
            <Tabs selectedTabValue={selected} onChange={handleChange}>
                <Tab label="One" />
                <Tab label="Two" />
                <Tab label="Three" />
            </Tabs>
            <Text>Index: {selected}</Text>
        </>
    );
};

export const SetSelectedTab = () => {
    const tabValues = ['a', 'b', 'c'];
    const [selected, setSelected] = useState(tabValues[1]);
    const handleChange = tab => setSelected(tab.value);

    return (
        <Tabs selectedTabValue={selected} onChange={handleChange}>
            <Tab label={tabValues[0]} value={tabValues[0]} />
            <Tab label={tabValues[1]} value={tabValues[1]} />
            <Tab label={tabValues[2]} value={tabValues[2]} />
        </Tabs>
    );
};
