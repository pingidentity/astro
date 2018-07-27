var gulp = require("gulp");
var babel = require("gulp-babel");
//var flatten = require("gulp-flatten");
var debug = require("gulp-debug");
//var rp = require("gulp-revert-path");
var runSequence = require("run-sequence");
var sass = require("gulp-sass");

gulp.task("transpile-lib", () =>
    gulp.src([
        "./src/**/*.js?(x)",
        "!./src/**/*Test?(s).js?(x)", //exlude tests
        "!./src/demo/**", //exlude demos
        "!./src/selenium/**", //exlude selenium
        "!./src/templates/**", //exlude templates
        "!./src/tutorials/**", //exlude tutorials
    ])
    .pipe(babel())
    .pipe(debug({ title: "transpiling:" }))
    .pipe(gulp.dest("lib"))
);

gulp.task("move-files", () =>
    gulp.src([
        "./src/**/*",
        "!./src/**/*.js?(x)",
        "!./src/**/*Test?(s).js?(x)", //exlude tests
        "!./src/core", //exlude demo folder
        "!./src/demo", //exlude demo folder
        "!./src/demo/**", //exlude demos
        "!./src/selenium", //exlude selenium folder
        "!./src/selenium/**", //exlude selenium
        "!./src/templates", //exlude templates folder
        "!./src/templates/**", //exlude templates
        "!./src/tutorials", //exlude tutorials folder
        "!./src/tutorials/**", //exlude tutorials
    ])
    .pipe(debug({ title: "moving:" }))
    .pipe(gulp.dest("lib"))
);

gulp.task("build-css", () =>
    gulp.src("./src/css/ui-library.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("lib/css"))
);


gulp.task("package-lib", () => {
    runSequence(
        ["transpile-lib"],
        ["move-files"],
        ["build-css"]
    );
});
