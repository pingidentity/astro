import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { containerStyles, getOuterContainerStyles } from './HeatMap.styles';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9jdG9yajg5IiwiYSI6ImNrN2F3Y2E4eTAwN3Uzbm00ems2YjhlZmgifQ.R4AOWq-qsmMs4AR7ZA1Kbw';

export const pointsToGeoJson = points => ({
    // Add in a default count so that the point filters just have to worry about one variable.
    // Latitude and longitude could also be separate properties of the object.
    features: points.map(({ id, longLat, properties: { count = 1, ...properties } }) => ({
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': longLat,
        },
        properties: {
            ...properties,
            count,
            id,
        },
    })),
    type: 'FeatureCollection',
});


export default function HeatMap({
    // TODO: Implement these
    // categories,
    center,
    className,
    'data-id': dataId,
    height,
    maxZoom,
    onClusterClick,
    onClusterMouseEnter,
    onClusterMouseLeave,
    onMapMove,
    onPointClick,
    onPointMouseEnter,
    onPointMouseLeave,
    onZoom,
    points,
    startingZoom,
}) {
    const mapContainer = useRef();
    const mapObject = useRef({});

    useEffect(() => {
        const map = new mapboxgl.Map({
            center,
            container: mapContainer.current,
            height: 500,
            maxZoom,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: startingZoom,
        });

        map.on('load', () => {
            map.addSource('data', {
                type: 'geojson',
                data: pointsToGeoJson(points),
                // Path to a very large Mapbox dataset for testing.
                // data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
                clusterProperties: {
                    // Create a custom property so that individual points in the dataset
                    // can behave as though they were clusters. This pulls out "count"
                    // from each point and adds them together.
                    'count': ['+', ['get', 'count']],
                },
            });

            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'data',
                // This only gets clusters and points that have a "count" property of more than one.
                filter: ['>', ['get', 'count'], 1],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'count'],
                        '#51bbd6',
                        100,
                        '#f1f075',
                        750,
                        '#f28cb1',
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'count'],
                        20,
                        100,
                        30,
                        750,
                        40,
                    ],
                },
            });

            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'data',
                filter: ['>', ['get', 'count'], 1],
                layout: {
                    'text-field': '{count}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                },
            });

            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'data',
                // Only things with a count of
                filter: ['>=', 1, ['get', 'count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff',
                },
            });

            mapObject.current = map;
        });

        map.on('move', (e) => {
            onMapMove(e);
        });

        map.on('click', 'clusters', (e) => {
            onClusterClick(e);

            // TODO: Keeping this here in case we do want to pan to clicked points/clusters.

            //     const features = map.queryRenderedFeatures(e.point, {
            //         layers: ["clusters"]
            //     });
            //     const clusterId = features[0].properties.cluster_id;
            //     map.getSource("earthquakes").getClusterExpansionZoom(
            //         clusterId,
            //         function (err, zoom) {
            //             if (err) {return;}

            //             map.easeTo({
            //                 center: features[0].geometry.coordinates,
            //                 zoom: zoom
            //             });
            //         }
            //     );
        });

        map.on('click', 'unclustered-point', (e) => {
            onPointClick(e);
        });


        map.on('zoom', e => onZoom(e));

        map.on('mouseenter', 'clusters', (e) => {
            onClusterMouseEnter(e);
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'clusters', (e) => {
            onClusterMouseLeave(e);
            map.getCanvas().style.cursor = '';
        });

        map.on('mouseenter', 'unclustered-point', (e) => {
            onPointMouseEnter(e);
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'unclustered-point', (e) => {
            onPointMouseLeave(e);
            map.getCanvas().style.cursor = '';
        });
    }, []);

    useEffect(() => {
        if (mapObject.current.getSource) {
            mapObject.current.getSource('data').setData(pointsToGeoJson(points));
        }
    // Might be necessary to stringify this one as well for deep equality.
    }, [points]);

    useEffect(() => {
        if (mapObject.current.setCenter) {
            mapObject.current.setCenter(center);
        }
    }, [JSON.stringify(center)]);

    return (
        <div css={getOuterContainerStyles(height)} data-id={dataId}>
            <div
                ref={mapContainer}
                css={containerStyles}
            />
        </div>
    );
}

HeatMap.propTypes = {
    // TODO: Implement categories
    // categories: PropTypes.objectOf(PropTypes.string),
    center: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    'data-id': PropTypes.string,
    height: PropTypes.number,
    maxZoom: PropTypes.number,
    onClusterClick: PropTypes.func,
    onClusterMouseEnter: PropTypes.func,
    onClusterMouseLeave: PropTypes.func,
    onMapMove: PropTypes.func,
    onPointClick: PropTypes.func,
    onPointMouseEnter: PropTypes.func,
    onPointMouseLeave: PropTypes.func,
    onZoom: PropTypes.func,
    points: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            longLat: PropTypes.arrayOf(PropTypes.number),
            properties: PropTypes.objectOf(
                PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            ),
        }),
    ),
    startingZoom: PropTypes.number,
};

HeatMap.defaultProps = {
    height: 400,
    onClusterClick: noop,
    onClusterMouseEnter: noop,
    onClusterMouseLeave: noop,
    onMapMove: noop,
    onPointClick: noop,
    onPointMouseEnter: noop,
    onPointMouseLeave: noop,
    onZoom: noop,
    points: [],
};

