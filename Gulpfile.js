const {
  src,
  dest,
  watch,
  series
} = require('gulp'); // avoid referencing gulp object e.g. gulp.src(...) is now just src(...)

const paths = {
  html: "./*.html", // Path to HTML files you want processed
  tailwind: {
    css: "./src/styles.css", // Path to CSS files you want processed
    config: "./tailwind.js" // Path to tailwind config file
  },
  output: { // Path for processed CSS output
    dev: './src/css/',
    prod: './dist/css/'
  }
}

const tailwindcss = require('tailwindcss');

class TailwindExtractor {
  /** 
   * Custom extractor for purgeCSS, to avoid stripping classes with `:` prefixes 
   * I got this from https://github.com/simonswiss/tailwind-starter
   * */
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

const postcss = require('gulp-postcss'); // CSS preprocessor

// PostCSS plugins
const purgecss = require('@fullhuman/postcss-purgecss'); // removes unused classes
const autoprefixer = require('autoprefixer'); // adds vendor prefixes to CSS rules using https://caniuse.com
const cssnano = require('cssnano'); // minifies css

function buildDev() {
  let plugins = [
    tailwindcss(paths.tailwind.config),
    autoprefixer
  ];
  return src(paths.tailwind.css)
    .pipe(postcss(plugins))
    .pipe(dest(paths.output.dev));
}


function watchTailwind() {
  watch(paths.tailwind.css, buildDev);
  watch(paths.tailwind.config, buildDev);
}

function buildProd() {
  let cssnanoConfig = {
    preset: 'default'
  };

  let purgecssConfig = {
    content: [paths.html],
    extractors: [{
      extractor: TailwindExtractor,
      extensions: ["html", "js"]
    }]
  };
  let plugins = [
    tailwindcss(paths.tailwind.config),
    cssnano(cssnanoConfig),
    purgecss(purgecssConfig),
    autoprefixer
  ];

  return src(paths.tailwind.css)
    .pipe(postcss(plugins))
    .pipe(dest(paths.output.prod));
}

exports.default = series(buildDev, watchTailwind);
exports.build = buildProd;