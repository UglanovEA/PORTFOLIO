let project_folder = 'dist';
let source_folder = 'src';

let path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css',
    js: project_folder + '/js',
    img: project_folder + '/img',
  },
  src: {
    html: source_folder + '/*.pug',
    css: source_folder + '/scss/style.scss',
    js: source_folder + '/js/script.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
  },
  watch: {
    html: source_folder + '/**/*.pug',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
  },
  clean: './' + project_folder + '/'
}

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  pug = require('gulp-pug'),
  pugLinter = require('gulp-pug-linter'),
  htmlValidator = require('gulp-w3c-html-validator'),
  del = require('del'),
  scss = require('gulp-sass'),
  gulpStylelint = require('gulp-stylelint'),
  autoprefixer = require('gulp-autoprefixer'),
  gcmq = require('gulp-group-css-media-queries'),
  cleanCSS = require('gulp-clean-css'),
  shorthand = require('gulp-shorthand'),
  terser = require('gulp-terser'),
  imagemin = require('gulp-imagemin'),
  sourcemaps = require('gulp-sourcemaps');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(pugLinter({ reporter: 'default' }))
    .pipe(pug())
    .pipe(htmlValidator())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ]
    }))
    .pipe(sourcemaps.init())
    .pipe(
      scss({
        outputStyle: 'expanded'
      })
    )
    .pipe(gcmq())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true
      })
    )
    .pipe(cleanCSS())
    .pipe(shorthand())
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(terser())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 3,
      svgoPlugins: [
        {
          removeViewBox: false
        }
      ]
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;