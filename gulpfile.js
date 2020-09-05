'use strict';
const gulp = require('gulp');
const del = require('del');
const hb = require('gulp-hb');
const sitemap = require('gulp-sitemap');

const siteUrl = 'https://hidekiy.com';
const dist = 'dist';

gulp.task('clean', () => {
    return del(dist);
});

gulp.task('handlebars', () => {
    return gulp.src('src/templates/**/*.html')
        .pipe(hb().partials('src/partials/**/*.hbs'))
        .pipe(gulp.dest(dist));
});

gulp.task('static', () => {
    return gulp.src('src/static/**/*')
        .pipe(gulp.dest(dist));
});

gulp.task('sitemap', () => {
    return gulp.src(dist + '/**/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl,
            mappings: [
                {
                    pages: ['**/*'],
                    getLoc(siteUrl, loc, entry) {
                        // Removes the file extension if it exists
                        return loc.replace(/\.\w+$/, '');
                    }
                }
            ]
        }))
        .pipe(gulp.dest(dist));
});

gulp.task('build', gulp.series(gulp.parallel('handlebars', 'static'), 'sitemap'));

gulp.task('default', gulp.series('clean', 'build'));
