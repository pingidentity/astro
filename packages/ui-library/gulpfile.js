"use strict";

const gulp = require("gulp");
const babel = require("gulp-babel");
const exporter = require("@pingux/gulp-export");
const debug = require("gulp-debug");
const rename = require("gulp-rename");
const fs = require("fs");
const path = require("path");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const tap = require("gulp-tap");
const _ = require("underscore");
const postcss = require("gulp-postcss");

// Flat file generation data & vars
const demoComponentSrcPaths = fs.readFileSync("./src/demo/core/demos.js")
    .toString()
    .match(/((pathToDoc).*?(jsx\"))|((pathToDoc).*?(js\"))/g)
    .filter(value => {
        return !value.includes("templates");
    })
    .map(value => {
        const start = value.includes("net/") ? value.indexOf("net") : value.indexOf("components");
        const end = value.lastIndexOf(`"`);
        return `src/${value.substring(start, end)}`;
    })
    ;
const renameFiles = [
    { name: "charting/Cards/DashboardCard.jsx", rename: "Card.jsx" },
    { name: "charting/Cards/index.js", rename: "Cards.jsx" },
    { name: "charting/StatCardRow.jsx", rename: "CardRow.jsx" },
    { name: "expandable-row/Accessories.jsx", rename: "ExpandableRowAccessories.jsx" },
    { name: "grid/cells/ButtonCell", rename: "GridButtonCell.jsx" },
    { name: "grid/cells/CheckboxCell", rename: "GridCheckboxCell.jsx" },
    { name: "grid/cells/TextFieldCell", rename: "GridTextFieldCell.jsx" },
];
const demolessSrcPaths = [
    "src/components/forms/FormLabel.jsx",
    "src/components/forms/InputWidths.js",
    "src/components/forms/SelectionFilterLabel.jsx",
    "src/components/general/charting/Cards/DashboardCard.jsx",
    "src/components/general/charting/Cards/index.js",
    "src/components/general/charting/StatCardRow.jsx",
    "src/components/grid/cells/ButtonCell.jsx",
    "src/components/grid/cells/CheckboxCell.jsx",
    "src/components/grid/cells/TextFieldCell.jsx",
    "src/components/rows/DragDropRow.jsx",
    "src/components/rows/expandable-row/Accessories.jsx",
    "src/components/tooltips/CancelTooltip.jsx",
    "src/constants/CacheConstants.js",
    "src/constants/ChartingConstants.js",
    "src/constants/DashboardConstants.js",
    "src/constants/FormFieldConstants.js",
    "src/util/ChartingUtils.js",
    "src/util/FilterUtils.js",
    "src/util/Utils.js",
];
const allFlatfileSrcPaths = demoComponentSrcPaths.concat(demolessSrcPaths);

const componentFlatfileNames = allFlatfileSrcPaths.map(componentPath => {
    const renameFile = _.find(renameFiles, file => componentPath.includes(file.name));
    const filePath = renameFile ? renameFile.rename : componentPath;

    return path
        .basename(filePath)
        .replace(".jsx", "")
        .replace(".js", "");
});

let componentIndex = 0;

gulp.task("transpile-lib", () =>
    gulp.src([
        "./src/**/*.js?(x)",
        "!./src/**/tests/**", //exclude tests
        "!./src/demo/**", //exclude demos
        "!./src/selenium/**", //exclude selenium
        "!./src/templates/**", //exclude templates
        "!./src/tutorials/**", //exclude tutorials
    ])
        .pipe(babel())
        .pipe(debug({ title: "transpiling:" }))
        .pipe(gulp.dest("lib"))
);

gulp.task("build-index", () =>
    gulp
        .src([
            "./lib/components/**/*.js",
            "!./lib/components/**/__mocks__/**/*.js",
            "!./lib/components/**/tests/**/*.js",
            "./lib/util/TreeShakeWarn.js"
        ])
        .pipe(exporter({
            exportType: "default",
            relativeNames: false,
            exportModules: false
        }))
        .pipe(gulp.dest("./"))
);

gulp.task("create-flatfiles", () =>
    gulp
        .src(allFlatfileSrcPaths, { allowEmpty: true })
        .pipe(debug({ title: `flat-file` }))
        .pipe(tap(file => {
            const componentPath = file
                .path
                .replace(file.cwd, "")
                .replace("src/", "")
                .replace(".jsx", "")
                .replace(".js", "")
                ;
            /* jshint ignore:start */
            file.contents = new Buffer(`module.exports = require(".${componentPath}.js");`);
            /* jshint ignore:end */
        }))
        .pipe(rename(file => {
            file.basename = componentFlatfileNames[componentIndex];
            file.extname = ".js";
            componentIndex += 1;
        }))
        .pipe(gulp.dest("lib"))
);

gulp.task("move-files", () =>
    gulp.src([
        "./src/**/*",
        "!./src/**/*.js?(x)",
        "!./src/**/tests",
        "!./src/**/tests/**",
        "!./src/core", //exclude demo folder
        "!./src/demo", //exclude demo folder
        "!./src/demo/**", //exclude demos
        "!./src/selenium", //exclude selenium folder
        "!./src/selenium/**", //exclude selenium
        "!./src/templates", //exclude templates folder
        "!./src/templates/**", //exclude templates
        "!./src/tutorials", //exclude tutorials folder
        "!./src/tutorials/**", //exclude tutorials
    ])
        .pipe(debug({ title: "moving:" }))
        .pipe(gulp.dest("lib"))
);

const cssFolder = () => {
    const index = process.argv.indexOf("--destination");
    return index >= 0 ? process.argv[index + 1] : "lib/css";
};

gulp.task("build-css", () =>
    gulp.src(["./src/css/ui-library.scss", "./src/css/end-user.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(cssFolder()))
);

gulp.task("package-lib", gulp.series(
    ["transpile-lib"],
    ["create-flatfiles"],
    ["move-files"],
    ["build-css"],
    ["build-index"],
));
