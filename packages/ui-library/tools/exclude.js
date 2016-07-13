module.exports = [
    //Okhtay: this is excluded because covering the drag-n-drop parts of the code is not really
    //possible.when there are no screen dimensions.
    "/src/components/rows/DragDropRow.jsx",
    "/src/components/panels/multi-drag/MultiDrag.jsx",
    //Okhtay: TestUtils shouldnt be included in the coverage
    "/src/util/ReduxTestUtils.js",
    //Okhtay: this is a test file
    "/src/components/forms/file-upload/tests/commonTests.jsx",
    //alex: the code coverage on form-integer-field/v1.jsx is not reported correctly
    "/src/components/forms/form-integer-field/v1.jsx"
];
