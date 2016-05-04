/**
 * Created by natsuki on 16/5/4.
 */
import unzip = require("unzip");
import fs = require("fs");
import asar = require("daf");
import glob = require("glob");
import fse = require("fs-extra");
import uglf = require("uglify-js");

import {ROOT_PATH, TARGET} from "./CONFIG";

let resourcePath = "";

switch (TARGET) {
    case "osx":
        resourcePath = "out/osx/Electron.app/Contents/Resources"
}

glob(`PepperFlash/${TARGET}`, {}, function (err, files) {
    for(const file of files) {
        fse.copySync(file, `${resourcePath}/${file}`);
    }
});

fse.emptyDirSync(`${resourcePath}/app`);
fs.rmdirSync(`${resourcePath}/app`);