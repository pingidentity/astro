module.exports = [
    // Okhtay: this is excluded because covering the drag-n-drop parts of the code is not really
    // possible.when there are no screen dimensions.
    "/src/components/rows/DragDrop.jsx",
    "/src/components/rows/DragDropRow.jsx",
    "/src/components/panels/multi-drag/MultiDrag.jsx",

    // Tyler: Same issues as above with dragging
    "/src/util/dragScroll.js",

    // Okhtay: TestUtils shouldnt be included in the coverage
    "/src/util/ReduxTestUtils.js",

    // Okhtay: this is a test file
    "/src/components/forms/file-upload/tests/commonTests.jsx",

    // Alex: the code coverage on form-integer-field/v1.jsx is not reported correctly
    "/src/components/forms/form-integer-field/v1.jsx",

    // Eric: not currently able to trigger the react-tooltip open state in tests (via Jest or Enzyme)
    "/src/components/tooltips/HelpHint.jsx",

    // Eric: tests are written but Istanbul does not let me ignore certain function declarations that require actual
    // rendered DOM so I'm unable to get the require function coverage
    "/src/components/general/RowIndexNav.jsx",
];
