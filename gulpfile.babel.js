'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import eslint from 'gulp-eslint'
import concat from 'gulp-concat'
import rename from 'gulp-rename'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import clean from 'gulp-clean'

const dirs = {
  dest: 'public/',
  styles: 'src/styles/app.scss',
  scripts: 'src/scripts/**/*.js',
  build: ['public/css', 'public/js']
}

gulp.task('styles', () => {
  return gulp.src(dirs.styles)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dirs.dest}/css`))
})

gulp.task('scripts', () => {
  return gulp.src(dirs.scripts)
    .pipe(eslint())
    // .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['es2015'],
    }))
    // .pipe(uglify())
    // .pipe(rename({
    // suffix: '.min'
    // }))
    .pipe(gulp.dest(`${dirs.dest}/js`))
})

gulp.task('clean', () => {
  return gulp.src(dirs.build)
    .pipe(clean())
})

gulp.task('watch', () => {
  gulp.watch(dirs.styles, ['styles'])
  gulp.watch(dirs.scripts, ['scripts'])
})

gulp.task('default', ['watch', 'styles', 'scripts'])
