import { renderHook } from '@testing-library/react-hooks';
import useDiagram, {
    addLinks,
    addNodes,
    removeLinks,
    removeNodes,
} from './useDiagram';

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

    it('useDiagram returns correct props', () => {
        // TODO: Flesh out this test more and set up GoJS mock
        const { result: { current: { diagramProps } } } = renderHook(() => useDiagram({
            groupTemplates: [],
            linkDataArray: defaultLinks,
            nodeDataArray: defaultNodes,
            nodeTemplates: [],
            onModelChange: () => {},
        }));

        // Get the argument from the first renderContent call

        expect(diagramProps.nodeDataArray).toEqual(defaultNodes);
        expect(diagramProps.linkDataArray).toEqual(defaultLinks);
        expect(diagramProps.initDiagram).toBeDefined();
    });

    it('onModelChange from diagramProps calls onModelChange argument', () => {
        const onModelChange = jest.fn();
        const { result: { current: { diagramProps } } } = renderHook(() => useDiagram({
            groupTemplates: [],
            linkDataArray: [],
            nodeDataArray: [],
            nodeTemplates: [],
            onModelChange,
        }));

        expect(onModelChange).not.toHaveBeenCalled();
        diagramProps.onModelChange();
        expect(onModelChange).toHaveBeenCalledTimes(1);
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
});
