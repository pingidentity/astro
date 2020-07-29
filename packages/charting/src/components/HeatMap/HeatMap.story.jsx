import React from 'react';
import { withKnobs, array } from '@storybook/addon-knobs';
import HeatMap from './HeatMap';

export default {
    title: 'HeatMap',
    component: HeatMap,
    decorators: [withKnobs],
};

export const Basic = () => {
    const center = array('center', [-4, 57.5]);

    const data = [
        {
            id: 1,
            longLat: [-4, 57.75],
            properties: {
                'property': 'value',
                'count': 500,
            },
        },
        {
            id: 2,
            longLat: [-4, 58],
            properties: {
                'property': 'value',
            },
        },
        {
            id: 3,
            longLat: [-4, 58.25],
            properties: {
                'property': 'value',
                count: 30,
                category: 'medium',
            },
        },
        {
            id: 4,
            longLat: [-4, 58.5],
            properties: {
                'property': 'value',
                count: 20,
                category: 'low',
            },
        },
    ];

    return (
        <HeatMap
            categories={{
                low: { color: '#51bbd6' },
                medium: { color: '#f1f075' },
                high: { color: '#f28cb1' },
            }}
            center={center}
            points={data}
            height={500}
            maxZoom={18}
            startingZoom={6}
        />
    );
};
