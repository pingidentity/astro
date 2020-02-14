import {
    fromRechartsDataFormat,
    toRechartsDataFormat,
    generateTheme,
    getEvenLineCoords,
} from "../ChartingUtils";

window.__DEV__ = true;

describe("ChartingUtils", () => {
    it("toRechartsDataFormat correctly formats data", () => {
        const data = [{
            id: "time",
            name: "Time",
            data: [
                "Jan '18",
                "Feb '18",
                "Mar '18",
            ]
        }];

        const result = [
            { "time": "Jan '18" },
            { "time": "Feb '18" },
            { "time": "Mar '18" }
        ];

        expect(toRechartsDataFormat(data)).toEqual(result);
    });

    it("fromRechartsDataFormat correctly formats data", () => {
        const formatted = [
            { "time": "Jan '18", "time2": "Jan '18" },
            { "time": "Feb '18", "time2": "Feb '18" },
            { "time": "Mar '18", "time2": "Mar '18" }
        ];

        const unformatted = [
            {
                id: "time",
                data: [
                    "Jan '18",
                    "Feb '18",
                    "Mar '18",
                ]
            },
            {
                id: "time2",
                data: [
                    "Jan '18",
                    "Feb '18",
                    "Mar '18",
                ]
            }
        ];

        expect(fromRechartsDataFormat(formatted)).toEqual(unformatted);
    });

    it("generateTheme correctly formats data", () => {
        const seedColor = "#ff0000";

        const data = [
            { id: "foo" },
            { id: "bar" },
        ];

        const result = {
            highlightColor: "#00FFFF",
            referenceLineColor: "#00FFFF",
            referenceLabelColor: "#676D74",
            dataColors: [
                { id: "foo", color: "#FF0000" },
                { id: "bar", color: "#00FFFF" }
            ]
        };

        expect(generateTheme(seedColor, data)).toEqual(result);
    });

    it("returns coordinates for drawing evenly spaced lines", () => {
        const height = 500;
        const numLines = 10;

        expect(getEvenLineCoords(height, numLines).length).toEqual(10);
    });

    it("returns correct coordinates for lines", () => {
        const height = 500;
        const numLines = 5;

        expect(getEvenLineCoords(height, numLines)).toMatchSnapshot();
    });

    it("returns default height for coordinates for drawing evenly spaced lines", () => {
        const height = 500;

        expect(getEvenLineCoords(height).length).toEqual(5);
    });

});
