const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({lazy:false}),
    eventStream = require('event-stream'),
    bowerJson = require('./bower.json');

const PRODUCTION_MODE = 'production',
    DEVELOPMENT_MODE = 'development';

let env,
    outputDir,
    appIndexHTML,
    jsSources,
    templateSources,
    appCssSources,
    vendorSources,
    buildDirectory,
    distDirectory,
    demoDirectory;

// For dev env run gulp command: NODE_ENV=development gulp
env = process.env.NODE_ENV || PRODUCTION_MODE;

if (env===DEVELOPMENT_MODE) {
    outputDir = 'build/development/';
} else {
    outputDir = 'build/production/';
}

appIndexHTML = 'app/index.html';
jsSources = [
    '!test/**/*.*',
    'app/**/*-module.js',
    'app/**/*.js'];
templateSources = ['!app/index.html', 'app/**/*.html', 'app/components/markup/js/*.json'];
appCssSources = ['app/**/*.css'];
vendorSources = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jquery-ui/jquery-ui.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-resource/angular-resource.min.js',
    'bower_components/ui-router/release/angular-ui-router.min.js'];
buildDirectory = 'build/';
distDirectory = 'dist/';
demoDirectory = distDirectory + 'demo/';


gulp.task('scripts', function(){
    // combine all js files of the app
    gulp.src(jsSources)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.if(env===PRODUCTION_MODE, plugins.uglify()))
        .pipe(gulp.dest(outputDir))
        .pipe(plugins.connect.reload());
});

gulp.task('templates', function(){
    // combine all template files (html and json) of the app into a js file
    gulp.src(templateSources)
        .pipe(plugins.if(env===PRODUCTION_MODE, plugins.minifyHtml()))
        .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
        .pipe(gulp.dest(outputDir+'js/'))
        .pipe(plugins.connect.reload());
});

gulp.task('appCss', function(){
    // combine app specific css file
    gulp.src(appCssSources)
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.if(env===PRODUCTION_MODE, plugins.minifyCss()))
        .pipe(gulp.dest(outputDir+'style/'))
        .pipe(plugins.connect.reload());
});

gulp.task('fonts', function(){
    // move fonts
    gulp.src(['bower_components/**/*.{woff, ttf}'])
        .pipe(plugins.flatten())
        .pipe(gulp.dest(outputDir+'fonts/'));
});

gulp.task('vendor', function(){
    // concatenate vendor JS files
    gulp.src(vendorSources)
        .pipe(plugins.order(vendorSources, {base: '.'}))
        .pipe(plugins.concat('lib.js'))
        .pipe(gulp.dest(outputDir+'vendor/'));
});

gulp.task('copy-index', function() {
    // copy index.html file
    gulp.src(appIndexHTML)
        .pipe(plugins.if(env===PRODUCTION_MODE, plugins.minifyHtml()))
        .pipe(gulp.dest(outputDir))
        .pipe(plugins.connect.reload());
});

gulp.task('clean', function() {
    // clean build and dist directory
    gulp.src(buildDirectory, {read: false})
        .pipe(plugins.clean());
});

gulp.task('dist', function() {
    // build demo directory
    gulp.src(outputDir+'**/*.*')
        .pipe(gulp.dest(demoDirectory));

    // build distribution
    // concatenate markup js files
    gulp.src([outputDir+'js/templates.js', outputDir+'app.js'])
        .pipe(plugins.order([outputDir+'js/templates.js', outputDir+'app.js']))
        .pipe(plugins.concat('xd-markup-ng.min.js'))
        .pipe(gulp.dest(distDirectory));

    // concatenate markup css files
    gulp.src([outputDir+'style/app.css'])
        .pipe(plugins.concat('ui-module-main.min.css'))
        .pipe(gulp.dest(distDirectory));

});

//This task allows you to update the version number just in bower.json file and it will automatically update in other
//files like package.json and README.md
gulp.task('version', function() {
    return eventStream.merge(
        gulp.src('package.json')
            .pipe(plugins.jsonEditor({
                'version': bowerJson.version
            }))
            .pipe(gulp.dest('.')),
        gulp.src('README.md')
            .pipe(plugins.replace(/\(v.*\)/, '(v' + bowerJson.version + ')'))
            .pipe(gulp.dest('.'))
    );
});

gulp.task('watch',function(){
    gulp.watch(jsSources,['scripts']);
    gulp.watch(templateSources,['templates']);
    gulp.watch(appCssSources,['appCss']);
    gulp.watch(appIndexHTML,['copy-index']);
});

gulp.task('connect', plugins.connect.server({
    root: [outputDir],
    port: 9891,
    livereload: true
}));

gulp.task('default',['scripts', 'templates', 'appCss', 'fonts', 'copy-index',
                     'vendor', 'connect', 'watch']);

gulp.task('build',['scripts', 'templates', 'appCss', 'fonts', 'copy-index', 'vendor', 'version']);
