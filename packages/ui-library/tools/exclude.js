module.exports = [
    //Okhtay: this is excluded because istanbul seems confused about a require being a branch
    "/src/components/panels/header-bar/HeaderBar.jsx",
    //Okhtay: this is excluded because covering the drag-n-drop parts of the code is not really
    //possible.when there are no screen dimensions.
    "/src/components/rows/DragDropRow.jsx",
    "/src/components/panels/multi-drag/MultiDrag.jsx",
    //Sisi: this is excluded because istanbul is not registering some branches and functions
    //that are definitely being hit as hit.
    "/src/components/forms/i18n/I18nCountrySelector.jsx",
    //Okhtay: another example of istanbul not measure code coverage properly
    "/src/components/rows/expandable-row/ExpandableRow.jsx",
    //Okhtay: TestUtils shouldnt be included in the coverage
    "/src/util/ReduxTestUtils.js",
    //Sisi: this is excluded because istanbul is not registering some branches and functions
    //that are definitely being hit as hit.
    "/src/components/general/Section.jsx",
    //Okhtay: this is a test file
    "/src/components/forms/file-upload/tests/commonTests.jsx",
    //Sisi: this is excluded because istanbul is not registering some branches and functions
    //that are definitely being hit as hit.
    "/src/components/forms/i18n/phone-input/v2.jsx",
    //Sisi: this is excluded because istanbul is not registering some functions
    //that are definitely being hit as hit.
    "/src/components/forms/form-toggle/v2.jsx",
    //Sisi: this is excluded because istanbul is not registering some functions
    //that are definitely being hit as hit.
    "/src/components/forms/form-text-field/v2.jsx",
    //alex: the coverage numbers are completely messed up on this file; and the report doesn't say which lines is not covered
    "/src/components/forms/selection-list/v2-stateful.jsx",
    //alex: the coverage numbers are completely messed up on this file; and the report doesn't say which lines is not covered
    "/src/components/forms/selection-list/v2.jsx"
];
