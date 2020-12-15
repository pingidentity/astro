import { missingDependencyMessage } from '../DependencyUtils';

describe('DependencyUtils', () => {
    it("should error when it can't see the dependency", () => {
        /* eslint-disable no-console */
        console.error = jest.fn();

        expect(console.error).not.toBeCalled();
        missingDependencyMessage(undefined, 'no dependency', 'install-me');
        expect(console.error).toBeCalled();
        /* eslint-disable no-console */
    });
});
