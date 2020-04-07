const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const debug = require('gulp-debug');

const paths = {
    dist: 'dist',
};

gulp.task('delete-dist', () => del([paths.dist]));

gulp.task('transpile-components', () =>
    gulp
        .src(['./src/components**/**/*(*.jsx|*.js)', '!./src/components**/**/*(*.test.jsx|*.test.js)'])
        .pipe(babel())
        .pipe(debug({ title: 'transpiling:' }))
        .pipe(gulp.dest(paths.dist))
);

gulp.task('transpile-utils', () =>
    gulp
        .src(['./src/util**/**/*(*.jsx|*.js)'])
        .pipe(babel())
        .pipe(debug({ title: 'transpiling utils:' }))
        .pipe(gulp.dest(paths.dist))
);

gulp.task('move-files', () =>
    gulp
        .src([
            './package.json',
            './src/css**/**/*',
            './src/icons**/**/*',
        ])
        .pipe(debug({ title: 'moving:' }))
        .pipe(gulp.dest(paths.dist))
);

gulp.task('build-dist', gulp.series(
    'delete-dist',
    'transpile-components',
    'transpile-utils',
    'move-files',
    done => done(),
));
