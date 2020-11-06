import React from 'react';
import { mount } from 'enzyme';
import mapboxGl from 'mapbox-gl';
import HeatMap, {
    callbackWithBoundsAndZoom,
    clusterClick,
    mouseEnter,
    mouseLeave,
    panToCluster,
    pointClick,
    pointsToGeoJson,
} from './HeatMap';

jest.mock('mapbox-gl', (replacements) => {
    const setData = jest.fn();
    const getClusterExpansionZoom = jest.fn();
    const mapProps = {
        addLayer: jest.fn(),
        addSource: jest.fn(),
        easeTo: jest.fn(),
        getCanvas: jest.fn(() => ({
            style: { cursor: '' },
        })),
        getSource: jest.fn(() => ({
            getClusterExpansionZoom,
            setData,
        })),
        getZoom: jest.fn(() => 5),
        on: jest.fn((type, callback) => [type, callback]),
        queryRenderedFeatures: jest.fn(),
        setCenter: jest.fn(),
        setPaintProperty: jest.fn(),
        ...replacements,
    };
    return ({
        Map: jest.fn(() => mapProps),
    });
});

describe('HeatMap', () => {
    const points = [
        {
            id: 1,
            longLat: [-4, 57.75],
            properties: {
                'property': 'value',
            },
        },
        {
            id: 2,
            longLat: [-4, 58],
            properties: {
                'property': 'value',
                count: 30,
            },
        },
        {
            id: 3,
            longLat: [-4, 58.25],
            properties: {
                'property': 'value',
                count: 500,
            },
        },
        {
            id: 4,
            longLat: [-4, 58.5],
            properties: {
                'property': 'value',
            },
        },
    ];

    const defaultProps = {
        center: [-4, 57.5],
        points,
        height: 500,
        maxZoom: 18,
        scoreGradient: [
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
        ],
        startingZoom: 10,
    };

    // Have to do mount here because hooks fail to fire with shallow.
    const getComponent = props => mount(
        <HeatMap
            {...defaultProps}
            {...props}
        />,
    );

    const map = new mapboxGl.Map();

    const clearMock = (...spies) => {
        [...Object.values(map), ...spies].forEach((mock) => {
            if (mock.mockClear) { mock.mockClear(); }
        });
    };

    afterEach(() => clearMock());

    it('renders the component', () => {
        const component = getComponent();
        expect(component.exists()).toEqual(true);
    });

    it('renders the component with a width', () => {
        const component = getComponent({ width: 500 });
        expect(component.exists()).toEqual(true);
    });

    it('translates points into geoJson', () => {
        const geoJson = pointsToGeoJson(points);

        const expected = {
            type: 'FeatureCollection',
            'features': [
                {
                    'geometry': {
                        'coordinates': [
                            -4,
                            57.75,
                        ],
                        'type': 'Point',
                    },
                    'properties': {
                        'id': 1,
                        'property': 'value',
                        count: 1,
                    },
                    'type': 'Feature',
                },
                {
                    'geometry': {
                        'coordinates': [
                            -4,
                            58,
                        ],
                        'type': 'Point',
                    },
                    'properties': {
                        'id': 2,
                        'property': 'value',
                        count: 30,
                    },
                    'type': 'Feature',
                },
                {
                    'geometry': {
                        'coordinates': [
                            -4,
                            58.25,
                        ],
                        'type': 'Point',
                    },
                    'properties': {
                        'id': 3,
                        'property': 'value',
                        count: 500,
                    },
                    'type': 'Feature',
                },
                {
                    'geometry': {
                        'coordinates': [
                            -4,
                            58.5,
                        ],
                        'type': 'Point',
                    },
                    'properties': {
                        'id': 4,
                        'property': 'value',
                        count: 1,
                    },
                    'type': 'Feature',
                },
            ],
        };

        expect(geoJson).toEqual(expected);
    });

    it('calls onPointClick when a point is clicked', () => {
        const onPointClick = jest.fn();

        pointClick(onPointClick)({});

        expect(onPointClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClusterClick when a point is clicked', () => {
        const onClusterClick = jest.fn();

        clusterClick(new mapboxGl.Map(), onClusterClick)({});

        expect(onClusterClick).toHaveBeenCalledTimes(1);
    });

    it('clusterClick does not ease to point if no features are found', () => {
        map.queryRenderedFeatures.mockImplementationOnce(() => []);
        clusterClick(map, jest.fn())({});

        expect(map.easeTo).not.toHaveBeenCalled();
    });

    it('clusterClick eases to a point if feature has a cluster_id', () => {
        const feature = {
            properties: {
                cluster_id: 'id',
            },
            geometry: {
                coordinates: [10, 10],
            },
        };
        map.queryRenderedFeatures.mockImplementationOnce(() => [feature]);
        clusterClick(map, jest.fn())(feature);

        expect(map.getSource().getClusterExpansionZoom).toHaveBeenCalledTimes(1);
    });

    it('clusterClick eases to a point if features does not have a cluster_id', () => {
        const feature = {
            properties: {
                cluster_id: null,
            },
            geometry: {
                coordinates: [10, 10],
            },
        };
        map.queryRenderedFeatures.mockImplementationOnce(() => [feature]);
        map.getZoom.mockImplementationOnce(() => 10);

        clusterClick(map, jest.fn())(feature);

        expect(map.easeTo).toHaveBeenCalledWith({ center: [10, 10], zoom: 11 });
    });

    it('does not ease to cluster if cluster expansion throws error', () => {
        panToCluster(map, [10, 10])('I AM ERROR', 15);

        expect(map.easeTo).toHaveBeenCalledTimes(0);
    });

    it('eases to cluster if cluster expansion does not throw error', () => {
        panToCluster(map, [10, 10])(undefined, 15);

        expect(map.easeTo).toHaveBeenCalledWith({ center: [10, 10], zoom: 15 });
    });

    it('sets style and calls callback for mouseEnter', () => {
        const onMouseEnter = jest.fn();
        const style = {};
        map.getCanvas.mockImplementationOnce(() => ({ style }));
        mouseEnter(map, onMouseEnter)('event');

        expect(onMouseEnter).toHaveBeenCalledWith('event');
        expect(style.cursor).toEqual('pointer');
    });

    it('sets style and calls callback for mouseLeave', () => {
        const onMouseLeave = jest.fn();
        const style = {};
        map.getCanvas.mockImplementationOnce(() => ({ style }));
        mouseLeave(map, onMouseLeave)('event');

        expect(onMouseLeave).toHaveBeenCalledWith('event');
        expect(style.cursor).toEqual('');
    });

    it('callbackWithBoundsAndZoom calls callback with bounds and zoom', () => {
        const onZoom = jest.fn();
        callbackWithBoundsAndZoom(
            {
                getBounds: () => ({
                    _ne: [10, 10],
                    _sw: [20, 20],
                }),
                getZoom: () => 10,
            },
            onZoom,
        )('event');

        expect(onZoom).toHaveBeenCalledWith({ neBound: [10, 10], swBound: [20, 20], zoom: 10 }, 'event');
    });

    // Using a more complex mock here because it's important to test that this update is actually
    // happening in the component's lifecycle.
    it('updates source when data prop changes', () => {
        const component = getComponent();
        // Have to call this because the map object ref is set in the load event.
        const [, load] = map.on.mock.calls.find(([event]) => event === 'load');
        load();

        expect(map.getSource).not.toHaveBeenCalled();

        component.setProps({ ...defaultProps, points: defaultProps.points.slice(0, 2) });

        expect(map.getSource).toHaveBeenCalledTimes(1);
        clearMock(map);
    });

    // Using a more complex mock here because it's important to test that this update is actually
    // happening in the component's lifecycle.
    it('updates source when data prop changes, but is still the same object', () => {
        const mutatingPoints = [...defaultProps.points];
        const component = getComponent({ points: mutatingPoints });
        // Have to call this because the map object ref is set in the load event.
        const [, load] = map.on.mock.calls.find(([event]) => event === 'load');
        load();

        expect(map.getSource).not.toHaveBeenCalled();
        mutatingPoints.pop();

        component.setProps({ ...defaultProps, points: mutatingPoints });

        expect(map.getSource).toHaveBeenCalledTimes(1);
        clearMock(map);
    });

    // Using a more complex mock here because it's important to test that this update is actually
    // happening in the component's lifecycle.
    it('updates center when center prop changes', () => {
        const component = getComponent();
        // Have to call this because the map object ref is set in the load event.
        const [, load] = map.on.mock.calls.find(([event]) => event === 'load');
        load();

        expect(map.setCenter).not.toHaveBeenCalled();

        component.setProps({ ...defaultProps, center: [0, 0] });

        expect(map.setCenter).toHaveBeenCalledWith([0, 0]);
        clearMock(map);
    });

    it('updates circle color property when scoreGradient prop changes', () => {
        const component = getComponent();
        // Have to call this because the map object ref is set in the load event.
        const [, load] = map.on.mock.calls.find(([event]) => event === 'load');
        load();

        expect(map.setPaintProperty).not.toHaveBeenCalled();

        component.setProps(
            { ...defaultProps,
                scoreGradient: [
                    [0, '#48C06A'],
                    [10, '#6BC856'],
                ],
            });

        expect(map.setPaintProperty).toHaveBeenCalledTimes(1);
        clearMock(map);
    });

    it('renders correctly when render is passed in', () => {
        const component = getComponent({
            'data-id': 'test-id',
            render: ({ mapNode }) => mapNode,
        });

        expect(component.find('[data-id="test-id"]').exists()).toEqual(true);
    });
});
