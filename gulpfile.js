/**
 * Created by natsuki on 16/4/28.
 */
var gulp = require("gulp");
var unzip = require("gulp-unzip");

var outDir = "out/";
var ELECTRON_PREBUILT_OSX_PATH = "electron_prebuilt/osx/electron-v0.37.6-darwin-x64.zip";

var electronPrebuiltDir = "";

gulp.task("osx", ["setUpOsx", "copyElectronPrebuilt"]);

gulp.task("setUpOsx", function () {
    electronPrebuiltDir = ELECTRON_PREBUILT_OSX_PATH;
    outDir = `${outDir}osx/`
});

gulp.task("copyElectronPrebuilt", function () {
    return gulp.src(electronPrebuiltDir)
        .pipe(unzip())
        .pipe(gulp.dest(outDir))
})

gulp.task("copySrc", function() {
    return gulp.src()
});