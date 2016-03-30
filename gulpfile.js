var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    csslint = require('gulp-csslint'),
    gutil   = require('gulp-util');

var cssLintSettings = {
    'adjoining-classes'          : false,
    'box-model'                  : false,
    'box-sizing'                 : false,
    'compatible-vendor-prefixes' : false,
    'empty-rules'                : false,
    'display-property-grouping'  : false,
    'duplicate-background-images': false,
    'duplicate-properties'       : true,
    'fallback-colors'            : false,
    'floats'                     : false,
    'font-faces'                 : false,
    'font-sizes'                 : false,
    'gradients'                  : false,
    'ids'                        : false,
    'import'                     : false,
    'important'                  : false,
    'known-properties'           : true,
    'outline-none'               : false,
    'overqualified-elements'     : false,
    'qualified-headings'         : false,
    'regex-selectors'            : false,
    'shorthand'                  : false,
    'selector-max'               : false, // IE max selectors quantity error
    'selector-max-approaching'   : false, // IE max selectors quantity warning
    'star-property-hack'         : false,
    'text-indent'                : false,
    'underscore-property-hack'   : false,
    'unique-headings'            : false,
    'universal-selector'         : false,
    'unqualified-attributes'     : false,
    'vendor-prefix'              : false,
    'zero-units'                 : false
};

// css lint custom formater
function customReporter(file) {
    gutil.log(
        gutil.colors.cyan(file.csslint.errorCount) + ' errors in '
        + gutil.colors.magenta(file.path)
    );

    file.csslint.results.forEach(function(result) {
        if (result.error.type === 'warning') {
            gutil.log(
                gutil.colors.yellow.bold('[Warining]')
                + gutil.colors.green(' Line: ' + result.error.line)
                + gutil.colors.cyan(' Column: ' + result.error.col) + ' '
                + gutil.colors.magenta(result.error.message) + ' '
                + gutil.colors.gray(result.error.rule.desc) + ' '
                + gutil.colors.red('Browsers: ' + result.error.rule.browsers)
            );
        }
        else {
            gutil.log(
                gutil.colors.red.bold('[' + result.error.type + ']')
                + gutil.colors.green(' Line: ' + result.error.line)
                + gutil.colors.cyan(' Column: ' + result.error.col) + ' '
                + gutil.colors.magenta(result.error.message) + ' '
                + gutil.colors.gray(result.error.rule.desc) + ' '
                + gutil.colors.red('Browsers: ' + result.error.rule.browsers)
            );
        }
    });
}

gulp.task('default', () => {
    gulp.watch('**/*.scss', ['sass']);
});

gulp.task('sass', () => {
    return gulp.src('web/css/*.scss')
        .pipe(sass({
            outputStyle   : 'expanded',
            sourceComments: true
        }).on('error', sass.logError))
        .pipe(gulp.dest('web/css'));
});

gulp.task('lint', () => {
    return gulp.src('web/css/*.css')
        .pipe(csslint(cssLintSettings))
        .pipe(csslint.reporter(customReporter))
        .pipe(csslint.reporter('fail'));
});
