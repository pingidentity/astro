import moment from "moment-range";
import Constants from "../Constants";
import CalendarUtils from "../Utils";

const getTestObject = ({ currentView = 0 }) => ({
    setDate: jest.fn(),
    setState: jest.fn(),
    prevView: jest.fn(),
    state: {
        date: moment("20191004", "YYYYMMDD"),
        currentView,
    },
    props: {
        dateRange: {
            startDate: new Date(2019, 8, 10), //Oct 10 2019
            endDate: new Date(2019, 10, 20) //Nov 20 2019
        },
    },
});

describe("CalendarUtils", function() {
    it("should call setDate with October 3, 2019", function() {
        const that = getTestObject({});

        expect(that.setDate).not.toBeCalled();
        CalendarUtils.keyDownActions.call(that, Constants.keys.left);
        expect(that.setDate.mock.calls[0][0].format("YYYYMMDD")).toBe("20191003");
    });

    it("should call setDate with September 27, 2019", function() {
        const that = getTestObject({});

        expect(that.setDate).not.toBeCalled();
        CalendarUtils.keyDownActions.call(that, Constants.keys.up);
        expect(that.setDate.mock.calls[0][0].format("YYYYMMDD")).toBe("20190927");
    });

    it("should call setDate with October 11, 2019", function() {
        const that = getTestObject({});

        expect(that.setDate).not.toBeCalled();
        CalendarUtils.keyDownActions.call(that, Constants.keys.down);
        expect(that.setDate.mock.calls[0][0].format("YYYYMMDD")).toBe("20191011");
    });

    it("should hide calendar on enter for day view", function() {
        const that = getTestObject({});

        CalendarUtils.keyDownActions.call(that, Constants.keys.enter);

        expect(that.setState.mock.calls[0][0]).toEqual({ isVisible: false });
    });

    it("should switch to day view on enter from month view", function() {
        const that = getTestObject({ currentView: 1 });

        CalendarUtils.keyDownActions.call(that, Constants.keys.enter);

        expect(that.prevView.mock.calls[0][0].format("YYYYMMDD")).toBe("20191004");
    });

    it("should switch to month view on enter from year view", function() {
        const that = getTestObject({ currentView: 2 });

        CalendarUtils.keyDownActions.call(that, Constants.keys.enter);

        expect(that.prevView.mock.calls[0][0].format("YYYYMMDD")).toBe("20191004");
    });

    it("should hide calendar on escape", function() {
        const that = getTestObject({});

        CalendarUtils.keyDownActions.call(that, Constants.keys.esc);

        expect(that.setState.mock.calls[0][0]).toEqual({ isVisible: false });
    });

    it("should return May 2019", function() {
        const nearDate = CalendarUtils.getNearestInRange(
            moment("20191004", "YYYYMMDD"),
            {
                startDate: new Date(2019, 4, 10), //May 10 2019
                endDate: new Date(2019, 6, 20) //July 20 2019
            },
            "months"
        );
        expect(nearDate.format("YYYYMM")).toBe("201905");
    });

    it("should return July 2019", function() {
        const nearDate = CalendarUtils.getNearestInRange(
            moment("20191004", "YYYYMMDD"),
            {
                startDate: new Date(2018, 4, 10), //May 10 2018
                endDate: new Date(2019, 6, 20) //July 20 2019
            },
            "months"
        );
        expect(nearDate.format("YYYYMM")).toBe("201907");
    });

    it("should return 2019", function() {
        const nearDate = CalendarUtils.getNearestInRange(
            moment("20151004", "YYYYMMDD"),
            {
                startDate: new Date(2019, 4, 10), //May 10 2019
                endDate: new Date(2025, 6, 20) //July 20 2025
            },
            "years"
        );
        expect(nearDate.format("YYYY")).toBe("2019");
    });

    it("should return 2025", function() {
        const nearDate = CalendarUtils.getNearestInRange(
            moment("20301004", "YYYYMMDD"),
            {
                startDate: new Date(2019, 4, 10), //May 10 2019
                endDate: new Date(2025, 6, 20) //July 20 2025
            },
            "years"
        );
        expect(nearDate.format("YYYY")).toBe("2025");
    });

    it("should return June 6, 2019", function() {
        const nearDate = CalendarUtils.getNearestInRange(
            moment("20190601", "YYYYMMDD"),
            {
                startDate: new Date(2019, 5, 6), //June 6 2019
                endDate: new Date(2019, 5, 20) //June 20 2019
            },
            "days"
        );
        expect(nearDate.format("YYYYMMDD")).toBe("20190606");
    });

    it("should return June 1, 2019", function() {
        const nearDate = CalendarUtils.getNearestInRange(
            moment("20190625", "YYYYMMDD"),
            {
                startDate: new Date(2019, 0, 6), //January 6 2019
                endDate: new Date(2019, 5, 20) //June 20 2019
            },
            "days"
        );
        expect(nearDate.format("YYYYMMDD")).toBe("20190620");
    });

    it("should return itself", function() {
        let nearDate = CalendarUtils.getNearestInRange(
            moment("20190625", "YYYYMMDD"),
            {
                startDate: new Date(2020, 0, 6), //January 6 2020
            },
            "months"
        );
        expect(nearDate.format("YYYYMMDD")).toBe("20190625");
    });

});
