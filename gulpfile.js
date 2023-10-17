const { src, dest, watch, parallel } = require("gulp");
// css
const sass = require("gulp-sass") (require("sass"));
const plumber = require('gulp-plumber'); // para que no tenga por errores


// imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const wepb = require('gulp-webp');
const avif = require('gulp-avif');


function css(done) {
    src('src/scss/**/*.scss')   // Identifacr el archivo SASS  /** Es para hacer cambios de scss en toda la carpeta */
    .pipe(plumber() ) //para que no tenga por errores
    .pipe( sass ())    // Compilarlo
    .pipe( dest('build/css'))  // Almacenarlo
    
    done(); // Avisa cuando llegamos al final
}
function versionWebp(done){
    const opciones ={
        quality : 50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(wepb(opciones))
    .pipe(dest('build/img'))
    done();
}

function versionAvif(done){
    const opciones ={
        quality : 50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3 
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}

function javascript(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));
    done();
}

function dev(done){
    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp,versionAvif, javascript,dev);