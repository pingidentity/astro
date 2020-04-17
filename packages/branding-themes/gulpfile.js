const gulp = require('gulp');
const debug = require('gulp-debug');

const version = require('./package.json').version;


const paths = {
    dist: `build/cdn/${version}`,
};


gulp.task('move-images', () =>
    gulp
        .src([
            "./themes/**/*.jpg",
        ])
        .pipe(debug({ title: 'moving:' }))
        .pipe(gulp.dest(paths.dist))
);
