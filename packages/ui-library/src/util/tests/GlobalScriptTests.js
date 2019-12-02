import { checkReactVersion } from "../GlobalScript";

describe("GlobalScript", function () {

    describe("Check React Version", function () {
        it("throws a warning for React 15", function () {
            console.warn = jest.fn();
            expect(console.warn).not.toHaveBeenCalled();
            checkReactVersion({ version: "15.6.2" });
            expect(console.warn).toHaveBeenCalled();
        });

        it("throws a warning for React 16.7", function () {
            console.warn = jest.fn();
            expect(console.warn).not.toHaveBeenCalled();
            checkReactVersion({ version: "16.7.0" });
            expect(console.warn).toHaveBeenCalled();
        });

        it("doesn't throw a warning for React 16.10", function () {
            console.warn = jest.fn();
            checkReactVersion({ version: "16.10" });
            expect(console.warn).not.toHaveBeenCalled();
        });

        it("doesn't throw a warning for React 17", function () {
            console.warn = jest.fn();
            checkReactVersion({ version: "17.0.0" });
            expect(console.warn).not.toHaveBeenCalled();
        });
    });
});
