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
    //Sisi: this is excluded because istanbul is not registering some branches and functions
    //that are definitely being hit as hit.
    "/src/components/forms/i18n/phone-input/v2.jsx"
];
