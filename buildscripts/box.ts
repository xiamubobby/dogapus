/**
 * Created by natsuki on 16/5/4.
 */
import unzip = require("unzip");
import fs = require("fs");
import asar = require("asar");
import glob = require("glob");
import fse = require("fs-extra");
import uglf = require("uglify-js");

import {ROOT_PATH, TARGET} from "./CONFIG";

let resourcePath = "";

switch (TARGET) {
    case "osx":
        resourcePath = "out/osx/Electron.app/Contents/Resources"
}

asar.createPackageWithOptions(`${resourcePath}/app`, `${resourcePath}/app.asar`, {"unpack-dir": "PepperFlash"}, function () {

});