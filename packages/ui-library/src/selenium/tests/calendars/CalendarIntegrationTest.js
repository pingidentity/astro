var CalendarPage = require("../../pages/calendars/CalendarPage.js");

describe("Calendar Integration", function () {
    
    beforeEach(function () {
        CalendarPage.openCalendarDemoPage();
    });

    afterAll(function (done) {
        CalendarPage.end(done);
    });

    /**
     * SCENARIO: Should have the default current date value and change other date value
     * GIVEN: Goes to component Calendar
     * WHEN: Catches the page
     * THEN: The default date should be the current date
     * WHEN: Inputs a valid date into the field
     * THEN: The input date is filled
     * WHEN: Takes screenshot to compare with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should have the default current date value and change other date value", function () {
        expect(CalendarPage.verifyCalendarFieldExisting()).toBeTruthy();
        var currentDate = CalendarPage.getCurrentDate();
        expect(CalendarPage.getValueOfCalendar()).toEqual(currentDate);

        var changedDate = "2017-07-20";
        CalendarPage.setValueToCalendar(changedDate);
        CalendarPage.focusOutCurrentElement();
        expect(CalendarPage.getValueOfCalendar()).toEqual(changedDate);

        CalendarPage.clickCalendarField();
        CalendarPage.waitForCalendarWrapperExist();
        CalendarPage.clickCalendarField();
        CalendarPage.clickCalendarField();
        CalendarPage.waitForCalendarWrapperExist();
        //take screenshot and compare
        expect(CalendarPage.takeScreenshotAndCompare("ComponentCalendar_InputValue")).toBeTruthy();
    });

    /**
     * SCENARIO: Should be clickable for the calendar field and left, right icon as well
     * GIVEN: Goes to component Calendar
     * WHEN: Clicks on the Date field
     * THEN: The calendar Wrapper should display
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Clicks on the left and right icon
     * THEN: The current month should be returned
     */
    it("should be clickable for the calendar field and left, right icon as well", function () {
        CalendarPage.clickCalendarField();
        CalendarPage.waitForCalendarWrapperExist();
        expect(CalendarPage.verifyCalendarWrapperExisting()).toBeTruthy();
        //click on left icon in date-view
        CalendarPage.clickLeftNavigationIcon();
        //click on right icon in date-view
        CalendarPage.clickRightNavigationIcon();
        var date = CalendarPage.getValueOfCalendar();
        var month = parseInt(date.split("-")[1]);
        expect(CalendarPage.getCurrentMonth()).toEqual(month);
    });
});