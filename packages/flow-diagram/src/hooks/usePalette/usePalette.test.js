import { renderHook } from '@testing-library/react-hooks';
import usePalette from './usePalette';

describe('useDiagram', () => {
    const defaultNodeDataArray = [
        { 'key': 'LOGIN', 'category': 'LOGIN', 'text': 'Login', errorMessage: '' },
        { 'key': 'EXECUTE_FLOW', 'category': 'EXECUTE_FLOW', 'text': 'Execute Flow', errorMessage: '' },
        { 'key': 'finished', 'category': 'finished', 'text': 'Complete', errorMessage: '' },
        { 'key': 'error', 'category': 'error', 'text': 'Failure', errorMessage: '' },
    ];

    it('usePalette returns correct props', () => {
        // TODO: Flesh out this test more and set up GoJS mock
        const { result: { current: { paletteProps } } } = renderHook(() => usePalette({
            groupTemplates: [],
            linkDataArray: [],
            nodeDataArray: defaultNodeDataArray,
            nodeTemplates: [],
        }));

        // Get the argument from the first renderContent call

        expect(paletteProps.nodeDataArray).toEqual(defaultNodeDataArray);
        expect(paletteProps.initPalette).toBeDefined();
    });
});
