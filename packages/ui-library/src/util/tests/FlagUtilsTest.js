import { hasFlag } from "../FlagUtils";

describe("Flag Utils", function() {
    it("should return true for v4 regardless of flag", function() {
        expect(hasFlag({ props: { flags: [ "v4" ] } }, "nothing")).toBeTruthy();
    });
});