import { measureWidth } from "../DOMUtils";

it("should return a value for elem", function() {
    const elem = {
        getBoundingClientRect: () => {
            return { width: "666px" };
        }
    };
    expect(measureWidth(elem)).toEqual("666px");
});


