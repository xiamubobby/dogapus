/**
 * Created by natsuki on 16/5/3.
 */
import unzip = require("unzip");
import fs = require("fs");
import asar = require("asar");
import glob = require("glob");
import fse = require("fs-extra");

import {ROOT_PATH, TARGET} from "./CONFIG";

let resourcePath = "";

switch (TARGET) {
    case "osx":
        resourcePath = "out/osx/Electron.app/Contents/Resources"
}

glob("!(node_modules|electron_prebuilt|PepperFlash|buildscripts|out|tools|typings|*.ts|*.js.map|tsconfig.json|typings.json|gulpfile.js|*.asar)", {}, function (err, files) {
    for(const file of files) {
        fse.copySync(file, `${resourcePath}/app/${file}`);
    }
});
glob("!(node_modules|electron_prebuilt|PepperFlash|buildscripts|out|tools|typings)/**/!(*.ts|*.js.map|tsconfig.json|typings.json|gulpfile.js|*.asar)", {}, function (err, files) {
    for(const file of files) {
        fse.copySync(file, `${resourcePath}/app/${file}`);
    }
});

glob("node_modules/{lokijs, request}", {}, function (err, files) {
    for(const file of files) {
        fse.copySync(file, `${resourcePath}/app/${file}`);
    }
});
asar.createPackage(`${resourcePath}/app`, `${resourcePath}/app.asar`, function () {
});