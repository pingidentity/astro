import { act, renderHook } from '@testing-library/react-hooks';
import * as go from 'gojs';
import useDiagram, {
    addLinks,
    addNodes,
    dragGroupTogether,
    getBorderWidth,
    handleHighlight,
    removeLinks,
    removeNodes,
    renderPortCursor,
} from './useDiagram';
import { COLORS } from '../../utils/constants';

jest.mock('../../components/ZoomSlider/ZoomSlider.js');
jest.mock('../../components/NonRealtimeDraggingTool/NonRealtimeDraggingTool.js');

jest.mock('gojs', (replacements) => {
    const diagramObjectProps = {
        ...replacements,
        model: {
            findNodeDataForKey: jest.fn(() => 'node data'),
            setDataProperty: jest.fn(),
            mergeNodeDataArray: jest.fn(),
        },
        groupTemplateMap: {
            add: jest.fn(),
        },
        linkTemplateMap: {
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
    const Diagram = () => {};
    Diagram.inherit = () => {};
    return ({
        Binding: jest.fn(() => ({
            ofModel: jest.fn(),
            ofObject: jest.fn(),
        })),
        Diagram,
        DraggingTool: () => ({ computeEffectiveCollection: () => {} }),
        GraphObject: {
            make: jest.fn(() => diagramObjectProps),
        },
        Link: () => {},
        List: jest.fn(() => ({
            add: jest.fn(),
        })),
        Part: () => {},
        Spot: () => {},
    });
});

describe('useDiagram', () => {
    const defaultNodes = [
        { 'key': 'user-login', 'category': 'LOGIN', 'name': 'User login', 'stepId': 'userLogin', errorMessage: '' },
        { 'key': 'user-login-success', 'category': 'blue_outlet', 'text': 'On Success', errorMessage: '' },
        { 'key': 'user-login-failure', 'category': 'gray_outlet', 'text': 'On Failure', errorMessage: '' },
        { 'key': 'user-login-not_found', 'category': 'gray_outlet', 'text': 'no such user', errorMessage: '' },
        { 'key': 'finished', 'category': 'finished', 'stepId': 'finished', errorMessage: '' },
        { 'key': 'registration', 'category': 'EXECUTE_FLOW', 'stepId': 'registration', 'errorMessage': 'authentication failed' },
        { 'key': 'START', 'category': 'START', 'loc': '0 60', 'id': 'START', errorMessage: '' }];
    const defaultLinks = [
        { 'from': 'user-login', 'to': 'user-login-success', 'key': 'user-login_user-login-success' },
        { 'from': 'user-login-success', 'to': 'finished', 'key': 'user-login-success_finished' },
        { 'from': 'user-login', 'to': 'user-login-failure', 'key': 'user-login_user-login-failure' },
        { 'from': 'user-login-failure', 'to': 'error', 'key': 'user-login-failure_error' },
        { 'from': 'user-login', 'to': 'user-login-not_found', 'key': 'user-login_user-login-not_found' },
        { 'from': 'user-login-not_found', 'to': 'registration', 'key': 'user-login-not_found_registration' },
        { 'from': 'START', 'to': 'user-login', 'key': 'START_user-login' },
    ];

    const defaultTemplates = [
        ['name', {}],
        ['Darrell Hall', {}],
        ['John Oates', {}],
    ];

    it('useDiagram returns correct props', () => {
        // TODO: Flesh out this test more and set up GoJS mock
        const { result } = renderHook(() => useDiagram({
            groupTemplates: [],
            linkDataArray: defaultLinks,
            nodeDataArray: defaultNodes,
            nodeTemplates: [],
            onModelChange: () => {},
        }));

        // Get the argument from the first renderContent call

        expect(result.current.diagramProps.nodeDataArray).toEqual(defaultNodes);
        expect(result.current.diagramProps.linkDataArray).toEqual(defaultLinks);
        expect(result.current.diagramProps.initDiagram).toBeDefined();
    });

    it('useDiagram adds node templates to node template map', () => {
        const diagramObject = go.GraphObject.make();
        const { result } = renderHook(() => useDiagram({
            groupTemplates: [],
            linkDataArray: defaultLinks,
            nodeDataArray: defaultNodes,
            nodeTemplates: defaultTemplates,
            onModelChange: () => {},
        }));

        expect(diagramObject.nodeTemplateMap.add).not.toHaveBeenCalled();
        act(() => { result.current.diagramProps.initDiagram(); });

        expect(diagramObject.nodeTemplateMap.add).toHaveBeenCalledTimes(3);
        expect(diagramObject.nodeTemplateMap.add.mock.calls).toEqual(defaultTemplates);
    });

    it('useDiagram adds group templates to group template map', () => {
        const diagramObject = go.GraphObject.make();
        const { result } = renderHook(() => useDiagram({
            groupTemplates: defaultTemplates,
            linkDataArray: defaultLinks,
            nodeDataArray: defaultNodes,
            nodeTemplates: [],
            onModelChange: () => {},
        }));

        expect(diagramObject.groupTemplateMap.add).not.toHaveBeenCalled();
        act(() => { result.current.diagramProps.initDiagram(); });

        expect(diagramObject.groupTemplateMap.add).toHaveBeenCalledTimes(3);
        expect(diagramObject.groupTemplateMap.add.mock.calls).toEqual(defaultTemplates);
    });

    it('onModelChange from diagramProps calls onModelChange argument', () => {
        const myModelChange = jest.fn();
        const { result } = renderHook(() => useDiagram({
            groupTemplates: [],
            linkDataArray: [],
            nodeDataArray: [],
            nodeTemplates: [],
            onModelChange: myModelChange,
        }));

        expect(myModelChange).not.toHaveBeenCalled();
        act(() => { result.current.diagramProps.initDiagram(); });
        act(() => { result.current.diagramProps.onModelChange(); });
        expect(myModelChange).toHaveBeenCalledTimes(1);
    });

    it('onModelChange from diagramProps calls onModelChange argument with correct arguments for droppedOntoLinkKey', () => {
        const myModelChange = jest.fn();
        const { result } = renderHook(() => useDiagram({
            groupTemplates: [],
            linkDataArray: [],
            nodeDataArray: [],
            nodeTemplates: [],
            onModelChange: myModelChange,
        }));

        expect(myModelChange).not.toHaveBeenCalled();
        act(() => { result.current.diagramProps.initDiagram(); });
        act(() => { result.current.diagramProps.onModelChange({ droppedOntoLinkKey: 'linkKey' }); });
        expect(myModelChange).toHaveBeenCalledWith({ droppedOntoLinkKey: 'linkKey' });
    });

    it('onModelChange from diagramProps calls onModelChange argument with correct arguments for droppedOntoNodeKey', () => {
        const myModelChange = jest.fn();
        const { result } = renderHook(() => useDiagram({
            groupTemplates: [],
            linkDataArray: [],
            nodeDataArray: [],
            nodeTemplates: [],
            onModelChange: myModelChange,
        }));

        expect(myModelChange).not.toHaveBeenCalled();
        act(() => { result.current.diagramProps.initDiagram(); });
        act(() => { result.current.diagramProps.onModelChange({ droppedOntoNodeKey: 'nodeKey' }); });
        expect(myModelChange).toHaveBeenCalledWith({ droppedOntoNodeKey: 'nodeKey' });
    });

    it('addNodes adds nodes with new keys', () => {
        const diagramMock = {
            model: {
                addNodeDataCollection: jest.fn(),
                nodeDataArray: defaultNodes.slice(0, 3),
            },
        };

        addNodes(diagramMock, defaultNodes);

        expect(diagramMock.model.addNodeDataCollection)
            .toHaveBeenCalledWith(defaultNodes.slice(3, 7));
    });

    it('addNodes does not try to add when all keys match', () => {
        const diagramMock = {
            model: {
                addNodeDataCollection: jest.fn(),
                nodeDataArray: defaultNodes,
            },
        };

        addNodes(diagramMock, defaultNodes);

        expect(diagramMock.model.addNodeDataCollection).not.toHaveBeenCalled();
    });

    it('addLinks adds links with new keys', () => {
        const diagramMock = {
            model: {
                addLinkDataCollection: jest.fn(),
                linkDataArray: defaultLinks.slice(0, 3),
            },
        };

        addLinks(diagramMock, defaultLinks);

        expect(diagramMock.model.addLinkDataCollection)
            .toHaveBeenCalledWith(defaultLinks.slice(3, 7));
    });

    it('addLinks does not try to add when all keys match', () => {
        const diagramMock = {
            model: {
                addLinkDataCollection: jest.fn(),
                linkDataArray: defaultLinks,
            },
        };

        addLinks(diagramMock, defaultLinks);

        expect(diagramMock.model.addLinkDataCollection).not.toHaveBeenCalled();
    });

    it('removeNodes removes nodes no longer in data array', () => {
        const diagramMock = {
            model: {
                removeNodeDataCollection: jest.fn(),
                nodeDataArray: defaultNodes.slice(3, 7),
            },
        };

        removeNodes(diagramMock, defaultNodes.slice(0, 3));

        expect(diagramMock.model.removeNodeDataCollection)
            .toHaveBeenCalledWith(defaultNodes.slice(3, 7));
    });

    it('removeNodes does not try to remove when all keys match', () => {
        const diagramMock = {
            model: {
                removeNodeDataCollection: jest.fn(),
                nodeDataArray: defaultNodes,
            },
        };

        removeNodes(diagramMock, defaultNodes);

        expect(diagramMock.model.removeNodeDataCollection).not.toHaveBeenCalled();
    });

    it('removeLinks removes nodes no longer in data array', () => {
        const diagramMock = {
            model: {
                removeLinkDataCollection: jest.fn(),
                linkDataArray: defaultLinks.slice(3, 7),
            },
        };

        removeLinks(diagramMock, defaultLinks.slice(0, 3));

        expect(diagramMock.model.removeLinkDataCollection)
            .toHaveBeenCalledWith(defaultLinks.slice(3, 7));
    });

    it('removeLinks does not try to remove when all keys match', () => {
        const diagramMock = {
            model: {
                removeLinkDataCollection: jest.fn(),
                linkDataArray: defaultLinks,
            },
        };

        removeLinks(diagramMock, defaultLinks);

        expect(diagramMock.model.removeLinkDataCollection).not.toHaveBeenCalled();
    });

    it('renderPortCursor gives ports with connections a default cursor', () => {
        const fromPort = {};
        const toPort = {};
        const node = {
            findNodesInto: () => ({ count: 2 }),
            findNodesOutOf: () => ({ count: 2 }),
            findPort: name => (
                name === 'from' ? fromPort : toPort
            ),
        };

        renderPortCursor(node);

        expect(fromPort.cursor).toEqual('normal');
        expect(toPort.cursor).toEqual('normal');
    });

    it('renderPortCursor gives ports with no connections a pointer cursor', () => {
        const fromPort = {};
        const toPort = {};
        const node = {
            findNodesInto: () => ({ count: 0 }),
            findNodesOutOf: () => ({ count: 0 }),
            findPort: name => (
                name === 'from' ? fromPort : toPort
            ),
        };

        renderPortCursor(node);

        expect(fromPort.cursor).toEqual('pointer');
        expect(toPort.cursor).toEqual('pointer');
    });

    it('getBorderWidth returns correct with if isSelected is true', () => {
        expect(getBorderWidth(true)).toEqual(2);
    });

    it('getBorderWidth returns correct with if isSelected is false', () => {
        expect(getBorderWidth(false)).toEqual(1);
    });

    it('handleHilight returns correct with if isHighlighted is true', () => {
        expect(handleHighlight(true)).toEqual(COLORS.PURPLE);
    });

    it('handleHilight returns correct with if isHighlighted is false', () => {
        expect(handleHighlight(false)).toEqual(COLORS.BLUE);
    });

    it('dragGroupTogether adds grouped objects if there is a containing group', () => {
        const compute = jest.fn();

        const parts = {
            each: jest.fn(),
        };
        dragGroupTogether(compute)(parts, {});

        const each = parts.each.mock.calls[0][0];
        each({ containingGroup: 'group' });

        const [all] = compute.mock.calls[0];
        expect(all.add).toHaveBeenCalledTimes(2);
    });

    it('dragGroupTogether adds single object if there is not a containing group', () => {
        const compute = jest.fn();

        const parts = {
            each: jest.fn(),
        };
        dragGroupTogether(compute)(parts, {});

        const each = parts.each.mock.calls[0][0];
        each({ containingGroup: null });

        const [all] = compute.mock.calls[0];
        expect(all.add).toHaveBeenCalledTimes(1);
    });
});
