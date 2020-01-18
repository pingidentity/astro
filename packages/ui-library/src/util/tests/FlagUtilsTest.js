import { hasFlag } from "../FlagUtils";

describe("Flag Utils", function() {
    it("should return true for flag in context", function() {
        expect(hasFlag({ props: {}, context: { flags: [ "thing" ] } }, "thing")).toBeTruthy();
    });
});