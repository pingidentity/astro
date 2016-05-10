module.exports = [
    //this is excluded because istanbul seems confused about a require being a branch
    "/src/components/panels/header-bar/HeaderBar.jsx",
    //this is excluded because covering the drag-n-drop parts of the code is not really
    //possible.when there are no screen dimensions.
    "/src/components/rows/DragDropRow.jsx"
];
