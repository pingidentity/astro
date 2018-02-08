module.exports = [
    // Okhtay: this is excluded because covering the drag-n-drop parts of the code is not really
    // possible.when there are no screen dimensions.
    "/src/components/rows/DragDrop.jsx",
    "/src/components/rows/DragDropRow.jsx",
    "/src/components/panels/multi-drag/MultiDrag.jsx",

    // Eric: the following currently do not have any test coverage
    "/src/components/wizard/Choose.jsx",
    "/src/components/wizard/Progress.jsx",
    "/src/testutil/TestUtils.js",

    // Eric: These are deprecated and now fail after upgrading Jest and to React 16
    "/src/components/general/BackgroundLoader.jsx",
    "/src/components/example/BackgroundLoader.jsx",

    // Eric : this component needs to be changed substantially before the testing is complete
    "/src/components/help/intro-tutorial/IntroTutorial.jsx",
    "/src/components/help/intro-tutorial/Spotlight.jsx",

    // Tyler: Same issues as above with dragging
    "/src/util/dragScroll.js",

    // Okhtay: TestUtils shouldnt be included in the coverage
    "/src/util/ReduxTestUtils.js",

    // Eric: not currently able to trigger the react-tooltip open state in tests (via Jest or Enzyme)
    "/src/components/tooltips/HelpHint.jsx",

    // Eric: tests are written but Istanbul does not let me ignore certain function declarations that require actual
    // rendered DOM so I'm unable to get the require function coverage
    "/src/components/general/RowIndexNav.jsx",

    // Eric: No tests currently exist for this file - tech debt
    "/src/components/calendars/Utils.js",

    // Tyler: Coverage is included for stateless and stateful files
    "/src/components/forms/file-upload/v2.jsx",

    // Eric: this just started to fail the coverage report.. Why now?
    "/src/util/format.js"
];
