const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const debug = require('gulp-debug');


gulp.task('delete-dist', () => del(['dist']));

gulp.task('transpile-components', () =>
    gulp
        .src(['./src/components**/**/*(*.jsx|*.js)', '!./src/components**/**/*(*.test.jsx|*.test.js)'])
        .pipe(babel())
        .pipe(debug({ title: 'transpiling:' }))
        .pipe(gulp.dest('dist')));

gulp.task('transpile-utils', () =>
    gulp
        .src(['./src/util**/**/*(*.jsx|*.js)'])
        .pipe(babel())
        .pipe(debug({ title: 'transpiling utils:' }))
        .pipe(gulp.dest('dist')));

gulp.task('move-files', () =>
    gulp
        .src([
            './.npmrc',
            './package.json',
            './static/end-user.css',
            './src/css**/**/*',
            './static/*(*.svg|*.map|*.jpg|*.otf)',
        ])
        .pipe(debug({ title: 'moving:' }))
        .pipe(gulp.dest('dist')));

gulp.task('build-dist', gulp.series(
    'delete-dist',
    'transpile-components',
    'transpile-utils',
    'move-files',
    done => done(),
));
