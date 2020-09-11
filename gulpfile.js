const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel')
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();

// Sass tasks
gulp.task('sass', () =>
  gulp.src('src/scss/main.scss')
    .pipe(postcss([autoprefixer()]))
    .pipe(sass({
      sourceComments: false,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream())
);   

// JavaScript tasks
gulp.task('js', () =>
  gulp.src('src/js/main.js')
  .pipe(babel({ presets: ['env'] }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
);

// Copy HTML to dist folder
gulp.task('html', () =>
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'))
);

// Static Server + watching html/scss/js files
gulp.task('default', ['sass', 'js', 'html'], () => {
  browserSync.init({
      server: {
        baseDir: 'dist/'
      }
  });
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/main.js', ['js']);
  gulp.watch('src/index.html',['html']);
  gulp.watch(['src/index.html','src/js/main.js','src/scss/**/*.scss']).on('change', browserSync.reload);
});
