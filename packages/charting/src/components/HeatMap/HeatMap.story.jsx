import React from 'react';
import HeatMap from './HeatMap';

export default {
    title: 'HeatMap',
    component: HeatMap,
};

export const Score = () => {
    const data = [
        {
            id: 1,
            longLat: [-4, 57.75],
            properties: {
                score: 50,
            },
        },
        {
            id: 2,
            longLat: [-4, 58],
            properties: {
                // The number of events represented by a particular point. This will make the point
                // behave like a Mapbox-generated point cluster.
                count: 12,
                // The value of the point. This changes its color in the UI based on the
                // scoreGradient prop. Clusters of points will take the average score of
                // their individual points.
                score: 70,
            },
        },
        {
            id: 3,
            longLat: [-4, 58.25],
            properties: {
                count: 13,
                score: 30,
            },
        },
        {
            id: 4,
            longLat: [-4, 58.5],
            properties: {
                count: 50,
                score: 95,
            },
        },
        {
            id: 2,
            longLat: [-4, 58.75],
            properties: {
                count: 67,
                score: 15,
            },
        },
    ];

    return (
        <HeatMap
            scoreGradient={[
                [0, '#48C06A'],
                [10, '#6BC856'],
                [20, '#8CD043'],
                [30, '#ACD732'],
                [40, '#CBDF20'],
                [50, '#E2E413'],
                [60, '#E4AD1E'],
                [70, '#E78227'],
                [80, '#EA5630'],
                [90, '#EC203A'],
            ]}
            center={[-4, 58]}
            points={data}
            height={500}
            maxZoom={18}
            // Disabling linting below because of console.log calls.
            onClusterClick={value => console.log('onClusterClick: ', value)} // eslint-disable-line
            onClusterMouseEnter={value => console.log('onClusterMouseEnter: ', value)} // eslint-disable-line
            onClusterMouseLeave={value => console.log('onClusterMouseLeave: ', value)} // eslint-disable-line
            onMapMove={value => console.log('onMapMove: ', value)} // eslint-disable-line
            onPointClick={value => console.log('onPointClick: ', value)} // eslint-disable-line
            onPointMouseEnter={value => console.log('onPointMouseEnter: ', value)} // eslint-disable-line
            onPointMouseLeave={value => console.log('onPointMouseLeave: ', value)} // eslint-disable-line
            onZoom={value => console.log('onZoom: ', value)} // eslint-disable-line
            startingZoom={6}
        />
    );
};
