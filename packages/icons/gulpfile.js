

const gulp = require('gulp');
const debug = require('gulp-debug');
const version = require('./package.json').version;

const paths = {
    cdn: `cdn/${version}`,
    dist: `lib`,
};

gulp.task('move-files', () =>
    gulp
        .src([
            "./src/**/*",
        ])
        .pipe(debug({ title: `moving to ${paths.dist}:` }))
        .pipe(gulp.dest(paths.dist))
);

gulp.task('cdn', () =>
    gulp
        .src([
            `${paths.dist}/**/*.{css,svg,ttf,eot,otf,woff,woff2}`
        ])
        .pipe(debug({ title: `moving to ${paths.cdn}:`}))
        .pipe(gulp.dest(paths.cdn))
);
