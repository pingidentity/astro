import { usesStableContext, usesFragments } from "../DependencyUtils";

jest.mock("react", () => ({
    nothing: "nothing",
}));

describe("DependencyUtils", function() {
    it("should error when useStableContext is called and React doesn't have createContext", function() {
        console.error = jest.fn();

        expect(console.error).not.toBeCalled();
        usesStableContext();
        expect(console.error).toBeCalled();
    });

    it("should error when useFragments is called and React doesn't have Fragment", function() {
        console.error = jest.fn();

        expect(console.error).not.toBeCalled();
        usesFragments();
        expect(console.error).toBeCalled();
    });
});