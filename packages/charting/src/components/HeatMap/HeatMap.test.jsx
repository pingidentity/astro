import React from 'react';
import { mount } from 'enzyme';
import mapboxGl from 'mapbox-gl';
import HeatMap, { pointsToGeoJson } from './HeatMap';

jest.mock('mapbox-gl', () => {
    const setData = jest.fn();
    const mapProps = {
        getSource: jest.fn(() => ({
            setData,
        })),
        addLayer: jest.fn(),
        addSource: jest.fn(),
        getCanvas: jest.fn(() => ({
            style: { cursor: '' },
        })),
        on: (type, callback) => [type, callback],
        setCenter: jest.fn(),
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

    it('renders the component', () => {
        const component = getComponent();
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

    it('calls onMove when map moves', () => {
        const onMapMove = jest.fn();

        const mapBoxOn = jest.spyOn(map, 'on');

        getComponent({
            onMapMove,
        });

        const [, onMoveCallback] = mapBoxOn.mock.calls.find(([key]) => key === 'move');
        onMoveCallback('test value');

        expect(onMapMove).toHaveBeenCalledWith('test value');
        mapBoxOn.mockClear();
    });

    it('calls onPointClick when a point is clicked', () => {
        const onPointClick = jest.fn();

        const mapBoxOn = jest.spyOn(map, 'on');

        getComponent({
            onPointClick,
        });

        const [, , onClickCallback] = mapBoxOn.mock.calls.find(
            ([event, type]) => event === 'click' && type === 'unclustered-point',
        );
        onClickCallback('test value');

        expect(onPointClick).toHaveBeenCalledWith('test value');
        mapBoxOn.mockClear();
    });

    it('calls onClusterClick when a point is clicked', () => {
        const onClusterClick = jest.fn();

        const mapBoxOn = jest.spyOn(map, 'on');

        getComponent({
            onClusterClick,
        });

        const [, , onClickCallback] = mapBoxOn.mock.calls.find(
            ([event, type]) => event === 'click' && type === 'clusters',
        );
        onClickCallback('test value');

        expect(onClusterClick).toHaveBeenCalledWith('test value');
        mapBoxOn.mockClear();
    });

    it('calls onPointMouseEnter when mousing into a point', () => {
        const onPointMouseEnter = jest.fn();

        const mapBoxOn = jest.spyOn(map, 'on');

        getComponent({
            onPointMouseEnter,
        });

        const [, , callback] = mapBoxOn.mock.calls.find(
            ([event, type]) => event === 'mouseenter' && type === 'unclustered-point',
        );
        callback('test value');

        expect(onPointMouseEnter).toHaveBeenCalledWith('test value');
        mapBoxOn.mockClear();
    });

    it('calls onClusterMouseEnter when mousing into a cluster', () => {
        const onClusterMouseEnter = jest.fn();

        const mapBoxOn = jest.spyOn(map, 'on');

        getComponent({
            onClusterMouseEnter,
        });

        const [, , callback] = mapBoxOn.mock.calls.find(
            ([event, type]) => event === 'mouseenter' && type === 'clusters',
        );
        callback('test value');

        expect(onClusterMouseEnter).toHaveBeenCalledWith('test value');
        mapBoxOn.mockClear();
    });

    it('calls onPointMouseLeave when mousing out of a point', () => {
        const onPointMouseLeave = jest.fn();

        const mapBoxOn = jest.spyOn(map, 'on');

        getComponent({
            onPointMouseLeave,
        });

        const [, , callback] = mapBoxOn.mock.calls.find(
            ([event, type]) => event === 'mouseleave' && type === 'unclustered-point',
        );
        callback('test value');

        expect(onPointMouseLeave).toHaveBeenCalledWith('test value');
        mapBoxOn.mockClear();
    });

    it('calls onClusterMouseLeave when mousing out of a cluster', () => {
        const onClusterMouseLeave = jest.fn();

        const mapBoxOn = jest.spyOn(map, 'on');

        getComponent({
            onClusterMouseLeave,
        });

        const [, , callback] = mapBoxOn.mock.calls.find(
            ([event, type]) => event === 'mouseleave' && type === 'clusters',
        );
        callback('test value');

        expect(onClusterMouseLeave).toHaveBeenCalledWith('test value');
        mapBoxOn.mockClear();
    });

    it('calls onZoom when zooming', () => {
        const onZoom = jest.fn();

        const mapBoxOn = jest.spyOn(map, 'on');

        getComponent({
            onZoom,
        });

        const [, callback] = mapBoxOn.mock.calls.find(
            ([event]) => event === 'zoom',
        );
        callback('test value');

        expect(onZoom).toHaveBeenCalledWith('test value');
        mapBoxOn.mockClear();
    });

    it('calls addSource and addLayer with correct arguments', () => {
        const mapBoxOn = jest.spyOn(map, 'on');
        const addLayerSpy = jest.spyOn(map, 'addLayer');
        const addSourceSpy = jest.spyOn(map, 'addSource');

        getComponent();

        expect(addLayerSpy).not.toHaveBeenCalled();
        expect(addSourceSpy).not.toHaveBeenCalled();

        const [, loadCallback] = mapBoxOn.mock.calls.find(([event]) => event === 'load');
        loadCallback();

        const [addClusters, addCount, addPoints] = addLayerSpy.mock.calls;

        expect(addSourceSpy.mock.calls[0]).toMatchSnapshot();
        expect(addClusters).toMatchSnapshot();
        expect(addCount).toMatchSnapshot();
        expect(addPoints).toMatchSnapshot();

        mapBoxOn.mockClear();
        addLayerSpy.mockClear();
        addSourceSpy.mockClear();
    });

    it('updates source when data prop changes', () => {
        const mapBoxOn = jest.spyOn(map, 'on');
        const getSourceSpy = jest.spyOn(map, 'getSource');
        const setDataSpy = jest.spyOn(map.getSource(), 'setData');
        getSourceSpy.mockClear();

        const component = getComponent();
        // Have to call this because the map object ref is set in the load event.
        const [, load] = mapBoxOn.mock.calls.find(([event]) => event === 'load');
        load();

        expect(getSourceSpy).not.toHaveBeenCalled();
        expect(setDataSpy).not.toHaveBeenCalled();

        component.setProps({ ...defaultProps, points: defaultProps.points.slice(0, 2) });

        expect(getSourceSpy).toHaveBeenCalledWith('data');
        expect(setDataSpy.mock.calls[0]).toMatchSnapshot();

        mapBoxOn.mockClear();
        getSourceSpy.mockClear();
        setDataSpy.mockClear();
    });

    it('updates center when center prop changes', () => {
        const setCenterSpy = jest.spyOn(map, 'setCenter');
        const mapBoxOn = jest.spyOn(map, 'on');

        const component = getComponent();
        // Have to call this because the map object ref is set in the load event.
        const [, load] = mapBoxOn.mock.calls.find(([event]) => event === 'load');
        load();

        expect(setCenterSpy).not.toHaveBeenCalled();

        component.setProps({ ...defaultProps, center: [0, 0] });

        expect(setCenterSpy).toHaveBeenCalledWith([0, 0]);
    });
});
