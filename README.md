# Tailwind CSS Gulp Starter Project
[tailwind]: https://tailwindcss.com/
This is a simple [Gulp](https://gulpjs.com/) setup for using [Tailwind CSS][tailwind] that:  

1. Processes your CSS ([Tailwind CSS][tailwind]),
1. Minifies your CSS ([cleancss](https://www.npmjs.com/package/clean-css)),
1. Removes unused classes ([purgecss](https://www.npmjs.com/package/@fullhuman/postcss-purgecss)) and,
1. Adds vendor prefixes to CSS rules using [caniuse.com](https:caniuse.com) ([autoprefixer](https://www.npmjs.com/package/autoprefixer))

To get started, clone the project and install the dependencies:  

``` bash
# using npm
npm i

# Using Yarn
yarn
```

To start watching your JS `/tailwind.js` and CSS `src/styles.css` files for changes and automatically rebuild your tailwind stylesheet `src/css/styles.css`, run:  

``` bash
npm run -s dev
```

And add this to the head of your HTML files.  

``` html
<link rel="stylesheet" href="src/css/style.css">
```

To build a production bundle, run:  

``` bash
npm run -s prod
```

After that you will have a ready to deploy bundle at `/dist` so change the link in head of your HTML files from `src/` to `dist/` like so:  

``` html
<link rel="stylesheet" href="dist/css/style.css">
```