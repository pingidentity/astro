import { renderHook, act } from '@testing-library/react-hooks';
import * as go from 'gojs';
import usePalette, { setDragState } from './usePalette';


jest.mock('gojs', (replacements) => {
    const paletteObjectProps = {
        ...replacements,
        model: {
            findNodeDataForKey: jest.fn(() => 'node data'),
            setDataProperty: jest.fn(),
        },
        groupTemplateMap: {
            add: jest.fn(),
        },
        nodeTemplateMap: {
            add: jest.fn(),
        },
        toolManager: {
            draggingTool: {
                findDraggablePart: jest.fn(() => ({
                    data: {
                        key: 'very cool key',
                    },
                })),
            },
        },
    };
    return ({
        GraphObject: {
            make: jest.fn(() => paletteObjectProps),
        },
    });
});

describe('usePalette', () => {
    const defaultNodeDataArray = [
        { 'key': 'LOGIN', 'category': 'LOGIN', 'text': 'Login', errorMessage: '' },
        { 'key': 'EXECUTE_FLOW', 'category': 'EXECUTE_FLOW', 'text': 'Execute Flow', errorMessage: '' },
        { 'key': 'finished', 'category': 'finished', 'text': 'Complete', errorMessage: '' },
        { 'key': 'error', 'category': 'error', 'text': 'Failure', errorMessage: '' },
    ];

    const defaultLinkDataArray = [
        { 'from': 'user-login', 'to': 'user-login-success', 'key': 'user-login_user-login-success', 'category': 'outlet' },
        { 'from': 'user-login-success', 'to': 'finished', 'key': 'user-login-success_finished' },
        { 'from': 'user-login', 'to': 'user-login-failure', 'key': 'user-login_user-login-failure', 'category': 'outlet' },
        { 'from': 'user-login-failure', 'to': 'error', 'key': 'user-login-failure_error' },
        { 'from': 'user-login', 'to': 'user-login-not_found', 'key': 'user-login_user-login-not_found', 'category': 'outlet' },
        { 'from': 'user-login-not_found', 'to': 'registration', 'key': 'user-login-not_found_registration' },
        { 'from': 'START', 'to': 'user-login', 'key': 'START_user-login' },
    ];

    const defaultTemplates = [
        ['name', 'template'],
        ['Darrell Hall', 'Private Eyes'],
        ['John Oates', 'Rich Girl'],
    ];

    it('usePalette returns correct props', () => {
        // TODO: Flesh out this test more and set up GoJS mock
        const { result: { current: { paletteProps } } } = renderHook(() => usePalette({
            groupTemplates: [],
            linkDataArray: defaultLinkDataArray,
            nodeDataArray: defaultNodeDataArray,
            nodeTemplates: [],
        }));

        // Get the argument from the first renderContent call

        expect(paletteProps.nodeDataArray).toEqual(defaultNodeDataArray);
        expect(paletteProps.linkDataArray).toEqual(defaultLinkDataArray);
        expect(paletteProps.initPalette).toBeDefined();
        expect(paletteProps.divClassName).toEqual('palette-component');
    });

    it('initPalette adds correct number of node templates', () => {
        const paletteObject = go.GraphObject.make();

        const { result: { current: { paletteProps } } } = renderHook(() => usePalette({
            groupTemplates: [],
            linkDataArray: defaultLinkDataArray,
            nodeDataArray: defaultNodeDataArray,
            nodeTemplates: defaultTemplates,
        }));

        expect(paletteObject.nodeTemplateMap.add).not.toHaveBeenCalled();
        act(() => { paletteProps.initPalette(); });

        expect(paletteObject.nodeTemplateMap.add).toHaveBeenCalledTimes(3);
        expect(paletteObject.nodeTemplateMap.add.mock.calls).toEqual(defaultTemplates);
    });

    it('initPalette adds correct number of node templates', () => {
        const paletteObject = go.GraphObject.make();

        const { result: { current: { paletteProps } } } = renderHook(() => usePalette({
            groupTemplates: defaultTemplates,
            linkDataArray: defaultLinkDataArray,
            nodeDataArray: defaultNodeDataArray,
            nodeTemplates: [],
        }));

        expect(paletteObject.groupTemplateMap.add).not.toHaveBeenCalled();
        act(() => { paletteProps.initPalette(); });

        expect(paletteObject.groupTemplateMap.add).toHaveBeenCalledTimes(3);
        expect(paletteObject.groupTemplateMap.add.mock.calls).toEqual(defaultTemplates);
    });

    it('setDragState calls setDataProperty with correct arguments', () => {
        const paletteObject = go.GraphObject.make();

        expect(paletteObject.model.setDataProperty).not.toHaveBeenCalled();
        setDragState(paletteObject, true)();

        expect(paletteObject.model.setDataProperty).toHaveBeenCalledWith('node data', 'isBeingDragged', true);
    });
});
