var CalendarPage = require("../../pages/calendars/CalendarPage.js");

describe("Calendar Integration", function () {

    beforeEach(function () {
        CalendarPage.openCalendarDemoPage();
    });

    afterAll(function (done) {
        CalendarPage.end(done);
    });

    it("should have the default current date value", function () {
        expect(CalendarPage.calendar).not.toBeNull();

        var currentdate = CalendarPage.getCurrentDate();
        expect(CalendarPage.calendar.getValue()).toEqual(currentdate);
    });

    it("should be clickable for the calendar field and left, right icon as well", function () {
        CalendarPage.clickCalendar();
        expect(CalendarPage.calendarWrapper).not.toBeNull();

        // click on left icon in date-view
        CalendarPage.clickLeftNavigationIcon();

        // click on right icon in date-view
        CalendarPage.clickRightNavigationIcon();

        var day = CalendarPage.calendar.getValue();
        var month = parseInt(day.split("-")[1]);

        expect(CalendarPage.getCurrentMonth()).toEqual(month);
    });

    it("should change the default current date value", function () {
        var changedDate = "2017-07-20";

        expect(CalendarPage.calendar).not.toBeNull();
        CalendarPage.clickCalendar();
        expect(CalendarPage.calendarWrapper).not.toBeNull();

        CalendarPage.setValueToCalendar(changedDate);
        expect(CalendarPage.calendar.getValue()).toEqual(changedDate);
    });
});

