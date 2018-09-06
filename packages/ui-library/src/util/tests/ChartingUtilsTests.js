import { fromRechartsDataFormat, toRechartsDataFormat } from "../ChartingUtils";

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
});
