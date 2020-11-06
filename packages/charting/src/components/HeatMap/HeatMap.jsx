import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import flatMap from 'lodash/flatMap';
import noop from 'lodash/noop';
import { containerStyles, getOuterContainerStyles } from './HeatMap.styles';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3d5bmV0aHJvc2UiLCJhIjoiY2tlaXp2MmQ4MTNxZzJxbW40MGJzem0xciJ9.bZtH4xxOuRcW7MlxQ8y3MQ';

export const pointsToGeoJson = (points) => {
    return ({
        // Add in a default count so that the point filters just have to worry about one variable.
        // Latitude and longitude could also be separate properties of the object.
        features: points.map(({ id, longLat, properties: { count = 1, ...properties } = {} }) => ({
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
};

export const getCircleColor = scoreGradient => [
    'interpolate',
    ['linear'],
    // If an element has a point_count, that means it's a cluster and we can
    // calculate a mean of its score values. Otherwise, it's a single point
    // and we can use the raw score.
    ['case', ['has', 'point_count'], ['/', ['get', 'score'], ['get', 'point_count']], ['get', 'score']],
    ...flatMap(scoreGradient, item => item),
];

// Moving callbacks outside of component for testing.
export const panToCluster = (map, coordinates) => (err, zoom) => {
    if (err) { return; }

    map.easeTo({
        center: coordinates,
        zoom,
    });
};

// Pan to a point on whether it's a cluster or a point internally.
export const panToPoint = (map, feature) => {
    const {
        properties: {
            cluster_id: clusterId,
        },
        geometry: {
            coordinates,
        },
    } = feature;

    if (clusterId) {
        map.getSource('mapData').getClusterExpansionZoom(
            clusterId,
            panToCluster(map, coordinates),
        );
    } else {
        map.easeTo({
            center: coordinates,
            zoom: map.getZoom() + 1,
        });
    }
};

export const clusterClick = (map, onClusterClick) => (e) => {
    onClusterClick(e);

    // Pan to the clicked point/cluster.
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
    });

    if (!features || features.length === 0) {
        return;
    }

    panToPoint(map, features[0]);
};

export const pointClick = onPointClick => e => onPointClick(e);

export const updateSource = (map, points) => {
    if (map.getSource) {
        map.getSource('mapData').setData(pointsToGeoJson(points));
    }
};

export const mouseLeave = (map, onMouseLeave) => (e) => {
    onMouseLeave(e);
    const style = map.getCanvas().style;
    style.cursor = '';
};

export const mouseEnter = (map, onMouseEnter) => (e) => {
    onMouseEnter(e);
    const style = map.getCanvas().style;
    style.cursor = 'pointer';
};

export const callbackWithBoundsAndZoom = (map, callback) => (e) => {
    const {
        _ne: neBound,
        _sw: swBound,
    } = map.getBounds();
    callback({
        neBound,
        swBound,
        zoom: map.getZoom(),
    }, e);
};

/**
 * Component that shows a map with various points with customizable colors.
 */
export default function HeatMap({
    center,
    'data-id': dataId,
    height,
    maxZoom,
    minZoom,
    onClusterClick,
    onClusterMouseEnter,
    onClusterMouseLeave,
    onMapMove,
    onPointClick,
    onPointMouseEnter,
    onPointMouseLeave,
    onZoom,
    points,
    render,
    scoreGradient,
    startingZoom,
    width,
}) {
    const mapContainer = useRef({});
    const mapObject = useRef({});

    useEffect(() => {
        const map = new mapboxgl.Map({
            attributionControl: false,
            center,
            container: mapContainer.current,
            logoPosition: 'top-right',
            maxZoom,
            minZoom,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: startingZoom,
        });

        map.on('load', () => {
            map.addSource('mapData', {
                type: 'geojson',
                data: pointsToGeoJson(points),
                // Path to a very large Mapbox dataset for testing.
                // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
                clusterProperties: {
                    // Create a custom property so that individual points in the dataset
                    // can behave as though they were clusters. This pulls out "count" from
                    // each point and adds them together.
                    'count': ['+', ['get', 'count']],
                    ...scoreGradient ? {
                        score: ['+', ['get', 'score']],
                    } : {},
                },
            });

            // Add two similar layers so we can distinguish Mapbox clusters in callbacks.
            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'mapData',
                // This only gets clusters and points that have a
                // "count" property of more than one.
                filter: ['<', ['get', 'count'], 2],
                paint: {
                    'circle-color': getCircleColor(scoreGradient),
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
                id: 'clusters',
                type: 'circle',
                source: 'mapData',
                // This only gets clusters and points that have a
                // "count" property of more than one.
                filter: ['>', ['get', 'count'], 1],
                paint: {
                    'circle-color': getCircleColor(scoreGradient),
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
                source: 'mapData',
                filter: ['>', ['get', 'count'], 0],
                layout: {
                    'text-field': '{count}',
                    'text-font': ['Arial Unicode MS Bold'],
                    'text-size': 12,
                },
                paint: {
                    'text-color': '#FFFFFF',
                },
            });


            map.on('move', callbackWithBoundsAndZoom(map, onMapMove));

            map.on('zoom', callbackWithBoundsAndZoom(map, onZoom));

            map.on('click', 'clusters', clusterClick(map, onClusterClick));

            map.on('click', 'unclustered-point', pointClick(onPointClick));

            map.on('mouseenter', 'clusters', mouseEnter(map, onClusterMouseEnter));

            map.on('mouseleave', 'clusters', mouseLeave(map, onClusterMouseLeave));

            map.on('mouseenter', 'unclustered-point', mouseEnter(map, onPointMouseEnter));

            map.on('mouseleave', 'unclustered-point', mouseLeave(map, onPointMouseLeave));

            mapObject.current = map;
        });
    }, []);

    useEffect(
        () => updateSource(mapObject.current, points),
        // Might be necessary to stringify this one as well for deep equality.
        [JSON.stringify(points)],
    );

    useEffect(() => {
        if (mapObject.current.setCenter) {
            mapObject.current.setCenter(center);
        }
    }, [JSON.stringify(center)]);

    useEffect(() => {
        if (mapObject.current.setPaintProperty) {
            mapObject.current.setPaintProperty('clusters', 'circleColor', getCircleColor(scoreGradient));
        }
    }, [JSON.stringify(scoreGradient)]);

    useEffect(() => {
        if (mapObject.current.resize) {
            mapObject.current.resize();
        }
    }, [mapContainer.current.offsetWidth]);

    const mapNode = (
        <div css={getOuterContainerStyles(height, width)} data-id={dataId}>
            <div
                ref={mapContainer}
                css={containerStyles}
            />
        </div>
    );

    return render({ mapObject: mapObject.current, mapNode });
}

const zoomPropType = PropTypes.oneOf(new Array(22).fill(undefined).map((val, idx) => idx + 1));

HeatMap.propTypes = {
    /**
     * The center of the map, formatted as [longitude, latitude]. For example, [10, 10].
     */
    center: PropTypes.arrayOf(PropTypes.number),
    /**
     * A test hook applied to the root element.
     */
    'data-id': PropTypes.string,
    /**
     * The height of the map in pixels. Defaults to 400px.
     */
    height: PropTypes.number,
    /**
     * The maximum zoom level of the map. Higher zoom levels mean a closer zoom.
     * This maxes out at 22, which is also the default. 1 is the minimum.
     */
    maxZoom: zoomPropType,
    /**
     * The minimum zoom level of the map. Higher zoom levels mean a closer zoom.
     * This maxes out at 22. 1 is the minimum and also the default.
     */
    minZoom: zoomPropType,
    /**
     * Called when a cluster of points is clicked. This is a Mapbox cluster,
     * representing more than one point of underlying data as passed in through the points prop.
     */
    onClusterClick: PropTypes.func,
    /**
     * Called when the mouse enters a cluster of points.
     */
    onClusterMouseEnter: PropTypes.func,
    /**
     * Called when the mouse leaves a cluster of points.
     */
    onClusterMouseLeave: PropTypes.func,
    /**
     * Called when the map is moved. This is not throttled and may fire many times.
     */
    onMapMove: PropTypes.func,
    /**
     * Called when an individual, unclustered point is clicked.
     */
    onPointClick: PropTypes.func,
    /**
     * Called when the mouse enters an individual, unclustered point.
     */
    onPointMouseEnter: PropTypes.func,
    /**
     * Called when the mouse leaves individual, unclustered point is clicked.
     */
    onPointMouseLeave: PropTypes.func,
    /**
     * Called when zooming in or out. This is not throttled and may fire many times.
     */
    onZoom: PropTypes.func,
    /**
     * The points to be represented on the map.
     */
    points: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * The id of the point, used for internal logic and callbacks.
             */
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            /**
             * The longitude and latitude of the point, formatted as [longitude, latitude].
             */
            longLat: PropTypes.arrayOf(PropTypes.number),
            /**
             * Additional information about the point.
             */
            properties: PropTypes.shape({
                /**
                 * The number of events represented by a particular point. This will make the point
                 * behave like a Mapbox-generated point cluster.
                 */
                count: PropTypes.number,
                /**
                 * The value of the point. This changes its color in the UI based on the
                 * scoreGradient prop. Clusters of points will take the average score of
                 * their individual points.
                 */
                score: PropTypes.number,
            }),
        }),
    ),
    /**
     * The colors assigned to points and clusters based on their underlying "score" values.
     * Structured as an array of arrays, where each internal array is [lowerPointBound, hexColor].
     * For example, [50, #FFFFFF] would mean all points above 50 would be white, unless there was
     * another value that had a color for numbers above another value, like 60.
     *
     * To get a single-color map, pass in a single value with zero as its lower bound.
     * For example, a scoreGradient prop of [[0, #FFFFFF]] would make all points white.
     */
    scoreGradient: PropTypes.arrayOf(PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    )).isRequired,
    /**
     * A function used to render the map's container and its anchor element, which Mapbox
     * attaches the map to. This is passed an object with two properties: the mapNode, which is
     * the React node that the map renders into, and the mapObject, which is the JavaScript object
     * used to interact with Mapbox's API.
     */
    render: PropTypes.func,
    /**
     * A number from 1-22 representing the map's initial zoom level. Higher numbers indicate
     * a closer zoom.
     */
    startingZoom: zoomPropType,
    /**
     * The width of the map in pixels. Defaults to 100% of its parent container.
     */
    width: PropTypes.number,
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
    render: ({ mapNode }) => mapNode,
};
