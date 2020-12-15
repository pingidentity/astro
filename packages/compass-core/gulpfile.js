const gulp = require('gulp');
const babel = require('gulp-babel');
const debug = require('gulp-debug');
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

gulp.task('transpile-lib', (() =>
    gulp.src([
        './src/**/*.js?(x)',
        '!./src/**/*.story.js?(x)', // exclude stories
        '!./src/**/tests/**', // exclude tests
    ])
        .pipe(babel())
        .pipe(debug({ title: 'transpiling:' }))
        .pipe(gulp.dest('lib'))
));

gulp.task('copy-scss', (() =>
    gulp.src([
        './src/**/*.scss',
    ])
        .pipe(debug({ title: 'copying scss:' }))
        .pipe(gulp.dest('lib'))
));

gulp.task('build-lib', gulp.series(['transpile-lib', 'copy-scss']));

gulp.task('docs', (done) => {
    const output = jsdoc2md.renderSync({ files: 'src/utils/**/*.js' });
    if (!fs.existsSync('build-doc')) {
        fs.mkdirSync('build-doc');
    }
    fs.writeFileSync('build-doc/Utilities.story.mdx', `<Meta title="Utilities" />\n\n${output}`);
    return done();
});
