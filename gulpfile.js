/**
 * Created by natsuki on 16/4/28.
 */
var gulp = require("gulp");
var unzip = require("gulp-unzip");
var clean = require("gulp-clean");
//var gulpAsar = require('gulp-asar');

var variant = ""
var outDir = "out/";
var resourceDir = "";
var ELECTRON_PREBUILT_OSX_PATH = "electron_prebuilt/osx/electron-v0.37.6-darwin-x64.zip";
var electronPrebuiltDir = "";
var PEPPER_PLUGIN_PATH_OSX = "PepperFlash/osx";
var pepperPluginPath = ""

gulp.task("osx", ["clean", "setUpOsx", "copyElectronPrebuilt", "copyPepperPlugin", "copyAsar", "copyPackageJson"]);
gulp.task("linux", ["clean", "setUpLinux", "copyElectronPrebuilt", "copyPepperPlugin", "copyAsar", "copyPackageJson"]);

gulp.task("setUpOsx", function () {
    variant = "osx";
    electronPrebuiltDir = ELECTRON_PREBUILT_OSX_PATH;
    pepperPluginPath = PEPPER_PLUGIN_PATH_OSX;
    resourceDir = "Electron.app/Contents/Resources/app/"
    outDir = `${outDir}osx/`
});

gulp.task("setUpLinux", function () {
    variant = "nix";
    electronPrebuiltDir = "electron_prebuilt/linux/electron-v0.37.6-linux-x64.zip";
    pepperPluginPath = "PepperFlash/linux";
    resourceDir = "resources/app/"
    outDir = `${outDir}linux/`
});

gulp.task("copyElectronPrebuilt", function () {
    return gulp.src(electronPrebuiltDir)
        .pipe(unzip({ keepEmpty : true }))
        .pipe(gulp.dest(outDir))
});

gulp.task("copyPepperPlugin", function () {
    return gulp.src(`${pepperPluginPath}/**/*`, {base: variant})
        .pipe(gulp.dest(`${outDir}${resourceDir}PepperFlash`))
});

gulp.task("copyAsar", function () {
    return gulp.src(`*.asar`)
        .pipe(gulp.dest(`${outDir}${resourceDir}`))
});

gulp.task("copyPackageJson", function () {
    return gulp.src(`package.json`)
        .pipe(gulp.dest(`${outDir}${resourceDir}`))
});

gulp.task("copySrc", function() {
    return gulp.src()
});




gulp.task("clean", function() {
    //return gulp.src("out/**/*", {read: false}).pipe(clean())
})