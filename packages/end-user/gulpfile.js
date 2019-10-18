const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const debug = require('gulp-debug');
const log = require('fancy-log');

const paths = {
    dist: 'dist',
    cdn: 'cdn',
}

gulp.task('delete-dist', () => del([paths.dist]));

gulp.task('delete-cdn', () => del([paths.cdn]));

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
            './.npmrc',
            './package.json',
            './static/end-user.css',
            './src/css**/**/*',
            './static/*',
            '!./static/*.html'
        ])
        .pipe(debug({ title: 'moving:' }))
        .pipe(gulp.dest(paths.dist))
);

gulp.task('build-cdn', () =>
    gulp
        .src([
            './static/*',
            '!./static/*.html'
        ])
        .pipe(debug({ title: 'perparing for cdn:' }))
        .pipe(gulp.dest(paths.cdn))
        .on('end', () => { log(`cdn built`);} )
);

gulp.task('build-dist', gulp.series(
    'delete-dist',
    'transpile-components',
    'transpile-utils',
    'move-files',
    done => done(),
));

gulp.task(paths.dist, gulp.series(
    'build-dist',
    'delete-cdn',
    'build-cdn',
    done => done(),
));
