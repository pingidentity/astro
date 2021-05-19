const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const debug = require('gulp-debug');

const paths = {
    lib: 'lib',
};

gulp.task('delete-lib', () => del([paths.lib]));

gulp.task('transpile-components', () =>
    gulp
        .src(['./src/components**/**/*(*.jsx|*.js)', '!./src/components**/**/*(*.test.jsx|*.test.js)'])
        .pipe(babel())
        .pipe(debug({ title: 'transpiling:' }))
        .pipe(gulp.dest(paths.lib)));

gulp.task('transpile-utils', () =>
    gulp
        .src(['./src/util**/**/*(*.jsx|*.js)'])
        .pipe(babel())
        .pipe(debug({ title: 'transpiling utils:' }))
        .pipe(gulp.dest(paths.lib)));

gulp.task('move-files', () =>
    gulp
        .src([
            './src/css**/**/*',
            './src/icons**/**/*',
        ])
        .pipe(debug({ title: 'moving:' }))
        .pipe(gulp.dest(paths.lib)));

gulp.task('copy-npm-config', () =>
    gulp
        .src([
            '../../.npmrc'
        ])
        .pipe(debug({ title: 'moving:' }))
        .pipe(gulp.dest(paths.lib)));

gulp.task('build-lib', gulp.series(
    'delete-lib',
    'transpile-components',
    'transpile-utils',
    'move-files',
    done => done(),
));
