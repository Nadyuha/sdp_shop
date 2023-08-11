const { src, dest, series, parallel, watch } = require('gulp')

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const image = require('gulp-image')
const svgSprite = require('gulp-svg-sprite')
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const argv = require('yargs').argv
const gulpif = require('gulp-if')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const groupCssMediaQueries = require('gulp-group-css-media-queries')
const webpcss = require('gulp-webpcss')
const webp = require('gulp-webp')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const fs = require('fs')
const fonter = require('gulp-fonter')
const zipPlugin = require('gulp-zip')
const browserSync = require('browser-sync').create()
const nodePath = require('path')
const rootFolder = nodePath.basename(nodePath.resolve());

//Dev
const isDev = () => {
    return !argv.prod;
}

//Prod 
const isProd = () =>{
    return !!argv.prod;
}

const clean = () => {
    return del(['app/*'])
}

const resources = () => {
    return src('./src/resources/**')
    .pipe(dest('./app'))
}

const styles = () => {
    return src('./src/scss/**/*.scss')
    //.pipe(sourcemaps.init())
    .pipe(gulpif(isDev(),sourcemaps.init()))
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
        suffix:'.min'
    }))
    //.pipe(gulpif(isProd(),groupCssMediaQueries()))
    .pipe(groupCssMediaQueries())
    .pipe(gulpif(isProd(),webpcss(
        {
        webpClass: ".webp",
        noWebpClass: ".no-webp",
        }
    )))
    .pipe(gulpif(isProd(),autoprefixes({
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
        cascade: true
        //cascade: false
    })))
    //.pipe(gulpif(isDev(),dest('./app/css/')))//Раскоментировать если нужен не сжатый дубль файла стлей
    .pipe(gulpif(isProd(),cleanCSS({
        level: 2
    })))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream())
}

const styleCss = () => {
    return src('./src/css/**/*.css')
    .pipe(gulpif(isProd(),cleanCSS({
        level: 2
    })))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream())
}

const fontsStyle = (done) => {
    const cb = () => {}
    //Файл стилей подключения шрифтов
    let fontsFile = './src/scss/_fonts.scss';
    let appFonts = './app/fonts/';
    //Проверяем существуют ли файлы шрифтов
    fs.readdir(appFonts, function (err, fontsFiles) {
        if(fontsFiles) {
            //Проверяем существует ли файл стилей для подключения шрифтов
            if(!fs.existsSync(fontsFile)) {
                //Если файла нет, создаем его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    //Записываем подключение шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if(newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if(fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if(fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if(fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if(fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if(fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if(fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavybold') {
                            fontWeight = 800;
                        } else if(fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                            newFileOnly = fontFileName;
                    }
                } 
            } else {
                //Если файл есть выводим сообщение
                //del(['./src/scss/_fonts.scss'])
                console.log("Файл scss/fonts уже существует. Для обновления файла его нужно удалить!");
            }  
        }
    });
    done();
}

const fontsToOtf = () => {
    return src('./src/fonts/**.otf')
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest('./src/fonts'))
}

const fontsToWoff = () => {
    return src('./src/fonts/**.ttf')
    .pipe(fonter({
        formats: ['woff']
    }))
        .pipe(dest('./app/fonts'))
}

const fontsToWoff2 = () => {
    return src('./src/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('./app/fonts'))
}

const fontsWoff = () => {
    return src(['./src/fonts/**.woff',
                './src/fonts/**.woff2'])
        .pipe(dest('./app/fonts/'))
}

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(gulpif(isProd(),htmlMin({
        collapseWhitespace: true,
    })))
    .pipe(dest('./app'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite:'sprite.svg'
            },
            scss : { 
                render : { 
                    scss : true 
                } 
            }
        }
    }))
    .pipe(dest('./app/img'))
}

const scripts = () => {
    return src('./src/js/main.js')
    .pipe(webpackStream({
        mode: isProd() ? 'production' : 'development',
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        output: {
            filename: 'main.js',
        },
        module: {
            rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                    }
                    }]
            }
    }))
    .on('error', function (err) {
        console.error('WEBPACK ERROR', err);
        this.emit('end'); // Don't stop the rest of the task
    })
    .pipe(concat('./app.js'))
    .pipe(gulpif(isDev(),sourcemaps.init()))
    .pipe(gulpif(isProd(),uglify().on('error', notify.onError())))
    .pipe(sourcemaps.write(''))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream())
}

const imageWebP = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.jpeg',
        'src/img/**/*.png',
    ])
    // .pipe(gulpif(isProd(),webp()))
    .pipe(webp())
    .pipe(dest('./app/img'))
}

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.jpeg',
        'src/img/**/*.png',
        'src/img/*.svg',
        'src/img/*.webp',
    ])
    .pipe(gulpif(isProd(),image()))
    .pipe(dest('./app/img'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    })
    watch('src/**/*.html', htmlMinify)
    watch('src/fonts/**/*', fontsToOtf)
    watch('src/fonts/**/*', fontsToWoff)
    watch('src/fonts/**/*', fontsToWoff2)
    watch('src/fonts/**/*', fontsWoff)
    watch('src/fonts/**/*', fontsStyle)
    watch('src/scss/**/*.scss', styles)
    watch('src/css/**/*.css', styleCss)
    watch('src/img/**/*.webp', imageWebP)
    watch('src/img/**/*.{jpeg,jpg,png,ico,webp}', images)
    watch('src/img/**/*.svg', svgSprites)
    watch('src/js/**/*.js', scripts)
    watch('src/resources/**/*', resources)
}

const zip = () => {
    del(`./${rootFolder}.zip`);
    return src('./app/**/*.*')
    .pipe(zipPlugin(`${rootFolder}.zip`))
    .pipe(dest('./'))
}

//Последовательная обработка шрифтоф
const fonts = gulp.series(fontsToOtf, fontsToWoff, fontsToWoff2, fontsWoff, fontsStyle);

exports.clean = clean
exports.styles = series(styleCss, styles)
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.zip = series(clean, fonts, resources, htmlMinify, scripts, styleCss, styles, svgSprites, imageWebP, images,zip)
exports.img = imageWebP
exports.default = series(clean, fonts, resources, htmlMinify, scripts,  styleCss, styles, svgSprites, imageWebP, images, watchFiles)



