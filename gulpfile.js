'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('sass', function() {
    gulp.src('./_sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./_sass/**/*.scss', ['sass']);
});

gulp.task('prod-css', function() {
    return gulp.src('_site/css/main.css')
        // uncss
        .pipe(uncss({
            html: ['index.html', '_site/**/*.html']
        }))
        // prefixes
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions']
        })]))
        // minify
        .pipe(csso())
        .pipe(gulp.dest('_site/css-prod/'));
});

gulp.task('imagemin', function(){
	    return gulp.src('_site/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('_site/img'));
});